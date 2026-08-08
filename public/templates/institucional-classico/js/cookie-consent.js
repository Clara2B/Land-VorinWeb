/**
 * Aviso de cookies (LGPD). Guarda a escolha em localStorage para não
 * repetir a cada visita. Sem nenhum cookie/script de terceiros sendo
 * de fato carregado aqui — é só o aviso; conecte a decisão real do
 * usuário ao seu gerenciador de tags (ex: só carregar GTM se aceito).
 */
const STORAGE_KEY = "cookie-consent";

export function initCookieConsent() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.setTimeout(() => banner.setAttribute("data-visible", "true"), 800);
  }

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.setAttribute("data-visible", "false");
  }

  document.getElementById("cookieAccept")?.addEventListener("click", () => choose("accepted"));
  document.getElementById("cookieDecline")?.addEventListener("click", () => choose("declined"));
}
