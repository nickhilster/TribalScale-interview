# StoryTeller Public Reproduction Method

## What this is

This is a public, artifact-derived reproduction method based on the three StoryTeller examples checked into this repository: Heather Page, Sheetal Jaitly, and Haseeb Danyal.

It documents the relationship among the public research logs, story data, presentation configuration, and rendered HTML artifacts. It is **not** the private StoryTeller implementation. This repository contains worked artifacts and examples, not the canonical generator. No canonical prompt or executable StoryTeller generation pipeline is provided here.

An agent can use the documented structure and examples as a reproducible pattern for producing a new story package. That pattern should not be described as running the private StoryTeller system.

## Output package

The observed public package is:

`stories/<slug>/`

- `research.md` records the research scope, source handling, provenance, limits, and interpretation boundaries used by the example.
- `story.json` contains the story data used by the rendered example, including subject metadata, source records, clusters, and nodes.
- `theme.json` contains presentation configuration such as colors, typography, wordmark treatment, and brand-source notes.
- `index.html` is the checked-in rendered story artifact for that package.

The examples establish this package relationship. They do not establish a rigid prompt, generator contract, or required build process beyond the fields and patterns described below.

## 1. Research pass

The three examples share a scope-first research pattern. Before structuring a story, define:

- the subject and the intended scope;
- the angle or question the story is meant to explore;
- the audience and the independent-study or attribution context;
- the source and privacy boundaries;
- what is out of scope or intentionally excluded.

Use appropriate public sources for the subject and story. Record source URLs, publisher or source identity, source type or tier where useful, and access context or dates where the examples do so. Keep a source log that lets a later reader identify where a claim came from.

Separate sourced facts, copied or paraphrased claims, and synthesis or interpretation. Collect only information relevant to the intended story, preserve caveats, and record limits, conflicts, and gaps when the evidence does not resolve them.

There is no canonical research prompt in this public repository. The common denominator is a documented scope, a provenance-bearing source log, explicit privacy boundaries, and a clear distinction between evidence and interpretation.

## 2. Build `story.json`

The checked-in examples use schema version `1`. The top-level fields observed across the examples are:

- `schemaVersion` — the story schema version; the examples use `1`.
- `title` — the story title.
- `subject` — subject metadata, including `name`, `kind`, and `url` in the examples.
- `tagline` — the short framing line for the story.
- `root` — the node ID used as the story root.
- `credit` — the independent-study credit line.
- `disclaimer` — source scope, attribution, verification, and non-affiliation language appropriate to the story.
- `generated` — generation metadata; the examples contain a `date`.
- `clusters` — the cluster identifiers used by the story nodes.
- `sources` — the top-level source collection.
- `nodes` — the story graph nodes.

These are the fields evidenced by the three checked-in examples. A field should not be treated as mandatory for every future artifact merely because it appears in an example.

Each source entry observed in the examples contains:

- `id`
- `title`
- `url`
- `accessed`
- `publisher`

Node objects commonly contain:

- `id`
- `title`
- `type`
- `cluster`
- `featured`
- `summary`
- `evidence`
- `sources`

Some nodes also contain `details`, `when`, or `themes`. Those fields are optional patterns evidenced by particular examples, not universal requirements.

Where the examples demonstrate the relationship, the string IDs in a node's `sources` array resolve to entries in the top-level `sources` collection. Preserve that relationship so source-backed claims remain traceable.

Do not redesign schema v1 or introduce schema v2 as part of this method.

## 3. Build `theme.json`

The three examples use schema version `1` and share these presentation fields:

- `schemaVersion`
- `name`
- `mode`
- `colors`, with `bg`, `surface`, `text`, `muted`, `line`, and `accent`
- `clusters`, mapping story cluster names to presentation colors
- `font`, with `body` and `display` font stacks
- `wordmark`, with `text` and `letterSpacing`
- `brandSources`, which records the source or rationale behind presentation decisions

The examples also demonstrate optional presentation fields: `font.googleFonts` and `wordmark.uppercase`. Do not add new theme keys by assumption. Theme is presentation configuration, not factual story content.

## 4. Generation / rendering step

The public, reproducible sequence is:

1. Research the subject.
2. Produce `research.md`.
3. Structure the supported story into schema-v1 `story.json`.
4. Create or adapt `theme.json`.
5. Render an `index.html` that faithfully represents those artifacts.
6. Human-review the rendered story against the sources before publication.

The checked-in examples include rendered HTML, but this public repository does not provide the canonical StoryTeller renderer or generator. A new implementation may reproduce the presentation from the documented data artifacts, or an agent may create an equivalent rendering, but that is not the same as running the private StoryTeller system.

HTML rendering, build, and deployment are outside the guaranteed public method unless an existing checked-in artifact explicitly demonstrates the relevant behavior. This document does not provide fabricated commands, prompts, APIs, or build steps.

## 5. Privacy, provenance, and publication rules

For person stories:

- use public, relevant sources;
- prefer professional and public-role information;
- do not seek, infer, or publish private-life information merely because it can be found online;
- do not infer sensitive personal traits or characteristics;
- distinguish sourced fact from interpretation;
- preserve source URLs and provenance;
- avoid unsupported claims;
- include a clear disclaimer about source scope and non-affiliation or non-endorsement where appropriate;
- perform human review before publication.

For brands and projects:

- distinguish first-party claims from independent evidence;
- preserve attribution;
- do not represent interpretation as company-authored fact.

### Publication checklist

- Source IDs resolve to the top-level source collection where used.
- Material claims are supported by the recorded sources.
- Interpretation is distinguishable from evidence.
- The privacy boundary has been checked.
- A disclaimer is present where appropriate.
- Links have been checked.
- Human review has been completed.
