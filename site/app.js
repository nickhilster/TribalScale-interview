import "./content.js";

const { pageContent, projectEvidence } = globalThis.TribalScaleContent;

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const notes = {
  "ltb-buddy": "REAL WORKFLOWS<br />REAL GUARDRAILS.",
  code2motion: "A TECHNICAL IDEA<br />YOU CAN EXPLORE.",
  easybuddy: "MOBILE HELP<br />FOR REAL WORK.",
};

const renderLinks = (links, variant = "") => links.map((link) => `
  <a class="source-link ${variant}" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
    ${escapeHtml(link.label)} <span aria-hidden="true">↗</span>
  </a>`).join("");

const renderStatus = (states, accentClass = "status-mark-yellow") => states
  .map((state, stateIndex) => `<span class="status-mark ${stateIndex === 0 ? accentClass : ""}">${escapeHtml(state)}</span>`)
  .join("");

const renderMedia = (project) => {
  if (!project.media || !project.figma) return "";

  return `
    <figure class="artifact-frame" data-local-asset="${escapeHtml(project.figma.localAsset)}">
      <div class="artifact-label"><span>${escapeHtml(project.figma.label)}</span><span>Node ${escapeHtml(project.figma.nodeId)}</span></div>
      <img src="${escapeHtml(project.media.src)}" alt="${escapeHtml(project.media.alt)}" />
      <figcaption>${escapeHtml(project.figma.caption).replace("September 30, 2026", '<time datetime="2026-09-30">September 30, 2026</time>')}</figcaption>
    </figure>`;
};

const renderProject = (project, index) => {
  const hasMedia = Boolean(project.media && project.figma);
  const statusClass = project.slug === "ryfine" || project.slug === "easybuddy"
    ? "status-mark-blue"
    : "status-mark-yellow";
  const evidenceLabels = project.evidence.map((entry) => `${entry.kind}: ${entry.label}`).join(" · ");

  return `
    <article class="case-study case-study-${escapeHtml(project.slug)}" data-project-slug="${escapeHtml(project.slug)}" aria-labelledby="${escapeHtml(project.slug)}-title">
      <div class="case-study-index">${String(index + 1).padStart(2, "0")} <span>${escapeHtml(project.indexLabel)}</span></div>
      ${renderMedia(project)}
      <div class="case-study-copy">
        <p class="kicker">${escapeHtml(project.status[0])}</p>
        <h3 id="${escapeHtml(project.slug)}-title">${escapeHtml(project.title)}</h3>
        <p class="case-role">${escapeHtml(project.role)}</p>
        <p>${escapeHtml(project.summary)}</p>
        <div class="case-meta">${project.status.map((state, stateIndex) => `<span class="status-mark ${stateIndex === 0 ? statusClass : ""}">${escapeHtml(state)}</span>`).join("")}</div>
        <details class="disclosure" data-disclosure>
          <summary>Evidence trail</summary>
          <div class="disclosure-body">
            <p>${escapeHtml(evidenceLabels)}</p>
            <div class="source-links">${renderLinks(project.links)}</div>
          </div>
        </details>
      </div>
      ${hasMedia ? "" : `<div class="case-study-note" aria-hidden="true">${notes[project.slug] ?? "EVIDENCE, IN CONTEXT."}</div>`}
    </article>`;
};

function renderManifestContent() {
  const boardy = pageContent.boardy;
  const boardyRecord = projectEvidence.find((project) => project.slug === boardy.slug);
  const projectMount = document.querySelector("[data-project-mount]");
  const supportingProjects = pageContent.projects
    .map(({ slug }) => projectEvidence.find((project) => project.slug === slug))
    .filter(Boolean);

  document.querySelector("#supporting-title").textContent =
    `${supportingProjects.length} ways I apply the same thinking.`;

  const boardyEmailNote = boardy.emailNote;
  document.querySelector("[data-boardy-status]").innerHTML = renderStatus(boardyRecord.status);
  document.querySelector("[data-boardy-attribution]").innerHTML = `
    <strong>${escapeHtml(boardyEmailNote.title)}</strong> · ${escapeHtml(boardyEmailNote.source)} · ${escapeHtml(boardyEmailNote.date)}
    · ${escapeHtml(boardyEmailNote.attribution)}`;
  document.querySelector("[data-boardy-email-note]").innerHTML = `
    <p class="meta-label">${escapeHtml(boardyEmailNote.source)} · ${escapeHtml(boardyEmailNote.date)}</p>
    <p class="attribution">${escapeHtml(boardyEmailNote.attribution)}</p>
    ${boardyEmailNote.excerpts.map((excerpt) => `<p>${escapeHtml(excerpt)}</p>`).join("")}`;
  document.querySelector("[data-boardy-boundaries]").innerHTML = [
    ...boardy.boundaries,
    {
      label: `Symphony × Boardy · ${boardy.symphonyBoundary.status}`,
      text: boardy.symphonyBoundary.text,
    },
  ].map((boundary, index) => `
    <div>
      <span class="boundary-number">${String(index + 1).padStart(2, "0")}</span>
      <p><strong>${escapeHtml(boundary.label)}</strong><br />${escapeHtml(boundary.text)}</p>
    </div>`).join("");
  document.querySelector("[data-boardy-links]").innerHTML = renderLinks(boardyRecord.links, "source-link-light");
  projectMount.innerHTML = supportingProjects.map(renderProject).join("");
}

function wireDisclosures() {
  document.querySelectorAll("details[data-disclosure], details.disclosure").forEach((details, index) => {
    const summary = details.querySelector(":scope > summary");
    const panel = details.querySelector(":scope > .disclosure-body");
    if (!summary || !panel) return;

    const id = panel.id || `disclosure-panel-${index + 1}`;
    panel.id = id;
    summary.setAttribute("aria-controls", id);

    const syncState = () => summary.setAttribute("aria-expanded", String(details.open));
    syncState();
    details.addEventListener("toggle", syncState);
  });
}

function wireInPageNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", `#${targetId}`);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

function enableScrollReveal() {
  const revealElements = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) return;

  revealElements.forEach((element) => element.classList.add("reveal-ready"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  revealElements.forEach((element) => observer.observe(element));
}

function init() {
  renderManifestContent();
  wireDisclosures();
  wireInPageNavigation();
  enableScrollReveal();
}

document.addEventListener("DOMContentLoaded", init, { once: true });
