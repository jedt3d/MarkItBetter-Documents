import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const require=createRequire(path.join(process.env.HALLMARK_SKILL||path.join(os.homedir(),'.agents/skills/hallmark'),'package.json'));
const puppeteer=(await import(pathToFileURL(require.resolve('puppeteer-core')).href)).default;
const guide=JSON.parse(fs.readFileSync('content/guide.json','utf8'));
const base=(process.env.GUIDE_BASE_URL||'http://127.0.0.1:4177').replace(/\/$/,'');
const out=process.env.GUIDE_REPORT_DIR||'.hallmark/guide-check';fs.mkdirSync(out,{recursive:true});
const assert=(value,message)=>{if(!value)throw new Error(message);};
const frame=page=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
const report={base,results:[],errors:[]};
const files=[];for(const lang of guide.locales)for(const name of ['index',...guide.chapters.map(c=>c.id)])files.push(`reference/${lang}/${name}.html`);files.push('index.html');
const ids=new Map(files.map(file=>[file,new Set([...fs.readFileSync(file,'utf8').matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]))]));
let links=0;
for(const file of files){
 const html=fs.readFileSync(file,'utf8');assert(!/<img(?:\s|>)/i.test(html),'Unexpected image '+file);
 const allIds=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert(new Set(allIds).size===allIds.length,'Duplicate IDs '+file);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const u=new URL(m[1],'https://guide.test/'+file);if(u.origin!=='https://guide.test')continue;
  const target=decodeURIComponent(u.pathname.slice(1));assert(fs.existsSync(target),'Broken local link '+file+' -> '+m[1]);
  if(u.hash&&ids.has(target))assert(ids.get(target).has(decodeURIComponent(u.hash.slice(1))),'Broken anchor '+file+' -> '+m[1]);links++;
 }
}
report.static={pages:files.length,localLinks:links,chapters:guide.chapters.length*guide.locales.length,screenshots:0};
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 if(process.env.GUIDE_CHECK_GROUP!=='no-script')
 for(const lang of guide.locales)for(const name of (process.env.GUIDE_CHECK_GROUP==='mermaid'?['mermaid']:['index',...guide.chapters.map(c=>c.id)]))for(const width of [375,1280]){
  const page=await browser.newPage(),row={kind:'page',lang,name,width};
  try{
   await page.setCacheEnabled(false);await page.setViewport({width,height:900});const response=await page.goto(`${base}/reference/${lang}/${name}.html`,{waitUntil:'networkidle0'});assert(response.status()===200,'HTTP '+response.status());await frame(page);
   const m=await page.evaluate(()=>({lang:document.documentElement.lang,variant:document.documentElement.dataset.variant,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,images:document.images.length,ratios:[...document.querySelectorAll('h1,h2,h3')].map(e=>{const s=getComputedStyle(e);return parseFloat(s.lineHeight)/parseFloat(s.fontSize);}),sections:document.querySelectorAll('.prose h2').length,links:[...document.querySelectorAll('.locale a')].map(a=>a.href),article:document.querySelector('article')?.textContent.length||0}));
   assert(m.lang===lang&&m.variant==='reference','Locale/theme mismatch');assert(!m.overflow,'Page overflows');assert(m.h1===1&&!m.images,'Heading/image count');assert(m.ratios.every(r=>r>=(lang==='en'?1.2:1.4)-.001),'Tight heading');
   if(name!=='index')assert(m.sections>=2&&m.article>500,'Incomplete chapter');
   for(const target of guide.locales)assert(m.links.some(h=>h.endsWith(`/reference/${target}/${name}.html`)),'Language switch loses chapter');
   if(['snippets','preferences','mermaid'].includes(name)){
    const client=await page.createCDPSession();await client.send('DOM.enable');await client.send('CSS.enable');const {root}=await client.send('DOM.getDocument');const {nodeId}=await client.send('DOM.querySelector',{nodeId:root.nodeId,selector:'.prose p:nth-of-type(2)'});row.fonts=(await client.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;
    if(lang==='th'){assert(row.fonts.some(f=>f.familyName==='IBM Plex Sans Thai Looped'&&f.glyphCount>0),'Thai reading font');assert(!row.fonts.some(f=>f.familyName==='IBM Plex Sans Thai'),'Loopless reading font');}
    if(lang==='ja')assert(row.fonts.some(f=>f.familyName==='IBM Plex Sans JP'&&f.glyphCount>0),'Japanese reading font');
   }
   if(name==='snippets'){
    assert(await page.$$eval('[data-copy]',ns=>ns.length)>=6,'Snippet examples missing');assert(await page.$$eval('[data-rendered-example] table',ns=>ns.length)>0,'Table result missing');
    await page.evaluate(()=>{window.__copied=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.__copied.push(text)}});});
    const expected=await page.$eval('[data-code] pre code',e=>e.textContent);await page.click('[data-copy]');assert(await page.evaluate(()=>window.__copied.at(-1))===expected,'Copy source mismatch');
   }
   if(name==='preferences')for(const tab of ['Editor','Preview','Focus','Tasks','Pop-ups','Code','Color'])assert(await page.$eval('article',(e,tab)=>e.textContent.includes(tab),tab),'Preferences tab missing '+tab);
   if(name==='mermaid'){
    assert(await page.$$eval('[data-diagram] svg[role="img"]',ns=>ns.length)===3,'Three diagram examples required');
    const all=await page.$$('[data-diagram]');row.diagrams=[];
    for(const example of all){
     const viewport=await example.$('.diagram-viewport'),svg=await example.$('.diagram-scene svg');
     await example.evaluate(e=>e.scrollIntoView({block:'center'}));await frame(page);
     const inside=async()=>example.evaluate(e=>{const v=e.querySelector('.diagram-viewport').getBoundingClientRect(),s=e.querySelector('.diagram-scene svg').getBoundingClientRect();return s.x>=v.x-1&&s.y>=v.y-1&&s.right<=v.right+1&&s.bottom<=v.bottom+1;});
     assert(await inside(),'Initial Fit All clipping');
     const labels=await svg.evaluate(s=>[...s.querySelectorAll('text')].filter(t=>t.textContent.trim()).map(t=>{
      const b=t.getBoundingClientRect(),matrix=t.getScreenCTM(),size=parseFloat(getComputedStyle(t).fontSize)*Math.hypot(matrix.a,matrix.b),outer=s.getBoundingClientRect();
      const boxes=[...s.querySelectorAll('rect')].map(r=>r.getBoundingClientRect());
      return {text:t.textContent,size,contained:b.left>=outer.left-1&&b.right<=outer.right+1&&b.top>=outer.top-1&&b.bottom<=outer.bottom+1,boxed:!t.matches('.actor,.task,.journey-section')||boxes.some(r=>b.left>=r.left-1&&b.right<=r.right+1&&b.top>=r.top-1&&b.bottom<=r.bottom+1&&Math.abs((b.left+b.right-r.left-r.right)/2)<2),legendClear:!t.matches('.legend')||!boxes.some(r=>b.left<r.right&&b.right>r.left&&b.top<r.bottom&&b.bottom>r.top)};
     }));
     assert(labels.every(t=>t.size>=12),'Fit All labels too small '+JSON.stringify(labels));assert(labels.every(t=>t.contained&&t.boxed&&t.legendClear),'Label bounds/alignment '+JSON.stringify(labels));
     const first=await svg.boundingBox();await (await example.$('[data-zoom="in"]')).click();await frame(page);const zoomed=await svg.boundingBox();assert(zoomed.width>first.width*1.1,'Zoom');
     const box=await viewport.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+30,box.y+box.height/2+18,{steps:3});await page.mouse.up();const moved=await svg.boundingBox();assert(Math.abs(moved.x-zoomed.x-30)<2,'Pan');
     await (await example.$('[data-fit]')).click();await frame(page);assert(await inside(),'Fit reset');
     await (await example.$('details summary')).click();await frame(page);const sourceBefore=await example.$eval('pre code',e=>e.textContent);assert(sourceBefore.length>20,'Source absent');
     await (await example.$('[data-maximize]')).click();await frame(page);assert(await example.evaluate(e=>e.classList.contains('is-maximized')),'Maximize');assert(await inside(),'Maximize fit');
     await page.keyboard.press('Escape');await frame(page);assert(!await example.evaluate(e=>e.classList.contains('is-maximized')),'Escape restore');assert(await example.$eval('details',e=>e.open),'Source state');assert(!await page.$eval('.site-header',e=>e.inert),'Inert leak');assert(await example.$eval('pre code',e=>e.textContent)===sourceBefore,'Source altered');
     row.diagrams.push({labels,controls:'Fit All, zoom, pointer pan, source, maximize, Escape and cleanup'});
    }
   }
   if(width===375&&['preferences','mermaid','snippets'].includes(name)&&process.env.GUIDE_CAPTURE==='1')await page.screenshot({path:path.join(out,`${lang}-${name}-375.png`),fullPage:true});
   row.status='pass';
  }catch(error){row.status='fail';row.error=String(error);report.errors.push(row);console.log(JSON.stringify({failure:row}));}
  report.results.push(row);await page.close();if(report.results.length%16===0)console.log(JSON.stringify({checked:report.results.length,failures:report.errors.length}));
 }
 for(const lang of guide.locales){
  const page=await browser.newPage();const row={kind:'no-script',lang};try{await page.setJavaScriptEnabled(false);await page.goto(`${base}/reference/${lang}/mermaid.html`,{waitUntil:'networkidle0'});assert(await page.$eval('article',e=>e.textContent.length)>1500,'No-script article missing');assert(await page.$$eval('[data-diagram] svg[role="img"]',ns=>ns.length)===3,'No-script SVG missing');row.status='pass';}catch(error){row.status='fail';row.error=String(error);report.errors.push(row);console.log(JSON.stringify({failure:row}));}report.results.push(row);await page.close();
 }
 if(!['no-script','mermaid'].includes(process.env.GUIDE_CHECK_GROUP)){
 const home=await browser.newPage();const row={kind:'root-home'};try{await home.goto(base+'/',{waitUntil:'networkidle0'});await frame(home);assert(await home.$eval('html',e=>e.dataset.variant)==='reference','Root theme');assert(await home.$$eval('.chapter-index li',ns=>ns.length)===15,'Root chapter count');assert(await home.$$eval('img',ns=>ns.length)===0,'Root image');row.status='pass';}catch(error){row.status='fail';row.error=String(error);report.errors.push(row);console.log(JSON.stringify({failure:row}));}report.results.push(row);await home.close();
 }
}finally{await browser.close();}
report.passed=report.results.filter(r=>r.status==='pass').length;report.failed=report.results.filter(r=>r.status==='fail').length;report.skipped=0;report.unexecuted=0;
fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:report.passed,failed:report.failed,skipped:0,unexecuted:0,errors:report.errors}));process.exitCode=report.failed?1:0;
