const evidenceStates = Object.freeze([
  {
    name: "Built",
    description: "Implemented in a checked repository or working artifact.",
  },
  {
    name: "Observable",
    description: "Seen in a live product, local run, or rendered surface.",
  },
  {
    name: "Documented",
    description: "Described in project documentation or a design artifact.",
  },
  {
    name: "Experimental",
    description: "A prototype or investigation used to learn what should happen next.",
  },
  {
    name: "Proposed",
    description: "A direction or relationship that is not represented as shipped.",
  },
  {
    name: "Verified",
    description: "Checked during this build against a named source or surface.",
  },
]);

const pageContent = {
  identity: "NIKHIL KHEDKAR / POST-INTERVIEW NOTE",
  title: "I design the system around the outcome.",
  subtitle: "A post-interview note for Heather Page",
  opening:
    "Across these projects, I move between people, workflows, interfaces, AI behaviour, handoffs, and the points where a person needs to review or stop the system.",
  interviewContext: {
    label: "INTERVIEW RECOLLECTION",
    date: "September 30, 2026",
    text:
      "Heather showed particular interest in the Boardy work during our live conversation. This page adds the context that a time-limited interview could not hold; it is a recollection, not written follow-up evidence.",
    provenance: "Interview recollection",
  },
  method: {
    title: "Outcome → workflow → evidence → human control",
    steps: [
      {
        name: "Outcome",
        text: "Start with the real problem and a clear job to be done.",
      },
      {
        name: "Workflow",
        text: "Design the system people actually work inside, not just the interface.",
      },
      {
        name: "Evidence",
        text: "Make progress, uncertainty, and failure visible.",
      },
      {
        name: "Human control",
        text: "Keep people informed, accountable, and able to stop or review the system.",
      },
    ],
  },
  boardy: {
    slug: "boardy",
    title: "Boardy",
    indexLabel: "FEATURED CASE",
    role: "Product thesis, presentation design, agent access, human-control boundaries, and interoperability exploration around an external AI product.",
    thesis: "Exploring what comes after the superconnector",
    summary:
      "I started with Boardy because it was asking an interesting question about persistent context and connection. Then I started asking a harder one: what remains defensible as personal agents get better at holding context and acting across services? The work that followed was not an attempt to pretend I had rebuilt Boardy. I explored the product around it — how to make the idea legible, how an existing personal agent might access it, where human approval should stop autonomy, and whether Boardy's introduction workflow could complement Symphony's follow-up workflow. The animation is my presentation layer around that investigation, not a claim about Boardy's own product.",
    status: ["Built around Boardy", "Experimental", "Proposed"],
    media: null,
    boundaries: [
      {
        label: "Boardy itself",
        text: "The external AI product/service. Its capabilities and claims belong to Boardy, not to this surrounding work.",
        evidence: "External product",
      },
      {
        label: "Nik's work around Boardy",
        text: "An investigation into product role, access patterns, workflow handoff, and human approval boundaries.",
        evidence: "Repo-backed / Experimental",
      },
      {
        label: "BoardyAnimated",
        text: "The presentation and interaction layer around that investigation, not a claim about Boardy's own product.",
        evidence: "Repo-backed / Built around Boardy",
      },
    ],
    emailNote: {
      title: "A note from Boardy",
      source: "Boardy Boardman <boardy@boardy.ai>",
      date: "September 30, 2026",
      attribution:
      "Product/participant statement, included as attributed context and not a neutral customer reference.",
      excerpts: [
        "The note describes an animated performance rig with independent blink, gaze, mouth movement, and viseme lip sync.",
        "It also describes a Google Meet scaffold, episode pages with a speaker-gated cue track, and a boardy4age CLI that creates a Gmail draft for human review before send.",
      ],
    },
    symphonyBoundary: {
      status: "Proposed",
      text:
        "Symphony × Boardy is an exploratory complementarity question: Boardy can provide introductions and meeting handoff while Symphony can support follow-up and lifecycle continuity. The public repository documents no automated integration as implemented.",
    },
    evidence: [
      {
        label: "BoardyAnimated",
        kind: "Repo-backed",
        state: ["Built"],
        detail: "Animated narrative, audio, story navigation, and interaction work around Boardy.",
        source: "https://github.com/nickhilster/BoardyAnimated",
      },
      {
        label: "Boardy4Age",
        kind: "Repo-backed",
        state: ["Built", "Documented"],
        detail: "Personal-agent and CLI modes that stop at draft → human review → send.",
        source: "https://github.com/nickhilster/boardy4age",
      },
      {
        label: "Symphony × Boardy",
        kind: "Repo-backed",
        state: ["Proposed"],
        detail: "A public workflow record that separates Agreed, Proposed, and Open; no automated integration is documented as implemented.",
        source: "https://github.com/nickhilster/symphony-x-boardy",
      },
    ],
    links: [
      { label: "Boardy product", href: "https://boardy.ai" },
      { label: "BoardyAnimated", href: "https://github.com/nickhilster/BoardyAnimated" },
      { label: "Boardy4Age", href: "https://github.com/nickhilster/boardy4age" },
      { label: "Symphony × Boardy", href: "https://github.com/nickhilster/symphony-x-boardy" },
    ],
  },
  projects: [
    {
      slug: "ltb-buddy",
      title: "LTB Buddy",
      indexLabel: "AI WORKFLOW & TRUST",
      role: "AI workflow design where trust, evidence, escalation, and human authority are part of the UX.",
      summary:
        "A built/public-beta workflow for tenant evidence and guided self-help, designed with human review boundaries. Its retrieval evaluation measures retrieval quality, not legal correctness.",
      status: ["Built", "Documented", "Observable", "Verified"],
      media: null,
      evidence: [
        {
          label: "Project overview",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "Tenant-first product framing, workflow scope, and the self-help legal-software boundary.",
          source: "https://github.com/nickhilster/ltb-buddy/blob/main/docs/pm-design/00_Project_Overview.md",
        },
        {
          label: "Decisions and risks",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "Human authority, escalation, and product-risk decisions are kept visible in the design record.",
          source: "https://github.com/nickhilster/ltb-buddy/blob/main/docs/pm-design/04_Decisions_and_Risks.md",
        },
        {
          label: "RAG evaluation",
          kind: "Repo-backed",
          state: ["Verified"],
          detail: "Retrieval metrics and failure analysis; not a measure of legal correctness.",
          source: "https://github.com/nickhilster/ltb-buddy/blob/main/evals/rag/README.md",
        },
        {
          label: "Current product surface",
          kind: "Live check",
          state: ["Observable", "Verified"],
          detail: "The current public surface was checked during the evidence pass.",
          source: "https://ltbbuddy.ca/",
        },
      ],
      links: [
        { label: "Open LTBBuddy", href: "https://ltbbuddy.ca/" },
        { label: "View source", href: "https://github.com/nickhilster/ltb-buddy" },
      ],
    },
    {
      slug: "ryfine",
      title: "RyFine",
      indexLabel: "AI PRODUCT EXPERIENCE",
      role: "Product and interface craft: turning AI capability into a clear, usable experience with a coherent design system.",
      summary:
        "A built browser product for prompt refinement with repo context, provider choice, and local-first/BYOK paths. The Figma cover is a real design artifact; it is not proof that every principle or screen is shipped in the live product.",
      status: ["Built", "Documented", "Observable", "Verified"],
      media: {
        type: "image",
        src: "assets/ryfine-figma-cover.png",
        alt: "RyFine design-system Figma cover with a dark grid, lime accent, and interface principles.",
        provenance: "Checked local export from the inspected Figma frame.",
        state: ["Documented", "Verified"],
      },
      figma: {
        sourceUrl: "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5",
        nodeId: "2:6",
        frameName: "Cover / RyFine Design System",
        inspectedOn: "2026-09-30",
        localAsset: "assets/ryfine-figma-cover.png",
        label: "Figma artifact",
        caption: "Figma design-system draft — inspected September 30, 2026",
        state: ["Documented"],
      },
      evidence: [
        {
          label: "Product README",
          kind: "Repo-backed",
          state: ["Built", "Documented"],
          detail: "Prompt refinement, repo context, multiple providers, pipeline trace, project memory, and local-first privacy paths.",
          source: "https://github.com/nickhilster/ryfine/blob/main/README.md",
        },
        {
          label: "Design system docs",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "Design-system guidance and product surface documentation kept alongside the implementation.",
          source: "https://github.com/nickhilster/ryfine/tree/main/docs/design-system",
        },
        {
          label: "Figma cover / node 2:6",
          kind: "Figma artifact",
          state: ["Documented", "Verified"],
          detail: "The inspected cover uses a dark 64px grid, Inter typography, a lime accent, and explicit product principles.",
          source: "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5",
        },
        {
          label: "Current web product",
          kind: "Live check",
          state: ["Observable", "Verified"],
          detail: "The canonical web product was checked during the evidence pass; live behavior and Figma documentation remain separate claims.",
          source: "https://ryfine.app/",
        },
      ],
      links: [
        { label: "Open RyFine", href: "https://ryfine.app/" },
        { label: "Inspect in Figma", href: "https://www.figma.com/design/LSYLrYfT8MjcYO0vltJqP5" },
        { label: "View source", href: "https://github.com/nickhilster/ryfine" },
      ],
    },
    {
      slug: "code2motion",
      title: "Code2Motion",
      indexLabel: "TECHNICAL CONCEPT & INTERACTION",
      role: "Novel interaction and creative technology: making a difficult technical idea tangible and testable.",
      summary:
        "A repo-backed interactive-art product thesis with substantial implementation: PlayRoom is the audience surface, ToyMaker is the creator surface, and a c2merse is the unit that moves between creation and distribution. Current runtime and operational caveats mean the page treats the work as observable and experimental, not as a clean production release.",
      status: ["Documented", "Observable", "Experimental", "Verified"],
      media: null,
      evidence: [
        {
          label: "Product thesis",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "PlayRoom, ToyMaker, c2merses, and the product's interactive-art model.",
          source: "https://github.com/nickhilster/Code2Motion/blob/main/wiki/product.md",
        },
        {
          label: "Current handoff",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "The product path is described as proven and mostly green, with formal closeout still dependent on remote-only operational proofs.",
          source: "https://github.com/nickhilster/Code2Motion/blob/main/wiki/current-state.md",
        },
        {
          label: "Live feed / showroom",
          kind: "Live check",
          state: ["Observable", "Verified"],
          detail: "The public surface was checked during the evidence pass; use the named surface rather than implying every runtime path is production-ready.",
          source: "https://code2motion.app/feed",
        },
      ],
      links: [
        { label: "Open Code2Motion", href: "https://code2motion.app/feed" },
        { label: "View source", href: "https://github.com/nickhilster/Code2Motion" },
      ],
    },
    {
      slug: "easybuddy",
      title: "EasyBuddy",
      indexLabel: "MOBILE OPERATIONS SUPPORT",
      role: "Mobile-first operational assistance for jobs, training, voice, retrieval, and technician support.",
      summary:
        "A development-ready React/Vite workflow for automotive technicians: jobs, training, a voice-capable AI assistant, and knowledge-base operations in one mobile-first app. The documented local posture has authentication disabled by default, so this is not presented as a verified production deployment.",
      status: ["Built", "Documented", "Experimental"],
      media: null,
      evidence: [
        {
          label: "Quick reference",
          kind: "Repo-backed",
          state: ["Documented"],
          detail: "Five main screens, mobile navigation, voice and retrieval features, training, jobs, and offline-first storage are described in the repository reference.",
          source: "https://github.com/Teambotics-BackBurner/EasyBuddy-AutoEdition/blob/main/TLDR.md",
        },
        {
          label: "App source and scripts",
          kind: "Repo-backed",
          state: ["Built"],
          detail: "React 18, TypeScript, Vite, Tailwind, shadcn/ui, Supabase, and local development/build paths.",
          source: "https://github.com/Teambotics-BackBurner/EasyBuddy-AutoEdition",
        },
        {
          label: "Product surface",
          kind: "External listing",
          state: ["Documented"],
          detail: "A current Teambotics product listing was checked as external documentation; it is not proof of a current EasyBuddy app deployment.",
          source: "https://www.teambotics.app/products/easybuddy",
        },
      ],
      links: [
        { label: "Read about EasyBuddy", href: "https://www.teambotics.app/products/easybuddy" },
        { label: "View source", href: "https://github.com/Teambotics-BackBurner/EasyBuddy-AutoEdition" },
      ],
    },
  ],
  close: {
    thankYou: "Thank you for the conversation.",
    text:
      "This page is a snapshot of how I work: shipped work, documentation, proposals, and experiments stay visibly distinct.",
  },
};

const projectEvidence = Object.freeze([
  pageContent.boardy,
  ...pageContent.projects,
]);

const contentExports = { evidenceStates, pageContent, projectEvidence };

if (typeof module !== "undefined" && module.exports) {
  module.exports = contentExports;
}

if (typeof globalThis !== "undefined") {
  globalThis.TribalScaleContent = contentExports;
}
