document.documentElement.classList.add('js');

for (const group of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panels = [...group.querySelectorAll('[role="tabpanel"]')];
  function activate(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i));
    tab.addEventListener('keydown', event => {
      let next = i;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); activate(next); tabs[next].focus();
    });
  });
  activate(0);
}
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const code = button.closest('[data-code]').querySelector('pre code').textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = button.dataset.copied;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(button.closest('[data-code]').querySelector('pre code'));
      const selection = window.getSelection();selection.removeAllRanges();selection.addRange(range);
      button.textContent = button.dataset.error;
    }
    window.setTimeout(() => {button.textContent = button.dataset.label;}, 2200);
  });
}
for (const anchor of document.querySelectorAll('.chapter-rail a[href^="#chapter-"]')) {
  anchor.addEventListener('click', () => {
    const detail = document.querySelector(anchor.getAttribute('href')+' details');
    if (detail) detail.open = true;
  });
}
for (const example of document.querySelectorAll('[data-diagram]')) {
  const viewport = example.querySelector('.diagram-viewport');
  const scene = example.querySelector('.diagram-scene');
  const svg = scene.querySelector('svg');
  if (!svg) continue;
  const maxButton = example.querySelector('[data-maximize]');
  let scale = 1, x = 0, y = 0, pointer = null, previousFocus = null, savedScroll = 0;
  const paint = () => {scene.style.transform = `translate(${x}px,${y}px) scale(${scale})`;};
  const fit = () => {
    const rect = viewport.getBoundingClientRect();
    const box = svg.viewBox.baseVal;
    scene.style.width = box.width+'px';scene.style.height=box.height+'px';
    svg.style.width=box.width+'px';svg.style.height=box.height+'px';
    scale = Math.min((rect.width-48)/box.width,(rect.height-48)/box.height);
    x=(rect.width-box.width*scale)/2;y=(rect.height-box.height*scale)/2;paint();
    viewport.dataset.fit = 'true';
  };
  const zoom = factor => {
    const rect=viewport.getBoundingClientRect(),cx=rect.width/2,cy=rect.height/2;
    const next=Math.max(.15,Math.min(6,scale*factor));
    x=cx-(cx-x)*next/scale;y=cy-(cy-y)*next/scale;scale=next;paint();viewport.dataset.fit='false';
  };
  const restore = () => {
    example.classList.remove('is-maximized');maxButton.setAttribute('aria-expanded','false');
    maxButton.setAttribute('aria-label',maxButton.dataset.openLabel);
    const saved=example._outside || [];
    for(const [element,wasInert] of saved) element.inert=wasInert;
    example._outside=[];document.body.style.removeProperty('overflow-y');
    window.scrollTo(0,savedScroll);requestAnimationFrame(fit);(previousFocus || maxButton).focus({preventScroll:true});
  };
  example.querySelector('[data-fit]').addEventListener('click',fit);
  example.querySelector('[data-zoom="in"]').addEventListener('click',()=>zoom(1.2));
  example.querySelector('[data-zoom="out"]').addEventListener('click',()=>zoom(1/1.2));
  viewport.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;pointer={id:event.pointerId,x:event.clientX,y:event.clientY};
    viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');viewport.focus({preventScroll:true});
  });
  viewport.addEventListener('pointermove',event=>{
    if(!pointer || pointer.id!==event.pointerId)return;
    x+=event.clientX-pointer.x;y+=event.clientY-pointer.y;pointer.x=event.clientX;pointer.y=event.clientY;paint();viewport.dataset.fit='false';
  });
  const stop=()=>{pointer=null;viewport.classList.remove('is-dragging');};
  viewport.addEventListener('pointerup',stop);viewport.addEventListener('pointercancel',stop);
  viewport.addEventListener('keydown',event=>{
    if(event.key==='+'||event.key==='='){event.preventDefault();zoom(1.2);}
    else if(event.key==='-'){event.preventDefault();zoom(1/1.2);}
    else if(event.key==='0'){event.preventDefault();fit();}
    else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      event.preventDefault();x+=event.key==='ArrowLeft'?24:event.key==='ArrowRight'?-24:0;y+=event.key==='ArrowUp'?24:event.key==='ArrowDown'?-24:0;paint();viewport.dataset.fit='false';
    }
  });
  maxButton.addEventListener('click',()=>{
    if(example.classList.contains('is-maximized')){restore();return;}
    previousFocus=document.activeElement;savedScroll=window.scrollY;example.classList.add('is-maximized');
    maxButton.setAttribute('aria-expanded','true');maxButton.setAttribute('aria-label',maxButton.dataset.closeLabel);
    const outside=[];let node=example;
    while(node.parentElement && node.parentElement!==document.documentElement){
      for(const sibling of node.parentElement.children)if(sibling!==node){outside.push([sibling,sibling.inert]);sibling.inert=true;}
      node=node.parentElement;
    }
    example._outside=outside;document.body.style.overflowY='clip';requestAnimationFrame(fit);maxButton.focus();
  });
  example.addEventListener('keydown',event=>{
    if(!example.classList.contains('is-maximized'))return;
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();restore();}
    if(event.key==='Tab'){
      const items=[...example.querySelectorAll('button,summary,[tabindex="0"]')].filter(e=>e.checkVisibility({checkVisibilityCSS:true}));
      const first=items[0],last=items.at(-1);
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  new ResizeObserver(fit).observe(viewport);
  document.fonts.ready.then(fit);requestAnimationFrame(fit);
}
