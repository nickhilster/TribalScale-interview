import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const siteRoot = resolve(fileURLToPath(new URL(".", import.meta.url)));
const widths = [320, 390, 768, 1440];
const routes = [
  { path: "/", label: "landing", heading: "Product design, systems, and agency." },
  { path: "/product-design/", label: "Product & Design", heading: "I design the system around the outcome." },
  { path: "/media-pipeline/", label: "Media Pipeline", heading: "Why make artifacts when you can design the pipeline that makes them?" },
  { path: "/boardy/", label: "Boardy", heading: "I did not just use Boardy." },
  { path: "/storyteller/heather-page/", label: "StoryTeller / Heather", heading: "Heather Page" },
  { path: "/storyteller/sheetal-jaitly/", label: "StoryTeller / Sheetal", heading: "Sheetal Jaitly" },
  { path: "/storyteller/haseeb-danyal/", label: "StoryTeller / Haseeb", heading: "Haseeb Danyal" },
];
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".wav": "audio/wav",
};

let server;
let browser;
let origin;

function isInsideSite(filePath) {
  const prefix = siteRoot.endsWith(sep) ? siteRoot : `${siteRoot}${sep}`;
  return filePath === siteRoot || filePath.startsWith(prefix);
}

function startServer() {
  server = createServer(async (request, response) => {
    try {
      const requestPath = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname);
      const relativePath = requestPath === "/"
        ? "index.html"
        : requestPath.endsWith("/")
          ? `${requestPath.slice(1)}index.html`
          : requestPath.slice(1);
      const filePath = resolve(siteRoot, relativePath);
      if (!isInsideSite(filePath)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }
      const body = await readFile(filePath);
      response.writeHead(200, { "content-type": mimeTypes[extname(filePath)] ?? "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  return new Promise((resolveServer) => {
    server.listen(0, "127.0.0.1", () => {
      origin = `http://127.0.0.1:${server.address().port}`;
      resolveServer();
    });
  });
}

async function assertNoAxe(page, label) {
  const result = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(result.violations, [], `${label} has axe violations`);
}

await startServer();
browser = await chromium.launch({ headless: true });

try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(`${origin}/`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(300);
    assert.equal(await page.getByRole("heading", { name: routes[0].heading }).count(), 1, `${width}px landing heading`);
    assert.equal(await page.locator(".route-card").count(), 4, `${width}px route count`);
    assert.equal(await page.locator("a[href^='http']").count() > 0, true, `${width}px landing external home link`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px landing horizontal overflow`);
    await assertNoAxe(page, `${width}px landing`);
    assert.deepEqual(consoleErrors, [], `${width}px landing console errors`);
    assert.deepEqual(pageErrors, [], `${width}px landing page errors`);
    await context.close();
  }

  for (const route of routes.slice(1)) {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const response = await page.goto(`${origin}${route.path}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(500);
    assert.equal(response?.status(), 200, `${route.label} route response`);
    const routeText = (await page.locator("body").innerText()).replaceAll("\u00a0", " ");
    assert.ok(routeText.includes(route.heading), `${route.label} heading`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${route.label} horizontal overflow`);
    const back = page.locator('a[aria-label*="showcase" i]');
    assert.equal(await back.count(), 1, `${route.label} back link`);
    const backUrl = new URL(await back.getAttribute("href"), page.url());
    assert.equal(backUrl.pathname, "/", `${route.label} back target`);
    await assertNoAxe(page, route.label);
    assert.deepEqual(consoleErrors, [], `${route.label} console errors`);
    assert.deepEqual(pageErrors, [], `${route.label} page errors`);
    await context.close();
  }

  console.log(`Showcase verified: ${routes.length} entry routes at ${widths.join(", ")}px landing widths`);
} finally {
  await browser.close();
  server.closeAllConnections?.();
  await new Promise((resolveServer) => server.close(resolveServer));
}
