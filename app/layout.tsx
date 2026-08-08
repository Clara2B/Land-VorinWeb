import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { siteConfig } from "@/lib/site-config";

// Preparado para receber os IDs reais assim que existirem — defina as env
// vars abaixo no projeto da Vercel para ativar. Sem elas, nada é carregado.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "VorinWeb - Sites profissionais para o seu negócio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/*
          GOOGLE TAG MANAGER
          Assim que o container ID (GTM-XXXXXXX) existir, defina a env var
          NEXT_PUBLIC_GTM_ID no projeto da Vercel — o script abaixo ativa
          sozinho. Os eventos já são enviados para window.dataLayer por
          lib/tracking.ts; só falta configurar os gatilhos no GTM.
        */}
        {gtmId && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}

        {/*
          META PIXEL (opcional)
          Defina NEXT_PUBLIC_META_PIXEL_ID no projeto da Vercel para ativar.
        */}
        {metaPixelId && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}

        {children}
      </body>
    </html>
  );
}
