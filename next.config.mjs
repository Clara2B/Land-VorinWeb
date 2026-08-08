/** @type {import('next').NextConfig} */
const nextConfig = {
  // O site nunca teve uma página na raiz do domínio ("/") — só existe a
  // rota /site-rapido. Sem este redirect, acessar o domínio puro (sem o
  // caminho) sempre resultava em 404, o que é arriscado agora que o
  // domínio vai receber tráfego pago (campanha do Google Ads): qualquer
  // link colado, compartilhado ou capturado por um crawler de preview
  // sem o "/site-rapido" no final levava o visitante a um erro.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/site-rapido",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
