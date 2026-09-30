import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const siteRoot = resolve(fileURLToPath(new URL(".", import.meta.url)));
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};
const widths = [390, 1440];
const screenshotRoot = await mkdtemp(join(tmpdir(), "tribalscale-post-interview-qa-"));
const contexts = new Set();

let server;
let origin;
let browser;

function isInsideSite(filePath) {
  const sitePrefix = siteRoot.endsWith(sep) ? siteRoot : `${siteRoot}${sep}`;
  return filePath === siteRoot || filePath.startsWith(sitePrefix);
}

function startStaticServer() {
  server = createServer(async (request, response) => {
    try {
      const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
      const relativePath = requestPath === "/" ? "index.html" : decodeURIComponent(requestPath.slice(1));
      const filePath = resolve(siteRoot, relativePath);

      if (!isInsideSite(filePath)) {
        response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  return new Promise((resolveServer, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      origin = `http://127.0.0.1:${server.address().port}`;
      resolveServer();
    });
  });
}

async function openPage(width, reducedMotion = false) {
  const context = await browser.newContext({
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
    viewport: { width, height: 900 },
  });
  contexts.add(context);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`${origin}/`, { timeout: 10000, waitUntil: "networkidle" });
  return { context, page, consoleErrors, pageErrors };
}

async function assertAxeClean(page, label) {
  const results = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(results.violations, [], `${label} has axe violations`);
}

async function assertCommonPageChecks(page, width, consoleErrors, pageErrors) {
  assert.equal(await page.title(), "I design the system around the outcome. — Nikhil Khedkar");
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.getByRole("heading", { name: "Boardy" }).isVisible(), true);

  for (const project of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
    const heading = page.getByRole("heading", { name: project });
    assert.equal(await heading.count(), 1, `${width}px render is missing ${project}`);
    assert.equal(
      await heading.evaluate((element) => element.getBoundingClientRect().height > 0),
      true,
      `${width}px render has no layout box for ${project}`,
    );
  }

  const boardyText = await page.locator("#boardy").innerText();
  for (const text of [
    "Boardy itself",
    "Nik's work around Boardy",
    "BoardyAnimated",
    "Built around Boardy",
    "Experimental",
    "Proposed",
    "Symphony × Boardy",
    "no automated integration",
    "not a claim about Boardy’s own product",
  ]) {
    assert.match(boardyText, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${width}px Boardy copy is missing ${text}`);
  }

  const figmaImage = page.locator('img[src="assets/ryfine-figma-cover.png"]');
  assert.equal(await figmaImage.count(), 1, `${width}px render is missing the local Figma image`);
  assert.equal(
    await figmaImage.evaluate((image) => image.complete && image.naturalWidth > 0),
    true,
    `${width}px local Figma image did not load`,
  );

  const scrollMetrics = await page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  assert.equal(
    scrollMetrics.documentScrollWidth <= scrollMetrics.viewportWidth,
    true,
    `${width}px render overflows horizontally: ${JSON.stringify(scrollMetrics)}`,
  );
  assert.equal(
    scrollMetrics.bodyScrollWidth <= scrollMetrics.viewportWidth,
    true,
    `${width}px body overflows horizontally: ${JSON.stringify(scrollMetrics)}`,
  );

  assert.deepEqual(consoleErrors, [], `${width}px render emitted console errors`);
  assert.deepEqual(pageErrors, [], `${width}px render emitted page errors`);
  await assertAxeClean(page, `${width}px collapsed disclosures`);

  await page.locator("details.disclosure summary").evaluateAll((summaries) => {
    summaries.forEach((summary) => summary.click());
  });
  await assertAxeClean(page, `${width}px expanded disclosures`);
}

async function verifyStandardWidths() {
  for (const width of widths) {
    const { page, consoleErrors, pageErrors } = await openPage(width);
    await assertCommonPageChecks(page, width, consoleErrors, pageErrors);
    const capture = await openPage(width, true);
    await capture.page.waitForTimeout(100);
    await capture.page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    });
    if (width === 390) {
      await capture.page.screenshot({
        clip: { x: 0, y: 0, width: 390, height: 900 },
        path: join(screenshotRoot, `page-${width}.png`),
      });
    } else {
      await capture.page.screenshot({ fullPage: true, path: join(screenshotRoot, `page-${width}.png`) });
    }
    await capture.context.close();
    contexts.delete(capture.context);
  }
}

async function verifyReducedMotion() {
  for (const width of widths) {
    const { page } = await openPage(width, true);

    assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), true);
    assert.equal(
      await page.locator(".reveal").evaluateAll((elements) => elements.every((element) => {
        const style = getComputedStyle(element);
        return style.opacity === "1" && style.transform === "none";
      })),
      true,
      `${width}px reduced-motion render leaves reveal content visible`,
    );
    assert.equal(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
      "auto",
      `${width}px reduced-motion render keeps scrolling non-smooth`,
    );

    for (const project of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
      assert.equal(
        await page.getByRole("heading", { name: project }).evaluate((element) => {
          const box = element.getBoundingClientRect();
          const reveal = element.closest(".reveal");
          const revealStyle = reveal ? getComputedStyle(reveal) : null;
          return box.height > 0 && revealStyle?.opacity === "1" && revealStyle.transform === "none";
        }),
        true,
        `${width}px reduced-motion render is missing visible ${project}`,
      );
    }

    if (width === 390) {
      await page.screenshot({ fullPage: false, path: join(screenshotRoot, "page-390-reduced-motion.png") });
      await page.getByRole("link", { name: "Method" }).first().evaluate((link) => link.click());
      assert.equal(await page.evaluate(() => location.hash), "#method");
      assert.equal(await page.evaluate(() => document.activeElement?.id), "method");
    }
  }
}

async function closeServer() {
  if (!server) return;
  server.closeAllConnections?.();
  await new Promise((resolveServer) => {
    const timeout = setTimeout(resolveServer, 2000);
    server.close(() => {
      clearTimeout(timeout);
      resolveServer();
    });
  });
  assert.equal(server.listening, false, "static server did not close cleanly");
}

async function closeBrowser() {
  for (const context of contexts) await context.close();
  contexts.clear();
  assert.equal(contexts.size, 0, "browser contexts did not close cleanly");
  if (!browser) return;
  await browser.close();
  assert.equal(browser.isConnected(), false, "Playwright browser did not close cleanly");
}

try {
  await startStaticServer();
  browser = await chromium.launch({ headless: true });
  await verifyStandardWidths();
  await verifyReducedMotion();
  console.log("PASS: local static server, Playwright, axe, responsive, content, image, and reduced-motion checks");
  console.log(`Screenshots: ${screenshotRoot}`);
} finally {
  await closeBrowser();
  await closeServer();
}
