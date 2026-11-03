import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Marked} from 'marked';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'content/guide.json'),'utf8'));
const examples=JSON.parse(fs.readFileSync(path.join(root,'content/examples.json'),'utf8'));
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon=(name)=>`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${{plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',maximize:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',chevron:'<path d="m6 9 6 6 6-6"/>'}[name]}</svg>`;
const output=(file,content)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);};

function codeBlock(source,lang,ui){return `<div class="code-example" data-code><div class="code-toolbar"><span>${escape(lang||'text')}</span><button type="button" class="copy-button" data-copy data-label="${ui.copy}" data-copied="${ui.copied}" data-error="${ui.copyError}">${ui.copy}</button></div><pre><code${lang?` class="language-${escape(lang)}"`:''}>${escape(source)}</code></pre></div>${lang==='markdown'&&(source.trimStart().startsWith('|')||/^\[[^\]\n]+\]\(https?:\/\/[^)\n]+\)$/.test(source.trim()))?`<div class="example-result" data-rendered-example><p>${ui.result}</p>${new Marked({gfm:true}).parse(source)}</div>`:''}`;}
function diagram(key,lang,ui){
 const example=examples[key];if(!example)throw new Error('Unknown example '+key);
 const file=path.join(root,'assets/diagrams',`${lang}-${key}.svg`);
 if(!fs.existsSync(file))throw new Error('Missing diagram asset: '+file);
 const svg=fs.readFileSync(file,'utf8');
 return `<figure class="diagram-example" data-diagram><div class="diagram-toolbar"><span class="diagram-name">${escape(example.title[lang])}</span><div class="diagram-actions"><button type="button" data-zoom="out" aria-label="${ui.zoomOut}">${icon('minus')}</button><button type="button" data-fit class="fit-button">${ui.fit}</button><button type="button" data-zoom="in" aria-label="${ui.zoomIn}">${icon('plus')}</button><button type="button" data-maximize aria-label="${ui.maximize}" aria-expanded="false" data-open-label="${ui.maximize}" data-close-label="${ui.restore}">${icon('maximize')}</button></div></div><div class="diagram-viewport" tabindex="0" aria-label="${ui.diagram}"><div class="diagram-scene">${svg}</div></div><details><summary>${ui.source}</summary>${codeBlock(example.source[lang],'mermaid',ui)}</details><figcaption>${ui.diagramHelp}</figcaption></figure>`;
}
function render(source,lang,ui){
 const headings=[],used=new Set();const marked=new Marked({gfm:true});
 marked.use({renderer:{
  heading(token){
   const match=token.text.match(/\s+\{#([a-z0-9-]+)\}$/);const text=match?token.text.slice(0,match.index):token.text;
   const base=match?match[1]:text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-');
   let id=base||'section',i=1;while(used.has(id))id=base+'-'+i++;used.add(id);
   if(token.depth===2)headings.push({id,text});
   return `<h${token.depth} id="${id}">${this.parser.parseInline(marked.Lexer.lexInline(text))}</h${token.depth}>\n`;
  },
  code(token){return codeBlock(token.text,token.lang?.split(/\s/)[0]||'',ui);}
 }});
 let html=marked.parse(source);
 html=html.replace(/<!-- diagram:([a-z-]+) -->/g,(_,key)=>diagram(key,lang,ui));
 return {html,headings};
}
const all={};for(const lang of data.locales)all[lang]=data.chapters.map(ch=>{
 const source=fs.readFileSync(path.join(root,'content',lang,ch.file),'utf8');
 const [first,...rest]=source.split('\n');if(!first.startsWith('# '))throw new Error('Missing title '+ch.file);
 return {...ch,title:first.slice(2),source:rest.join('\n')};
});

function page(lang,current,home=false,atRoot=false){
 const ui=data.ui[lang],index=data.locales.indexOf(lang),prefix=atRoot?'':'../../';
 const rel=id=>atRoot?`reference/${lang}/${id==='home'?'index':id}.html`:`${id==='home'?'index':id}.html`;
 const items=all[lang];
 const nav=`<nav aria-label="${ui.contents}"><a class="guide-home-link" href="${rel('home')}"${home?' aria-current="page"':''}>${ui.home}</a><ol class="chapter-links">${items.map((ch,i)=>`<li><a href="${rel(ch.id)}"${!home&&ch.id===current.id?' aria-current="page"':''}><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><span>${escape(ch.labels[index])}${ch.upcoming?` <span class="nav-status">${ui.upcoming}</span>`:''}</span></a></li>`).join('')}</ol></nav>`;
 const locales=`<details class="locale"><summary>${ui.name}${icon('chevron')}</summary><nav aria-label="Language">${data.locales.map(code=>`<a href="${atRoot?'reference/':'../'}${code}/${home?'index':current.id}.html" lang="${code}" hreflang="${code}"${code===lang?' aria-current="page"':''}>${data.ui[code].name}</a>`).join('')}</nav></details>`;
 const header=`<a class="skip-link" href="#main">${ui.skip}</a><header class="site-header"><a class="brand" href="${prefix}index.html">MarkItBetter</a>${locales}</header>`;
 let body,title,description;
 if(home){
  title=ui.title;description=ui.intro;
  body=`<header class="guide-intro"><h1>${ui.title}</h1><p class="lead">${ui.intro}</p><p>${ui.homeNote}</p><a class="hero-action" href="${rel('workflow')}">${ui.start}</a><div class="offer"><span class="price">$13</span><span>${ui.upgrade}</span></div></header><aside class="availability"><p>${ui.availability}</p></aside><section class="chapter-index" id="contents"><h2>${ui.contents}</h2><ol>${items.map((ch,i)=>`<li><a href="${rel(ch.id)}"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><span>${escape(ch.title)}${ch.upcoming?` <span class="nav-status">${ui.upcoming}</span>`:''}</span></a>${ch.id==='preferences'?`<p>${ui.preferencesNote}</p>`:ch.id==='mermaid'?`<p>${ui.mermaidNote}</p>`:''}</li>`).join('')}</ol></section><section class="coverage-note"><h2>${ui.aboutSources}</h2><p>${ui.aboutSourcesText}</p></section>`;
 }else{
  title=current.title;description=ui.intro;
  const rendered=render(current.source,lang,ui),position=items.findIndex(ch=>ch.id===current.id);
  body=`<header class="chapter-header"><p class="chapter-position">${String(position+1).padStart(2,'0')} / ${items.length}</p><h1>${escape(title)}</h1><p class="chapter-availability">${current.upcoming?ui.upcoming:ui.released}</p></header>${current.upcoming?`<aside class="availability upcoming"><p>${ui.upcomingNotice}</p></aside>`:''}<details class="page-outline"><summary>${ui.onPage}</summary><nav><ul>${rendered.headings.map(h=>`<li><a href="#${h.id}">${escape(h.text)}</a></li>`).join('')}</ul></nav></details><article class="prose" data-chapter="${current.id}">${rendered.html}</article><nav class="chapter-pagination" aria-label="${ui.contents}">${position?`<a href="${rel(items[position-1].id)}"><span>${ui.previous}</span>${escape(items[position-1].labels[index])}</a>`:'<span></span>'}${position<items.length-1?`<a href="${rel(items[position+1].id)}"><span>${ui.next}</span>${escape(items[position+1].labels[index])}</a>`:''}</nav><p class="source-download"><a href="${prefix}content/${lang}/${current.file}">${ui.download}</a></p>`;
 }
 return `<!doctype html>\n<html lang="${lang}" data-variant="reference"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(description)}"><title>${escape(title)} | MarkItBetter</title><link rel="stylesheet" href="${prefix}assets/guide.css"><script src="${prefix}assets/site.js" defer></script></head><body>${header}<div class="site-layout"><aside class="chapter-rail"><p class="rail-title">${ui.guide}</p>${nav}</aside><main id="main"><noscript><p class="availability">${ui.noScript}</p></noscript><details class="mobile-contents"><summary>${ui.contents}</summary>${nav}</details>${body}<footer class="site-footer"><p>${ui.footer}</p><nav><a href="https://github.com/jedt3d/MarkItBetter-Documents">${ui.repo}</a><a href="${prefix}assets/licenses/NOTICE.txt">${ui.licences}</a></nav></footer></main></div></body></html>\n`;
}

for(const lang of data.locales){
 output(path.join(root,'reference',lang,'index.html'),page(lang,null,true));
 for(const chapter of all[lang])output(path.join(root,'reference',lang,chapter.id+'.html'),page(lang,chapter));
 const toc=`# MarkItBetter — ${data.ui[lang].contents}\n\n${data.ui[lang].availability}\n\n`+all[lang].map((ch,i)=>`${i+1}. [${ch.title}](../reference/${lang}/${ch.id}.html)${ch.upcoming?' — '+data.ui[lang].upcoming:''}`).join('\n')+'\n';
 output(path.join(root,'content',`TABLE-OF-CONTENTS.${lang}.md`),toc);
}
output(path.join(root,'index.html'),page('en',null,true,true));
function redirect(file,target,lang){output(path.join(root,file),`<!doctype html>\n<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><title>MarkItBetter</title><link rel="canonical" href="${target}"></head><body><a href="${target}">${data.ui[lang].home}</a></body></html>\n`);}
for(const lang of data.locales)redirect(`edition/${lang}/index.html`,`../../reference/${lang}/index.html`,lang);
redirect('style-comparison.html','reference/en/index.html','en');
console.log(`Built ${data.chapters.length} chapters × ${data.locales.length} languages, guide homes and legacy redirects.`);
