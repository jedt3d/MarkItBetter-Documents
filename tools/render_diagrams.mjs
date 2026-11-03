import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const skill=process.env.HALLMARK_SKILL || path.join(os.homedir(),'.agents/skills/hallmark');
const require=createRequire(path.join(skill,'package.json'));
const puppeteer=(await import(pathToFileURL(require.resolve('puppeteer-core')).href)).default;
if(!process.env.MERMAID_JS)throw new Error('Set MERMAID_JS to the public Mermaid11.17.2 browser bundle.');
const copy=JSON.parse(fs.readFileSync('.hallmark/copy.json','utf8'));
fs.mkdirSync('assets/diagrams',{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 for(const lang of ['en','th','ja']){
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:4177/reference/'+lang+'/index.html',{waitUntil:'networkidle0'});
  await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:process.env.MERMAID_JS});
  const c=copy[lang];
  const source='flowchart TB\n A['+c.labels[0]+'] --> B['+c.labels[1]+']\n B --> C['+c.labels[2]+']\n C --> D['+c.labels[3]+']';
  const svg=await page.evaluate(async({source,name})=>{
    const face=getComputedStyle(document.body).fontFamily;
    mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'neutral',fontFamily:face,flowchart:{htmlLabels:false,padding:16}});
    const result=await mermaid.render('guide-flow',source);
    const holder=document.createElement('div');holder.innerHTML=result.svg;
    const root=holder.querySelector('svg');
    root.querySelectorAll('style').forEach(node=>node.remove());
    for(const node of [root,...root.querySelectorAll('*')]){
      node.removeAttribute('style');node.removeAttribute('font-family');
      for(const attribute of ['fill','stroke','color'])node.removeAttribute(attribute);
    }
    root.setAttribute('role','img');root.setAttribute('aria-label',name);
    root.removeAttribute('aria-labelledby');root.removeAttribute('aria-roledescription');
    root.removeAttribute('width');root.removeAttribute('height');
    return root.outerHTML;
  },{source,name:c.diagram_name});
  fs.writeFileSync('assets/diagrams/'+lang+'.svg',svg+'\n');
  console.log(lang+': actual Mermaid SVG generated after font readiness');
  await page.close();
 }
}finally{await browser.close();}
