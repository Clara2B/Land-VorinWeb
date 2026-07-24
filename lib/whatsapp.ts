import { siteConfig } from "@/lib/site-config";

export interface WhatsappLinkOptions {
  /** Texto principal da mensagem, igual ao que a pessoa vê no WhatsApp. */
  message: string;
  /** Seção/CTA de origem, ex: "HERO", "PLANOS", "MODELOS", "CTA_FINAL". */
  origin: string;
  plan?: string;
  model?: string;
}

/**
 * Monta um link wa.me para o WhatsApp da VorinWeb com uma mensagem
 * pré-preenchida e marcadores discretos de origem/plano/modelo no fim
 * do texto, para facilitar identificar de onde veio o contato.
 */
export function buildWhatsappLink({ message, origin, plan, model }: WhatsappLinkOptions) {
  const tags = [`[ORIGEM: ${origin}]`];
  if (plan) tags.push(`[PLANO: ${plan}]`);
  if (model) tags.push(`[MODELO: ${model}]`);

  const fullMessage = `${message}\n\n${tags.join(" ")}`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
}
