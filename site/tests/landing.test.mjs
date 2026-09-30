import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");

const routes = [
  ["product-design/", "Product &amp; Design"],
  ["media-pipeline/", "Media Pipeline"],
  ["boardy/", "Boardy"],
  ["storyteller/heather-page/", "StoryTeller"],
];

test("landing page presents one thesis and four distinct routes", () => {
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /Product design, systems, and agency\./);
  assert.match(html, /Product design, AI systems, and production thinking are increasingly converging\./);
  assert.match(html, /Design the surface\. Build the system\. Keep the evidence visible\./);
  for (const [href, title] of routes) {
    assert.match(html, new RegExp(`href=["']${href.replaceAll("/", "\\/")}["']`), `missing route ${href}`);
    assert.match(html, new RegExp(title, "i"), `missing route title ${title}`);
  }
  assert.doesNotMatch(html, /Four ways I apply the same thinking\./);
});

test("landing keeps the three named StoryTeller routes discoverable", () => {
  for (const href of ["storyteller/heather-page/", "storyteller/sheetal-jaitly/", "storyteller/haseeb-danyal/"]) {
    assert.match(html, new RegExp(`href=["']${href.replaceAll("/", "\\/")}["']`));
  }
});

test("all showcase route entry files exist", async () => {
  const paths = [
    "product-design/index.html",
    "media-pipeline/index.html",
    "boardy/index.html",
    "storyteller/heather-page/index.html",
    "storyteller/sheetal-jaitly/index.html",
    "storyteller/haseeb-danyal/index.html",
  ];
  for (const path of paths) {
    await assert.doesNotReject(access(new URL(path, siteRoot)), path);
  }
});
