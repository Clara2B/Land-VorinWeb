import { siteConfig } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "O valor é único?",
    answer:
      "Sim. O valor do Essencial ou do Profissional é um pagamento único pela criação e publicação do site.",
  },
  {
    question: "Existe alguma mensalidade obrigatória?",
    answer:
      "Não há mensalidade obrigatória de desenvolvimento. O único custo recorrente é a renovação anual de domínio e hospedagem, explicada na seção sobre domínio e hospedagem.",
  },
  {
    question: "O domínio está incluso por quanto tempo?",
    answer: "O domínio .com.br fica incluso pelos primeiros 12 meses, sujeito à disponibilidade do nome escolhido.",
  },
  {
    question: "A hospedagem está inclusa?",
    answer: "Sim, a hospedagem está inclusa durante os primeiros 12 meses.",
  },
  {
    question: "Quanto custa a renovação?",
    answer: siteConfig.domainRenewalNote,
  },
  {
    question: "O site ficará no meu nome?",
    answer: "Sempre que possível, o domínio é registrado em nome do cliente.",
  },
  {
    question: "Posso usar um domínio que já possuo?",
    answer: "Sim. Se você já tiver um domínio próprio, podemos utilizá-lo na publicação do site.",
  },
  {
    question: "O site funciona no celular?",
    answer: "Sim, todos os planos entregam um site responsivo, adaptado para celular, tablet e computador.",
  },
  {
    question: "O que preciso enviar para começar?",
    answer:
      "Logo, cores da marca, textos, imagens, lista de serviços e informações de contato (telefone, WhatsApp, e-mail, endereço e redes sociais), conforme detalhado na seção \"Como funciona\".",
  },
  {
    question: "Quando começa a contar o prazo?",
    answer:
      "O prazo de entrega começa a contar após a confirmação do pagamento e o recebimento completo dos materiais solicitados no briefing.",
  },
  {
    question: "Quantas alterações estão incluídas?",
    answer: "O Essencial inclui uma rodada de ajustes e o Profissional inclui duas rodadas, conforme descrito em cada plano.",
  },
  {
    question: "O que é uma rodada de ajustes?",
    answer:
      "Uma rodada corresponde a uma lista consolidada de alterações enviada pelo cliente em um único momento, com correções de textos, imagens, informações e pequenos ajustes visuais dentro do escopo aprovado. Mudanças completas de estrutura ou novas funcionalidades não são consideradas pequenos ajustes.",
  },
  {
    question: "Posso alterar o site depois de publicado?",
    answer: "Sim. Alterações após a publicação podem ser solicitadas e orçadas separadamente, conforme o escopo da mudança.",
  },
  {
    question: "Vocês criam os textos?",
    answer:
      "O Site Rápido utiliza os textos enviados pelo cliente. No Profissional, fazemos revisão e adaptação dos textos principais, mas a redação de conteúdos extensos não está incluída.",
  },
  {
    question: "Vocês criam o logotipo?",
    answer: "Não. A criação de logotipo não está incluída nos planos rápidos, mas pode ser contratada separadamente.",
  },
  {
    question: "O plano inclui loja virtual?",
    answer:
      "Não. Os planos Essencial e Profissional não incluem loja virtual. Esse tipo de funcionalidade pode ser incluído em um projeto sob medida.",
  },
  {
    question: "O site aparecerá no Google?",
    answer:
      "O site é publicado com uma configuração básica de SEO técnico, mas não garantimos posicionamento no Google — isso depende de diversos fatores fora do escopo dos planos rápidos.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: `Aceitamos ${siteConfig.paymentMethods.join(", ")}.`,
  },
  {
    question: "Posso contratar páginas adicionais?",
    answer: "Sim, páginas adicionais podem ser contratadas separadamente ou incluídas em um projeto sob medida.",
  },
  {
    question: "Vocês oferecem manutenção depois da entrega?",
    answer:
      "Não incluímos manutenção mensal ilimitada nos planos rápidos, mas alterações pontuais podem ser orçadas separadamente.",
  },
];
