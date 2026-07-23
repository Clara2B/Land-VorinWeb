export const siteConfig = {
  name: "VorinWeb",
  whatsappNumber: "5511939490204",
};

/**
 * Monta um link wa.me para o WhatsApp da VorinWeb com uma mensagem
 * pré-preenchida (o usuário só precisa apertar "enviar").
 */
export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
