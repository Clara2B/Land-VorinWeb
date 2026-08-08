/* ==========================================================================
   PORTFÓLIO PROFISSIONAL — script.js
   ==========================================================================
   JavaScript puro, sem dependências, carregado com `defer`. O tema
   (claro/escuro) é decidido por um script inline e síncrono no <head>
   do HTML, antes deste arquivo — veja o comentário lá para entender por
   quê (evita flash da cor errada).

   Índice:
     1. Rastreamento (dataLayer)
     2. Tema claro/escuro (toggle)
     3. Header / menu mobile / scroll progress
     4. Tela de entrada (intro)
     5. Revelação de conteúdo ao rolar
     6. Contadores animados
     7. Filtros de projetos
     8. Modal genérico + Lightbox de imagens
     9. Depoimentos (arrastar com o mouse)
     10. Comparador antes/depois (projeto.html)
     11. Formulário
     12. Banner de cookies (LGPD)
     13. Scroll depth (50% / 90%) + back-to-top
     14. Inicialização
   ========================================================================== */

/* --------------------------------------------------------------------
   1. RASTREAMENTO
-------------------------------------------------------------------- */
function trackEvent(eventName, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

function initClickTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent(el.dataset.track, { label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60) });
    });
  });
}

/* --------------------------------------------------------------------
   2. TEMA CLARO/ESCURO
   A escolha manual do usuário é salva em localStorage; sem escolha
   salva, segue prefers-color-scheme (ver style.css). O <html> já
   recebe o atributo correto antes do CSS pintar (script inline no
   <head>) — aqui só cuidamos do clique no botão.
-------------------------------------------------------------------- */
const THEME_KEY = "theme-preference";

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    toggle.setAttribute("aria-pressed", String(next === "dark"));
  });

  const isDark = document.documentElement.getAttribute("data-theme") === "dark"
    || (!localStorage.getItem(THEME_KEY) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  toggle.setAttribute("aria-pressed", String(isDark));
}

/* --------------------------------------------------------------------
   3. HEADER / MENU MOBILE / SCROLL PROGRESS
-------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  if (!header) return;

  const SOLID_THRESHOLD = 24;
  function onScroll() {
    header.classList.toggle("header--solid", window.scrollY > SOLID_THRESHOLD);
    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const navBackdrop = document.getElementById("navBackdrop");
  if (!nav || !navToggle) return;

  function setOpen(open) {
    nav.dataset.open = String(open);
    navBackdrop?.setAttribute("data-open", String(open));
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  navToggle.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
  navBackdrop?.addEventListener("click", () => setOpen(false));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.dataset.open === "true") {
      setOpen(false);
      navToggle.focus();
    }
  });
}

/* --------------------------------------------------------------------
   4. TELA DE ENTRADA (intro)
   Rápida e opcional — some sozinha após um tempo curto ou assim que a
   página termina de carregar (o que vier primeiro). Se o usuário
   pedir menos movimento, o CSS já a esconde por completo.
-------------------------------------------------------------------- */
function initIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;

  const fill = intro.querySelector(".intro-bar-fill");
  requestAnimationFrame(() => { if (fill) fill.style.width = "100%"; });

  const hide = () => intro.setAttribute("data-hidden", "true");
  window.setTimeout(hide, 900);
  window.addEventListener("load", () => window.setTimeout(hide, 300), { once: true });
}

/* --------------------------------------------------------------------
   5. SCROLL REVEAL
   O CSS nunca esconde [data-reveal] por padrão — é este módulo que
   aplica a classe .reveal-init (escondendo) e só então
   [data-visible="true"] (revelando). Se o script não rodar, o
   conteúdo continua visível.
-------------------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length || typeof IntersectionObserver === "undefined") return;

  targets.forEach((el) => el.classList.add("reveal-init"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  targets.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------
   6. CONTADORES ANIMADOS
-------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length || typeof IntersectionObserver === "undefined") return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animate(el) {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix ?? "";
    if (reduceMotion || Number.isNaN(target)) return;
    const duration = 1300;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}${suffix}`;
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------
   7. FILTROS DE PROJETOS
-------------------------------------------------------------------- */
function initFilters() {
  const filterBar = document.getElementById("projectFilters");
  const cards = document.querySelectorAll("[data-project-card]");
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");

    const category = btn.dataset.filter;
    trackEvent("use_filter", { category });

    cards.forEach((card) => {
      const matches = category === "todos" || card.dataset.category === category;
      card.classList.toggle("is-filtered-out", !matches);
    });
  });
}

/* --------------------------------------------------------------------
   8. MODAL GENÉRICO + LIGHTBOX DE IMAGENS
-------------------------------------------------------------------- */
function getFocusable(container) {
  return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'));
}

function initModals() {
  const openTriggers = document.querySelectorAll("[data-modal-open]");
  if (!openTriggers.length) return;
  let lastTrigger = null;

  function openModal(overlay, trigger) {
    lastTrigger = trigger;
    overlay.dataset.open = "true";
    document.body.style.overflow = "hidden";
    (getFocusable(overlay)[0] ?? overlay).focus();

    function trap(event) {
      if (event.key === "Escape") return closeModal(overlay);
      if (event.key !== "Tab") return;
      const items = getFocusable(overlay);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    overlay._trapHandler = trap;
    overlay.addEventListener("keydown", trap);
  }

  function closeModal(overlay) {
    overlay.dataset.open = "false";
    document.body.style.overflow = "";
    if (overlay._trapHandler) overlay.removeEventListener("keydown", overlay._trapHandler);
    lastTrigger?.focus();
  }

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const overlay = document.getElementById(trigger.dataset.modalOpen);
      if (overlay) openModal(overlay, trigger);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => { if (event.target === overlay) closeModal(overlay); });
    overlay.querySelectorAll("[data-modal-close]").forEach((btn) => btn.addEventListener("click", () => closeModal(overlay)));
  });
}

function initLightbox() {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;
  const img = overlay.querySelector("img");
  const caption = overlay.querySelector(".lightbox-caption");
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (!triggers.length) return;

  let index = 0;
  let lastTrigger = null;

  function show(i) {
    index = (i + triggers.length) % triggers.length;
    const trigger = triggers[index];
    const fullSrc = trigger.dataset.lightbox || trigger.querySelector("img")?.src;
    const label = trigger.dataset.caption || trigger.querySelector("img")?.alt || "";
    img.src = fullSrc;
    img.alt = label;
    if (caption) caption.textContent = label;
  }

  function open(i, trigger) {
    lastTrigger = trigger;
    show(i);
    overlay.dataset.open = "true";
    document.body.style.overflow = "hidden";
    overlay.querySelector(".lightbox-close")?.focus();
  }

  function close() {
    overlay.dataset.open = "false";
    document.body.style.overflow = "";
    lastTrigger?.focus();
  }

  triggers.forEach((trigger, i) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      open(i, trigger);
    });
  });

  overlay.querySelector(".lightbox-close")?.addEventListener("click", close);
  overlay.querySelector(".lightbox-prev")?.addEventListener("click", () => show(index - 1));
  overlay.querySelector(".lightbox-next")?.addEventListener("click", () => show(index + 1));
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });

  document.addEventListener("keydown", (event) => {
    if (overlay.dataset.open !== "true") return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
}

/* --------------------------------------------------------------------
   9. DEPOIMENTOS — arrastar com o mouse no desktop (no touch já
   funciona com rolagem nativa via -webkit-overflow-scrolling).
-------------------------------------------------------------------- */
function initDragScroll() {
  const track = document.querySelector(".testimonials-scroll");
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("pointerdown", (event) => {
    isDown = true;
    startX = event.clientX;
    scrollLeft = track.scrollLeft;
  });
  window.addEventListener("pointerup", () => { isDown = false; });
  window.addEventListener("pointercancel", () => { isDown = false; });
  track.addEventListener("pointermove", (event) => {
    if (!isDown) return;
    track.scrollLeft = scrollLeft - (event.clientX - startX);
  });
}

/* --------------------------------------------------------------------
   10. COMPARADOR ANTES/DEPOIS (projeto.html)
-------------------------------------------------------------------- */
function initCompareSlider() {
  const slider = document.querySelector(".compare-slider");
  if (!slider) return;
  const after = slider.querySelector(".compare-media--after");
  const handle = slider.querySelector(".compare-handle");
  let dragging = false;

  function setPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  }

  handle.addEventListener("pointerdown", () => { dragging = true; });
  window.addEventListener("pointerup", () => { dragging = false; });
  window.addEventListener("pointermove", (event) => { if (dragging) setPosition(event.clientX); });
  slider.addEventListener("click", (event) => setPosition(event.clientX));

  handle.setAttribute("tabindex", "0");
  handle.setAttribute("role", "slider");
  handle.setAttribute("aria-label", "Comparar antes e depois");
  handle.setAttribute("aria-valuemin", "0");
  handle.setAttribute("aria-valuemax", "100");
  handle.addEventListener("keydown", (event) => {
    const rect = slider.getBoundingClientRect();
    const current = parseFloat(handle.style.left) || 50;
    if (event.key === "ArrowLeft") setPosition(rect.left + (rect.width * Math.max(0, current - 5)) / 100);
    if (event.key === "ArrowRight") setPosition(rect.left + (rect.width * Math.min(100, current + 5)) / 100);
  });
}

/* --------------------------------------------------------------------
   11. FORMULÁRIO
-------------------------------------------------------------------- */
const formValidators = {
  name: (v) => v.trim().length >= 3,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  company: () => true,
  projectType: () => true,
  budget: () => true,
  timeline: () => true,
  message: (v) => v.trim().length >= 10,
  consent: (v, el) => el.checked,
};

function maskPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d*)/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
}

function validateField(fieldWrap) {
  const input = fieldWrap.querySelector("input, textarea, select");
  const name = input?.name;
  if (!input || !formValidators[name]) return true;
  const valid = formValidators[name](input.value, input);
  const required = input.hasAttribute("required");
  fieldWrap.dataset.invalid = String(required && !valid);
  return !required || valid;
}

function initForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  const phoneInput = form.querySelector("#field-phone");
  phoneInput?.addEventListener("input", (e) => { e.target.value = maskPhone(e.target.value); });

  const fields = Array.from(form.querySelectorAll("[data-field]"));
  fields.forEach((fieldWrap) => {
    const input = fieldWrap.querySelector("input, textarea, select");
    input?.addEventListener("blur", () => validateField(fieldWrap));
    input?.addEventListener("change", () => validateField(fieldWrap));
  });

  if (typeof IntersectionObserver !== "undefined") {
    const viewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent("view_form");
            viewObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    viewObserver.observe(form);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      window.location.href = "obrigado.html";
      return;
    }

    const results = fields.map(validateField);
    const firstInvalid = fields.find((f) => f.dataset.invalid === "true");
    if (firstInvalid) {
      firstInvalid.querySelector("input, textarea, select")?.focus();
      return;
    }
    if (!results.every(Boolean)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn?.setAttribute("data-loading", "true");
    submitBtn?.setAttribute("disabled", "true");

    // ------------------------------------------------------------------
    // INTEGRAÇÃO: troque este bloco pelo envio real antes de publicar.
    //
    // (a) FormSubmit (sem backend):
    //   form.action = "https://formsubmit.co/seuemail@dominio.com";
    //   form.method = "POST";
    //   form.submit(); // remova o preventDefault() acima
    //
    // (b) EmailJS:
    //   emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", form)
    //     .then(() => { trackEvent("form_submit"); window.location.href = "obrigado.html"; })
    //     .catch(() => showFormError(form));
    //
    // (c) Webhook / API própria:
    //   fetch("https://sua-api.com/leads", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(Object.fromEntries(new FormData(form))),
    //   })
    //     .then((res) => (res.ok ? (trackEvent("form_submit"), window.location.href = "obrigado.html") : showFormError(form)))
    //     .catch(() => showFormError(form));
    //
    // Por padrão (sem serviço conectado), simulamos o envio e redirecionamos:
    // ------------------------------------------------------------------
    window.setTimeout(() => {
      trackEvent("form_submit");
      window.location.href = "obrigado.html";
    }, 700);
  });
}

function showFormError(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.removeAttribute("data-loading");
  submitBtn?.removeAttribute("disabled");
  const error = document.getElementById("formGenericError");
  if (error) error.hidden = false;
}

/* --------------------------------------------------------------------
   12. BANNER DE COOKIES (LGPD)
-------------------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  const STORAGE_KEY = "cookie-consent";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) window.setTimeout(() => banner.setAttribute("data-visible", "true"), 900);

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.setAttribute("data-visible", "false");
  }
  document.getElementById("cookieAccept")?.addEventListener("click", () => choose("accepted"));
  document.getElementById("cookieDecline")?.addEventListener("click", () => choose("declined"));
}

/* --------------------------------------------------------------------
   13. SCROLL DEPTH + BACK TO TOP
-------------------------------------------------------------------- */
function initScrollDepthTracking() {
  let fired50 = false;
  let fired90 = false;
  function onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = (window.scrollY / scrollable) * 100;
    if (!fired50 && pct >= 50) { fired50 = true; trackEvent("scroll_50"); }
    if (!fired90 && pct >= 90) { fired90 = true; trackEvent("scroll_90"); window.removeEventListener("scroll", onScroll); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;
  function onScroll() { button.dataset.visible = String(window.scrollY > window.innerHeight * 0.8); }
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------
   14. INICIALIZAÇÃO
-------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = String(new Date().getFullYear());
}

trackEvent("page_view", { page_path: window.location.pathname });
initClickTracking();
initThemeToggle();
initHeader();
initIntro();
initReveal();
initCounters();
initFilters();
initModals();
initLightbox();
initDragScroll();
initCompareSlider();
initForm();
initCookieConsent();
initScrollDepthTracking();
initBackToTop();
initFooterYear();
