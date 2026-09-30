import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { evidenceStates, pageContent, projectEvidence } = require("../content.js");

const pageCopy = JSON.stringify({ evidenceStates, pageContent, projectEvidence });

test("manifest contains the five ordered projects", () => {
  assert.deepEqual(
    projectEvidence.map((project) => project.slug),
    ["boardy", "ltb-buddy", "ryfine", "code2motion", "easybuddy"],
  );
});

test("every project has authored role, summary, status, and evidence", () => {
  for (const project of projectEvidence) {
    assert.equal(typeof project.title, "string", `${project.slug} has a title`);
    assert.ok(project.role.trim(), `${project.slug} has a role`);
    assert.ok(project.summary.trim(), `${project.slug} has a summary`);
    assert.ok(project.status.length > 0, `${project.slug} has status labels`);
    assert.ok(project.evidence.length > 0, `${project.slug} has evidence entries`);

    for (const evidence of project.evidence) {
      assert.ok(evidence.label.trim(), `${project.slug} evidence has a label`);
      assert.ok(evidence.kind.trim(), `${project.slug} evidence has a provenance kind`);
      assert.ok(evidence.state.trim(), `${project.slug} evidence has a state`);
      assert.ok(evidence.detail.trim(), `${project.slug} evidence has detail`);
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
    state: "Documented",
  });

  assert.match(ryfine.summary, /not proof that every principle or screen is shipped/i);
  assert.ok(ryfine.evidence.some((entry) => entry.label === "Figma cover / node 2:6"));
  assert.ok(ryfine.links.some((link) => link.label === "Inspect in Figma"));
});

test("the unidentified Node artifact is not represented", () => {
  assert.equal(projectEvidence.some((project) => /node artifact/i.test(JSON.stringify(project))), false);
  assert.equal(projectEvidence.length, 5);
});

test("evidence legend contains the approved provenance states", () => {
  assert.deepEqual(
    evidenceStates.map((state) => state.name),
    ["Built", "Observable", "Documented", "Experimental", "Proposed", "Verified"],
  );
});
