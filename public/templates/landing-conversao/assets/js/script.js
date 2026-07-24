/* ==========================================================================
   LANDING DE ALTA CONVERSÃO — script.js
   ==========================================================================
   JavaScript puro, sem dependências. Carregado com `defer` no final do
   <head>/<body> (ver index.html), então já roda com o DOM pronto — por
   isso não precisamos esperar DOMContentLoaded.

   Índice deste arquivo:
     1. Rastreamento (dataLayer)              -> trackEvent()
     2. Header / menu mobile
     3. Barra fixa mobile + botão WhatsApp
     4. Revelação de conteúdo ao rolar (scroll reveal)
     5. Contadores animados (seção Resultados)
     6. Modal genérico
     7. Formulário: máscara, validação, honeypot, envio
     8. Banner de cookies (LGPD)
     9. Eventos de scroll (50% / 90%)
     10. Inicialização
   ========================================================================== */

/* --------------------------------------------------------------------
   1. RASTREAMENTO
   Ponte com o dataLayer do Google Tag Manager / GA4. Os pushes já
   acontecem independente de GTM/GA4/Meta Pixel estarem instalados —
   veja no <head> do index.html onde inserir os IDs reais. Até lá, nada
   é enviado pra fora do navegador do visitante.
-------------------------------------------------------------------- */
function trackEvent(eventName, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

// Todo clique em link/botão com [data-track] dispara o evento nomeado no
// atributo, com o rótulo em [data-track-label] quando existir.
function initClickTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent(el.dataset.track, {
        label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60),
      });
    });
  });
}

/* --------------------------------------------------------------------
   2. HEADER / MENU MOBILE
-------------------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const backdrop = document.getElementById("navBackdrop");
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.dataset.open = String(open);
    backdrop?.setAttribute("data-open", String(open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
  backdrop?.addEventListener("click", () => setOpen(false));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------------------
   3. BARRA FIXA MOBILE + FLUTUANTE WHATSAPP
   A barra só aparece depois que a pessoa rola um pedaço da página
   (senão ela cobriria o próprio hero, que já tem o CTA principal).
-------------------------------------------------------------------- */
function initMobileCtaBar() {
  const bar = document.getElementById("mobileCtaBar");
  if (!bar) return;

  const SHOW_AFTER_PX = 480;
  let ticking = false;

  function update() {
    bar.dataset.visible = String(window.scrollY > SHOW_AFTER_PX);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );

  update();
}

/* --------------------------------------------------------------------
   4. SCROLL REVEAL
   Importante: o CSS nunca esconde [data-reveal] por padrão. É este
   módulo que aplica a classe .reveal-init (escondendo o elemento) e só
   então [data-visible="true"] (revelando). Se o script falhar por
   qualquer motivo, o conteúdo nunca fica invisível.
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
   5. CONTADORES ANIMADOS
   O HTML já traz o valor final como texto (ex: "500+"). Este módulo só
   anima a contagem quando o JS roda; sem JS, o valor final continua
   visível normalmente.
-------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

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

  if (typeof IntersectionObserver === "undefined") return;

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
   6. MODAL GENÉRICO
-------------------------------------------------------------------- */
function initModals() {
  const openTriggers = document.querySelectorAll("[data-modal-open]");
  if (!openTriggers.length) return;

  let lastTrigger = null;

  function getFocusable(modal) {
    return Array.from(modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'));
  }

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
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll("[data-modal-close]").forEach((btn) => btn.addEventListener("click", () => closeModal(overlay)));
  });
}

/* --------------------------------------------------------------------
   7. FORMULÁRIO
-------------------------------------------------------------------- */
const formValidators = {
  name: (v) => v.trim().length >= 3,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  company: () => true,
  service: () => true,
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

  // view_form (dispara uma vez, quando o formulário entra na tela)
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

    // Honeypot: campo invisível que só um bot preencheria. Se vier
    // preenchido, finge sucesso e não faz nada (não avisa o bot).
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      showFormSuccess(form);
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
    // INTEGRAÇÃO: troque este bloco pelo envio real quando for publicar
    // para um cliente. Três caminhos comuns, prontos pra adaptar:
    //
    // (a) FormSubmit (sem backend):
    //   form.action = "https://formsubmit.co/seuemail@dominio.com";
    //   form.method = "POST";
    //   form.submit(); // e remova o preventDefault() acima
    //
    // (b) EmailJS:
    //   emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", form)
    //     .then(() => showFormSuccess(form))
    //     .catch(() => showFormError(form));
    //
    // (c) Webhook / API própria:
    //   fetch("https://sua-api.com/leads", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(Object.fromEntries(new FormData(form))),
    //   })
    //     .then((res) => (res.ok ? showFormSuccess(form) : showFormError(form)))
    //     .catch(() => showFormError(form));
    //
    // Por padrão (sem nenhum serviço conectado), só simulamos o envio:
    // ------------------------------------------------------------------
    window.setTimeout(() => {
      submitBtn?.removeAttribute("data-loading");
      submitBtn?.removeAttribute("disabled");
      showFormSuccess(form);
    }, 900);
  });
}

function showFormSuccess(form) {
  trackEvent("form_submit");
  const success = document.getElementById("formSuccess");
  if (success) success.hidden = false;
  form.reset();
  form.querySelectorAll("[data-field]").forEach((f) => (f.dataset.invalid = "false"));
  success?.scrollIntoView({ behavior: "smooth", block: "center" });

  // Se preferir redirecionar para obrigado.html em vez de mostrar a
  // mensagem inline, troque as linhas acima por:
  // window.location.href = "obrigado.html";
}

function showFormError(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.removeAttribute("data-loading");
  submitBtn?.removeAttribute("disabled");
  const error = document.getElementById("formGenericError");
  if (error) error.hidden = false;
}

/* --------------------------------------------------------------------
   8. BANNER DE COOKIES (LGPD)
-------------------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;

  const STORAGE_KEY = "cookie-consent";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.setTimeout(() => banner.setAttribute("data-visible", "true"), 800);
  }

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.setAttribute("data-visible", "false");
    // Só carregue scripts de rastreamento não essenciais (Meta Pixel,
    // Google Ads remarketing etc.) depois do "accepted" — o GTM/GA4
    // básico de medição já é considerado essencial na maioria dos
    // projetos, mas ajuste conforme a política de privacidade real.
  }

  document.getElementById("cookieAccept")?.addEventListener("click", () => choose("accepted"));
  document.getElementById("cookieDecline")?.addEventListener("click", () => choose("declined"));
}

/* --------------------------------------------------------------------
   9. EVENTOS DE SCROLL (50% / 90%)
-------------------------------------------------------------------- */
function initScrollDepthTracking() {
  let fired50 = false;
  let fired90 = false;

  function onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = (window.scrollY / scrollable) * 100;

    if (!fired50 && pct >= 50) {
      fired50 = true;
      trackEvent("scroll_50");
    }
    if (!fired90 && pct >= 90) {
      fired90 = true;
      trackEvent("scroll_90");
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------
   10. INICIALIZAÇÃO
-------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = String(new Date().getFullYear());
}

trackEvent("page_view", { page_path: window.location.pathname });
initClickTracking();
initNav();
initMobileCtaBar();
initReveal();
initCounters();
initModals();
initForm();
initCookieConsent();
initScrollDepthTracking();
initFooterYear();
