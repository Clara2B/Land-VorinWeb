export interface Plan {
  id: "essencial" | "profissional" | "sob-medida";
  name: string;
  /** Valor numérico em reais, sem formatação — usado no rastreamento (plan_value). Null para orçamento sob consulta. */
  priceValue: number | null;
  priceLabel: string;
  tagline: string;
  highlightLabel?: string;
  features: string[];
  /** Exemplos de escopo — usado apenas no plano Sob Medida. */
  examples?: string[];
  deadlineNote: string;
  ctaLabel: string;
  whatsappMessage: string;
}

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Site Rápido Essencial",
    priceValue: 499.9,
    priceLabel: "R$ 499,90",
    tagline: "Para profissionais e pequenos negócios que precisam começar rapidamente.",
    features: [
      "Site de página única",
      "Até 5 seções",
      "Estrutura baseada em um modelo disponível",
      "Aplicação da logo e identidade visual",
      "Personalização de cores e tipografia",
      "Inclusão dos textos enviados pelo cliente",
      "Inclusão das imagens enviadas pelo cliente",
      "Botão de WhatsApp",
      "Links para redes sociais",
      "Versão responsiva para celular",
      "Configuração básica de título e descrição",
      "Uma rodada de ajustes",
      "Publicação em até 2 dias úteis*",
      "Domínio .com.br e hospedagem por 12 meses",
    ],
    deadlineNote:
      "* Até 2 dias úteis após a confirmação do pagamento e o recebimento completo dos materiais.",
    ctaLabel: "Escolher o Essencial",
    whatsappMessage:
      "Olá! Quero contratar o Site Rápido Essencial de R$ 499,90. Gostaria de saber quais modelos estão disponíveis.",
  },
  {
    id: "profissional",
    name: "Site Rápido Profissional",
    priceValue: 799.9,
    priceLabel: "R$ 799,90",
    tagline:
      "Para empresas que precisam apresentar melhor seus serviços e gerar mais oportunidades de contato.",
    highlightLabel: "Recomendado para empresas",
    features: [
      "Site com até 5 páginas institucionais",
      "Home",
      "Página sobre a empresa",
      "Página de serviços",
      "Página de contato ou orçamento",
      "Uma página adicional definida no briefing",
      "Aplicação completa da identidade visual",
      "Organização comercial dos conteúdos",
      "Revisão e adaptação dos textos principais",
      "Botão de WhatsApp",
      "Formulário de contato",
      "Links para redes sociais",
      "SEO técnico inicial",
      "Sitemap e robots.txt",
      "Títulos e descrições das páginas",
      "Otimização básica de imagens",
      "Site responsivo",
      "Duas rodadas de ajustes",
      "Publicação entre 7 e 10 dias úteis*",
      "Domínio .com.br e hospedagem por 12 meses",
    ],
    deadlineNote:
      "* Entre 7 e 10 dias úteis após a confirmação do pagamento, definição do escopo e recebimento completo dos materiais.",
    ctaLabel: "Escolher o Profissional",
    whatsappMessage:
      "Olá! Quero saber mais sobre o Site Rápido Profissional de R$ 799,90 para minha empresa.",
  },
  {
    id: "sob-medida",
    name: "Projeto Sob Medida",
    priceValue: null,
    priceLabel: "Orçamento personalizado",
    tagline: "Para projetos que precisam de funcionalidades, páginas ou integrações específicas.",
    examples: [
      "Loja virtual",
      "Catálogo de produtos",
      "Sistemas personalizados",
      "Painéis administrativos",
      "Área de login",
      "Agendamentos",
      "Integrações com APIs",
      "Integrações com CRM",
      "Automações",
      "Bots de WhatsApp",
      "Área de membros",
      "Funcionalidades especiais",
      "Projetos com muitas páginas",
    ],
    features: [],
    deadlineNote: "",
    ctaLabel: "Solicitar análise do projeto",
    whatsappMessage:
      "Olá! Meu projeto possui necessidades específicas e gostaria de solicitar uma análise e um orçamento sob medida.",
  },
];

export function getPlan(id: Plan["id"]) {
  return plans.find((plan) => plan.id === id)!;
}
