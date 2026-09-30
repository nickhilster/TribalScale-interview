import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { evidenceStates, pageContent, projectEvidence } = require("../product-design/content.js");

const pageCopy = JSON.stringify({ evidenceStates, pageContent, projectEvidence });
const approvedSupportingProjectLinks = new Set([
  "https://ltbbuddy.ca/",
  "https://ryfine.app/",
  "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5",
  "https://code2motion.app/feed",
  "https://www.teambotics.app/products/easybuddy",
]);

test("manifest contains the five ordered projects", () => {
  assert.deepEqual(
    projectEvidence.map((project) => project.slug),
    ["boardy", "ltb-buddy", "ryfine", "code2motion", "easybuddy"],
  );
});

test("all rendered supporting project links use the approved verified URL set", () => {
  const renderedLinks = pageContent.projects.flatMap((project) => project.links.map((link) => link.href));

  assert.deepEqual(renderedLinks, [
    "https://ltbbuddy.ca/",
    "https://ryfine.app/",
    "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5",
    "https://code2motion.app/feed",
    "https://www.teambotics.app/products/easybuddy",
  ]);
  for (const href of renderedLinks) {
    assert.equal(approvedSupportingProjectLinks.has(href), true, `unapproved supporting project link: ${href}`);
  }
});

test("Boardy links remain unchanged while affected project evidence stays local/repo-backed", () => {
  assert.deepEqual(pageContent.boardy.links, [
    { label: "Boardy product", href: "https://boardy.ai" },
    { label: "BoardyAnimated", href: "https://github.com/nickhilster/BoardyAnimated" },
    { label: "Boardy4Age", href: "https://github.com/nickhilster/boardy4age" },
    { label: "Symphony × Boardy", href: "https://github.com/nickhilster/symphony-x-boardy" },
  ]);

  assert.doesNotMatch(JSON.stringify(pageContent.projects), /github\.com/i);
  for (const project of pageContent.projects) {
    for (const evidence of project.evidence.filter((entry) => entry.kind === "Repo-backed")) {
      assert.match(evidence.detail, /local\/repo-backed inspection/i, `${project.slug} evidence is missing local/repo-backed labeling`);
      assert.equal("source" in evidence, false, `${project.slug} evidence must not publish a repository URL`);
    }
  }
});

test("every project has authored role, summary, status, and evidence", () => {
  for (const project of projectEvidence) {
    assert.equal(typeof project.title, "string", `${project.slug} has a title`);
    assert.ok(project.indexLabel.trim(), `${project.slug} has a compact index label`);
    assert.ok(project.role.trim(), `${project.slug} has a role`);
    assert.ok(project.summary.trim(), `${project.slug} has a summary`);
    assert.ok(project.status.length > 0, `${project.slug} has status labels`);
    assert.ok(project.evidence.length > 0, `${project.slug} has evidence entries`);

    for (const evidence of project.evidence) {
      assert.ok(evidence.label.trim(), `${project.slug} evidence has a label`);
      assert.ok(evidence.kind.trim(), `${project.slug} evidence has a provenance kind`);
      assert.ok(Array.isArray(evidence.state), `${project.slug} evidence state is atomic array`);
      assert.ok(evidence.state.length > 0, `${project.slug} evidence has a state`);
      for (const state of evidence.state) {
        assert.ok(
          evidenceStates.some((knownState) => knownState.name === state),
          `${project.slug} evidence state ${state} is an approved atomic state`,
        );
      }
      assert.ok(evidence.detail.trim(), `${project.slug} evidence has detail`);
    }

    assert.ok("media" in project, `${project.slug} has a stable media field`);
    if (project.media) {
      assert.equal(typeof project.media.src, "string", `${project.slug} media has a stable source`);
      assert.ok(project.media.src.length > 0, `${project.slug} media source is non-empty`);
      assert.ok(Array.isArray(project.media.state), `${project.slug} media state is atomic array`);
      for (const state of project.media.state) {
        assert.ok(
          evidenceStates.some((knownState) => knownState.name === state),
          `${project.slug} media state ${state} is approved`,
        );
      }
    }
  }
});

test("copy does not invent an interview outcome", () => {
  for (const phrase of [/heather loved/i, /went well/i, /\boffer\b/i, /\brejection\b/i]) {
    assert.equal(phrase.test(pageCopy), false, `copy must not contain ${phrase}`);
  }
});

test("Boardy keeps the product, surrounding work, and presentation layer distinct", () => {
  const { boardy } = pageContent;
  const boundaryLabels = boardy.boundaries.map((boundary) => boundary.label);

  assert.deepEqual(boundaryLabels, [
    "Boardy itself",
    "Nik's work around Boardy",
    "BoardyAnimated",
  ]);
  assert.match(boardy.boundaries[2].text, /presentation and interaction layer/i);
  assert.match(boardy.boundaries[2].text, /not a claim about Boardy/i);
  assert.equal(boardy.symphonyBoundary.status, "Proposed");
  assert.deepEqual(boardy.status, ["Built around Boardy", "Experimental", "Proposed"]);
  assert.equal(boardy.media, null);
  assert.match(boardy.symphonyBoundary.text, /no automated integration/i);
  assert.match(boardy.emailNote.attribution, /not a neutral customer reference/i);
});

test("RyFine exposes the verified Figma artifact without promoting it to shipped proof", () => {
  const ryfine = projectEvidence.find((project) => project.slug === "ryfine");

  assert.deepEqual(ryfine.figma, {
    sourceUrl: "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5",
    nodeId: "2:6",
    frameName: "Cover / RyFine Design System",
    inspectedOn: "2026-09-30",
    localAsset: "assets/ryfine-figma-cover.png",
    label: "Figma artifact",
    caption: "Figma design-system draft — inspected September 30, 2026",
    state: ["Documented"],
  });

  assert.deepEqual(ryfine.media.state, ["Documented", "Verified"]);
  assert.equal(existsSync(new URL("../product-design/assets/ryfine-figma-cover.png", import.meta.url)), true);
  assert.match(ryfine.summary, /not proof that every principle or screen is shipped/i);
  assert.ok(ryfine.evidence.some((entry) => entry.label === "Figma cover / node 2:6"));
  assert.ok(ryfine.links.some((link) => link.label === "Inspect in Figma"));
});

test("the unidentified Node artifact is not represented", () => {
  assert.equal(projectEvidence.some((project) => /node artifact/i.test(JSON.stringify(project))), false);
  assert.equal(projectEvidence.length, 5);
});

test("EasyBuddy external listing is documented context, not app observability", () => {
  const easybuddy = projectEvidence.find((project) => project.slug === "easybuddy");
  const listing = easybuddy.evidence.find((entry) => entry.label === "Product surface");

  assert.equal(listing.kind, "External listing");
  assert.deepEqual(listing.state, ["Documented"]);
  assert.doesNotMatch(JSON.stringify(listing.state), /Observable|Verified/);
});

test("evidence legend contains the approved provenance states", () => {
  assert.deepEqual(
    evidenceStates.map((state) => state.name),
    ["Built", "Observable", "Documented", "Experimental", "Proposed", "Verified"],
  );
});
