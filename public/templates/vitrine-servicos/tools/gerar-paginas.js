#!/usr/bin/env node
/* ==========================================================================
   gerar-paginas.js
   ==========================================================================
   Gera uma página estática por serviço em servicos/<slug>.html, a partir
   da fonte única de dados em assets/js/services-data.js — para manter a
   promessa da seção 10/31 do briefing ("dados centralizados, sem
   escrever cada página manualmente").

   Uso:
     node tools/gerar-paginas.js

   Rode este script sempre que editar `services`, `categories`,
   `company` ou `needs` em assets/js/services-data.js. Ele sobrescreve
   todo o conteúdo de servicos/*.html — não edite esses arquivos à mão.
   ========================================================================== */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = require(path.join(ROOT, "assets/js/services-data.js"));
const OUT_DIR = path.join(ROOT, "servicos");

function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function whatsappHref(message, tags) {
  var text = message;
  var parts = [];
  Object.keys(tags || {}).forEach(function (k) {
    if (tags[k]) parts.push("[" + k + ": " + tags[k] + "]");
  });
  if (parts.length) text += "\n\n" + parts.join(" ");
  return "https://wa.me/" + DATA.company.whatsapp + "?text=" + encodeURIComponent(text);
}

function headerHtml() {
  var megaLinks = DATA.categories
    .map(function (cat) {
      var count = DATA.getServicesByCategory(cat.id).length;
      return (
        '<a class="mega-link" href="../index.html#vitrine">' +
        '<svg aria-hidden="true"><use href="../assets/icons/sprite.svg#' + cat.icon + '"></use></svg>' +
        "<span><strong>" + esc(cat.name) + "</strong><span>" + count + " serviços</span></span>" +
        "</a>"
      );
    })
    .join("");

  return `
  <header class="header" id="siteHeader">
    <div class="container">
      <a href="../index.html" class="header-logo">
        <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-logo"></use></svg>
        ${esc(DATA.company.shortName)}
      </a>

      <div class="nav-backdrop" id="navBackdrop"></div>
      <nav class="nav" id="siteNav" aria-label="Navegação principal">
        <ul class="nav-list">
          <li><a class="nav-link" href="../index.html#topo">Início</a></li>
          <li class="mega-item" id="megaItem">
            <button class="nav-link" id="megaTrigger" aria-expanded="false" aria-controls="megaPanel">
              Serviços
              <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-chevron-down"></use></svg>
            </button>
            <div class="mega-panel" id="megaPanel">
              <div class="mega-grid">${megaLinks}</div>
              <div class="mega-footer"><a href="../index.html#vitrine" class="btn-ghost" style="font-size:var(--fs-xs);font-weight:700">Ver todos os serviços →</a></div>
            </div>
          </li>
          <li><a class="nav-link" href="../index.html#categorias">Categorias</a></li>
          <li><a class="nav-link" href="../index.html#como-funciona">Como funciona</a></li>
          <li><a class="nav-link" href="../index.html#sobre">Sobre</a></li>
          <li><a class="nav-link" href="../index.html#faq">Dúvidas</a></li>
          <li><a class="nav-link" href="../index.html#orcamento">Contato</a></li>
        </ul>
        <div class="header-actions">
          <a href="/site-rapido#modelos" class="btn btn-secondary btn-sm">
            <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-chevron-left"></use></svg>
            Ver outros modelos
          </a>
          <a href="../index.html#orcamento" class="btn btn-primary btn-sm" data-track="click_cta_principal" data-track-label="header_service">Solicitar orçamento</a>
        </div>
      </nav>

      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="siteNav" aria-label="Abrir menu">
        <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-menu"></use></svg>
      </button>
    </div>
  </header>`;
}

function footerHtml() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="../index.html" class="header-logo" style="color:#fff"><svg aria-hidden="true" style="color:var(--color-primary-light)"><use href="../assets/icons/sprite.svg#icon-logo"></use></svg>${esc(DATA.company.shortName)}</a>
          <p>${esc(DATA.company.slogan)}</p>
          <div class="social-links">
            <a href="${DATA.company.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-instagram"></use></svg></a>
            <a href="${DATA.company.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-linkedin"></use></svg></a>
            <a href="${DATA.company.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-facebook"></use></svg></a>
          </div>
        </div>
        <nav aria-label="Categorias">
          <p class="footer-heading">Categorias</p>
          <ul class="footer-links">${DATA.categories.map((c) => `<li><a href="../index.html#vitrine">${esc(c.name)}</a></li>`).join("")}</ul>
        </nav>
        <nav aria-label="Serviços em destaque">
          <p class="footer-heading">Em destaque</p>
          <ul class="footer-links">${DATA.services.filter((s) => s.featured).slice(0, 5).map((s) => `<li><a href="${s.slug}.html">${esc(s.name)}</a></li>`).join("")}</ul>
        </nav>
        <div>
          <p class="footer-heading">Contato</p>
          <ul class="footer-contact">
            <li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-phone"></use></svg>${esc(DATA.company.phoneDisplay)}</li>
            <li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-mail"></use></svg>${esc(DATA.company.email)}</li>
            <li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-map-pin"></use></svg>${esc(DATA.company.address)}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="currentYear"></span> ${esc(DATA.company.name)}. Todos os direitos reservados. CNPJ ${esc(DATA.company.cnpj)}.</p>
        <div class="footer-legal"><a href="#">Política de privacidade</a><a href="#">Termos de uso</a><a href="#">Acessibilidade</a></div>
      </div>
      <p class="footer-credit">Desenvolvido pela <a href="${DATA.company.vorinwebUrl}" target="_blank" rel="noopener noreferrer">VorinWeb</a></p>
    </div>
  </footer>`;
}

function floatingHtml() {
  return `
  <a class="float-whatsapp" href="${whatsappHref("Olá! Gostaria de falar sobre os serviços da " + DATA.company.shortName + ".", { ORIGEM: "BOTAO_FLUTUANTE" })}" data-track="click_service_whatsapp" data-track-label="floating_button" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
    <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-whatsapp"></use></svg>
  </a>
  <div class="cookie-banner" id="cookieBanner" role="dialog" aria-live="polite" aria-label="Aviso de cookies" data-visible="false">
    <p>Usamos cookies para melhorar sua experiência de navegação, conforme a nossa <a href="#">Política de Privacidade</a> e a LGPD.</p>
    <div class="cookie-actions">
      <button class="btn btn-primary btn-sm" id="cookieAccept">Aceitar</button>
      <button class="btn btn-secondary btn-sm" id="cookieDecline">Recusar</button>
    </div>
  </div>`;
}

function serviceJsonLd(service, category) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: { "@type": "Organization", name: DATA.company.name, url: DATA.company.domain },
    areaServed: "BR",
    serviceType: category ? category.name : undefined,
    url: `${DATA.company.domain}/servicos/${service.slug}.html`,
  };
}

function breadcrumbJsonLd(service, category) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${DATA.company.domain}/` },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${DATA.company.domain}/#vitrine` },
      { "@type": "ListItem", position: 3, name: category ? category.name : "Categoria", item: `${DATA.company.domain}/#vitrine` },
      { "@type": "ListItem", position: 4, name: service.name, item: `${DATA.company.domain}/servicos/${service.slug}.html` },
    ],
  };
}

function faqJsonLd(service) {
  if (!service.faq || !service.faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function renderService(service) {
  const category = DATA.getCategoryById(service.category);
  const related = (service.relatedServices || [])
    .map((slug) => DATA.services.find((s) => s.id === slug))
    .filter(Boolean);

  const problemsHtml = service.problemsSolved
    .map((p) => `<li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-alert-circle"></use></svg>${esc(p)}</li>`)
    .join("");
  const benefitsHtml = service.benefits
    .map((b) => `<li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-check-circle"></use></svg>${esc(b)}</li>`)
    .join("");
  const featuresHtml = service.features
    .map((f) => `<li><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-check"></use></svg>${esc(f)}</li>`)
    .join("");
  const audienceHtml = service.targetAudience.map((a) => `<span class="tag">${esc(a)}</span>`).join("");
  const modesHtml = service.deliveryMethod.map((m) => `<span class="tag">${esc(m)}</span>`).join("");
  const faqHtml = (service.faq || [])
    .map(
      (f, i) =>
        `<details class="accordion-item" name="faq-servico"${i === 0 ? " open" : ""}><summary>${esc(f.q)}<svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-chevron-down"></use></svg></summary><p>${esc(f.a)}</p></details>`
    )
    .join("");
  const relatedHtml = related
    .map(
      (r) => `
      <article class="service-card">
        <div class="service-media" style="--card-a:${r.gradient[0]};--card-b:${r.gradient[1]}"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#${r.icon}"></use></svg></div>
        <div class="service-body">
          <span class="service-category">${esc(DATA.getCategoryById(r.category).name)}</span>
          <h3>${esc(r.name)}</h3>
          <p>${esc(r.shortDescription)}</p>
        </div>
        <div class="service-actions"><a class="btn btn-secondary btn-sm" href="${r.slug}.html">Ver detalhes</a></div>
      </article>`
    )
    .join("");

  const waDetailsHref = whatsappHref(`Olá! Analisei os detalhes do serviço ${service.name} e gostaria de solicitar um orçamento.`, {
    ORIGEM: "PAGINA_SERVICO",
    SERVIÇO: service.name,
  });

  const jsonLdBlocks = [serviceJsonLd(service, category), breadcrumbJsonLd(service, category), faqJsonLd(service)]
    .filter(Boolean)
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>`)
    .join("\n  ");

  const title = `${service.name} | ${DATA.company.shortName}`;
  const description = service.shortDescription;
  const canonical = `${DATA.company.domain}/servicos/${service.slug}.html`;

  return `<!DOCTYPE html>
<!-- Gerado automaticamente por tools/gerar-paginas.js a partir de assets/js/services-data.js. Não edite este arquivo manualmente — edite os dados e rode o script novamente. -->
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="noindex, nofollow" /> <!-- [SUBSTITUIR] trocar para "index, follow" ao publicar para um cliente -->
  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(DATA.company.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${DATA.company.domain}/og-image.jpg" />
  <meta property="og:locale" content="pt_BR" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${DATA.company.domain}/og-image.jpg" />

  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="../manifest.webmanifest" />
  <meta name="theme-color" content="#0f7b6c" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" /></noscript>

  <link rel="stylesheet" href="../assets/css/style.css" />

  ${jsonLdBlocks}
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div class="scroll-progress" id="scrollProgress" role="presentation"></div>
  ${headerHtml()}

  <main id="conteudo">
    <section class="service-hero" aria-label="Capa do serviço">
      <div class="container">
        <nav class="breadcrumb" aria-label="Trilha de navegação">
          <a href="../index.html">Início</a> /
          <a href="../index.html#vitrine">Serviços</a> /
          <a href="../index.html#vitrine">${esc(category ? category.name : "")}</a> /
          <span>${esc(service.name)}</span>
        </nav>

        <div class="service-hero-head">
          <div>
            <span class="eyebrow">${esc(category ? category.name : "")}</span>
            <h1>${esc(service.name)}</h1>
            <p class="hero-subheadline">${esc(service.fullDescription)}</p>
            <div class="hero-actions" style="margin-top:var(--space-6)">
              <a href="../index.html#orcamento" class="btn btn-primary btn-lg" data-track="select_service" data-service-id="${esc(service.id)}">Solicitar orçamento</a>
              <a href="${waDetailsHref}" class="btn btn-secondary btn-lg" data-track="click_service_whatsapp" data-track-label="detalhes" target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-whatsapp"></use></svg>
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div class="service-info-card">
            <div class="service-info-item"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-map-pin"></use></svg><div><strong>Modalidade</strong><span>${service.deliveryMethod.join(", ")}</span></div></div>
            <div class="service-info-item"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-clock"></use></svg><div><strong>Prazo estimado</strong><span>${esc(service.estimatedTimeline)}</span></div></div>
            <div class="service-info-item"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-puzzle"></use></svg><div><strong>Personalização</strong><span>${esc(service.customizationLevel)}</span></div></div>
            <div class="service-info-item"><svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-briefcase"></use></svg><div><strong>Contratação</strong><span>${esc(service.contractType)}</span></div></div>
          </div>
        </div>

        <div class="service-hero-media" style="margin-top:var(--space-10);background:linear-gradient(135deg,${service.gradient[0]},${service.gradient[1]});display:flex;align-items:center;justify-content:center" aria-hidden="true">
          <svg style="width:88px;height:88px;color:rgb(255 255 255 / 0.5)"><use href="../assets/icons/sprite.svg#${service.icon}"></use></svg>
        </div>
      </div>
    </section>

    <section class="section section--alt" aria-label="Detalhes do serviço">
      <div class="container">
        <div class="detail-grid" data-reveal>
          <div>
            <h2>Problemas que resolve</h2>
            <ul class="detail-list detail-list--problems" style="margin-top:var(--space-5)">${problemsHtml}</ul>
          </div>
          <div>
            <h2>Para quem é</h2>
            <div class="service-benefits" style="margin-top:var(--space-5);gap:var(--space-2)">${audienceHtml}</div>
            <h2 style="margin-top:var(--space-8)">Benefícios</h2>
            <ul class="detail-list" style="margin-top:var(--space-5)">${benefitsHtml}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-label="O que está incluído">
      <div class="container">
        <div class="section-header" data-reveal>
          <span class="eyebrow">O que está incluído</span>
          <h2>Escopo do serviço</h2>
        </div>
        <ul class="detail-list" data-reveal>${featuresHtml}</ul>
      </div>
    </section>

    <section class="section section--alt" aria-label="Como funciona">
      <div class="container">
        <div class="section-header" data-reveal>
          <span class="eyebrow">Como funciona</span>
          <h2>Do primeiro contato ao início do projeto</h2>
        </div>
        <div class="process-grid" data-reveal style="grid-template-columns:repeat(3,1fr)">
          <div class="process-step"><span class="process-number">1</span><h3>Entendimento</h3><p>Conversamos sobre o contexto e a necessidade real por trás do pedido.</p></div>
          <div class="process-step"><span class="process-number">2</span><h3>Proposta</h3><p>Você recebe um escopo e uma proposta personalizada, sem compromisso.</p></div>
          <div class="process-step"><span class="process-number">3</span><h3>Execução</h3><p>O projeto é conduzido com acompanhamento em cada etapa.</p></div>
        </div>
        <p style="margin-top:var(--space-6);font-weight:600" data-reveal><svg aria-hidden="true" style="width:16px;height:16px;display:inline;vertical-align:-3px;color:var(--color-primary)"><use href="../assets/icons/sprite.svg#icon-clock"></use></svg> Prazo estimado: ${esc(service.estimatedTimeline)}</p>
      </div>
    </section>

    ${
      faqHtml
        ? `<section class="section" aria-label="Perguntas frequentes sobre o serviço">
      <div class="container">
        <div class="section-header section-header--center" data-reveal>
          <span class="eyebrow">Dúvidas</span>
          <h2>Perguntas frequentes sobre este serviço</h2>
        </div>
        <div class="accordion" data-reveal>${faqHtml}</div>
      </div>
    </section>`
        : ""
    }

    ${
      relatedHtml
        ? `<section class="section section--alt" aria-label="Serviços relacionados">
      <div class="container">
        <div class="section-header section-header--center" data-reveal>
          <span class="eyebrow">Relacionados</span>
          <h2>Serviços que podem combinar com este</h2>
        </div>
        <div class="related-grid" data-reveal>${relatedHtml}</div>
      </div>
    </section>`
        : ""
    }

    <section class="section section--ink" aria-label="Chamada final">
      <div class="container">
        <div class="cta-final" data-reveal>
          <h2>Pronto para avançar com ${esc(service.name)}?</h2>
          <p>Solicite um orçamento personalizado ou fale diretamente com um especialista.</p>
          <div class="hero-actions">
            <a href="../index.html#orcamento" class="btn btn-primary btn-lg" data-track="select_service" data-service-id="${esc(service.id)}">Solicitar orçamento</a>
            <a href="${waDetailsHref}" class="btn btn-secondary btn-lg" data-track="click_service_whatsapp" data-track-label="cta_final_servico" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true"><use href="../assets/icons/sprite.svg#icon-whatsapp"></use></svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${footerHtml()}
  ${floatingHtml()}

  <script>window.__SERVICE_PAGE__ = true;</script>
  <script src="../assets/js/services-data.js"></script>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;
}

function renderSitemap() {
  const urls = [
    { loc: `${DATA.company.domain}/`, priority: "1.0" },
    ...DATA.services.map((s) => ({ loc: `${DATA.company.domain}/servicos/${s.slug}.html`, priority: "0.8" })),
  ];
  const entries = urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Gerado automaticamente por tools/gerar-paginas.js. Ajuste a URL para o domínio final antes de publicar. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const written = [];
  DATA.services.forEach((service) => {
    const html = renderService(service);
    const filePath = path.join(OUT_DIR, `${service.slug}.html`);
    fs.writeFileSync(filePath, html, "utf8");
    written.push(`servicos/${service.slug}.html`);
  });
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), renderSitemap(), "utf8");
  written.push("sitemap.xml");
  console.log(`Geradas ${written.length} páginas/arquivos:`);
  written.forEach((f) => console.log("  - " + f));
}

main();
