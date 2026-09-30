import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const evidence = path.join(root, 'evidence');
await fs.mkdir(evidence, { recursive: true });

const configs = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 1024, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

function visible(el) {
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
}

for (const cfg of configs) {
  const context = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto('https://www.tribalscale.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  try { await page.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}

  const axe = await new AxeBuilder({ page }).analyze();
  const snapshot = await page.locator('body').ariaSnapshot().catch(() => 'ARIA snapshot unavailable');
  const dom = await page.evaluate(() => {
    const visible = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
    };
    const visibleText = (el) => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 220);
    const cssPath = (el) => {
      if (!(el instanceof Element)) return '';
      const parts = [];
      while (el && el.nodeType === 1 && parts.length < 6) {
        let part = el.tagName.toLowerCase();
        if (el.id) part += `#${CSS.escape(el.id)}`;
        else if (el.classList.length) part += '.' + [...el.classList].slice(0, 2).map(CSS.escape).join('.');
        parts.unshift(part);
        el = el.parentElement;
      }
      return parts.join(' > ');
    };
    const focusables = [...document.querySelectorAll('a,button,input,select,textarea,[tabindex]')].filter(visible);
    const labeledInputs = [...document.querySelectorAll('input,select,textarea')].map(el => ({
      tag: el.tagName.toLowerCase(), type: el.type || null, id: el.id || null,
      ariaLabel: el.getAttribute('aria-label'), ariaLabelledby: el.getAttribute('aria-labelledby'),
      label: el.labels?.[0]?.innerText || null, placeholder: el.getAttribute('placeholder'),
      required: el.required, selector: cssPath(el)
    }));
    const images = [...document.images].map(el => ({src: el.currentSrc || el.src, alt: el.alt, role: el.getAttribute('role'), ariaHidden: el.getAttribute('aria-hidden'), visible: visible(el), selector: cssPath(el)}));
    const links = [...document.querySelectorAll('a')].filter(visible).map(el => ({name: visibleText(el), href: el.href, target: el.target || null, selector: cssPath(el)}));
    const buttons = [...document.querySelectorAll('button,[role="button"]')].filter(visible).map(el => ({name: visibleText(el), type: el.getAttribute('type'), expanded: el.getAttribute('aria-expanded'), controls: el.getAttribute('aria-controls'), selector: cssPath(el)}));
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map(el => ({level: el.tagName, text: visibleText(el), selector: cssPath(el)}));
    const landmarks = [...document.querySelectorAll('header,nav,main,aside,footer,[role]')].filter(visible).map(el => ({tag: el.tagName.toLowerCase(), role: el.getAttribute('role'), label: el.getAttribute('aria-label'), text: visibleText(el).slice(0, 100), selector: cssPath(el)}));
    const iframes = [...document.querySelectorAll('iframe')].map(el => ({title: el.title, src: el.src, ariaLabel: el.getAttribute('aria-label'), visible: visible(el), selector: cssPath(el)}));
    const svgs = [...document.querySelectorAll('svg')].map(el => ({role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label'), ariaHidden: el.getAttribute('aria-hidden'), focusable: el.getAttribute('focusable'), title: el.querySelector('title')?.textContent || null, visible: visible(el), selector: cssPath(el)}));
    const positiveTabindex = [...document.querySelectorAll('[tabindex]')].filter(el => Number(el.tabIndex) > 0).map(el => ({tabIndex: el.tabIndex, text: visibleText(el), selector: cssPath(el)}));
    const ariaHiddenFocusable = [...document.querySelectorAll('[aria-hidden="true"] a,[aria-hidden="true"] button,[aria-hidden="true"] input,[aria-hidden="true"] [tabindex]')].filter(visible).map(el => ({text: visibleText(el), tabIndex: el.tabIndex, selector: cssPath(el)}));
    const allText = document.body.innerText || '';
    return {
      url: location.href, title: document.title, lang: document.documentElement.lang || null,
      viewport: {width: innerWidth, height: innerHeight, dpr: devicePixelRatio, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, scrollHeight: document.documentElement.scrollHeight},
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      headings, landmarks, links, buttons, images, iframes, svgs, labeledInputs, positiveTabindex, ariaHiddenFocusable,
      counts: {focusables: focusables.length, links: links.length, buttons: buttons.length, images: images.length, iframes: iframes.length, svgs: svgs.length},
      textSample: allText.slice(0, 1000)
    };
  });

  const cdp = await context.newCDPSession(page);
  const axTree = await cdp.send('Accessibility.getFullAXTree');
  const focusTrace = [];
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.keyboard.press('Escape').catch(() => {});
  for (let i = 0; i < 140; i++) {
    await page.keyboard.press('Tab');
    const item = await page.evaluate(() => {
      const visible = (el) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
      };
      const el = document.activeElement;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), id: el.id || null, role: el.getAttribute('role'), name: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 180), href: el.href || null, tabIndex: el.tabIndex, visible: visible(el), rect: {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height)} };
    });
    focusTrace.push(item);
  }

  const animations = await page.evaluate(() => [...document.getAnimations()].map(a => ({playState: a.playState, currentTime: a.currentTime, duration: a.effect?.getComputedTiming?.().duration ?? null, target: a.effect?.target?.tagName || null})).slice(0, 80));
  const reducedContext = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('https://www.tribalscale.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await reducedPage.waitForTimeout(4000);
  const reducedMotion = await reducedPage.evaluate(() => ({matches: matchMedia('(prefers-reduced-motion: reduce)').matches, animations: document.getAnimations().length, styleSheets: [...document.styleSheets].length}));
  await reducedPage.close();

  await page.screenshot({ path: path.join(evidence, `${cfg.name}-viewport.png`), fullPage: false });
  await page.screenshot({ path: path.join(evidence, `${cfg.name}-fullpage.png`), fullPage: true });
  await fs.writeFile(path.join(evidence, `${cfg.name}-aria-snapshot.txt`), snapshot, 'utf8');
  await fs.writeFile(path.join(evidence, `${cfg.name}-ax-tree.json`), JSON.stringify(axTree, null, 2), 'utf8');
  await fs.writeFile(path.join(evidence, `${cfg.name}-dom.json`), JSON.stringify(dom, null, 2), 'utf8');
  await fs.writeFile(path.join(evidence, `${cfg.name}-keyboard-focus.json`), JSON.stringify(focusTrace, null, 2), 'utf8');

  results.push({
    config: cfg, url: page.url(), title: await page.title(), axe, dom, axNodeCount: axTree.nodes?.length || 0,
    keyboardFocus: focusTrace, animations, reducedMotion,
    timestamp: new Date().toISOString()
  });
  await fs.writeFile(path.join(root, 'raw-results.json'), JSON.stringify(results, null, 2), 'utf8');
  await page.close();
  await context.close();
}

console.log(JSON.stringify(results.map(r => ({viewport: r.config, title: r.title, axeViolations: r.axe.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.length, help:v.help})), horizontalOverflow:r.dom.horizontalOverflow, focusables:r.dom.counts.focusables, headings:r.dom.headings.length, iframes:r.dom.counts.iframes, animations:r.animations.length, reducedMotion:r.reducedMotion})), null, 2));
await browser.close();
