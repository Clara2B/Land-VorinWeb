/* ==========================================================================
   VITRINE DE SERVIÇOS — services-data.js
   ==========================================================================
   Fonte única de dados do modelo. É lida tanto pelo navegador (index.html e
   servicos/*.html, via <script src="assets/js/services-data.js">, que
   expõe `window.VITRINE_DATA`) quanto pelo Node (tools/gerar-paginas.js,
   via `require("./services-data.js")`) — por isso o wrapper UMD abaixo.

   PERSONALIZAÇÃO RÁPIDA — o que trocar antes de publicar para um cliente:
     1. `company`      → nome, slogan, contatos, redes sociais, CNPJ.
     2. `business`      → modalidades, faixas de investimento, textos.
     3. `categories`    → categorias reais da empresa.
     4. `needs`         → "necessidades" que a seção 13 usa para recomendar.
     5. `services`      → o catálogo em si (mínimo indicado: 12 itens).
        Depois de editar, rode `node tools/gerar-paginas.js` para
        regenerar as páginas individuais em servicos/*.html.
     6. `cases`         → projetos/resultados (sempre qualitativos).
     7. `testimonials`  → substitua os exemplos por depoimentos reais e
        autorizados antes de publicar (ver aviso no array abaixo).
     8. `faq`           → respostas variam por empresa; nunca invente
        prazos, preços ou garantias — deixe "[Personalização: ...]".
   ========================================================================== */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VITRINE_DATA = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var company = {
    name: "Nexora Serviços",
    shortName: "Nexora",
    slogan: "Soluções profissionais para cada necessidade do seu negócio.",
    description:
      "A Nexora reúne diferentes soluções em uma única estrutura para facilitar a contratação, o acompanhamento e a evolução dos projetos.",
    // [SUBSTITUIR] dados fictícios de contato — trocar antes de publicar.
    phoneDisplay: "(00) 0000-0000",
    whatsapp: "5500000000000",
    email: "contato@seudominio.com.br",
    address: "Atendimento remoto — Brasil todo",
    cnpj: "00.000.000/0001-00 (fictício)",
    domain: "https://www.seudominio.com.br",
    socialLinks: {
      instagram: "https://instagram.com/seudominio",
      linkedin: "https://linkedin.com/company/seudominio",
      facebook: "https://facebook.com/seudominio",
    },
    vorinwebUrl: "https://vorinweb.com.br/",
  };

  var business = {
    serviceModes: ["Online", "Presencial", "Híbrido"],
    // Faixas de investimento — usadas no formulário de orçamento (seção 20).
    investmentRanges: [
      { id: "indefinido", label: "Ainda não defini" },
      { id: "ate-1k", label: "Até R$ 1.000" },
      { id: "1k-3k", label: "De R$ 1.000 a R$ 3.000" },
      { id: "3k-5k", label: "De R$ 3.000 a R$ 5.000" },
      { id: "acima-5k", label: "Acima de R$ 5.000" },
    ],
    // Objetivos do formulário e da seção "Soluções por necessidade".
    goals: [
      { id: "atrair-clientes", label: "Atrair clientes" },
      { id: "presenca-digital", label: "Melhorar a presença digital" },
      { id: "organizar-processos", label: "Organizar processos" },
      { id: "automatizar-tarefas", label: "Automatizar tarefas" },
      { id: "apresentar-servicos", label: "Apresentar serviços" },
      { id: "reduzir-trabalho-manual", label: "Reduzir trabalho manual" },
      { id: "outro", label: "Outro" },
    ],
    // [SUBSTITUIR] tempo médio de resposta — não inventado, deixado neutro.
    responseTimeNote: "Retornamos o contato em até 1 dia útil.",
    // Nenhuma forma de pagamento é inventada aqui — ver FAQ #9.
    paymentInfoNote: null,
  };

  var categories = [
    {
      id: "estrategia-consultoria",
      name: "Estratégia e Consultoria",
      description: "Diagnóstico, planejamento e direção antes de agir.",
      icon: "icon-target",
    },
    {
      id: "marketing-comunicacao",
      name: "Marketing e Comunicação",
      description: "Presença de marca, conteúdo e aquisição de clientes.",
      icon: "icon-trending-up",
    },
    {
      id: "tecnologia-automacao",
      name: "Tecnologia e Automação",
      description: "Sites, sistemas e automações que sustentam a operação.",
      icon: "icon-monitor",
    },
    {
      id: "gestao-empresarial",
      name: "Gestão Empresarial",
      description: "Organização financeira, comercial e de processos.",
      icon: "icon-layers",
    },
    {
      id: "suporte-operacional",
      name: "Suporte Operacional",
      description: "Rotinas administrativas e atendimento no dia a dia.",
      icon: "icon-headset",
    },
    {
      id: "projetos-personalizados",
      name: "Projetos Personalizados",
      description: "Soluções sob medida para necessidades específicas.",
      icon: "icon-puzzle",
    },
  ];

  var needs = [
    {
      id: "atrair-clientes",
      title: "Quero atrair mais clientes",
      explanation: "Serviços voltados para gerar demanda e visibilidade para o seu negócio.",
      services: ["gestao-trafego-pago", "gestao-redes-sociais", "criacao-sites"],
    },
    {
      id: "organizar-empresa",
      title: "Quero organizar minha empresa",
      explanation: "Diagnóstico, planejamento e estruturação de processos internos.",
      services: ["planejamento-estrategico", "estruturacao-processos", "organizacao-financeira"],
    },
    {
      id: "automatizar-tarefas",
      title: "Quero automatizar tarefas",
      explanation: "Reduza etapas manuais com automação de atendimento e sistemas.",
      services: ["automacao-atendimento", "solucoes-sob-medida"],
    },
    {
      id: "melhorar-presenca-digital",
      title: "Quero melhorar minha presença digital",
      explanation: "Site, redes sociais e comunicação alinhados à sua marca.",
      services: ["criacao-sites", "gestao-redes-sociais"],
    },
    {
      id: "reduzir-trabalho-manual",
      title: "Quero reduzir trabalho manual",
      explanation: "Suporte administrativo e automação para tirar tarefas repetitivas da sua mesa.",
      services: ["suporte-administrativo", "automacao-atendimento", "gestao-agendas"],
    },
    {
      id: "solucao-personalizada",
      title: "Preciso de uma solução personalizada",
      explanation: "Quando a necessidade não se encaixa em um serviço padrão.",
      services: ["solucoes-sob-medida", "consultoria-personalizada"],
    },
  ];

  /**
   * customizationLevel e contractType existem para alimentar a tabela de
   * comparação (seção 14) de forma genérica, para qualquer combinação de
   * até 3 serviços que o visitante escolher — não há um "grupo fixo" de
   * comparação.
   */
  var services = [
    {
      id: "diagnostico-empresarial",
      slug: "diagnostico-empresarial",
      name: "Diagnóstico Empresarial",
      category: "estrategia-consultoria",
      icon: "icon-target",
      gradient: ["#0F7B6C", "#0A5A4F"],
      shortDescription: "Uma análise estruturada para identificar gargalos, riscos e oportunidades antes de tomar novas decisões.",
      fullDescription:
        "Um raio-x da operação atual da empresa, reunindo processos, indicadores disponíveis e percepções da equipe para apontar com clareza onde estão os principais gargalos antes de qualquer novo investimento ou mudança de rota.",
      problemsSolved: [
        "Falta de organização",
        "Dificuldade para priorizar ações",
        "Processos pouco claros",
        "Decisões tomadas sem dados",
        "Desperdício de recursos",
      ],
      benefits: [
        "Visão mais clara do negócio",
        "Prioridades definidas",
        "Plano inicial de ação",
        "Identificação de gargalos",
        "Recomendações práticas",
      ],
      features: [
        "Levantamento de processos e indicadores existentes",
        "Entrevistas com áreas-chave da empresa",
        "Relatório com gargalos e oportunidades priorizados",
        "Reunião de apresentação dos resultados",
      ],
      targetAudience: ["Pequenas e médias empresas", "Negócios em fase de reorganização"],
      deliveryMethod: ["Online", "Presencial"],
      estimatedTimeline: "Definido conforme o porte da empresa, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: true,
      keywords: ["diagnóstico", "análise", "gargalos", "processos", "organização"],
      faq: [
        {
          q: "O diagnóstico serve para qualquer porte de empresa?",
          a: "Sim, o escopo é ajustado conforme o tamanho e a complexidade do negócio.",
        },
        {
          q: "Preciso já ter indicadores organizados?",
          a: "Não. Parte do diagnóstico é justamente levantar e organizar essas informações.",
        },
      ],
      relatedServices: ["planejamento-estrategico", "estruturacao-processos"],
    },
    {
      id: "planejamento-estrategico",
      slug: "planejamento-estrategico",
      name: "Planejamento Estratégico",
      category: "estrategia-consultoria",
      icon: "icon-compass",
      gradient: ["#0F7B6C", "#14988A"],
      shortDescription: "Define prioridades, metas e o caminho para os próximos passos da empresa.",
      fullDescription:
        "A partir do cenário atual da empresa, estruturamos metas realistas e um plano de ação organizado por prioridade, para que cada decisão do dia a dia esteja alinhada a um direcionamento único.",
      problemsSolved: [
        "Metas pouco claras",
        "Ações desconectadas de um objetivo maior",
        "Dificuldade em priorizar investimentos",
        "Crescimento sem direção definida",
      ],
      benefits: [
        "Metas realistas e mensuráveis",
        "Plano de ação priorizado",
        "Direcionamento compartilhado com a equipe",
        "Base para decisões futuras",
      ],
      features: [
        "Análise do cenário atual e do mercado",
        "Definição de metas e indicadores de acompanhamento",
        "Plano de ação com prioridades e responsáveis",
        "Revisão periódica combinada em proposta",
      ],
      targetAudience: ["Empresas em crescimento", "Negócios que buscam direção clara"],
      deliveryMethod: ["Online", "Presencial", "Híbrido"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: false,
      keywords: ["planejamento", "estratégia", "metas", "prioridades"],
      faq: [
        {
          q: "O planejamento inclui acompanhamento depois de pronto?",
          a: "O acompanhamento pode ser incluído conforme o combinado na proposta.",
        },
      ],
      relatedServices: ["diagnostico-empresarial", "estruturacao-processos"],
    },
    {
      id: "gestao-redes-sociais",
      slug: "gestao-redes-sociais",
      name: "Gestão de Redes Sociais",
      category: "marketing-comunicacao",
      icon: "icon-instagram",
      gradient: ["#B8792F", "#8F5B1F"],
      shortDescription: "Planejamento, criação e publicação de conteúdo para manter as redes sociais ativas e consistentes.",
      fullDescription:
        "Cuidamos do planejamento de conteúdo, criação de artes e publicação nas redes sociais da empresa, mantendo uma presença consistente alinhada à identidade da marca.",
      problemsSolved: [
        "Redes sociais paradas ou irregulares",
        "Falta de tempo para produzir conteúdo",
        "Comunicação sem identidade definida",
        "Dificuldade para manter constância",
      ],
      benefits: [
        "Presença mais consistente",
        "Conteúdo alinhado à identidade da marca",
        "Rotina de publicações organizada",
        "Mais tempo livre para a operação do negócio",
      ],
      features: [
        "Planejamento mensal de conteúdo",
        "Criação de artes e legendas",
        "Publicação nos canais definidos",
        "Relatório simples de atividades do período",
      ],
      targetAudience: ["Empresas sem equipe interna de marketing", "Profissionais autônomos"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Serviço recorrente, com ciclo definido na proposta.",
      customizationLevel: "Personalizável",
      contractType: "Recorrente (mensal)",
      featured: true,
      keywords: ["redes sociais", "conteúdo", "instagram", "comunicação"],
      faq: [
        { q: "Quem fica responsável pela criação das artes?", a: "A criação faz parte do escopo do serviço." },
        { q: "É possível pausar em algum mês?", a: "As condições de pausa e cancelamento constam na proposta." },
      ],
      relatedServices: ["gestao-trafego-pago", "criacao-sites"],
    },
    {
      id: "gestao-trafego-pago",
      slug: "gestao-trafego-pago",
      name: "Gestão de Tráfego Pago",
      category: "marketing-comunicacao",
      icon: "icon-zap",
      gradient: ["#B8792F", "#D9A24A"],
      shortDescription: "Planejamento e otimização de campanhas para atrair mais clientes de forma direcionada.",
      fullDescription:
        "Estruturamos e acompanhamos campanhas de anúncios direcionadas ao público certo, com otimizações contínuas com base no desempenho real das campanhas.",
      problemsSolved: [
        "Anúncios sem direcionamento claro",
        "Dificuldade para atrair o público certo",
        "Investimento em mídia sem acompanhamento",
      ],
      benefits: [
        "Campanhas direcionadas ao público certo",
        "Acompanhamento contínuo de desempenho",
        "Ajustes com base em dados reais",
      ],
      features: [
        "Estruturação das campanhas e públicos",
        "Criação dos anúncios em conjunto com o time de conteúdo",
        "Acompanhamento e otimização periódica",
        "Relatório de desempenho do período",
      ],
      targetAudience: ["Empresas que já têm produto/serviço definido", "Negócios que buscam previsibilidade de leads"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Serviço recorrente, com ciclo definido na proposta.",
      customizationLevel: "Personalizável",
      contractType: "Recorrente (mensal)",
      featured: false,
      keywords: ["tráfego pago", "anúncios", "campanhas", "leads"],
      faq: [{ q: "O valor investido em anúncios está incluso no serviço?", a: "Não. O investimento em mídia é separado do valor do serviço, e ambos constam na proposta." }],
      relatedServices: ["gestao-redes-sociais", "criacao-sites"],
    },
    {
      id: "criacao-sites",
      slug: "criacao-sites",
      name: "Criação de Sites",
      category: "tecnologia-automacao",
      icon: "icon-monitor",
      gradient: ["#2952C7", "#1B3690"],
      shortDescription: "Sites institucionais e páginas comerciais para apresentar sua empresa profissionalmente.",
      fullDescription:
        "Desenvolvemos sites institucionais, páginas de serviços e landing pages, com foco em apresentar a empresa de forma clara e facilitar o contato com potenciais clientes.",
      problemsSolved: [
        "Ausência de presença profissional online",
        "Site desatualizado ou pouco funcional",
        "Dificuldade para os clientes encontrarem informações",
      ],
      benefits: [
        "Apresentação profissional da empresa",
        "Facilidade para o cliente entrar em contato",
        "Site responsivo para qualquer dispositivo",
      ],
      features: [
        "Estrutura de páginas definida com o cliente",
        "Design responsivo para celular, tablet e desktop",
        "Otimização básica de SEO técnico",
        "Formulário de contato integrado",
      ],
      targetAudience: ["Empresas sem site próprio", "Negócios que precisam modernizar o site atual"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Personalizável",
      contractType: "Projeto único",
      featured: true,
      keywords: ["site", "página", "presença digital", "institucional"],
      faq: [
        { q: "O domínio e a hospedagem estão inclusos?", a: "Isso depende do escopo contratado — os detalhes ficam claros na proposta." },
        { q: "É possível pedir alterações depois de pronto?", a: "Sim, o número de rodadas de ajuste incluídas é combinado antes do início do projeto." },
      ],
      relatedServices: ["gestao-redes-sociais", "automacao-atendimento"],
    },
    {
      id: "automacao-atendimento",
      slug: "automacao-atendimento",
      name: "Automação de Atendimento",
      category: "tecnologia-automacao",
      icon: "icon-zap",
      gradient: ["#2952C7", "#4E74E0"],
      shortDescription: "Fluxos automatizados para responder dúvidas e organizar o primeiro contato com clientes.",
      fullDescription:
        "Configuramos fluxos automatizados de atendimento (como respostas no WhatsApp e triagem inicial) para reduzir o tempo de resposta e organizar a entrada de novos contatos.",
      problemsSolved: [
        "Demora para responder clientes",
        "Perguntas repetitivas consumindo tempo da equipe",
        "Falta de organização no primeiro contato",
      ],
      benefits: [
        "Respostas mais rápidas",
        "Menos tempo gasto com perguntas repetitivas",
        "Primeiro contato mais organizado",
      ],
      features: [
        "Mapeamento das dúvidas e etapas mais comuns",
        "Configuração dos fluxos automatizados",
        "Testes e ajustes antes da publicação",
        "Orientação de uso para a equipe",
      ],
      targetAudience: ["Empresas com alto volume de mensagens", "Negócios que atendem por WhatsApp"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: false,
      keywords: ["automação", "atendimento", "whatsapp", "chatbot"],
      faq: [{ q: "A automação substitui o atendimento humano?", a: "Não. Ela organiza o primeiro contato e as dúvidas mais comuns; casos específicos seguem para atendimento humano." }],
      relatedServices: ["criacao-sites", "solucoes-sob-medida"],
    },
    {
      id: "organizacao-financeira",
      slug: "organizacao-financeira",
      name: "Organização Financeira",
      category: "gestao-empresarial",
      icon: "icon-layers",
      gradient: ["#4B4F5C", "#33363F"],
      shortDescription: "Estruturação de controles financeiros básicos para dar clareza ao caixa da empresa.",
      fullDescription:
        "Organizamos entradas, saídas e categorias financeiras da empresa, entregando uma estrutura simples de acompanhamento para apoiar decisões do dia a dia.",
      problemsSolved: [
        "Falta de controle sobre entradas e saídas",
        "Dificuldade para saber se a empresa está saudável financeiramente",
        "Informações financeiras espalhadas",
      ],
      benefits: [
        "Visão organizada do caixa",
        "Categorias e controles simples de acompanhar",
        "Base para decisões financeiras mais seguras",
      ],
      features: [
        "Levantamento das movimentações atuais",
        "Estruturação de categorias e controles",
        "Modelo de acompanhamento entregue à equipe",
      ],
      targetAudience: ["Pequenos negócios sem rotina financeira estruturada"],
      deliveryMethod: ["Online", "Presencial"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: false,
      keywords: ["financeiro", "caixa", "controle", "organização"],
      faq: [{ q: "Vocês assumem a gestão financeira contínua?", a: "O escopo padrão é a estruturação inicial; o acompanhamento contínuo pode ser combinado à parte." }],
      relatedServices: ["estruturacao-processos", "diagnostico-empresarial"],
    },
    {
      id: "estruturacao-processos",
      slug: "estruturacao-processos",
      name: "Estruturação de Processos",
      category: "gestao-empresarial",
      icon: "icon-layers",
      gradient: ["#4B4F5C", "#6B6F7C"],
      shortDescription: "Organização de rotinas e fluxos internos para reduzir retrabalho e depender menos de uma única pessoa.",
      fullDescription:
        "Mapeamos as rotinas da empresa e estruturamos processos claros, documentados e fáceis de repetir, reduzindo a dependência de uma única pessoa para cada tarefa.",
      problemsSolved: [
        "Processos que existem só na cabeça de uma pessoa",
        "Retrabalho por falta de padronização",
        "Dificuldade para treinar novas pessoas",
      ],
      benefits: [
        "Rotinas documentadas e padronizadas",
        "Menor dependência de pessoas específicas",
        "Facilidade para treinar a equipe",
      ],
      features: [
        "Mapeamento das rotinas atuais",
        "Documentação dos processos revisados",
        "Sugestões de melhoria e padronização",
      ],
      targetAudience: ["Empresas em fase de crescimento da equipe"],
      deliveryMethod: ["Online", "Presencial", "Híbrido"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: false,
      keywords: ["processos", "rotinas", "padronização", "documentação"],
      faq: [{ q: "Vocês implementam ferramentas de gestão?", a: "Podemos recomendar ferramentas, mas a implementação de sistemas de terceiros é avaliada caso a caso." }],
      relatedServices: ["diagnostico-empresarial", "planejamento-estrategico"],
    },
    {
      id: "suporte-administrativo",
      slug: "suporte-administrativo",
      name: "Suporte Administrativo",
      category: "suporte-operacional",
      icon: "icon-headset",
      gradient: ["#7A4FB8", "#5A3789"],
      shortDescription: "Apoio nas tarefas administrativas do dia a dia para liberar tempo da equipe interna.",
      fullDescription:
        "Assumimos tarefas administrativas recorrentes — como organização de documentos, respostas a e-mails e atualização de planilhas — liberando tempo da equipe para as atividades principais do negócio.",
      problemsSolved: [
        "Sobrecarga com tarefas administrativas",
        "Falta de tempo para atividades estratégicas",
        "Documentos e informações desorganizados",
      ],
      benefits: [
        "Mais tempo livre para a equipe",
        "Tarefas administrativas em dia",
        "Documentos organizados e acessíveis",
      ],
      features: [
        "Definição das tarefas administrativas incluídas",
        "Rotina de execução combinada com a empresa",
        "Ponto de contato direto para ajustes",
      ],
      targetAudience: ["Profissionais autônomos", "Pequenas empresas sem equipe administrativa"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Serviço recorrente, com ciclo definido na proposta.",
      customizationLevel: "Personalizável",
      contractType: "Recorrente (mensal)",
      featured: false,
      keywords: ["administrativo", "suporte", "organização", "documentos"],
      faq: [{ q: "Quais tarefas podem ser incluídas?", a: "As tarefas são definidas junto com a empresa conforme a necessidade real do dia a dia." }],
      relatedServices: ["gestao-agendas", "estruturacao-processos"],
    },
    {
      id: "gestao-agendas",
      slug: "gestao-agendas",
      name: "Gestão de Agendas",
      category: "suporte-operacional",
      icon: "icon-clock",
      gradient: ["#7A4FB8", "#9A73D9"],
      shortDescription: "Organização de horários, compromissos e agendamentos para evitar conflitos e esquecimentos.",
      fullDescription:
        "Cuidamos da organização da agenda da empresa ou do profissional, incluindo agendamentos, confirmações e ajustes, para reduzir conflitos de horário e falhas de comunicação.",
      problemsSolved: [
        "Conflitos de horário",
        "Esquecimento de compromissos",
        "Tempo gasto organizando agendamentos manualmente",
      ],
      benefits: [
        "Agenda organizada e sem conflitos",
        "Menos tempo gasto com agendamentos manuais",
        "Confirmações feitas de forma consistente",
      ],
      features: [
        "Configuração da rotina de agendamentos",
        "Confirmações e lembretes aos clientes",
        "Ajustes conforme a necessidade da operação",
      ],
      targetAudience: ["Clínicas", "Salões", "Consultórios", "Profissionais com atendimento por horário"],
      deliveryMethod: ["Online"],
      estimatedTimeline: "Serviço recorrente, com ciclo definido na proposta.",
      customizationLevel: "Personalizável",
      contractType: "Recorrente (mensal)",
      featured: true,
      keywords: ["agenda", "agendamento", "horários", "atendimento"],
      faq: [{ q: "É preciso ter um sistema de agendamento prévio?", a: "Não necessariamente — podemos sugerir uma ferramenta adequada ao volume de atendimentos." }],
      relatedServices: ["suporte-administrativo", "automacao-atendimento"],
    },
    {
      id: "solucoes-sob-medida",
      slug: "solucoes-sob-medida",
      name: "Soluções Sob Medida",
      category: "projetos-personalizados",
      icon: "icon-puzzle",
      gradient: ["#C4482F", "#96341F"],
      shortDescription: "Projetos que combinam mais de uma área para atender necessidades específicas da empresa.",
      fullDescription:
        "Quando a necessidade da empresa não se encaixa em um único serviço padrão, estruturamos um projeto combinando diferentes áreas — estratégia, tecnologia, marketing ou operação — conforme o que for necessário.",
      problemsSolved: [
        "Necessidade que não se encaixa em um serviço padrão",
        "Projetos que exigem mais de uma especialidade",
        "Falta de um único ponto de contato para um projeto amplo",
      ],
      benefits: [
        "Projeto desenhado para a necessidade real",
        "Um único ponto de contato para todo o escopo",
        "Flexibilidade para combinar diferentes serviços",
      ],
      features: [
        "Reunião de entendimento aprofundado da necessidade",
        "Escopo desenhado sob medida",
        "Equipe combinando as áreas necessárias",
      ],
      targetAudience: ["Empresas com necessidades específicas", "Projetos multissetoriais"],
      deliveryMethod: ["Online", "Presencial", "Híbrido"],
      estimatedTimeline: "Definido conforme o escopo, na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Projeto único",
      featured: true,
      keywords: ["sob medida", "personalizado", "projeto", "multissetorial"],
      faq: [{ q: "Como é definido o valor de um projeto sob medida?", a: "O valor é calculado conforme o escopo definido na reunião de entendimento, e apresentado em proposta." }],
      relatedServices: ["consultoria-personalizada", "diagnostico-empresarial"],
    },
    {
      id: "consultoria-personalizada",
      slug: "consultoria-personalizada",
      name: "Consultoria Personalizada",
      category: "projetos-personalizados",
      icon: "icon-briefcase",
      gradient: ["#C4482F", "#DB6B4A"],
      shortDescription: "Acompanhamento contínuo e sob medida para apoiar decisões e execuções específicas.",
      fullDescription:
        "Um acompanhamento contínuo e próximo, com encontros periódicos para apoiar decisões, revisar prioridades e ajustar o rumo conforme a empresa evolui.",
      problemsSolved: [
        "Falta de apoio para decisões recorrentes",
        "Necessidade de acompanhamento contínuo, não pontual",
        "Dificuldade em manter o ritmo de um plano ao longo do tempo",
      ],
      benefits: [
        "Apoio contínuo para decisões",
        "Ritmo de acompanhamento definido junto com a empresa",
        "Ajustes de rota conforme a operação evolui",
      ],
      features: [
        "Encontros periódicos definidos na proposta",
        "Acompanhamento de indicadores combinados",
        "Canal direto para dúvidas entre os encontros",
      ],
      targetAudience: ["Empresas em fase de crescimento", "Negócios que já concluíram um diagnóstico ou planejamento"],
      deliveryMethod: ["Online", "Híbrido"],
      estimatedTimeline: "Serviço recorrente, com ciclo definido na proposta.",
      customizationLevel: "Sob medida",
      contractType: "Recorrente (mensal)",
      featured: false,
      keywords: ["consultoria", "acompanhamento", "mentoria", "personalizado"],
      faq: [{ q: "Qual a diferença entre esse serviço e o Diagnóstico Empresarial?", a: "O diagnóstico é pontual; a consultoria personalizada é um acompanhamento contínuo ao longo do tempo." }],
      relatedServices: ["solucoes-sob-medida", "planejamento-estrategico"],
    },
  ];

  /**
   * Cases/projetos — resultados sempre qualitativos, nunca métricas
   * inventadas (ver seção 18 do briefing). [SUBSTITUIR] por projetos
   * reais e autorizados antes da publicação comercial.
   */
  var cases = [
    {
      id: "case-clinica-estetica",
      segment: "Clínica de estética (demonstração)",
      problem: "Agenda organizada por telefone, com conflitos frequentes de horário.",
      solution: "Estruturação da gestão de agendas e automação do primeiro atendimento.",
      servicesUsed: ["gestao-agendas", "automacao-atendimento"],
      qualitativeResult: "Processo de agendamento mais organizado e menos conflitos de horário.",
      gradient: ["#7A4FB8", "#5A3789"],
    },
    {
      id: "case-escritorio-arquitetura",
      segment: "Escritório de arquitetura (demonstração)",
      problem: "Apresentação da empresa dependia apenas de portfólio enviado por e-mail.",
      solution: "Criação de site institucional com apresentação de projetos e formulário de contato.",
      servicesUsed: ["criacao-sites"],
      qualitativeResult: "Apresentação mais profissional e centralizada para novos contatos.",
      gradient: ["#2952C7", "#1B3690"],
    },
    {
      id: "case-academia",
      segment: "Academia (demonstração)",
      problem: "Comunicação nas redes sociais irregular e sem planejamento.",
      solution: "Gestão de redes sociais com planejamento mensal de conteúdo.",
      servicesUsed: ["gestao-redes-sociais"],
      qualitativeResult: "Comunicação mais consistente e alinhada à identidade da marca.",
      gradient: ["#B8792F", "#8F5B1F"],
    },
    {
      id: "case-agencia-eventos",
      segment: "Agência de eventos (demonstração)",
      problem: "Tarefas administrativas concentradas em uma única pessoa da equipe.",
      solution: "Suporte administrativo combinado com estruturação de processos internos.",
      servicesUsed: ["suporte-administrativo", "estruturacao-processos"],
      qualitativeResult: "Redução de tarefas manuais e rotina administrativa mais organizada.",
      gradient: ["#4B4F5C", "#33363F"],
    },
  ];

  /**
   * IMPORTANTE: os itens abaixo são exemplos ilustrativos do componente de
   * depoimento — cada card é claramente identificado como exemplo (ver
   * `isExample: true`, usado pela UI para exibir o selo "Depoimento de
   * exemplo"). Substitua por depoimentos reais e autorizados antes de
   * publicar comercialmente; nunca use fotos de pessoas encontradas na
   * internet.
   */
  var testimonials = [
    {
      id: "exemplo-1",
      isExample: true,
      quote: "O diagnóstico ajudou a enxergar prioridades que a gente não conseguia ver de dentro do dia a dia.",
      role: "Proprietário(a) de clínica — exemplo do segmento de estética",
    },
    {
      id: "exemplo-2",
      isExample: true,
      quote: "Ter um único ponto de contato para site e redes sociais facilitou muito o acompanhamento.",
      role: "Sócio(a) — exemplo do segmento de arquitetura",
    },
    {
      id: "exemplo-3",
      isExample: true,
      quote: "A automação de atendimento reduziu bastante o tempo de resposta no WhatsApp.",
      role: "Gestor(a) — exemplo do segmento fitness",
    },
  ];

  /**
   * Respostas honestas e editáveis — nunca inventam prazo, preço,
   * garantia ou forma de pagamento. Onde a resposta depende da empresa,
   * fica marcado com [Personalização: ...].
   */
  var faq = [
    { q: "Como sei qual serviço escolher?", a: "Você pode usar a busca, os filtros por categoria ou a seção \"Não sabe qual serviço escolher?\" — ou simplesmente solicitar uma recomendação e nossa equipe ajuda a identificar o caminho mais adequado." },
    { q: "Posso contratar mais de um serviço?", a: "Sim. Vários serviços podem ser combinados no mesmo projeto, conforme a necessidade da empresa." },
    { q: "Os serviços possuem preços fixos?", a: "Não. Cada projeto recebe uma proposta personalizada conforme o escopo definido." },
    { q: "Como funciona o orçamento?", a: "Você preenche o formulário ou fala pelo WhatsApp contando sua necessidade, e recebe uma proposta personalizada." },
    { q: "O atendimento pode ser online?", a: "Sim, a maioria dos serviços pode ser realizada de forma online. Veja a modalidade de cada serviço na página de detalhes." },
    { q: "Qual é o prazo de início?", a: "[Personalização: informe aqui o prazo médio para início de um novo projeto.]" },
    { q: "Os projetos são personalizados?", a: "Sim. Mesmo os serviços com escopo mais padronizado são ajustados à realidade de cada empresa." },
    { q: "Posso solicitar uma solução que não aparece na vitrine?", a: "Sim, é exatamente para isso que existe a categoria de Projetos Personalizados — fale com a gente sobre a sua necessidade." },
    { q: "Como funciona o pagamento?", a: "[Personalização: descreva aqui as formas de pagamento aceitas.]" },
    { q: "Existe contrato?", a: "[Personalização: informe aqui se há contrato formal e em quais casos.]" },
    { q: "É possível ampliar o projeto depois?", a: "Sim, novos serviços podem ser incluídos ao longo do relacionamento com a empresa." },
    { q: "Vocês atendem empresas de qualquer segmento?", a: "Sim, os serviços são pensados para se adaptar a diferentes segmentos e portes de empresa." },
    { q: "O suporte está incluído?", a: "Depende do serviço contratado — os detalhes de suporte constam na proposta de cada projeto." },
    { q: "Como acompanho o andamento?", a: "O formato de acompanhamento (reuniões, relatórios ou canal direto) é combinado no início do projeto." },
    { q: "Quais informações preciso enviar?", a: "O formulário de orçamento já reúne as principais informações — quanto mais detalhes, mais precisa fica a proposta." },
  ];

  /**
   * Constrói uma URL de WhatsApp com identificadores discretos ao final
   * da mensagem, seguindo o mesmo padrão usado no restante do catálogo
   * VorinWeb (ex: buildWhatsappLink em lib/whatsapp.ts).
   */
  function buildWhatsappUrl(message, tags) {
    var text = message;
    if (tags) {
      var parts = [];
      Object.keys(tags).forEach(function (key) {
        if (tags[key]) parts.push("[" + key + ": " + tags[key] + "]");
      });
      if (parts.length) text += "\n\n" + parts.join(" ");
    }
    return "https://wa.me/" + company.whatsapp + "?text=" + encodeURIComponent(text);
  }

  function getServiceBySlug(slug) {
    for (var i = 0; i < services.length; i++) {
      if (services[i].slug === slug) return services[i];
    }
    return null;
  }

  function getCategoryById(id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) return categories[i];
    }
    return null;
  }

  function getServicesByCategory(categoryId) {
    return services.filter(function (s) {
      return s.category === categoryId;
    });
  }

  return {
    company: company,
    business: business,
    categories: categories,
    needs: needs,
    services: services,
    cases: cases,
    testimonials: testimonials,
    faq: faq,
    buildWhatsappUrl: buildWhatsappUrl,
    getServiceBySlug: getServiceBySlug,
    getCategoryById: getCategoryById,
    getServicesByCategory: getServicesByCategory,
  };
});
