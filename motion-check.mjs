import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const out={};
for(const mode of ['no-preference','reduce']){const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode});const p=await ctx.newPage();await p.goto('https://www.tribalscale.com/',{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(6000);out[mode]=await p.evaluate(()=>({media:matchMedia('(prefers-reduced-motion: reduce)').matches,animations:document.getAnimations().map(a=>({state:a.playState,duration:a.effect?.getComputedTiming?.().duration||null,target:a.effect?.target?.tagName||null})),animatedElements:[...document.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);return s.animationName!=='none'||s.transitionDuration!=='0s'}).slice(0,50).map(e=>({tag:e.tagName,animation:getComputedStyle(e).animationName,transition:getComputedStyle(e).transitionDuration}))}));await ctx.close()}
await fs.writeFile('motion-check.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));await browser.close();
