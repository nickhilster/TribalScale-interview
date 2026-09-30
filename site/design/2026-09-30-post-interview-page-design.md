# TribalScale Post-Interview Page Design

**Date:** 2026-09-30  
**Status:** design approved in chat; implementation not started  
**Scope:** local proof-of-work page only; no deployment or publication

## Shared understanding

This page is a single, self-contained follow-up artifact for Heather Page and the TribalScale design team after the September 30, 2026 interview. It should make the work legible in one sitting, with optional deeper links after each explanation. The page is not a portfolio directory, a hiring-outcome announcement, or a claim that any proposed product relationship is already shipped.

The first version includes five projects, ordered by the interview conversation and the strength of the current evidence:

1. Boardy
2. LTB Buddy
3. RyFine
4. Code2Motion
5. EasyBuddy

The unidentified Node artifact is intentionally omitted from the visible page. It remains an open TODO in the existing handoff document and must not be guessed into the page.

## Evidence and provenance model

Visible copy must distinguish the following states:

- **Interview recollection:** the user's recollection of the live conversation, including Heather's interest in Boardy and the expected decision process. It is not written follow-up evidence.
- **Direct:** something stated by Nik or visibly present in a referenced artifact.
- **Repo-backed:** code, documentation, tests, or design files inspected in the named repository.
- **Observable:** a behavior or surface seen in a live product, local run, or rendered artifact.
- **Documented:** a product or workflow described in project documentation.
- **Experimental:** a working investigation, prototype, or presentation layer.
- **Proposed:** a direction or relationship that is not represented as shipped.
- **Verified:** a named check performed during this build, with date or surface where useful.

The page must not claim that the interview went well, that Heather loved the page, that Boardy adopted the work, that BoardyAnimated is part of Boardy's product, or that Symphony × Boardy is a live integration.

## Visual direction

The approved visual direction is an editorial evidence field:

- true warm-white paper background for the main page;
- near-black ink, graphite media bands, muted slate body text;
- electric yellow as the primary thread/accent;
- restrained cobalt blue for selected interactive links and media details;
- expressive grotesk sans for large headings;
- neutral sans for body copy;
- compact mono metadata and provenance labels;
- open layouts, thin rules, a vertical evidence rail, and sparse media frames;
- no default bento grid, testimonial treatment, fake metrics, decorative hero badge, or dense dashboard chrome.

The page should feel authored and inspectable rather than promotional. The yellow thread line is the recurring visual motif: it connects the opening thesis to the Boardy investigation, then to the shared method and supporting work.

Visual references, saved in this directory:

- `overview.png` — complete page rhythm and section order.
- `boardy-detail.png` — focal Boardy section anatomy.
- `supporting-work-detail.png` — supporting case-study rhythm.

These are design references only. Their generated interface text and imagery are not production evidence and must not be copied as factual product claims.

## Page structure

### 1. Quiet header and opening

Purpose: establish a personal, direct follow-up without making the reader navigate.

Visible content:

- restrained identity/navigation line: `NIKHIL KHEDKAR / POST-INTERVIEW NOTE`;
- primary heading: `I design the system around the outcome.`;
- supporting line: `A post-interview note for Heather Page`;
- short through-line explaining that the work spans people, workflows, interfaces, AI behavior, handoffs, and stopping points;
- interview context sentence labelled `INTERVIEW RECOLLECTION`, with the date and a neutral statement that Heather was particularly interested in the Boardy work and that this page provides the context the time-limited conversation could not cover.

No hiring outcome or emotional assessment appears in the opening.

### 2. Featured Boardy case

Purpose: answer the thread Heather pulled on, while preserving the three-part distinction:

1. Boardy is the external product/service.
2. Nik's work is the investigation, access experiments, and workflow questions around it.
3. BoardyAnimated is Nik's presentation and interaction layer, not a claim about Boardy's own product.

Visible content:

- heading: `Boardy`;
- thesis: `Exploring what comes after the superconnector`;
- short explanatory paragraph based on the approved handoff wording;
- a dark media frame using a local still, image, or existing Boardy artifact only after its provenance is checked;
- a clearly attributed `A note from Boardy` block using selected material from the September 30 email from `boardy@boardy.ai`, dated in the source note and explicitly labelled as a product/participant statement rather than a neutral reference;
- status line with `Built around Boardy`, `Experimental`, and `Proposed` where applicable;
- optional links to BoardyAnimated, Boardy4Age, the public Symphony × Boardy repository, and the external Boardy product.

The Boardy section should include the following safe framing in substance:

> I started with Boardy because it was asking an interesting question about persistent context and connection. Then I started asking a harder one: what remains defensible as personal agents get better at holding context and acting across services? The work that followed was not an attempt to pretend I had rebuilt Boardy. I explored the product around it — how to make the idea legible, how an existing personal agent might access it, where human approval should stop autonomy, and whether Boardy’s introduction workflow could complement Symphony’s follow-up workflow. The animation is my presentation layer around that investigation, not a claim about Boardy’s own product.

The page may summarize the email's claims about the performance rig, Meet scaffold, episode pages, and boardy4age CLI, but each is labelled as a statement from the email or backed by the corresponding repository inspection. The email must not be presented as independent customer validation.

### 3. Shared method thread

Purpose: connect the projects without pretending they are one product.

Visible content:

`Outcome → workflow → evidence → human control`

Each step gets one short sentence:

- **Outcome:** start with the real problem and a clear job to be done.
- **Workflow:** design the system people actually work inside, not just the interface.
- **Evidence:** make progress, uncertainty, and failure visible.
- **Human control:** keep people informed, accountable, and able to stop or review the system.

This section is explanatory framing, not a quantified result.

### 4. Supporting work

Purpose: show range without making the reader assemble the story from links.

Use four open editorial rows with varied media alignment, not four identical cards.

#### LTB Buddy

Story role: AI workflow design where trust, evidence, escalation, and human authority are part of the UX.

Safe description: built/public-beta workflow with human review boundaries. Retrieval evaluation is repo-backed and measures retrieval quality, not legal correctness.

Primary evidence: project overview, decisions and risks, RAG evaluation documentation, and the current product surface.

Status: `Built`, `Documented`, `Observable` only after the current surface is checked.

#### RyFine

Story role: product and interface craft—turning AI capability into a clear, usable experience with a coherent design system.

Safe description: built product and documented design system. Figma evidence and live product behaviors must remain separate; a QA/spec page is not itself proof that every behavior is shipped.

The RyFine case must feature a real Figma artifact rather than only linking to it. The inspected Figma file contains the `Cover / RyFine Design System` frame (`2:6`, 1440×900) with a dark 64px grid, Inter typography, a lime accent, and principles including `Precision before decoration`, `Operator-first, not toy-first`, `Privacy posture must be visible`, `Progressive disclosure`, and `One primary action per surface`. Show the exported cover as a local image with a caption such as `Figma design-system draft — inspected September 30, 2026`, and link to the Figma source for optional depth.

The Figma frame is evidence of design-system thinking and documentation. It is not proof that every visible principle or screen is shipped in the live product. The page should make this distinction visible with `Figma artifact`, `Documented`, and `Observable` labels where appropriate.

Primary evidence: `C:\dev\ryfine\README.md`, `docs/design-system/*`, canonical Figma file if accessible, and the current web product.

Status: `Built`, `Documented`, `Observable` only for checks completed during this pass.

#### Code2Motion

Story role: novel interaction and creative technology—making a technical idea tangible and testable.

Safe description: repo-backed product thesis and substantial implementation. The page must name the exact demo surface and avoid implying a clean production release if current auth/runtime caveats remain.

Primary evidence: `wiki/product.md`, `wiki/current-state.md`, the selected PlayRoom/ToyMaker/showroom surface, and a fresh browser check.

Status: `Documented`, `Observable`, and `Experimental` as supported by the current check.

#### EasyBuddy

Story role: mobile-first operational assistance for jobs, training, voice, retrieval, and technician support.

Safe description: development-ready React/Vite product with auth disabled by default in the documented local posture. Do not call it a production deployment without current proof.

Primary evidence: `TLDR.md`, `README.md`, app source, and the current Teambotics product surface.

Status: `Built`, `Documented`, `Experimental`; add `Observable` only after a current demo check.

Each row ends with optional progressive-disclosure links. The description must stand on its own before those links.

### 5. Evidence legend and close

Purpose: make claim boundaries obvious without creating a legalistic appendix.

Show a compact legend for `Built`, `Observable`, `Documented`, `Experimental`, `Proposed`, and `Verified`, with one plain-language explanation each.

Close with:

- `Thank you for the conversation.`;
- a short statement that this page is a snapshot of how Nik works and distinguishes shipped work from proposals and experiments;
- optional contact or portfolio link only if verified and intentionally included.

## Interaction model

The page is primarily readable and static, with restrained enhancements:

- smooth in-page anchor navigation if useful;
- scroll reveal for the evidence rail and section rules, disabled under `prefers-reduced-motion`;
- media play/pause only if a real local or external media asset is present and its behavior can be verified;
- expandable source detail only when it improves readability and remains keyboard accessible;
- all links use visible labels, open external destinations intentionally, and include accessible names.

No login, forms, analytics, data collection, or external write actions are needed for the local draft.

## Implementation architecture

Use a deployment-friendly static surface in a new directory:

```text
site/
  index.html
  styles.css
  app.js
  content.js
  design/
    overview.png
    boardy-detail.png
    supporting-work-detail.png
    2026-09-30-post-interview-page-design.md
  assets/              # only checked, project-relevant media
```

The first implementation must include `site/assets/ryfine-figma-cover.png`, exported from the inspected Figma frame. Do not reference the temporary Figma MCP asset URL in the page.

The existing `package.json` is an accessibility-audit workspace, so the page should remain plain HTML/CSS/JS rather than introduce React/Vite solely for this editorial surface. Existing audit scripts and prior HTML files remain untouched. If a local server is useful for browser verification, use a non-mutating static server command rather than changing the project's dependency graph unless a test script is genuinely needed.

Use semantic `header`, `main`, `section`, `article`, `nav`, and `footer` elements. Keep repeated case-study data in a small JS data structure only if it improves maintainability; visible copy remains authored and reviewable in source.

## Responsive and accessibility requirements

- Desktop composition follows the overview reference at approximately 1440px wide.
- At tablet widths, the evidence rail becomes a narrow top/side marker and case rows collapse to one column without hiding their status or description.
- At mobile widths, the Boardy section stacks text before media; no horizontal scrolling is permitted.
- Use visible focus styles, logical heading order, keyboard-accessible disclosures, sufficient color contrast, and descriptive link text.
- Provide reduced-motion behavior and meaningful alt text for any real media.
- Do not rely on color alone for provenance or status labels.

## Verification plan

Before declaring the local draft review-ready:

1. Run the existing accessibility checks if they support the new page; otherwise run an equivalent axe/browser pass against the local route.
2. Verify desktop and mobile-sized viewports in Browser/IAB first.
3. Verify the opening copy contains no unsupported interview-outcome claim.
4. Verify each project paragraph is backed by a checked repo, live surface, or explicitly labelled proposal/experiment.
5. Verify every external link resolves to the intended product, repository, Figma file, or deeper case study.
6. Verify Boardy, Nik's surrounding work, and BoardyAnimated remain distinct in the rendered copy.
7. Verify the Boardy email excerpt is attributed and not framed as neutral customer testimony.
8. Compare the browser screenshot against `overview.png`, `boardy-detail.png`, and `supporting-work-detail.png` for layout, typography, palette, section order, spacing, media treatment, responsive behavior, and interaction cues.
9. Record at least five concrete visual comparisons and any intentional deviations in a fidelity ledger before final handoff.

## Out of scope for this phase

- deployment, publication, or canonical URL selection;
- sending or modifying email;
- changing the existing `docs/` work;
- identifying the Node artifact;
- claiming a hiring outcome;
- claiming a live Boardy/Symphony integration or formal partnership;
- creating new product functionality in any referenced repository.
