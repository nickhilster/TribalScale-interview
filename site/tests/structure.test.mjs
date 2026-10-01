import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../product-design/", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");
const css = await readFile(new URL("styles.css", siteRoot), "utf8");
const manifest = await readFile(new URL("content.js", siteRoot), "utf8");
const app = await readFile(new URL("app.js", siteRoot), "utf8");

test("the page exposes the five product/design editorial regions", () => {
  for (const id of ["intro", "method", "supporting-work", "evidence", "close"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
  assert.doesNotMatch(html, /id=["']boardy["']/i);
});

test("the page has one primary heading and the intended project story", () => {
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.doesNotMatch(html, /<h2[^>]*>\s*Boardy\s*<\/h2>/i);
  for (const title of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
    assert.match(manifest, new RegExp(title, "i"), `missing ${title} from manifest`);
  }
});

test("the semantic shell includes evidence and interaction hooks", () => {
  for (const hook of ["evidence-rail", "reveal", "project-mount"]) {
    assert.match(html, new RegExp(`class=["'][^"']*\\b${hook}\\b`), `missing .${hook}`);
  }
  for (const hook of ["case-study", "status-mark", "source-link"]) {
    assert.match(app, new RegExp(`class=["'][^"']*\\b${hook}\\b`), `missing .${hook}`);
  }
  assert.match(css, /prefers-reduced-motion/i);
});

test("the visible project rows have a manifest-backed render mount", () => {
  assert.match(html, /data-project-mount/);
  assert.doesNotMatch(html, /data-boardy-/);
  assert.match(app, /import ["']\.\/content\.js["']/);
  assert.match(app, /globalThis\.TribalScaleContent/);
  assert.match(app, /pageContent/);
  assert.match(app, /projectEvidence/);
  assert.match(app, /project\.indexLabel/);
  assert.match(app, /projectMount\.innerHTML/);
  assert.match(manifest, /const pageContent\s*=/);
  assert.match(manifest, /const projectEvidence\s*=/);
});

test("the skip link targets the actual keyboard-focusable main element", () => {
  assert.match(html, /href=["']#main-content["']/);
  assert.match(html, /<main[^>]*id=["']main-content["'][^>]*tabindex=["']-1["']/i);
  assert.doesNotMatch(html, /<div[^>]*id=["']main-content["']/i);
});

test("mobile keeps compact section navigation visible", () => {
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.top-nav\s*\{[^}]*display:\s*flex;/i);
  assert.doesNotMatch(
    css,
    /@media \(max-width: 820px\)[\s\S]*?\.top-nav\s*\{[^}]*display:\s*none;/i,
  );
});

test("RyFine keeps the local Figma artifact and exact source visible", () => {
  assert.match(manifest, /assets\/ryfine-figma-cover\.png/);
  assert.match(app, /project\.media\.src/);
  assert.match(app, /project\.figma\.localAsset/);
  assert.match(app, /renderMedia\s*=|renderMedia\s*\(/);
  assert.match(manifest, /label:\s*"Figma artifact"/);
  assert.match(manifest, /inspectedOn:\s*"2026-09-30"/);
  assert.match(manifest, /https:\/\/www\.figma\.com\/design\/LSYLrYfT8MjcYO0vltJqP5/);
});

test("the renderer fails loudly on missing records and validates Figma alignment", () => {
  assert.match(app, /throw new Error\([^)]+missing/i);
  assert.doesNotMatch(app, /\.filter\(Boolean\)/);
  assert.match(app, /project\.media\.src\s*!==\s*project\.figma\.localAsset/);
  assert.match(app, /link\.href\s*!==\s*project\.figma\.sourceUrl/);
});
