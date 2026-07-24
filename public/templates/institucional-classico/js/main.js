/**
 * Ponto de entrada único do template. Cada seção interativa vive no seu
 * próprio módulo — importe/rode só o que a página realmente usa.
 */
import { initHeader } from "./header.js";
import { initReveal } from "./reveal.js";
import { initCounters } from "./counters.js";
import { initTestimonials } from "./testimonials.js";
import { initModals } from "./modal.js";
import { initForm } from "./form.js";
import { initCookieConsent } from "./cookie-consent.js";
import { initBackToTop } from "./back-to-top.js";

function initFooterYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = String(new Date().getFullYear());
}

function init() {
  initHeader();
  initReveal();
  initCounters();
  initTestimonials();
  initModals();
  initForm();
  initCookieConsent();
  initBackToTop();
  initFooterYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
