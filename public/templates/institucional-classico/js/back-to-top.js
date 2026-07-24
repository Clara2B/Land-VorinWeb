/**
 * Botão flutuante "voltar ao topo": aparece depois de rolar uma tela.
 */
export function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  function onScroll() {
    button.dataset.visible = String(window.scrollY > window.innerHeight * 0.8);
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  });

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
