export interface SiteModel {
  /** Identificador estável para rastreamento (select_model, links do WhatsApp). */
  id: string;
  name: string;
  category: "Site institucional" | "Landing page" | "Portfólio profissional" | "Página de serviços";
  blurb: string;
  /**
   * Print real do modelo. Ainda não temos as imagens finais — deixe como
   * `undefined` e o ModelCard renderiza um placeholder visual consistente.
   * Para ativar, salve a imagem em /public/images/models/ e aponte o
   * caminho aqui (ex: "/images/models/institucional-classico.webp").
   */
  previewImage?: string;
  /** Link para ver o modelo ao vivo. Deixe undefined para ocultar o botão "Ver modelo" até haver uma demo publicada. */
  demoUrl?: string;
}

export const siteModels: SiteModel[] = [
  {
    id: "institucional-classico",
    name: "Institucional Clássico",
    category: "Site institucional",
    blurb: "Apresenta a empresa, os serviços e os canais de contato em uma estrutura única e organizada.",
  },
  {
    id: "landing-conversao",
    name: "Landing de Conversão",
    category: "Landing page",
    blurb: "Focado em uma oferta específica, com o caminho mais curto possível até o WhatsApp.",
  },
  {
    id: "portfolio-profissional",
    name: "Portfólio Profissional",
    category: "Portfólio profissional",
    blurb: "Pensado para exibir trabalhos, projetos ou cases de forma visual.",
  },
  {
    id: "vitrine-servicos",
    name: "Vitrine de Serviços",
    category: "Página de serviços",
    blurb: "Apresenta os serviços oferecidos com clareza, facilitando pedidos de orçamento.",
  },
];
