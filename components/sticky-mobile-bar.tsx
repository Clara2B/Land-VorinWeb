import { TrackedLink } from "@/components/tracked-link";
import { buttonVariants } from "@/components/ui/button";

/**
 * Barra fixa exclusiva do mobile lembrando o preço de entrada e levando
 * até os planos. Fica acima da área segura do navegador (env safe-area)
 * e não sobrepõe o botão flutuante do WhatsApp (ver bottom-offset dele).
 */
export function StickyMobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 px-4 py-2.5 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-200">
          Planos a partir de <span className="text-brand-light">R$ 499,90</span>
        </p>
        <TrackedLink
          href="#planos"
          event="click_hero_cta"
          eventPayload={{ button_location: "sticky_bar" }}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Ver planos
        </TrackedLink>
      </div>
    </div>
  );
}
