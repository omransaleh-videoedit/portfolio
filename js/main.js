/* ============================================================
   MAIN.JS
   Everything here is vanilla JS, no build step, no dependencies.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----------------------------------------------------------
     1. SMOOTH SCROLL
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* ----------------------------------------------------------
     2. PLAYHEAD RAIL
     ---------------------------------------------------------- */
  const sections = ["hero", "about", "services", "portfolio", "why", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const railFill = document.getElementById("railFill");
  const mobileRailFill = document.getElementById("mobileRailFill");
  const markers = document.querySelectorAll(".rail-marker");

  function updateRailProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    if (railFill) railFill.style.height = `${progress * 100}%`;
    if (mobileRailFill) mobileRailFill.style.width = `${progress * 100}%`;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        markers.forEach((m) => {
          m.classList.toggle("is-active", m.dataset.section === id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  window.addEventListener("scroll", updateRailProgress, { passive: true });
  updateRailProgress();

  /* ----------------------------------------------------------
     3. HERO AMBIENT WAVEFORM
     ---------------------------------------------------------- */
  const heroWaveform = document.getElementById("heroWaveform");
  if (heroWaveform) {
    const BAR_COUNT = 64;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement("span");
      bar.className = "hero__waveform-bar";
      const height = 15 + Math.round(Math.random() * 70);
      bar.style.setProperty("--h", `${height}%`);
      if (!prefersReducedMotion) {
        bar.style.setProperty("--delay", `${(Math.random() * 2).toFixed(2)}s`);
        bar.style.setProperty("--dur", `${(1.2 + Math.random() * 1.6).toFixed(2)}s`);
      }
      frag.appendChild(bar);
    }
    heroWaveform.appendChild(frag);
  }

  /* ----------------------------------------------------------
     4. SCROLL-TRIGGERED REVEALS
     ---------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".section-head, .about__grid, .clip-card, .why__row, .contact__grid, .portfolio__intro, .portfolio__filters"
  );
  revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ----------------------------------------------------------
     5. PORTFOLIO GALLERY
     ---------------------------------------------------------- */
  const grid = document.getElementById("portfolioGrid");
  const filtersBar = document.getElementById("portfolioFilters");

  function renderFilters(items) {
    const categories = ["All", ...new Set(items.map((i) => i.category))];
    filtersBar.innerHTML = categories
      .map(
        (cat, i) => `
        <button class="filter-pill ${i === 0 ? "is-active" : ""}" data-filter="${cat}" role="tab" aria-selected="${i === 0}">
          ${cat}
        </button>`
      )
      .join("");
  }

  function renderGrid(items, filter) {
    const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

    grid.innerHTML = visible
      .map((item, index) => {
        const posterStyle = item.posterSrc
          ? `style="background-image:url('${item.posterSrc}')"`
          : `style="background-image: var(--placeholder-${(index % 4) + 1})"`;

        return `
        <article class="video-card" data-index="${index}">
          <button class="video-card__frame" ${posterStyle} aria-label="Play: ${item.title}">
            <span class="video-card__play" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
            <span class="video-card__ratio-tag">9:16</span>
          </button>
          <div class="video-card__meta">
            <p class="video-card__title">${item.title}</p>
            ${item.client ? `<p class="video-card__client">${item.client}</p>` : ""}
          </div>
        </article>`;
      })
      .join("");

    grid.querySelectorAll(".video-card").forEach((card) => {
      card.setAttribute("data-reveal", "");
      revealObserver.observe(card);
    });

    grid.querySelectorAll(".video-card__frame").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.closest(".video-card").dataset.index);
        openLightbox(visible[idx]);
      });
    });
  }

  if (grid && filtersBar && typeof PORTFOLIO_ITEMS !== "undefined") {
    renderFilters(PORTFOLIO_ITEMS);
    renderGrid(PORTFOLIO_ITEMS, "All");

    filtersBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      filtersBar.querySelectorAll(".filter-pill").forEach((p) => {
        p.classList.toggle("is-active", p === btn);
        p.setAttribute("aria-selected", p === btn ? "true" : "false");
      });
      renderGrid(PORTFOLIO_ITEMS, btn.dataset.filter);
    });
  }

  /* ----------------------------------------------------------
     6. LIGHTBOX (إصلاح التشغيل المتعدد بنجاح)
     ---------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(item) {
    if (!lightbox || !item) return;
    lightboxCaption.textContent = item.title;

    let mediaContainer = lightbox.querySelector(".lightbox__media") || lightbox.querySelector(".lightbox__content");
    let currentVid = document.getElementById("lightboxVideo");

    if (item.videoSrc.includes("youtube.com") || item.videoSrc.includes("youtu.be")) {
      let embedUrl = item.videoSrc;
      if (!embedUrl.includes("autoplay=1")) {
        embedUrl += (embedUrl.includes("?") ? "&" : "?") + "autoplay=1";
      }
      
      const newIframe = document.createElement("iframe");
      newIframe.id = "lightboxVideo";
      newIframe.src = embedUrl;
      newIframe.frameBorder = "0";
      newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      newIframe.allowFullscreen = true;
      newIframe.style.cssText = "width:100%; height:100%; min-height:400px; border-radius:12px;";

      if (currentVid) {
        currentVid.replaceWith(newIframe);
      } else if (mediaContainer) {
        mediaContainer.appendChild(newIframe);
      }
    } else {
      const newVideo = document.createElement("video");
      newVideo.id = "lightboxVideo";
      newVideo.src = item.videoSrc;
      newVideo.controls = true;
      newVideo.autoplay = true;
      newVideo.style.cssText = "width:100%; height:100%;";

      if (currentVid) {
        currentVid.replaceWith(newVideo);
      } else if (mediaContainer) {
        mediaContainer.appendChild(newVideo);
      }
      newVideo.play().catch(() => {});
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    const currentVid = document.getElementById("lightboxVideo");
    if (currentVid) {
      currentVid.remove(); // مسح العناصر بالكامل لتأكيد إيقاف الصوت وإمكانية إنشائها من جديد
    }
  }

  if (lightbox) {
    lightbox.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeLightbox)
    );
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ----------------------------------------------------------
     7. CONTACT FORM
     ---------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in every field before sending.";
        statusEl.classList.add("is-error");
        return;
      }

      statusEl.classList.remove("is-error");
      statusEl.textContent = `Thanks, ${name} — message received. I'll reply by email shortly.`;
      form.reset();
    });
  }

  /* ----------------------------------------------------------
     8. FOOTER YEAR
     ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
