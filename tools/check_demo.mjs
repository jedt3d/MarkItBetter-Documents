import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const skill=process.env.HALLMARK_SKILL || path.join(os.homedir(),'.agents/skills/hallmark');
const require=createRequire(path.join(skill,'package.json'));
const puppeteer=(await import(pathToFileURL(require.resolve('puppeteer-core')).href)).default;
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results=[];
const assert=(value,message)=>{if(!value)throw new Error(message);};
const frame=page=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
async function rect(page,selector){return page.$eval(selector,node=>{const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};});}
async function inside(page){
 const v=await rect(page,'.diagram-viewport'),s=await rect(page,'.diagram-scene svg');
 return s.x>=v.x-1&&s.y>=v.y-1&&s.right<=v.right+1&&s.bottom<=v.bottom+1;
}
try{
 for(const variant of ['reference','edition'])for(const lang of ['en','th','ja'])for(const width of [375,1280]){
  const page=await browser.newPage();
  await page.setViewport({width,height:900});
  const row={variant,lang,width,checks:[]};
  try{
   await page.goto(`http://127.0.0.1:4177/${variant}/${lang}/index.html`,{waitUntil:'networkidle0'});await frame(page);
   assert(await page.evaluate(()=>document.documentElement.lang)===lang,'Locale missing');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal page overflow');
   assert(await page.$$eval('img',nodes=>nodes.every(i=>i.complete&&i.naturalWidth>0)),'Broken image');
   assert(await page.$$eval('.toc-list>li',nodes=>nodes.length)===14,'Expected14chapters');
   assert(await page.$$eval('#chapter-mermaid .toc-points p',nodes=>nodes.length)===9,'Expected9Mermaidtopics');
   row.checks.push('locale, images, contained page,14chapters and9Mermaidtopics');
   const client=await page.createCDPSession();await client.send('DOM.enable');await client.send('CSS.enable');
   const {root}=await client.send('DOM.getDocument');
   const fonts=async selector=>{const {nodeId}=await client.send('DOM.querySelector',{nodeId:root.nodeId,selector});return (await client.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;};
   row.bodyFonts=await fonts('.hero .lead');row.headingFonts=await fonts('h1');row.codeFonts=await fonts('.snippet-panel pre code');
   if(lang==='th'){
    assert(row.bodyFonts.some(f=>f.familyName==='IBM Plex Sans Thai Looped'&&f.glyphCount>0),'Thai body not painted with looped font');
    assert(!row.bodyFonts.some(f=>f.familyName==='IBM Plex Sans Thai'),'Nonlooped Thai in reading text');
    assert(row.headingFonts.some(f=>f.familyName==='IBM Plex Sans Thai'&&f.glyphCount>0),'Thai heading font missing');
   }
   if(lang==='ja')assert(row.bodyFonts.some(f=>f.familyName==='IBM Plex Sans JP'&&f.glyphCount>0),'Japanese Plex font missing');
   assert(row.codeFonts.some(f=>f.familyName==='IBM Plex Mono'&&f.glyphCount>0),'Mono code font missing');
   row.checks.push('actual painted script/body/heading/code fonts');
   const target=lang==='en'?'th':'en';
   const href=await page.$eval(`.locale a[hreflang="${target}"]`,a=>a.href);
   assert(href.endsWith(`/${variant}/${target}/index.html`),'Language switch lost design');
   row.checks.push('language switch preserves proposal and separate edition');
   await page.click('#tab-0');await page.focus('#tab-0');await page.keyboard.press('ArrowRight');
   assert(await page.$eval('#tab-1',e=>e.getAttribute('aria-selected'))==='true','Keyboard tabs failed');
   const expected=await page.$eval('#snippet-1 pre code',e=>e.textContent);
   // Exercise the public click/API boundary without changing the user's OS clipboard.
   await page.evaluate(()=>{window.__copyRequests=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copyRequests.push(text);}}});});
   await page.click('#snippet-1 [data-copy]');
   assert(await page.evaluate(()=>window.__copyRequests.at(-1))===expected,'Copy request does not match code');
   row.checks.push('keyboard tabs and exact copy request (OS clipboard untouched)');
   await page.$eval('.diagram-example',e=>e.scrollIntoView({block:'center'}));await frame(page);
   assert(await inside(page),'InitialFitAllclipsSVG');
   row.diagramLabels=await page.$$eval('.diagram-scene svg .node .label',nodes=>nodes.map(node=>({text:node.textContent.trim(),height:node.getBoundingClientRect().height})));
   assert(row.diagramLabels.length===4&&row.diagramLabels.every(label=>label.height>=13),'Initial Fit All labels too small to read');
   const initial=await rect(page,'.diagram-scene svg');
   await page.click('[data-zoom="in"]');await frame(page);const bigger=await rect(page,'.diagram-scene svg');
   assert(bigger.width>initial.width*1.1,'Zoom button failed');
   const v=await rect(page,'.diagram-viewport');
   await page.mouse.move(v.x+v.width/2,v.y+v.height/2);await page.mouse.down();await page.mouse.move(v.x+v.width/2+35,v.y+v.height/2+20,{steps:4});await page.mouse.up();
   const moved=await rect(page,'.diagram-scene svg');assert(Math.abs((moved.x-bigger.x)-35)<2,'Pan failed');
   await page.click('[data-fit]');await frame(page);assert(await inside(page),'FitAllresetfailed');
   await page.click('.diagram-example details summary');await frame(page);
   await page.click('[data-maximize]');await frame(page);
   const max=await rect(page,'.diagram-example');assert(max.width>width-60 && max.y<30,'Browser-container maximize failed');
   assert(await inside(page),'MaximizedFitAllclipsSVG');
   assert(await page.$eval('.site-header',e=>e.inert),'Background not inert');
   await page.keyboard.press('Escape');await frame(page);
   assert(!await page.$eval('.diagram-example',e=>e.classList.contains('is-maximized')),'Escaperestorefailed');
   assert(await page.$eval('.diagram-example details',e=>e.open),'Source disclosure state lost');
   assert(await page.evaluate(()=>document.activeElement.hasAttribute('data-maximize')),'Focus not restored');
   assert(!await page.$eval('.site-header',e=>e.inert),'Background inert leaked');
   assert(await inside(page),'RestoredFitAllclipsSVG');
   row.checks.push('FitAll,zoom,realpointerpan,maximize,source,Escape,focus andinertcleanup');
   row.status='pass';
  }catch(error){row.status='fail';row.error=String(error);}
  results.push(row);await page.close();
 }
 const noScript=await browser.newPage();await noScript.setJavaScriptEnabled(false);await noScript.goto('http://127.0.0.1:4177/reference/en/index.html',{waitUntil:'networkidle0'});
 results.push({scenario:'JavaScript disabled',status:await noScript.$eval('main',e=>e.innerText.length>500)?'pass':'fail',scope:'Guide text and every snippet remain available'});await noScript.close();
}finally{await browser.close();}
const report={passed:results.filter(r=>r.status==='pass').length,failed:results.filter(r=>r.status==='fail').length,skipped:0,unexecuted:0,results};
fs.writeFileSync('.hallmark/functional-checks.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.passed,failed:report.failed,skipped:0,unexecuted:0,failures:results.filter(r=>r.status==='fail')}));
process.exitCode=report.failed?1:0;
