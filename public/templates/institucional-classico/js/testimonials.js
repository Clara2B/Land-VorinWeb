/**
 * Slider de depoimentos: setas, dots e troca automática a cada 7s
 * (pausada ao interagir ou quando a aba não está visível).
 */
export function initTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");
  const dotsWrap = document.getElementById("testimonialDots");

  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir para o depoimento ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  }

  function goTo(newIndex, userTriggered) {
    index = (newIndex + slides.length) % slides.length;
    render();
    if (userTriggered) restartAutoplay();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(next, 7000);
  }

  nextBtn?.addEventListener("click", () => goTo(index + 1, true));
  prevBtn?.addEventListener("click", () => goTo(index - 1, true));

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && timer) clearInterval(timer);
    else restartAutoplay();
  });

  render();
  restartAutoplay();
}
