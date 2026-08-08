/**
 * Ponte com o dataLayer do Google Tag Manager. Os pushes já acontecem
 * independente de o GTM/Meta Pixel estarem instalados — quando os IDs
 * reais forem adicionados (ver app/layout.tsx), basta configurar os
 * gatilhos no GTM usando estes nomes de evento, sem alterar código.
 */
export const TRACKING_EVENTS = {
  viewSiteRapido: "view_site_rapido",
  clickHeroCta: "click_hero_cta",
  viewModels: "view_models",
  selectModel: "select_model",
  viewPricing: "view_pricing",
  selectEssentialPlan: "select_essential_plan",
  selectProfessionalPlan: "select_professional_plan",
  requestCustomProject: "request_custom_project",
  clickWhatsapp: "click_whatsapp",
  viewFaq: "view_faq",
  clickFinalCta: "click_final_cta",
} as const;

export type TrackingEventName = (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];

export interface TrackingEventPayload {
  plan_name?: string;
  plan_value?: number;
  model_name?: string;
  button_location?: string;
  page_path?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayerEvent(event: TrackingEventName, payload: TrackingEventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
