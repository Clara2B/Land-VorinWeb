/**
 * Revela elementos [data-reveal] com um fade+slide sutil quando entram na
 * viewport. Importante: o CSS nunca esconde [data-reveal] por padrão — é
 * este módulo que adiciona a classe .reveal-init (e só então o elemento
 * fica oculto até ser revelado). Assim, se o script não rodar por algum
 * motivo, o conteúdo continua visível em vez de sumir da página.
 */
export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (typeof IntersectionObserver === "undefined") {
    // Sem suporte a IntersectionObserver: não esconde nada, mostra tudo direto.
    return;
  }

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
