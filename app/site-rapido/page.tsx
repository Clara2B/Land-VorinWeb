import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PlanCard } from "@/components/plan-card";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cases } from "@/data/cases";

export const metadata: Metadata = {
  title: "Site profissional rápido | VorinWeb",
  description:
    "Escolha um modelo pronto ou personalizável e receba seu site no WhatsApp. Peça agora sua cotação com a VorinWeb.",
  robots: { index: false, follow: false },
};

const MODELOS = ["Landing Page", "Site Portfólio", "Site Institucional", "E-commerce"] as const;

const genericWhatsappHref = whatsappLink(
  "Olá! Vim pelo Instagram e tenho uma dúvida sobre os sites da VorinWeb.",
);

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.01 2c-5.51 0-9.98 4.47-9.98 9.98 0 1.76.46 3.48 1.34 5L2 22l5.17-1.35a9.96 9.96 0 0 0 4.84 1.23h.01c5.51 0 9.98-4.47 9.98-9.98S17.52 2 12.01 2Zm0 18.13h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.07.8.82-2.99-.19-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.66-8.16 8.15-8.16 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.15-8.16 8.15Zm4.47-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14-.01-.31-.01-.47-.01a.9.9 0 0 0-.65.31c-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 10.5 8 14l8-8" />
    </svg>
  );
}

interface FeatureListProps {
  items: readonly string[];
}

function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="mb-1.5 space-y-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-1 text-[10px] leading-snug text-slate-400 sm:text-[11px]"
        >
          <CheckIcon className="mt-0.5 h-2.5 w-2.5 shrink-0 text-brand-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface ModelChipsProps {
  planLabel: string;
  price: string;
}

function ModelChips({ planLabel, price }: ModelChipsProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-1.5">
        {MODELOS.map((modelo) => (
          <Link
            key={modelo}
            href={whatsappLink(
              `Olá! Vim pelo Instagram e quero contratar o ${planLabel} (${price}) - ${modelo}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800/60 px-1.5 py-1.5 text-center text-[11px] font-semibold leading-tight text-slate-200 transition-colors hover:border-brand-light hover:bg-brand/10 hover:text-brand-light"
          >
            <WhatsAppIcon className="h-3 w-3 shrink-0 text-[#25D366]" />
            <span>{modelo}</span>
          </Link>
        ))}
      </div>
      <p className="mt-1 text-center text-[9px] text-slate-500 sm:text-[10px]">
        Toque no modelo e fale direto com a gente
      </p>
    </div>
  );
}

export default function SiteRapidoPage() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-900 bg-slate-950 py-1">
        <Section className="flex items-center justify-center">
          <span className="text-base font-extrabold tracking-tight">
            <span className="text-white">Vorin</span>
            <span className="text-brand-light">Web</span>
          </span>
        </Section>
      </header>

      <main className="flex flex-1 flex-col justify-center py-2.5">
        <Section className="flex flex-col items-center text-center">
          <h1 className="text-xl font-extrabold leading-tight text-white sm:text-3xl">
            Seu site profissional no ar em poucos dias
          </h1>
          <p className="mt-1 max-w-md text-xs text-slate-400 sm:text-base">
            Escolha o plano ideal, selecione o modelo e fale agora com a{" "}
            {siteConfig.name} pelo WhatsApp.
          </p>
        </Section>

        <Section className="mt-6 grid grid-cols-1 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          <PlanCard title="Modelo Pronto" price="R$499,90" description="Escolha um modelo pré-pronto e tenha seu site no ar em 2 dias.">
            <FeatureList
              items={["Domínio e hospedagem inclusos", "Publicado em até 2 dias", "Logo, cores e tipografia sua"]}
            />
            <p className="mb-1.5 text-[11px] font-semibold text-slate-300 sm:text-xs">Escolha o modelo:</p>
            <ModelChips planLabel="Modelo Pronto" price="R$499,90" />
          </PlanCard>

          <PlanCard
            title="Modelo Personalizável"
            price="R$549,90"
            description="4 modelos, alterações no que quiser e até 10 abas — o site que vende por você."
            featured
            badge="Mais escolhido"
          >
            <FeatureList
              items={["Estrutura e conteúdo sob medida", "Até 10 abas", "Ideal pra quem quer vender mais"]}
            />
            <p className="mb-1.5 text-[11px] font-semibold text-slate-300 sm:text-xs">Escolha o modelo:</p>
            <ModelChips planLabel="Modelo Personalizável" price="R$549,90" />
          </PlanCard>

          <PlanCard
            title="Sob Medida"
            description="Tem o produto, tem a qualidade, mas não tem um site à altura? Peça agora uma cotação personalizada."
          >
            <Link
              href={whatsappLink(
                "Olá! Vim pelo Instagram e quero uma cotação personalizada para o site do meu negócio.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "whatsapp", size: "default", className: "mt-3 w-full" })}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedir cotação
            </Link>
          </PlanCard>
        </Section>

        <Section className="mt-4 flex flex-col items-center border-t border-slate-900 pt-3 text-center sm:mt-5 sm:pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
            Empresas que a {siteConfig.name} já ajudou a escalar
          </p>
          <div className="mt-2 flex flex-wrap items-start justify-center gap-3 sm:gap-6">
            {cases.map((item) => (
              <div key={item.name} className="flex w-40 flex-col items-center gap-1.5 sm:w-44">
                <div className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-800 bg-white/95 px-3 sm:h-14">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-h-8 w-auto object-contain sm:max-h-10"
                  />
                </div>
                <p className="text-[9px] leading-snug text-slate-500 sm:text-[10px]">{item.result}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <Link
        href={genericWhatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-3 right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}
