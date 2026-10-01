import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm } from "node:fs/promises";
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
const widths = [320, 390, 768, 1440];
const supportingProjectSlugs = ["ltb-buddy", "ryfine", "code2motion", "easybuddy"];
const revealTimeoutMs = 3000;
const cleanupTimeoutMs = 2000;
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
      const decodedPath = decodeURIComponent(requestPath);
      const relativePath = decodedPath === "/"
        ? "index.html"
        : decodedPath.endsWith("/")
          ? `${decodedPath.slice(1)}index.html`
          : decodedPath.slice(1);
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
  await page.goto(`${origin}/product-design/`, { timeout: 10000, waitUntil: "networkidle" });
  return { context, page, consoleErrors, pageErrors };
}

async function assertAxeClean(page, label) {
  const results = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(results.violations, [], `${label} has axe violations`);
}

async function assertVisibleWithStyles(locator, label) {
  assert.equal(await locator.isVisible(), true, `${label} is not visible`);
  assert.equal(
    await locator.evaluate((element) => {
      const visibleElements = [element];
      const reveal = element.closest(".reveal");
      if (reveal && reveal !== element) visibleElements.push(reveal);
      return visibleElements.every((candidate) => {
        const style = getComputedStyle(candidate);
        return style.display !== "none" && style.visibility !== "hidden" && Number.parseFloat(style.opacity) > 0;
      });
    }),
    true,
    `${label} has hidden computed styles`,
  );
}

async function waitForSettledReveal(page, locator, label) {
  const projectSlug = await locator.getAttribute("data-project-slug");
  assert.ok(projectSlug, `${label} is missing its project slug`);
  await locator.scrollIntoViewIfNeeded();
  await page.waitForFunction(({ slug }) => {
    const caseStudy = [...document.querySelectorAll(".case-study")].find((element) => element.dataset.projectSlug === slug);
    const reveal = caseStudy?.closest(".reveal");
    if (!reveal) return false;
    const style = getComputedStyle(reveal);
    const transformSettled = style.transform === "none" || style.transform === "matrix(1, 0, 0, 1, 0, 0)";
    return style.display !== "none"
      && style.visibility !== "hidden"
      && Number.parseFloat(style.opacity) > 0
      && transformSettled;
  }, { slug: projectSlug }, { polling: "raf", timeout: revealTimeoutMs });
}

async function assertBoundsWithin(locator, ancestorSelector, label) {
  assert.equal(
    await locator.evaluate((element, selector) => {
      const inner = element.getBoundingClientRect();
      const ancestor = element.closest(selector)?.getBoundingClientRect();
      if (!ancestor) return false;
      const epsilon = 0.5;
      return inner.left >= ancestor.left - epsilon
        && inner.right <= ancestor.right + epsilon
        && inner.top >= ancestor.top - epsilon
        && inner.bottom <= ancestor.bottom + epsilon;
    }, ancestorSelector),
    true,
    `${label} is clipped by ${ancestorSelector}`,
  );
}

async function assertCommonPageChecks(page, width, consoleErrors, pageErrors) {
  assert.equal(await page.title(), "I design the system around the outcome. — Nikhil Khedkar");
  assert.equal(await page.locator("h1").count(), 1);
  const h1 = page.locator("h1");
  await assertVisibleWithStyles(h1, `${width}px h1`);
  await assertBoundsWithin(h1, ".page-content", `${width}px h1`);
  const contentWidth = await page.locator(".page-content").evaluate((element) => element.getBoundingClientRect().width);
  const expectedContentWidth = width === 1440 ? width - 112 : width;
  assert.ok(contentWidth >= expectedContentWidth - 1, `${width}px page-content is not meaningfully wide: ${contentWidth}px`);
  assert.ok(await h1.evaluate((element) => element.getBoundingClientRect().width > 0), `${width}px h1 has no layout width`);
  for (const project of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
    const heading = page.getByRole("heading", { name: project });
    assert.equal(await heading.count(), 1, `${width}px render is missing ${project}`);
    const article = heading.locator("xpath=ancestor::article");
    const copy = article.locator(".case-study-copy");
    await assertVisibleWithStyles(heading, `${width}px ${project} heading`);
    await assertBoundsWithin(heading, ".case-study", `${width}px ${project} heading`);
    await assertVisibleWithStyles(copy, `${width}px ${project} copy`);
    await assertBoundsWithin(copy, ".case-study", `${width}px ${project} copy`);
    assert.equal(
      await heading.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && box.height > 0;
      }),
      true,
      `${width}px render has no meaningful visible heading box for ${project}`,
    );
    assert.equal(
      await copy.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && element.textContent.trim().length > 0;
      }),
      true,
      `${width}px render has no meaningful visible project copy for ${project}`,
    );
  }

  const figmaImage = page.locator('img[src="assets/ryfine-figma-cover.png"]');
  assert.equal(await figmaImage.count(), 1, `${width}px render is missing the local Figma image`);
  assert.equal(
    await page.locator(".artifact-label").evaluate((element) => element.textContent.includes("Cover / RyFine Design System")),
    true,
    `${width}px render is missing the Figma frame name`,
  );
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
    const { page, consoleErrors, pageErrors } = await openPage(width, true);
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

async function verifyNormalMotionReveals() {
  for (const width of widths) {
    const { page } = await openPage(width);
    assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), false);

    for (const projectSlug of supportingProjectSlugs) {
      const caseStudy = page.locator(`[data-project-slug="${projectSlug}"]`);
      assert.equal(await caseStudy.count(), 1, `${width}px render is missing ${projectSlug}`);
      await waitForSettledReveal(page, caseStudy, `${width}px ${projectSlug}`);
      const heading = caseStudy.locator("h3");
      const copy = caseStudy.locator(".case-study-copy");
      await assertVisibleWithStyles(heading, `${width}px ${projectSlug} heading after scroll`);
      await assertVisibleWithStyles(copy, `${width}px ${projectSlug} copy after scroll`);
      await assertBoundsWithin(heading, ".case-study", `${width}px ${projectSlug} heading after scroll`);
      await assertBoundsWithin(copy, ".case-study", `${width}px ${projectSlug} copy after scroll`);
    }

    const scrollMetrics = await page.evaluate(() => ({
      bodyScrollWidth: document.body.scrollWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    assert.equal(scrollMetrics.documentScrollWidth <= scrollMetrics.viewportWidth, true, `${width}px normal-motion document overflows horizontally`);
    assert.equal(scrollMetrics.bodyScrollWidth <= scrollMetrics.viewportWidth, true, `${width}px normal-motion body overflows horizontally`);
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

async function boundedCleanup(operation, label) {
  let timeoutId;
  try {
    await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`${label} timed out`)), cleanupTimeoutMs);
      }),
    ]);
    return null;
  } catch (error) {
    return `${label}: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function closeBrowserResources() {
  const warnings = [];
  const pendingContexts = [...contexts];
  contexts.clear();
  warnings.push(...(await Promise.all(
    pendingContexts.map((context) => boundedCleanup(() => context.close(), "Playwright context.close")),
  )).filter(Boolean));

  const activeBrowser = browser;
  browser = null;
  if (activeBrowser) {
    const warning = await boundedCleanup(() => activeBrowser.close(), "Playwright browser.close");
    if (warning) warnings.push(warning);
  }
  return warnings;
}

async function closeServer() {
  if (!server) return [];
  const activeServer = server;
  server = null;
  activeServer.closeAllConnections?.();
  activeServer.closeIdleConnections?.();
  const warnings = [];
  const warning = await boundedCleanup(
    () => new Promise((resolveServer) => activeServer.close(resolveServer)),
    "static server.close",
  );
  if (warning) warnings.push(warning);
  if (activeServer.listening) warnings.push("static server.close: server is still listening");
  return warnings;
}

async function cleanup() {
  const warnings = [];
  try {
    warnings.push(...await closeBrowserResources());
  } catch (error) {
    warnings.push(`Playwright cleanup: ${error instanceof Error ? error.message : String(error)}`);
  }
  try {
    warnings.push(...await closeServer());
  } catch (error) {
    warnings.push(`static server cleanup: ${error instanceof Error ? error.message : String(error)}`);
  }
  try {
    const screenshotWarning = await boundedCleanup(
      () => rm(screenshotRoot, { recursive: true, force: true }),
      "temporary screenshot cleanup",
    );
    if (screenshotWarning) warnings.push(screenshotWarning);
  } catch (error) {
    warnings.push(`temporary screenshot cleanup: ${error instanceof Error ? error.message : String(error)}`);
  }
  return warnings;
}

let cleanupWarnings = [];
try {
  await startStaticServer();
  browser = await chromium.launch({ headless: true });
  await verifyStandardWidths();
  await verifyNormalMotionReveals();
  await verifyReducedMotion();
} finally {
  cleanupWarnings = await cleanup();
}

if (cleanupWarnings.length > 0) {
  throw new Error(`Verification cleanup failed: ${cleanupWarnings.join("; ")}`);
}

console.log("PASS: local static server, Playwright, axe, responsive, content, image, and reduced-motion checks");
console.log(`Temporary screenshots removed: ${screenshotRoot}`);
