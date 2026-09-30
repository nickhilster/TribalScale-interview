import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test, before, after, afterEach } from "node:test";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const responsiveWidths = [320, 390, 768, 1440];
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

let server;
let origin;
let browser;
const contexts = new Set();

before(async () => {
  server = createServer(async (request, response) => {
    const requestPath = new URL(request.url, "http://localhost").pathname;
    const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
    const filePath = resolve(siteRoot, relativePath);

    if (!filePath.startsWith(siteRoot)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolveServer) => server.listen(0, "127.0.0.1", resolveServer));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
  server?.closeAllConnections?.();
  await Promise.race([
    new Promise((resolveServer) => server?.close(resolveServer)),
    new Promise((resolveServer) => setTimeout(resolveServer, 2000)),
  ]);
});

afterEach(async () => {
  await Promise.all([...contexts].map((context) => context.close()));
  contexts.clear();
});

async function openPage(viewport, reducedMotion = false) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  contexts.add(context);
  const page = await context.newPage();
  await page.goto(`${origin}/`, { waitUntil: "networkidle", timeout: 10000 });
  return { context, page };
}

async function assertNoAxeViolations(page, label) {
  const axeResults = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(axeResults.violations, [], `${label} has axe violations`);
}

test("renders manifest-backed projects and verified Figma evidence at every responsive target width", { concurrency: false, timeout: 30000 }, async () => {
  for (const width of responsiveWidths) {
    const { page } = await openPage({ width, height: 900 });

    assert.equal(await page.locator(".case-study").count(), 4);
    for (const project of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
      assert.ok((await page.getByRole("heading", { name: project }).count()) > 0, `missing ${project}`);
    }
    for (const status of ["Built", "Documented", "Observable", "Experimental", "Verified"]) {
      assert.ok((await page.getByText(status, { exact: true }).count()) > 0, `missing ${status}`);
    }
    assert.equal(await page.locator('a[href="https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5"]').count(), 1);
    assert.equal(await page.locator('img[src="assets/ryfine-figma-cover.png"]').evaluate((image) => image.complete && image.naturalWidth > 0), true);
    assert.equal(await page.locator(".artifact-label").evaluate((element) => element.textContent.includes("Cover / RyFine Design System")), true);
    const layoutMetrics = await page.evaluate(() => {
      const content = document.querySelector(".page-content")?.getBoundingClientRect();
      const heading = document.querySelector("h1")?.getBoundingClientRect();
      const projects = [...document.querySelectorAll(".case-study")].map((project) => {
        const projectHeading = project.querySelector("h3");
        const projectCopy = project.querySelector(".case-study-copy");
        const headingBox = projectHeading?.getBoundingClientRect();
        const copyBox = projectCopy?.getBoundingClientRect();
        return {
          headingWidth: headingBox?.width ?? 0,
          headingHeight: headingBox?.height ?? 0,
          copyWidth: copyBox?.width ?? 0,
          copyHeight: copyBox?.height ?? 0,
          copyText: projectCopy?.textContent?.trim() ?? "",
        };
      });
      return {
        contentWidth: content?.width ?? 0,
        h1Width: heading?.width ?? 0,
        projects,
        bodyScrollWidth: document.body.scrollWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });
    const expectedContentWidth = width === 1440 ? width - 112 : width;
    assert.ok(
      layoutMetrics.contentWidth >= expectedContentWidth - 1,
      `${width}px page-content is not meaningfully wide: ${JSON.stringify(layoutMetrics)}`,
    );
    assert.ok(layoutMetrics.h1Width > 0, `${width}px h1 has no layout width`);
    for (const project of layoutMetrics.projects) {
      assert.ok(project.headingWidth > 0 && project.headingHeight > 0, `${width}px project heading is not visible`);
      assert.ok(project.copyWidth > 0 && project.copyHeight > 0 && project.copyText.length > 0, `${width}px project copy is not visible`);
    }
    assert.match(await page.locator("#boardy").innerText(), /A note from Boardy|Boardy Boardman/i);
    assert.match(await page.locator("#boardy").innerText(), /not a claim about Boardy.?s own product/i);
    assert.match(await page.locator("#boardy").innerText(), /Symphony.*Boardy.*no automated integration/i);
    assert.equal(layoutMetrics.documentScrollWidth <= layoutMetrics.viewportWidth, true, `${width}px document overflows horizontally`);
    assert.equal(layoutMetrics.bodyScrollWidth <= layoutMetrics.viewportWidth, true, `${width}px body overflows horizontally`);

    await assertNoAxeViolations(page, `${width}px collapsed disclosures`);
    await page.locator("details.disclosure summary").evaluateAll((summaries) => {
      summaries.forEach((summary) => summary.click());
    });
    await assertNoAxeViolations(page, `${width}px expanded disclosures`);
  }
});

test("supports skip-link focus, anchor navigation, disclosures, and keyboard-focusable controls", { concurrency: false, timeout: 20000 }, async () => {
  const { page } = await openPage({ width: 390, height: 900 });
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.getByRole("link", { name: "Skip to content" }).press("Enter");
  assert.equal(await page.evaluate(() => location.hash), "#main-content");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "main-content");

  await page.getByRole("link", { name: "Selected work" }).evaluate((link) => link.click());
  assert.equal(await page.evaluate(() => location.hash), "#supporting-work");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "supporting-work");

  const boardyDisclosure = page.locator("#boardy details.disclosure");
  const boardySummary = boardyDisclosure.locator("summary");
  const boardyPanelId = await boardySummary.getAttribute("aria-controls");
  assert.ok(boardyPanelId);
  assert.equal(await boardySummary.getAttribute("aria-expanded"), "false");
  await boardySummary.evaluate((element) => element.click());
  assert.equal(await boardySummary.getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator(`#${boardyPanelId}`).isVisible(), true);
  await boardySummary.evaluate((element) => element.click());
  assert.equal(await boardySummary.getAttribute("aria-expanded"), "false");

  const disclosure = page.locator(".case-study-ltb-buddy details.disclosure");
  const summary = disclosure.locator("summary");
  const panelId = await summary.getAttribute("aria-controls");
  assert.ok(panelId);
  assert.equal(await summary.getAttribute("aria-expanded"), "false");
  assert.equal(await disclosure.getAttribute("open"), null);
  await disclosure.scrollIntoViewIfNeeded();
  await summary.focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => {
    const details = document.querySelector(".case-study-ltb-buddy details");
    return details?.open === true && details.querySelector("summary")?.getAttribute("aria-expanded") === "true";
  }, null, { timeout: 2000 });
  assert.equal(await summary.getAttribute("aria-expanded"), "true");
  assert.equal(await disclosure.getAttribute("open"), "");
  await summary.focus();
  await page.keyboard.press("Space");
  await page.waitForFunction(() => {
    const details = document.querySelector(".case-study-ltb-buddy details");
    return details?.open === false && details.querySelector("summary")?.getAttribute("aria-expanded") === "false";
  }, null, { timeout: 2000 });
  assert.equal(await summary.getAttribute("aria-expanded"), "false");
  assert.equal(await disclosure.getAttribute("open"), null);
  await summary.focus();
  await page.keyboard.press("Space");
  await page.waitForFunction(() => {
    const details = document.querySelector(".case-study-ltb-buddy details");
    return details?.open === true && details.querySelector("summary")?.getAttribute("aria-expanded") === "true";
  }, null, { timeout: 2000 });
  assert.equal(await summary.getAttribute("aria-expanded"), "true");
  await summary.focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => {
    const details = document.querySelector(".case-study-ltb-buddy details");
    return details?.open === false && details.querySelector("summary")?.getAttribute("aria-expanded") === "false";
  }, null, { timeout: 2000 });
  assert.equal(await summary.getAttribute("aria-expanded"), "false");

  const focusableCount = await page.locator("a[href], summary").evaluateAll((controls) =>
    controls.filter((control) => {
      const element = control;
      return !element.hasAttribute("disabled") && element.getAttribute("tabindex") !== "-1";
    }).length,
  );
  assert.ok(focusableCount >= 12, `expected keyboard-usable navigation, sources, and disclosures; got ${focusableCount}`);
});

test("leaves reveal content visible and scrolling non-smooth when reduced motion is requested", { concurrency: false, timeout: 20000 }, async () => {
  const { page } = await openPage({ width: 390, height: 900 }, true);

  assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), true);
  assert.equal(await page.locator(".reveal").evaluateAll((elements) => elements.every((element) => {
    const style = getComputedStyle(element);
    return style.opacity === "1" && style.transform === "none";
  })), true);
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");

  await page.getByRole("link", { name: "Method" }).first().evaluate((link) => link.click());
  assert.equal(await page.evaluate(() => location.hash), "#method");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "method");
});
