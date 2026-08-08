import type { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PlanCard } from "@/components/plan-card";
import { ModelCard } from "@/components/model-card";
import { ProjectCard } from "@/components/project-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { ComparisonTable } from "@/components/comparison-table";
import { StepItem } from "@/components/step-item";
import { StickyMobileBar } from "@/components/sticky-mobile-bar";
import { TrackedLink } from "@/components/tracked-link";
import { PageViewTracker } from "@/components/page-view-tracker";
import { SectionViewTracker } from "@/components/section-view-tracker";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { plans } from "@/data/plans";
import { siteModels } from "@/data/models";
import { cases } from "@/data/cases";
import { faqItems } from "@/data/faq";

const PAGE_PATH = "/site-rapido";

export const metadata: Metadata = {
  title: { absolute: "Site Profissional a partir de R$ 499,90 | VorinWeb" },
  description:
    "Tenha um site profissional para sua empresa a partir de R$ 499,90. Escolha um modelo, personalize sua marca e publique em poucos dias.",
  alternates: {
    canonical: `${siteConfig.url}${PAGE_PATH}`,
  },
  openGraph: {
    title: "Site Profissional a partir de R$ 499,90 | VorinWeb",
    description:
      "Tenha um site profissional para sua empresa a partir de R$ 499,90. Escolha um modelo, personalize sua marca e publique em poucos dias.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Profissional a partir de R$ 499,90 | VorinWeb",
    description:
      "Tenha um site profissional para sua empresa a partir de R$ 499,90. Escolha um modelo, personalize sua marca e publique em poucos dias.",
  },
  robots: { index: true, follow: true },
};

const heroIndicators = ["Pagamento único", "Site responsivo", "WhatsApp integrado"];

const painBenefits = [
  "Apresente seus serviços com mais clareza",
  "Transmita mais confiança",
  "Facilite pedidos de orçamento",
  "Tenha um endereço digital próprio",
  "Seja encontrado fora das redes sociais",
  "Centralize as informações da empresa",
];

const traditionalProject = [
  "Estrutura criada do zero",
  "Maior prazo",
  "Maior investimento",
  "Mais etapas de aprovação",
];

const siteRapidoHighlights = [
  "Estrutura profissional pronta",
  "Personalização da marca",
  "Processo simplificado",
  "Entrega mais rápida",
  "Investimento acessível",
];

const scopeExclusions = [
  "Criação de logotipo",
  "Produção profissional de fotos",
  "Produção de vídeos",
  "Redação de conteúdos extensos",
  "Cadastro de grande quantidade de produtos",
  "Loja virtual",
  "Sistema com login ou banco de dados",
  "Integrações avançadas",
  "Alterações ilimitadas",
  "Manutenção mensal ilimitada",
  "Gestão de tráfego pago",
  "Posicionamento garantido no Google",
];

const steps = [
  "Escolha o plano e o modelo",
  "Faça o pagamento",
  "Envie os materiais pelo briefing",
  "A VorinWeb personaliza o site",
  "Você revisa e solicita os ajustes incluídos",
  "O site é publicado",
];

const briefingMaterials = [
  "logo",
  "cores da marca",
  "textos",
  "imagens",
  "serviços",
  "telefone",
  "WhatsApp",
  "e-mail",
  "endereço",
  "redes sociais",
];

const domainHostingFacts = [
  "Domínio .com.br sujeito à disponibilidade.",
  "Hospedagem inclusa durante os primeiros 12 meses.",
  "Renovação anual cobrada separadamente.",
  `Valor de renovação: ${siteConfig.domainRenewalNote.toLowerCase()}`,
  "O domínio fica registrado em nome do cliente sempre que possível.",
  "Clientes que já possuem domínio podem utilizá-lo.",
  "Outros tipos de domínio podem ter diferença de preço.",
];

const idealFor = [
  "Trabalha por conta própria",
  "Possui um pequeno negócio",
  "Divulga apenas pelo Instagram",
  "Precisa apresentar seus serviços",
  "Quer transmitir mais profissionalismo",
  "Precisa de um canal para receber orçamentos",
  "Está começando e possui orçamento controlado",
  "Quer colocar uma página no ar rapidamente",
];

const customProjectFor = [
  "Precisa vender produtos online",
  "Precisa de login ou área de clientes",
  "Deseja funcionalidades específicas",
  "Possui muitos serviços ou páginas",
  "Precisa integrar o site a outros sistemas",
];

const heroSecondaryWhatsapp = buildWhatsappLink({
  message:
    "Olá! Vi a oferta do Site Rápido da VorinWeb e gostaria de entender qual plano é mais indicado para minha empresa.",
  origin: "HERO",
});

const painSectionWhatsapp = buildWhatsappLink({
  message: "Olá! Quero colocar minha empresa online com o Site Rápido da VorinWeb.",
  origin: "DOR_SOLUCAO",
});

const finalCtaWhatsapp = buildWhatsappLink({
  message: "Olá! Vi a página do Site Rápido da VorinWeb e quero falar com um especialista antes de escolher meu plano.",
  origin: "CTA_FINAL",
});

const floatingButtonWhatsapp = buildWhatsappLink({
  message: "Olá! Vi a página do Site Rápido da VorinWeb e tenho uma dúvida.",
  origin: "FLOATING_BUTTON",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/agr/logo.webp`,
};

export default function SiteRapidoPage() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-950 pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <PageViewTracker pagePath={PAGE_PATH} />

      <header className="sticky top-0 z-20 border-b border-slate-900 bg-slate-950 py-1">
        <Section className="flex items-center justify-center">
          <span className="text-base font-extrabold tracking-tight">
            <span className="text-white">Vorin</span>
            <span className="text-brand-light">Web</span>
          </span>
        </Section>
      </header>

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <Section as="section" className="flex flex-col items-center pt-8 text-center sm:pt-14">
          <h1 className="max-w-2xl text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Seu site profissional a partir de{" "}
            <span className="text-brand-light">R$ 499,90</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-slate-400 sm:text-lg">
            Escolha uma estrutura profissional, personalize com a identidade da sua empresa e coloque
            seu negócio online em poucos dias.
          </p>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {heroIndicators.map((indicator) => (
              <li key={indicator} className="flex items-center gap-1 text-[11px] font-medium text-slate-300 sm:text-sm">
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-brand-light" />
                {indicator}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:max-w-none sm:flex-row sm:justify-center">
            <TrackedLink
              href="#planos"
              event="click_hero_cta"
              eventPayload={{ button_location: "hero_primary" }}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Ver planos e modelos
            </TrackedLink>
            <TrackedLink
              href={heroSecondaryWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              event="click_whatsapp"
              eventPayload={{ button_location: "hero_secondary" }}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar com a VorinWeb
            </TrackedLink>
          </div>
          <p className="mt-2.5 text-[11px] text-slate-400 sm:text-xs">
            Sem mensalidade obrigatória de desenvolvimento.
          </p>

          {/* Composição visual ilustrativa (site no computador + no celular) */}
          <div className="relative mt-10 flex w-full max-w-2xl items-end justify-center sm:mt-14">
            <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl shadow-brand/10">
              <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-700" />
                <span className="h-2 w-2 rounded-full bg-slate-700" />
                <span className="h-2 w-2 rounded-full bg-slate-700" />
              </div>
              <div className="space-y-2 p-4 sm:p-6">
                <div className="h-3 w-1/3 rounded-full bg-brand/40" />
                <div className="h-5 w-2/3 rounded-full bg-slate-700" />
                <div className="h-2.5 w-full rounded-full bg-slate-800" />
                <div className="h-2.5 w-5/6 rounded-full bg-slate-800" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-lg bg-slate-800" />
                  <div className="h-12 rounded-lg bg-slate-800" />
                  <div className="h-12 rounded-lg bg-slate-800" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-2 w-20 overflow-hidden rounded-2xl border-4 border-slate-800 bg-slate-900 shadow-2xl shadow-brand/20 sm:right-8 sm:w-28">
              <div className="space-y-1.5 p-2 sm:p-2.5">
                <div className="h-2 w-1/2 rounded-full bg-brand/50" />
                <div className="h-3.5 w-full rounded-full bg-slate-700" />
                <div className="h-1.5 w-full rounded-full bg-slate-800" />
                <div className="h-1.5 w-4/5 rounded-full bg-slate-800" />
                <div className="h-8 rounded-lg bg-slate-800" />
              </div>
            </div>
          </div>
        </Section>

        {/* ===== DOR E SOLUÇÃO ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">
              Sua empresa ainda depende apenas do Instagram?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              As redes sociais ajudam seu negócio a ser visto, mas um site profissional oferece um
              espaço próprio para apresentar seus serviços, transmitir confiança e facilitar o
              contato de novos clientes.
            </p>
          </div>

          <ul className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            {painBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-slate-300 sm:text-sm"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center">
            <TrackedLink
              href={painSectionWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              event="click_whatsapp"
              eventPayload={{ button_location: "pain_section" }}
              className={buttonVariants({ variant: "ghost", size: "default" })}
            >
              Quero colocar minha empresa online
            </TrackedLink>
          </div>
        </Section>

        {/* ===== EXPLICAÇÃO DO PREÇO ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">
              Como conseguimos entregar por esse valor?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Trabalhamos com estruturas profissionais previamente desenvolvidas. Em vez de começar
              cada projeto do zero, personalizamos o modelo escolhido com a identidade, os
              conteúdos e as informações da sua empresa. Isso reduz o prazo e o custo sem abrir mão
              de uma apresentação profissional.
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Projeto tradicional
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {traditionalProject.map((item) => (
                  <li key={item} className="text-xs text-slate-400 sm:text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-glow-side rounded-xl border border-brand/60 bg-slate-900 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-light">
                Site Rápido
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {siteRapidoHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-slate-200 sm:text-sm">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-slate-400 sm:text-sm">
            O Site Rápido é uma alternativa indicada para pequenos negócios e profissionais que
            precisam começar de maneira mais acessível — sem substituir o valor de um projeto
            tradicional para quem precisa de algo totalmente sob medida.
          </p>
        </Section>

        {/* ===== MODELOS DISPONÍVEIS ===== */}
        <Section as="section" id="modelos" className="mt-16 scroll-mt-16 sm:mt-24">
          <SectionViewTracker event="view_models" />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">Modelos disponíveis</h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Personalizamos qualquer um destes modelos com a identidade da sua empresa.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </Section>

        {/* ===== PLANOS ===== */}
        <Section as="section" id="planos" className="mt-16 scroll-mt-16 sm:mt-24">
          <SectionViewTracker event="view_pricing" />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">
              Planos do Site Rápido
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Escolha o plano ideal, selecione o modelo e fale agora com a {siteConfig.name} pelo
              WhatsApp.
            </p>
          </div>

          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 pt-3 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                className="w-[85vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
              />
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
          </div>
        </Section>

        {/* ===== COMPARAÇÃO DOS PLANOS ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <h2 className="text-center text-xl font-extrabold text-white sm:text-3xl">
            Compare os planos em detalhes
          </h2>
          <div className="mt-6">
            <ComparisonTable />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[11px] text-slate-400 sm:text-xs">
            * Prazo contado a partir da confirmação do pagamento e do recebimento completo dos
            materiais — no Profissional, também após a definição do escopo no briefing.
          </p>
        </Section>

        {/* ===== LIMITES DE ESCOPO ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
            <h2 className="text-lg font-extrabold text-white sm:text-2xl">
              O que não está incluído nos planos rápidos?
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {scopeExclusions.map((item) => (
                <li key={item} className="text-xs text-slate-400 sm:text-sm">
                  • {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-400 sm:text-sm">
              Esses serviços podem ser contratados separadamente ou incluídos em um projeto sob
              medida.
            </p>
          </div>
        </Section>

        {/* ===== COMO FUNCIONA ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <h2 className="text-center text-xl font-extrabold text-white sm:text-3xl">
            Como funciona
          </h2>
          <ol className="mx-auto mt-6 flex max-w-lg flex-col gap-2.5">
            {steps.map((title, index) => (
              <StepItem key={title} number={index + 1} title={title} />
            ))}
          </ol>
          <div className="mx-auto mt-5 max-w-lg text-center">
            <p className="text-xs text-slate-400 sm:text-sm">
              Os materiais do briefing podem incluir: {briefingMaterials.join(", ")}.
            </p>
            <p className="mt-2 text-xs font-medium text-slate-300 sm:text-sm">
              O prazo começa a contar apenas após o recebimento completo dos materiais.
            </p>
          </div>
        </Section>

        {/* ===== RODADAS DE AJUSTES ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">
              O que é uma rodada de ajustes?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Uma rodada corresponde a uma lista consolidada de alterações enviada pelo cliente em
              um único momento. Nela podem ser solicitadas correções de textos, imagens,
              informações e pequenos ajustes visuais dentro do escopo aprovado.
            </p>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Novas listas enviadas após a conclusão das rodadas incluídas podem ser contratadas
              separadamente. Mudanças completas de estrutura ou novas funcionalidades não são
              consideradas pequenos ajustes.
            </p>
          </div>
        </Section>

        {/* ===== DOMÍNIO E HOSPEDAGEM ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
            <h2 className="text-lg font-extrabold text-white sm:text-2xl">
              Domínio e hospedagem inclusos por 12 meses
            </h2>
            <ul className="mt-4 space-y-2">
              {domainHostingFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-2 text-xs text-slate-400 sm:text-sm">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ===== PROJETOS REAIS ===== */}
        <Section as="section" id="projetos" className="mt-16 scroll-mt-16 sm:mt-24">
          <h2 className="text-center text-xl font-extrabold text-white sm:text-3xl">
            Empresas que a {siteConfig.name} já colocou online
          </h2>
          <div className="mt-6 flex flex-wrap items-stretch justify-center gap-4">
            {cases.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Section>

        {/* ===== PARA QUEM É ===== */}
        <Section as="section" className="mt-16 sm:mt-24">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <h2 className="text-base font-bold text-white sm:text-xl">
                O Site Rápido é ideal para você que…
              </h2>
              <ul className="mt-3 space-y-1.5">
                {idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-slate-300 sm:text-sm">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <h2 className="text-base font-bold text-white sm:text-xl">
                Talvez você precise de um projeto sob medida se…
              </h2>
              <ul className="mt-3 space-y-1.5">
                {customProjectFor.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-slate-300 sm:text-sm">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ===== FAQ ===== */}
        <Section as="section" id="faq" className="mt-16 scroll-mt-16 sm:mt-24">
          <SectionViewTracker event="view_faq" />
          <h2 className="text-center text-xl font-extrabold text-white sm:text-3xl">
            Perguntas frequentes
          </h2>
          <div className="mx-auto mt-6 max-w-3xl">
            <FaqAccordion items={faqItems} />
          </div>
        </Section>

        {/* ===== CTA FINAL ===== */}
        <Section as="section" className="mt-16 pb-16 sm:mt-24 sm:pb-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-brand/50 bg-slate-900 p-6 text-center sm:p-10">
            <h2 className="text-xl font-extrabold text-white sm:text-3xl">
              Coloque sua empresa online sem transformar o projeto em uma novela
            </h2>
            <p className="mt-2.5 text-sm text-slate-400 sm:text-base">
              Escolha o plano mais adequado, envie os materiais e deixe a VorinWeb cuidar da
              construção.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <TrackedLink
                href="#planos"
                event="click_final_cta"
                eventPayload={{ button_location: "final_primary" }}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Escolher meu plano
              </TrackedLink>
              <TrackedLink
                href={finalCtaWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                event="click_final_cta"
                eventPayload={{ button_location: "final_secondary" }}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar com um especialista
              </TrackedLink>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 sm:text-xs">
              Você receberá as informações completas antes de realizar qualquer pagamento.
            </p>
          </div>
        </Section>
      </main>

      <StickyMobileBar />

      <TrackedLink
        href={floatingButtonWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        event="click_whatsapp"
        eventPayload={{ button_location: "floating_button" }}
        className="fixed bottom-20 right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F7A40] text-white shadow-lg transition-transform hover:scale-105 md:bottom-3"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </TrackedLink>
    </div>
  );
}
