export interface Case {
  name: string;
  logo: string;
  segment: string;
  serviceType: "Site institucional" | "Landing page" | "Loja virtual";
  description: string;
  url: string;
}

export const cases: Case[] = [
  {
    name: "AGR Ar Condicionado",
    logo: "/images/agr/logo.webp",
    segment: "Climatização e ar-condicionado",
    serviceType: "Site institucional",
    description: "Site institucional entregue — captação de orçamento direto pelo WhatsApp.",
    url: "https://agrarcondicionado.com.br/",
  },
  {
    name: "Nu3tion",
    logo: "/images/nu3tion/logo.webp",
    segment: "Nutrição e suplementação",
    serviceType: "Loja virtual",
    description: "Loja virtual entregue — página de produto pensada pra converter.",
    url: "https://nu3tion.com.br/",
  },
];
