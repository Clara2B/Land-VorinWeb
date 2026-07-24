import Image from "next/image";

import type { SiteModel } from "@/data/models";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { LayoutIcon, WhatsAppIcon } from "@/components/icons";

interface ModelCardProps {
  model: SiteModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const whatsappHref = buildWhatsappLink({
    message: `Olá! Quero contratar o Site Rápido da VorinWeb e gostei do modelo ${model.name}. Gostaria de receber mais informações.`,
    origin: "MODELOS",
    model: model.name,
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="relative aspect-[4/3] w-full bg-slate-800">
        {model.previewImage ? (
          <Image
            src={model.previewImage}
            alt={`Prévia do modelo ${model.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 85vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600">
            <LayoutIcon className="h-8 w-8" />
            <span className="text-[10px] font-medium uppercase tracking-wide">Prévia em breve</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-light">
          {model.category}
        </span>
        <h3 className="mt-0.5 text-sm font-bold text-white">{model.name}</h3>
        <p className="mt-1 flex-1 text-xs leading-snug text-slate-400">{model.blurb}</p>

        <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
          {model.demoUrl && (
            <a
              href={model.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm", className: "flex-1" })}
            >
              Ver modelo
            </a>
          )}
          <TrackedLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            event="select_model"
            eventPayload={{ model_name: model.name }}
            className={buttonVariants({ variant: "whatsapp", size: "sm", className: "flex-1" })}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Escolher este modelo
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
