# Media Pipeline Showcase: handoff

**Branch:** `worktree-media-pipeline-showcase` (repo `nickhilster/TribalScale-interview`)
**Page:** `site/media-pipeline/` (plain HTML/CSS/JS, no build step)
**Status:** first draft reviewed by Nik on 2026-09-30. Local only until the branch is pushed. Not deployed.

## Bring-up on the other device

```bash
git clone https://github.com/nickhilster/TribalScale-interview.git
cd TribalScale-interview
git fetch origin worktree-media-pipeline-showcase
git checkout worktree-media-pipeline-showcase
```

The branch sits on top of local `main` commits (`464f265` and earlier design/plan docs). If `main` on GitHub lacks them, the push that publishes this branch also publishes them.

Preview with any static server that supports HTTP Range requests (required for `<audio>`). Python's `http.server` does not support Range and will make audio silent or unseekable in some browsers:

```bash
cd site/media-pipeline
npx serve -l 8731
```

Open http://localhost:8731. Verified so far: axe 0 violations at 1440px and 390px, no horizontal scroll, audio plays in desktop Chrome.

## What is on the page

Hero, shift, shared-architecture stage explorer, visual (PanelForge / Neural Breach), audio (Audio Studio 2x2 take selector), principle table, accessible-technology section, background timeline, close, claims footer. Copy is authored in `index.html`; stage-explorer text is in `app.js`.

## Decisions already made (Nik)

- Framing: durable portfolio page, one light line mentioning Heather. Not a letter to her.
- Hardware and model names (RTX 4070 / Qwen3-VL / ComfyUI / FLUX.2 Klein) live behind the "How it works" disclosures, not in the main flow.
- Headline: "Why make artifacts when you can design the pipeline that makes them?"
- Audio: the four David-Boardy WAVs are cleared. David and Boardy are character names; the voices are fine for public use. Default take is Produced / Conversational (change in `index.html`: `aria-pressed="true"` on one `.take` button and the matching `<audio src>`).
- Neural Breach is published and ready to share. Pages 12 (lead), 13 and 18 are used, copied from the public reader as JPEGs.
- Copy style: avoid "not X, it's Y" constructions and other AI-sounding cadence. Canadian spelling.

## Open item: Convergence and Mecha What?

Nik has local work on another device that is ahead of the GitHub repos (`nickhilster/Convergence`, `nickhilster/Mecha-What`, both private). The page currently says only:

> The same pipeline is now being set up for two further graphic novels, *Convergence* and *Mecha What?*, each in its own repository and currently in development.

and the footer says neither has public output yet.

Why so cautious: as of the last remote commits (2026-09-21 to 2026-09-23) both repos describe early development. Convergence is "early concept development" with a PanelForge *development* (not production) plan, CO-15 still `Todo`, and only non-canon style-test frames. Mecha What? has no panel script or final art and `visual/` is reserved for a later phase. Nik says both are in production using PanelForge, so the local work must be further along.

**To do on the other device, in this order:**

1. Read, in each repo: README, the PanelForge plan (`docs/superpowers/plans/2026-09-21-panelforge-visual-pipeline.md`), tracker issues mentioning PanelForge (CO-15, MW-13), and any `projects/` or `outputs/` folders with generated frames.
2. Record what is verifiably true: are references approved, are production manifests enabled, how many panels or pages have been rendered, and is anything public?
3. Update the sentence in `index.html` (section 03, after the Neural Breach paragraph) and the footer line to match. Use "in production" only if production manifests are enabled and frames exist. Do not state panel counts, costs or speeds unless Nik supplies them.
4. Keep story content out of the page unless Nik approves it. Mecha What? is based on a real incident and Convergence is pre-canon; describing them as "graphic novels in development on PanelForge" is enough.
5. If there are approved frames Nik wants to show, add them under `assets/art/` as compressed JPEGs with alt text, and label them with their status.

## Rules that still apply

- The private repos (`Legion-PanelForge`, `audio-studio`, `Convergence`, `Mecha-What`) are never linked, quoted or screenshotted on the page. Redraw diagrams; do not paste repo docs.
- No cost, cost-per-asset or speed numbers unless Nik provides and verifies them. No "fully autonomous", "free" or "replaces artists".
- Neural Breach is described as a public output *associated with* the PanelForge visual work, not as proof every page came from the current pipeline version.
- No Google Drive links or file IDs on the page. The audio is served as static files from `assets/audio/`.
- Do not deploy or pick a canonical URL until Nik approves the page.

## Sources used to verify claims

Fetched with `gh api` on 2026-09-30 from `Legion-PanelForge` (`README.md`, `comic-pipeline/README.md`, `docs/superpowers/specs/2026-09-19-production-reference-pipeline-design.md`) and `audio-studio` (`README.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCTION_MANIFEST.md`, `docs/QUALITY_REVIEW.md`). Original brief: `tribalscale_media_pipeline_showcase_brief.md` (Nik's Downloads folder).
