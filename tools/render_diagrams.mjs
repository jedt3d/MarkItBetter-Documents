import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const skill=process.env.HALLMARK_SKILL||path.join(os.homedir(),'.agents/skills/hallmark');
const require=createRequire(path.join(skill,'package.json'));
const puppeteer=(await import(pathToFileURL(require.resolve('puppeteer-core')).href)).default;
if(!process.env.MERMAID_JS)throw new Error('Set MERMAID_JS to the Mermaid11.17.2 browser bundle.');
const examples=JSON.parse(fs.readFileSync('content/examples.json','utf8'));
const base=process.env.GUIDE_BASE_URL||'http://127.0.0.1:4177';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{for(const lang of ['en','th','ja']){
 const page=await browser.newPage();await page.goto(`${base}/reference/${lang}/mermaid.html`,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);await page.addScriptTag({path:process.env.MERMAID_JS});
 for(const [key,example] of Object.entries(examples)){
  const svg=await page.evaluate(async({source,title,id})=>{
   const fontFamily=getComputedStyle(document.body).fontFamily;
   mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'neutral',fontFamily,htmlLabels:false,flowchart:{htmlLabels:false,padding:16},sequence:{width:120,actorMargin:30,diagramMarginX:12},journey:{textPlacement:'tspan',width:100,leftMargin:100,taskMargin:20,diagramMarginX:20,taskFontSize:22,taskFontFamily:fontFamily,titleFontSize:'24px',titleFontFamily:fontFamily}});
   const result=await mermaid.render(id,source),holder=document.createElement('div');holder.innerHTML=result.svg;const svg=holder.querySelector('svg');
   holder.style.cssText='position:absolute;left:-100000px;top:0;visibility:hidden';document.body.append(holder);
   const presentation=[svg,...svg.querySelectorAll('*')].map(node=>{
    const values={};
    // Text anchoring and font sizes are part of Mermaid's measured layout.
    // Preserve these presentation values while the site supplies fonts/colours.
    for(const name of ['text-anchor','dominant-baseline','alignment-baseline','font-size','font-weight','font-style','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin']){
     const value=node.style.getPropertyValue(name);if(value)values[name]=value;
    }
    if(node.matches('text,tspan'))for(const name of ['text-anchor','font-size','font-weight','font-style','dominant-baseline','alignment-baseline'])values[name]=getComputedStyle(node).getPropertyValue(name);
    return {node,values};
   });
   svg.querySelectorAll('style').forEach(n=>n.remove());
   for(const {node,values} of presentation){
    for(const [name,value] of Object.entries(values))node.setAttribute(name,value);
    node.removeAttribute('style');node.removeAttribute('font-family');for(const a of ['fill','stroke','color'])node.removeAttribute(a);
   }
   svg.querySelectorAll('text.legend').forEach(node=>node.setAttribute('font-size','20px'));
   svg.setAttribute('role','img');svg.setAttribute('aria-label',title);svg.removeAttribute('aria-labelledby');svg.removeAttribute('width');svg.removeAttribute('height');const output=svg.outerHTML;holder.remove();return output;
  },{source:example.source[lang],title:example.title[lang],id:`guide-${lang}-${key}`});
  fs.writeFileSync(`assets/diagrams/${lang}-${key}.svg`,svg+'\n');console.log(lang+' '+key);
 }
 await page.close();
}}finally{await browser.close();}
