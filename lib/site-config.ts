/**
 * Configuração central da VorinWeb. Alterar preço, WhatsApp ou domínio
 * publicado aqui é o suficiente — nenhum outro arquivo deve duplicar
 * esses valores.
 */
export const siteConfig = {
  name: "VorinWeb",
  productName: "Site Rápido VorinWeb",
  whatsappNumber: "5511934900204",
  /**
   * URL pública canônica da página. Enquanto o domínio oficial não estiver
   * no ar, aponta para a URL provisória da Vercel. Quando o domínio final
   * for definido, troque apenas o valor abaixo (ou defina a env var
   * NEXT_PUBLIC_SITE_URL no projeto da Vercel) — todo o SEO (canonical,
   * Open Graph, dados estruturados) lê daqui.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorinweb-site-rapido.vercel.app",
  paymentMethods: ["Pix"],
  /**
   * Ainda não há um valor de renovação de domínio/hospedagem definido.
   * Use este texto em qualquer lugar que precise informar o valor —
   * não inventar um número.
   */
  domainRenewalNote: "O valor será informado previamente, conforme a necessidade do projeto.",
} as const;
