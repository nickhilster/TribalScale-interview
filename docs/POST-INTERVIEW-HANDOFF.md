# TribalScale post-interview handoff

**Working repository:** `C:\dev\TribalScale-interview`  
**Audience:** Heather Page / TribalScale, after the September 30, 2026 interview  
**Canonical deliverable:** one self-contained post-interview web page and one URL  
**Status:** working source for the page; interview outcome still needs to be recorded from the user's direct follow-up evidence

## Why this file exists

This is the durable context for the post-interview page. It consolidates the important interview signals, the intended story, the evidence architecture, and the boundaries around what can honestly be called built, proposed, or verified.

The page should make the case without asking Heather to reconstruct the work from a set of scattered links. A visitor should understand the point of every project on the page before deciding whether to open a Figma file, live product, or repository.

## Provenance rules

Use these labels while writing and reviewing page copy:

- **Direct:** something Nik said about the interview or his own intent, or something visibly present in the referenced artifact.
- **Repo-backed:** code, documentation, tests, or design files inspected in the named repository.
- **Verified:** a specific local, live, or clean-user check has actually been performed. Name the check and date when useful.
- **Reported:** a claim from a product, collaborator, or earlier conversation that has not been independently checked here.
- **Inference:** a reasonable interpretation of the evidence, not a fact to present as one.
- **Proposed / exploratory:** a direction Nik is testing or suggesting, not a shipped feature or partnership.
- **Open:** information still required before the page should make a stronger claim.

Never turn a visual treatment, a repository's existence, or a conversation about a future direction into proof that the underlying product, integration, adoption, or outcome exists.

## Interview signals

### What is directly useful for the page

- Heather Page was the relevant TribalScale interviewer and was the sole interviewer on the calendar invitation.
- The meeting was shortened from 60 minutes to 30 minutes before the interview. The same event, title, and interviewer remained; no evidence in the retrieved record supports treating the shortening as a negative candidacy signal.
- Nik reports that Heather was specifically interested in the work around **Boardy**. During the interview he showed her the animation/presentation portion, but there was much more behind it than the time allowed.
- Nik discussed a product thesis rather than simply praising Boardy: he is not convinced that a standalone “superconnector” or the “4D” framing is necessarily a durable moat as personal agents gain more context and agency. The page should frame this as a question about durable product roles, not as a claim that Boardy is a bad product.
- Nik also discussed trying to understand whether **Boardy and Symphony** could complement each other: Boardy can provide introductions and meeting handoff; Symphony can support follow-up and lifecycle continuity. The exact product-to-product relationship remains exploratory.

### What is not yet evidenced here

- The retrieved post-interview conversation does **not** contain a confirmed hiring outcome, next-round decision, offer, rejection, or written follow-up from Heather.
- Do not write “Heather loved the page,” “the interview went well,” or any equivalent outcome claim until Nik adds direct evidence. The current safe wording is that Heather showed interest in the Boardy work and that this page gives her the context she did not have time to see.
- Do not treat the earlier 30-minute calendar compression as a post-interview outcome. It was a pre-interview logistics signal.

When the outcome is known, add a dated note here with the source and keep it separate from the portfolio story.

## The page strategy

### One canonical link

Send one post-interview URL. It should be an editorial page, not a directory that makes Heather do research.

The page should:

1. Open with a short thank-you and the central through-line: Nik designs the workflow around the outcome, then makes the AI, human, and technical boundaries visible.
2. Give Heather the Boardy case early because she explicitly pulled on that thread.
3. Show the other projects as complementary evidence, not as a catalogue.
4. Explain each project on-page in enough detail to stand alone.
5. Offer optional links only after the explanation: Figma, live product, demo, source repository, or deeper case study.
6. Keep internal interview-prep material separate. `interview-navigator.html` is a private speaking aid, not the canonical follow-up page.

The intended interaction is “read the story, then choose a depth,” not “click six links and do the assembly yourself.”

### Suggested editorial spine

**Opening:** I build products and workflows for the point where people, systems, and AI have to make decisions together.

**Proof sequence:**

- **Boardy — interrogate an existing AI product and prototype around it.**
- **LTB Buddy — design trust, uncertainty, and human authority into an AI workflow.**
- **RyFine — turn AI capability into a coherent, polished product experience.**
- **Code2Motion — explore novel interaction and make a technical idea tangible.**
- **EasyBuddy — apply mobile-first AI assistance to a real operational workflow.**
- **Node artifact — hold as an explicit open item until the actual project is identified.**

Close with an invitation to inspect the optional source artifacts and a short note that the page distinguishes shipped work from proposals and experiments.

## Boardy case study: the story to tell

### The crucial distinction

There are three different things and they must never be collapsed:

1. **Boardy itself:** the external product/service. Its capabilities and claims belong to Boardy, not to Nik.
2. **Nik's work around Boardy:** using it, questioning its product role, extending the workflow, prototyping access patterns, and exploring interoperability.
3. **BoardyAnimated:** Nik's presentation and interaction layer around that work. The animation is evidence of storytelling, motion, and presentation design; it is not evidence that the Boardy product itself contains that animation.

This correction is the most important context from the conversation.

### The case-study thesis

Nik encountered an interesting AI product and formed a product question: what remains durable when personal agents increasingly hold context and act across services? Instead of stopping at critique, he explored several possible futures around Boardy:

1. **Encounter:** Boardy presents an interesting “context engineering” / superconnector direction.
2. **Question:** what is the durable role of a connector as general-purpose personal agents become more capable?
3. **Presentation experiment:** BoardyAnimated makes the idea legible as a continuous narrative through character, audio, motion, demo, and pacing.
4. **Access experiment:** Boardy4Age explores how an existing personal agent or a local CLI could prepare useful context for working with Boardy.
5. **Interoperability experiment:** Symphony × Boardy explores whether introductions and follow-up can compose without pretending a production integration already exists.

The strongest title direction is something like **“Exploring what comes after the superconnector”**. It should be presented as a product question and design investigation, not as a verdict on Boardy's business.

### What the source repositories support

#### `C:\dev\BoardyAnimated`

**Repo-backed evidence:** the story data contains beats such as “I'm a context engineer,” “We're not competing with ChatGPT,” a demo walkthrough, and later podcast/character material. The repo contains animated Boardy components, audio playback, story navigation, and interaction work.

**What Nik can claim:** he built a visual/interactive narrative around Boardy and experimented with character performance, audio, pacing, and presentation.

**What Nik cannot claim from this alone:** that Boardy itself ships this animation, that Boardy adopted the page, or that the story proves business outcomes.

**Page treatment:** show a short excerpt or still, then explain the design decision and the underlying product question in plain language.

#### `C:\dev\boardy4age`

**Repo-backed evidence:** the repository documents two modes:

- **Personal-agent mode:** an existing personal agent can use the protocol and authorized context to prepare communication with Boardy.
- **CLI mode:** local Git history and project context can be inspected and used to prepare a threaded Gmail draft.

The product loop intentionally stops at **draft → human review → send**. Direct sending requires an appropriately connected email account; otherwise the fallback is copy-ready text.

**What Nik can claim:** he explored a way for an existing agent to become the interface to Boardy and made human approval a product boundary.

**Status:** code and documentation exist; describe the two modes and approval boundary as built/documented in the repo. Do not claim universal agent access or automatic outreach.

#### `C:\dev\symphony-x-boardy`

**Repo-backed evidence:** the public repository explicitly separates **Agreed / Proposed / Open**. Its current documented model is:

- Boardy → introductions and meeting handoff.
- Symphony → follow-up/lifecycle tracking.
- Nik → retains approval before external outreach.

The repository also explicitly says that no automated integration is documented as implemented. It records a bounded relay and a proposed future pulse, not a completed vendor integration.

**What Nik can claim:** he is exploring how two products might complement one another, with attention to responsibility transfer, context, correlation, approval, and evidence.

**What Nik cannot claim:** a live API, webhook, shared data contract, automatic handoff, formal partnership, or reciprocal user-acquisition agreement.

**Page treatment:** make the boundary itself the design point. The serious question is not “can two agents talk?” but “where does value transfer, what context crosses the boundary, and where must a human remain accountable?”

### Boardy paragraph for the final page

> I started with Boardy because it was asking an interesting question about persistent context and connection. Then I started asking a harder one: what remains defensible as personal agents get better at holding context and acting across services? The work that followed was not an attempt to pretend I had rebuilt Boardy. I explored the product around it — how to make the idea legible, how an existing personal agent might access it, where human approval should stop autonomy, and whether Boardy’s introduction workflow could complement Symphony’s follow-up workflow. The animation is my presentation layer around that investigation, not a claim about Boardy’s own product.

## Evidence architecture for the rest of the page

Every case should use the same compact pattern:

**Problem / question → what Nik owned → what exists → what was verified → what to inspect next.**

| Case | Story role | Primary evidence | Safe status language | Optional depth |
|---|---|---|---|---|
| **RyFine** | Product craft: turning AI capability into a clear, usable experience. | `C:\dev\ryfine\README.md`; `docs/design-system/*`; canonical Figma file; working web app. | Built product and documented design system. Figma evidence is real; use the product to demonstrate behaviours that the Figma QA page only specifies. | Figma foundations/components/screens; live product; repo design-system docs. |
| **LTB Buddy** | AI workflow design where trust, evidence, escalation, and human authority are part of the UX. | `C:\dev\ltb-buddy\docs\pm-design\00_Project_Overview.md`; `04_Decisions_and_Risks.md`; `evals\rag\README.md`; product. | Built/public-beta workflow with human review boundaries. Retrieval evaluation is repo-backed; it measures retrieval, not legal correctness. | Live product; project overview; risk log; evaluation method/results. |
| **Code2Motion** | Novel interaction and technical experimentation: make a difficult idea tangible and testable. | `C:\dev\Code2Motion\wiki\product.md`; `wiki\current-state.md`; PlayRoom/ToyMaker/showroom source and handoffs. | Repo-backed product thesis and substantial implementation. The product path has been exercised, but current production/auth/runtime caveats mean the final page must name the exact demo surface and avoid implying a clean production release without a fresh check. | Live showroom/demo; source repo; one focused interaction walkthrough. |
| **EasyBuddy** | Mobile-first operational product: jobs, training, voice, retrieval, and technician support in one workflow. | `C:\dev\EasyBuddy-AutoEdition\TLDR.md`; `README.md`; app source. | Development-ready React/Vite product; auth is disabled by default in the documented local posture. Do not call it a production deployment without current proof. | Local/live demo if verified; one workflow from job → assistant → training. |
| **Boardy** | Product thesis, presentation design, agent access, human-control boundaries, and interoperability exploration. | `BoardyAnimated`, `boardy4age`, `symphony-x-boardy`. | Boardy itself is external; Nik's surrounding experiments are partly built and partly exploratory. No verified automated Symphony × Boardy integration. | Boardy product; BoardyAnimated excerpt; Boardy4Age modes; public Symphony repo. |
| **Node artifact** | Still-to-identify sixth artifact; do not guess. | No confirmed name or repository in the retrieved context. | Open. Keep out of the published page until the artifact, ownership, and strongest proof are identified. | Add only after a fresh repo/live check. |

### Recommended ordering

1. Boardy, because Heather already expressed interest.
2. LTB Buddy, because it shows end-to-end AI product judgment and explicit human authority.
3. RyFine, because it visibly proves product/design craft and Figma depth.
4. Code2Motion, because it shows novel interaction and technical imagination.
5. EasyBuddy, because it shows applied operational product design in a mobile-first workflow.
6. Node artifact only after identification and verification.

## Voice and positioning

Keep the page in Nik's voice: direct, curious, opinionated, and willing to show the boundary of the evidence. Avoid marketing language and avoid presenting TribalScale's own language as if it were copied into the work afterward.

The through-line is:

> I design the system around the outcome — the people, workflow, interface, AI behaviour, handoffs, and stopping points — then I build enough to learn what should happen next.

The page should communicate that Nik can:

- see the workflow behind the interface;
- make AI behaviour and human authority explicit;
- prototype quickly without confusing a demo with a dependable product;
- move between Figma, code, live interaction, and stakeholder explanation;
- challenge a product thesis without needing to “win” the argument;
- explore complementarity between products without claiming an integration that does not exist.

## Build checklist for the next pass

- [ ] Confirm the interview outcome and add a dated, sourced note to this file.
- [ ] Identify the Node artifact or deliberately remove it from the first page version.
- [ ] Decide the canonical URL/file name for the post-interview page.
- [ ] Write the Boardy section first and preserve the Boardy / Nik / BoardyAnimated distinction in its visible copy.
- [ ] Add status labels for built, proposed, exploratory, and verified.
- [ ] Add optional links only after each case can be understood without clicking.
- [ ] Recheck all live URLs, Figma access, and current repository claims immediately before sending the link.
- [ ] Run the existing accessibility checks and a clean browser pass on the final page.

## Source trail used for this handoff

- Referenced ChatGPT conversation: **Post call work planning**, conversation `6abd459c-ebdc-83ea-a009-d289ddf45d60`.
- Interview preparation conversation: **TribalScale interview brief**, conversation `6abc0a02-b858-83ea-a74d-e8c5db3f2ad2`.
- Local interview artifacts: `nikhil-x-tribalscale.html`, `nikhil-x-tribalscale-agentic-copy.html`, `interview-navigator.html`, `Heather_Page_Profile.pdf`, and `tribalscale.txt`.
- Boardy evidence repositories: `C:\dev\BoardyAnimated`, `C:\dev\boardy4age`, `C:\dev\symphony-x-boardy`.
- Supporting product repositories: `C:\dev\ryfine`, `C:\dev\ltb-buddy`, `C:\dev\Code2Motion`, `C:\dev\EasyBuddy-AutoEdition`.
