(function () {
  "use strict";

  /* ---- Stage explorer -------------------------------------------------- */
  var STAGES = [
    {
      name: "Human intent",
      generic: "Every production starts with a person deciding what should exist and why. The system never invents the goal.",
      visual: "A story and a panel brief define what each frame must show.",
      audio: "An operator chooses a source and states the audience, delivery and preservation rules."
    },
    {
      name: "Source or brief, plus canon",
      generic: "Canonical material is kept apart from anything generated from it, so there is always something to check the output against.",
      visual: "Approved reference images for characters, locations, entities, interfaces and style, each with a stable ID and a draft, approved or retired state.",
      audio: "The source conversation or document stays canonical and read-only, recorded with its provenance and a content hash."
    },
    {
      name: "Intelligent direction",
      generic: "Models and agents do the work that needs judgment: interpreting the brief, making creative choices, proposing edits.",
      visual: "A vision-language model reads the brief and the references and decides camera, composition, lighting and continuity.",
      audio: "Specialist Writer's Room roles advise on tightening, structure and audience; one producer resolves their advice."
    },
    {
      name: "Strict production contract",
      generic: "Judgment crosses a hard boundary: a validated, structured document. Nothing downstream improvises.",
      visual: "A schema-validated JSON panel description: camera, composition, lighting, continuity and prompt.",
      audio: "A versioned episode contract: ordered segments, speaker, spoken text, performance direction, pauses and source references."
    },
    {
      name: "Deterministic orchestration",
      generic: "Ordinary code does the repetitive, expensive scheduling, so the same inputs produce the same run.",
      visual: "Preflight checks run before any GPU work; seeds, render order and references are fixed; one panel renders at a time.",
      audio: "The cast registry resolves each speaker to a persistent voice, and a recording queue schedules segments."
    },
    {
      name: "Generative engine",
      generic: "The model does the rendering, behind an interface that can change without breaking the contract.",
      visual: "Local reference-conditioned image generation, preserving the approved canon across frames.",
      audio: "Local text-to-speech behind an adapter boundary, rendering one segment at a time."
    },
    {
      name: "Validate, retry, resume",
      generic: "Failure is expected and designed for. Only the part that failed is redone.",
      visual: "Stop on failure, checkpoint, resume by hash rather than by file presence, and recover from a known out-of-memory state.",
      audio: "Technical validation of each segment; a weak or failed line is regenerated on its own."
    },
    {
      name: "Produced artifact",
      generic: "The deliverable is assembled from validated parts.",
      visual: "A finished comic frame, sequenced into an issue.",
      audio: "An assembled, loudness-normalised and mastered episode, with a manifest of how it was made."
    },
    {
      name: "Human acceptance",
      generic: "Automation can prove that a file rendered. A person decides whether it is good.",
      visual: "Creative review of the frames before they count as done.",
      audio: "A listening review against a checklist, bound to the exact audio hash, so a changed file needs a new approval."
    }
  ];

  var root = document.querySelector("[data-explorer]");
  if (root) {
    var rail = root.querySelector(".explorer__rail");
    var panel = root.querySelector(".explorer__panel");
    var n = panel.querySelector(".explorer__n");
    var title = panel.querySelector(".explorer__title");
    var generic = panel.querySelector(".explorer__generic");
    var vis = panel.querySelector('[data-lane="visual"]');
    var aud = panel.querySelector('[data-lane="audio"]');
    var tabs = [];

    var pad = function (i) { return (i < 9 ? "0" : "") + (i + 1); };

    var select = function (i, focus) {
      var s = STAGES[i];
      tabs.forEach(function (t, j) {
        var on = j === i;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      n.textContent = "STAGE " + pad(i) + " / " + pad(STAGES.length - 1);
      title.textContent = s.name;
      generic.textContent = s.generic;
      vis.textContent = s.visual;
      aud.textContent = s.audio;
      panel.setAttribute("aria-labelledby", "stage-" + i);
      if (focus) tabs[i].focus();
    };

    STAGES.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "stage";
      b.id = "stage-" + i;
      b.setAttribute("role", "tab");
      var num = document.createElement("span");
      num.className = "mono";
      num.textContent = pad(i);
      var label = document.createElement("span");
      label.textContent = s.name;
      b.appendChild(num);
      b.appendChild(label);
      b.addEventListener("click", function () { select(i, false); });
      b.addEventListener("keydown", function (e) {
        var k = e.key, next = null;
        if (k === "ArrowDown" || k === "ArrowRight") next = (i + 1) % STAGES.length;
        else if (k === "ArrowUp" || k === "ArrowLeft") next = (i - 1 + STAGES.length) % STAGES.length;
        else if (k === "Home") next = 0;
        else if (k === "End") next = STAGES.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
      rail.appendChild(b);
      tabs.push(b);
    });
    select(2, false);
  }

  /* ---- Audio take selector -------------------------------------------- */
  var player = document.querySelector("[data-player]");
  if (player) {
    var audio = player.querySelector("[data-audio]");
    var now = player.querySelector("[data-now]");
    var blurb = player.querySelector("[data-blurb]");
    var takes = Array.prototype.slice.call(player.querySelectorAll(".take"));
    takes.forEach(function (t) {
      t.addEventListener("click", function () {
        takes.forEach(function (o) { o.setAttribute("aria-pressed", o === t ? "true" : "false"); });
        audio.pause();
        audio.src = t.getAttribute("data-src");
        audio.load();
        now.textContent = t.getAttribute("data-ed") + " · " + t.getAttribute("data-dl");
        blurb.textContent = t.getAttribute("data-blurb");
      });
    });
  }
})();
