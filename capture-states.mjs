import { chromium } from 'playwright';
import path from 'node:path';
const root = process.cwd();
const evidence = path.join(root, 'evidence');
const browser = await chromium.launch({headless:true});
for (const [name,width,height] of [['desktop',1440,1000],['tablet',1024,900],['mobile',390,844]]) {
  const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page = await context.newPage();
  await page.goto('https://www.tribalscale.com/',{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForTimeout(7000);
  await page.screenshot({path:path.join(evidence,`${name}-initial-viewport.png`),fullPage:false});
  await page.evaluate(()=>window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({path:path.join(evidence,`${name}-footer-viewport.png`),fullPage:false});
  await context.close();
}
await browser.close();
