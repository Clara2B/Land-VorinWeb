/**
 * Header: fundo sólido ao rolar, barra de progresso do scroll e menu mobile.
 */
export function initHeader() {
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const navBackdrop = document.getElementById("navBackdrop");

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

  if (!nav || !navToggle) return;

  function setMenuOpen(open) {
    nav.dataset.open = String(open);
    navBackdrop?.setAttribute("data-open", String(open));
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  navToggle.addEventListener("click", () => {
    setMenuOpen(nav.dataset.open !== "true");
  });

  navBackdrop?.addEventListener("click", () => setMenuOpen(false));

  nav.querySelectorAll(".nav-link, .header-actions a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.dataset.open === "true") {
      setMenuOpen(false);
      navToggle.focus();
    }
  });
}
