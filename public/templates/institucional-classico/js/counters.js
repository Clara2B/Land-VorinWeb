/**
 * Números animados da seção "Resultados". Conta de 0 até data-counter
 * apenas quando o elemento entra na tela, respeitando reduced-motion
 * (nesse caso, mostra o valor final direto, sem contagem).
 */
export function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCounter(el) {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix ?? "";

    if (prefersReducedMotion || Number.isNaN(target)) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (typeof IntersectionObserver === "undefined") {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
}
