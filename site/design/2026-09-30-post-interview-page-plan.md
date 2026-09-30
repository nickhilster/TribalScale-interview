# TribalScale Post-Interview Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, deployment-ready static post-interview proof-of-work page that showcases Nikhil's visual app development skills, leads with the Boardy investigation, and makes verified RyFine Figma evidence visible without overstating product status.

**Architecture:** Use a small static HTML/CSS/JS site under `site/`, with authored page content in `content.js`, semantic markup in `index.html`, shared visual tokens and responsive layout in `styles.css`, and restrained interaction behavior in `app.js`. The page consumes checked local evidence and stable links; it does not call external APIs, collect data, or depend on a framework runtime.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner, existing `playwright` and `@axe-core/playwright` dependencies for browser verification.

**Spec:** `site/design/2026-09-30-post-interview-page-design.md`

## Global Constraints

- Keep the existing untracked `docs/` directory untouched.
- Do not deploy, publish, send email, or change any referenced repository.
- Use the page as one coherent story with optional deeper links; no homework for Heather.
- Preserve the visible distinction between Boardy itself, Nik's work around Boardy, and BoardyAnimated.
- Use `Built`, `Observable`, `Documented`, `Experimental`, `Proposed`, and `Verified` as evidence/status language; do not use unsupported hiring-outcome language.
- Include the local export `site/assets/ryfine-figma-cover.png` from the inspected Figma frame and do not reference temporary Figma MCP asset URLs in page code.
- Treat the Figma frame as design-system documentation evidence, not proof that every design principle or screen is shipped.
- Keep the Node artifact omitted from the page.
- Verify Browser/IAB first, then use Playwright only for repeatable checks or if Browser/IAB is unavailable.

## Review Focus

- **Claim provenance:** interview recollection, repo-backed evidence, live observation, Figma documentation, and proposed work must remain visibly distinct. Test: the content test rejects unsupported outcome language and requires evidence/status fields for every project.
- **Boardy boundary:** the page must not imply that BoardyAnimated is part of Boardy's product or that Symphony × Boardy is integrated. Test: the content test asserts the three-part Boardy distinction and proposed integration wording.
- **Figma boundary:** the RyFine Figma cover must be shown as a real design artifact with a source link and date, not as proof of shipped UI. Test: the content test asserts node `2:6`, local media, Figma source, and the `Figma artifact`/`Documented` labels.
- **Responsive reading order:** on mobile, the Boardy narrative and supporting project descriptions must remain readable without horizontal scrolling or hidden status labels. Test: the browser verification checks 390px and 1440px layouts for overflow, visible headings, and ordered sections.
- **Accessibility and motion:** keyboard focus, semantic headings, link names, contrast, reduced-motion behavior, and disclosure state must remain usable. Test: the browser verification runs axe and checks focusable controls plus `prefers-reduced-motion` behavior.

---

### Task 1: Build the evidence-backed content manifest

**Files:**
- Create: `site/content.js`
- Create: `site/tests/content.test.mjs`
- Read-only inputs: `docs/POST-INTERVIEW-HANDOFF.md`, `C:\dev\BoardyAnimated`, `C:\dev\boardy4age`, `C:\dev\symphony-x-boardy`, `C:\dev\ryfine`, `C:\dev\ltb-buddy`, `C:\dev\Code2Motion`, `C:\dev\EasyBuddy-AutoEdition`

**Interfaces:**
- Produces `evidenceStates`, `pageContent`, and `projectEvidence` exports consumed by `index.html`/`app.js`.
- Each project entry has `{ slug, title, role, summary, status, evidence, links, media }`.
- The RyFine entry has `figma: { sourceUrl, nodeId: '2:6', frameName: 'Cover / RyFine Design System', inspectedOn: '2026-09-30', localAsset: 'assets/ryfine-figma-cover.png' }`.

- [ ] **Step 1: Write the failing content tests**

  Assert that the manifest contains the five ordered projects; each project has a non-empty role, summary, status, and evidence list; the page copy contains no `Heather loved`, `went well`, `offer`, or `rejection` claim; Boardy includes the product/work/presentation distinction; and RyFine includes the exact Figma node, local asset, source URL, frame name, and inspection date.

- [ ] **Step 2: Run the content tests to verify they fail**

  Run: `node --test site/tests/content.test.mjs`

  Expected: FAIL because `site/content.js` does not exist yet.

- [ ] **Step 3: Implement the manifest in `site/content.js`**

  Re-read the named repository files before finalizing each description. Use the handoff's safe status language as the baseline, then add only claims supported by the current checkout or current live check. Keep source labels and URLs in data so the renderer can show them without turning links into the primary story.

- [ ] **Step 4: Run the content tests to verify they pass**

  Run: `node --test site/tests/content.test.mjs`

  Expected: PASS with all provenance and Figma assertions satisfied.

- [ ] **Step 5: Commit the content manifest**

  ```powershell
  git add site/content.js site/tests/content.test.mjs
  git commit -m "feat: add evidence-backed post-interview content"
  ```

### Task 2: Implement the semantic page shell and visual system

**Files:**
- Create: `site/index.html`
- Create: `site/styles.css`
- Modify: none outside `site/`

**Interfaces:**
- Consumes `pageContent` from `content.js` through a module script.
- Produces semantic regions with stable IDs: `intro`, `boardy`, `method`, `supporting-work`, `evidence`, and `close`.
- Produces reusable markup hooks: `.evidence-rail`, `.case-study`, `.status-mark`, `.source-link`, `.disclosure`, and `.reveal`.

- [ ] **Step 1: Add the structural smoke test**

  Extend `site/tests/content.test.mjs` or create `site/tests/structure.test.mjs` to read `index.html` and assert that the six required section IDs, one `h1`, the Boardy section, the four supporting project names, and a `prefers-reduced-motion` CSS rule are present.

- [ ] **Step 2: Run the structural test to verify it fails**

  Run: `node --test site/tests/structure.test.mjs`

  Expected: FAIL because `site/index.html` and `site/styles.css` do not exist yet.

- [ ] **Step 3: Implement the page shell in `site/index.html`**

  Render the opening thesis, neutral interview-recollection note, featured Boardy section, method thread, four supporting project rows, compact evidence legend, and closing note. The RyFine row must contain the local Figma cover image, an explicit `Figma artifact` label, the inspected date, and an `Inspect in Figma` link. Keep all copy code-native and keep optional links after the explanatory text.

- [ ] **Step 4: Implement the approved visual system in `site/styles.css`**

  Use CSS custom properties for paper, ink, graphite, slate, yellow, cobalt, spacing, borders, and type scale. Implement the vertical evidence rail, yellow thread line, dark Boardy band, open supporting rows, Figma media frame, focus states, responsive stacking, and reduced-motion behavior. Avoid adding unapproved cards, badges, fake metrics, gradients, or dashboard chrome.

- [ ] **Step 5: Run the structural test to verify it passes**

  Run: `node --test site/tests/structure.test.mjs`

  Expected: PASS with all required semantic regions and responsive/motion hooks present.

- [ ] **Step 6: Commit the page shell**

  ```powershell
  git add site/index.html site/styles.css site/tests/structure.test.mjs
  git commit -m "feat: add post-interview editorial page shell"
  ```

### Task 3: Add restrained interaction and Figma evidence behavior

**Files:**
- Create: `site/app.js`
- Modify: `site/index.html`
- Modify: `site/styles.css`
- Create or modify: `site/tests/interaction.test.mjs`

**Interfaces:**
- `app.js` exports no public API; it initializes from `pageContent` on `DOMContentLoaded`.
- Interactive controls use native buttons/links and expose state through `aria-expanded`, `aria-controls`, and visible text.

- [ ] **Step 1: Write browser interaction assertions**

  Assert that anchor navigation targets the expected section, source disclosure toggles its content and `aria-expanded`, reveal elements do not remain hidden with reduced motion enabled, and the Figma source link points to the checked file URL.

- [ ] **Step 2: Run the interaction test to verify it fails**

  Run: `node --test site/tests/interaction.test.mjs`

  Expected: FAIL because the local page server/interaction script is not implemented.

- [ ] **Step 3: Implement `site/app.js`**

  Render repeated case-study content from the manifest, wire in-page navigation, toggle optional evidence details, and add scroll reveal only when motion is allowed. Do not add a fake media player; only expose media controls if a real verified asset is present.

- [ ] **Step 4: Run the interaction test to verify it passes**

  Run: `node --test site/tests/interaction.test.mjs`

  Expected: PASS with keyboard-usable controls and no inert primary actions.

- [ ] **Step 5: Commit interaction behavior**

  ```powershell
  git add site/app.js site/index.html site/styles.css site/tests/interaction.test.mjs
  git commit -m "feat: add accessible page interactions and Figma evidence"
  ```

### Task 4: Verify the local page against repos, live surfaces, Figma, and concepts

**Files:**
- Create: `site/verify-page.mjs`
- Create: `site/design/fidelity-ledger.md`
- Temporary only: `site/design/qa/` screenshots or browser output; remove before handoff unless a screenshot is explicitly useful as a durable artifact.

**Interfaces:**
- `verify-page.mjs` starts a local static server, loads `site/index.html` in Playwright, runs axe, and writes only temporary verification output.
- Produces a human-reviewed fidelity ledger covering the full-page concept, Boardy detail concept, supporting-work concept, Figma screenshot, and latest browser render.

- [ ] **Step 1: Run the existing repo evidence checks**

  Re-read the current named source files and check the intended live surfaces: [LTB Buddy](https://ltbbuddy.ca/), [RyFine](https://ryfine.app/), [Code2Motion](https://code2motion.app/), and [EasyBuddy](https://www.teambotics.app/products/easybuddy). Record each claim as built, observable, documented, experimental, proposed, or verified; do not silently promote stale documentation to current product behavior.

- [ ] **Step 2: Capture the Figma comparison reference**

  Keep the inspected Figma source `LSYLrYfT8MjcYO0vltJqP5`, frame `2:6`, and local export `site/assets/ryfine-figma-cover.png` available for comparison. Confirm the page uses the local asset, not the temporary MCP URL.

- [ ] **Step 3: Run local browser verification**

  Run: `node site/verify-page.mjs`

  Expected: local server loads; desktop and mobile screenshots render; no horizontal overflow; headings and project names are visible; axe reports no serious or critical violations; Figma image loads; Boardy distinction and status labels appear in the rendered text.

- [ ] **Step 4: Inspect screenshots with `view_image`**

  Use `view_image` on the approved concept images and the latest local browser screenshot in the same QA pass. Compare at least five concrete points: opening hierarchy, Boardy media/text balance, Figma evidence treatment, supporting-work rhythm, type scale, palette, status clarity, mobile stacking, and focus/reduced-motion behavior.

- [ ] **Step 5: Write and self-review `site/design/fidelity-ledger.md`**

  For every mismatch, record concept evidence, render evidence, fix made, or intentional deviation. Include the above-the-fold copy diff result and explicitly state that the local implementation is not deployed or published.

- [ ] **Step 6: Remove temporary QA artifacts and run final checks**

  Run: `git diff --check` and `node --test site/tests/*.test.mjs`

  Expected: no whitespace errors, all tests pass, only durable site files and the fidelity ledger remain.

- [ ] **Step 7: Commit the verified local draft**

  ```powershell
  git add site
  git commit -m "feat: verify TribalScale post-interview proof-of-work page"
  ```

## Execution boundary

This plan ends with a locally verified draft. Deployment, canonical URL selection, Figma write-back, email sending, and any changes to the referenced product repositories require a separate explicit request.
