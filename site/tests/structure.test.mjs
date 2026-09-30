import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");
const css = await readFile(new URL("styles.css", siteRoot), "utf8");

test("the page exposes the six editorial regions", () => {
  for (const id of ["intro", "boardy", "method", "supporting-work", "evidence", "close"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
});

test("the page has one primary heading and the intended project story", () => {
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /<h2[^>]*>\s*Boardy\s*<\/h2>/i);
  for (const title of ["LTB Buddy", "RyFine", "Code2Motion", "EasyBuddy"]) {
    assert.match(html, new RegExp(title, "i"), `missing ${title}`);
  }
});

test("the semantic shell includes evidence and interaction hooks", () => {
  for (const hook of ["evidence-rail", "case-study", "status-mark", "source-link", "disclosure", "reveal"]) {
    assert.match(html, new RegExp(`class=["'][^"']*\\b${hook}\\b`), `missing .${hook}`);
  }
  assert.match(css, /prefers-reduced-motion/i);
});

test("RyFine keeps the local Figma artifact and exact source visible", () => {
  assert.match(html, /assets\/ryfine-figma-cover\.png/);
  assert.match(html, /Figma artifact/);
  assert.match(html, /datetime=["']2026-09-30["']/);
  assert.match(html, /https:\/\/www\.figma\.com\/design\/LSYLrYfT8MjcYO0vltJqP5/);
});
