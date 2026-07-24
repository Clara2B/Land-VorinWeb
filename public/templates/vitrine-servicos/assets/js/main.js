/* ==========================================================================
   VITRINE DE SERVIÇOS — main.js
   ==========================================================================
   JavaScript puro, sem dependências. Depende de `window.VITRINE_DATA`
   (carregado antes deste arquivo via assets/js/services-data.js).

   Índice:
     1.  Rastreamento (dataLayer)
     2.  WhatsApp (links dinâmicos)
     3.  Header / menu mobile / mega menu / scroll progress
     4.  Categorias (grid + mega menu + rodapé)
     5.  Vitrine de serviços (render de cards)
     6.  Busca e filtros
     7.  Comparação (checkboxes + barra + modal)
     8.  Necessidades
     9.  Cases / projetos (grid + modal)
     10. Depoimentos
     11. FAQ
     12. Formulário de orçamento
     13. Modal genérico (focus trap)
     14. Barra mobile "precisa de ajuda"
     15. Banner de cookies (LGPD)
     16. Revelação ao rolar
     17. Inicialização
   ========================================================================== */

var DATA = window.VITRINE_DATA;

/* --------------------------------------------------------------------
   1. RASTREAMENTO
   Nunca enviamos dados pessoais (nome, telefone, e-mail, mensagem) para
   o dataLayer — apenas identificadores de conteúdo (service_id,
   category_name etc.).
-------------------------------------------------------------------- */
function trackEvent(eventName, payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: eventName }, payload || {}));
}

function initClickTracking(root) {
  (root || document).querySelectorAll("[data-track]").forEach(function (el) {
    if (el._trackWired) return;
    el._trackWired = true;
    el.addEventListener("click", function () {
      trackEvent(el.dataset.track, {
        button_location: el.dataset.trackLabel || undefined,
        service_id: el.dataset.serviceId || undefined,
      });
    });
  });
}

/* --------------------------------------------------------------------
   2. WHATSAPP
   Todo link com a classe .js-whatsapp-link tem seu href construído em
   runtime a partir de data-wa-message / data-wa-origem / data-wa-service
   / data-wa-category / data-wa-objetivo — nenhuma URL é montada à mão
   em mais de um lugar.
-------------------------------------------------------------------- */
function wireWhatsappLinks(root) {
  (root || document).querySelectorAll(".js-whatsapp-link").forEach(function (el) {
    var message = el.dataset.waMessage || "Olá! Gostaria de mais informações.";
    var tags = {
      ORIGEM: el.dataset.waOrigem,
      SERVIÇO: el.dataset.waService,
      CATEGORIA: el.dataset.waCategory,
      OBJETIVO: el.dataset.waObjetivo,
    };
    el.href = DATA.buildWhatsappUrl(message, tags);
  });
}

/* --------------------------------------------------------------------
   3. HEADER / MENU MOBILE / MEGA MENU / SCROLL PROGRESS
-------------------------------------------------------------------- */
function initHeader() {
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("scrollProgress");
  var SOLID_THRESHOLD = 12;

  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > SOLID_THRESHOLD);
    if (progress) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var navBackdrop = document.getElementById("navBackdrop");

  function setNavOpen(open) {
    nav.dataset.open = String(open);
    navBackdrop.dataset.open = String(open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  navToggle.addEventListener("click", function () { setNavOpen(nav.dataset.open !== "true"); });
  navBackdrop.addEventListener("click", function () { setNavOpen(false); });
  nav.querySelectorAll(".nav-list > li > a.nav-link").forEach(function (link) {
    link.addEventListener("click", function () { setNavOpen(false); });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.dataset.open === "true") {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // Mega menu — só clique/toque (funciona igual com mouse, teclado e
  // touch). Um comportamento de hover somado ao clique cria uma corrida:
  // o mouseenter abre o menu antes do clique acontecer, e o clique (que
  // alterna o estado) acaba fechando de novo o que o hover tinha aberto.
  var megaItem = document.getElementById("megaItem");
  var megaTrigger = document.getElementById("megaTrigger");

  function setMegaOpen(open) {
    megaItem.dataset.open = String(open);
    megaTrigger.setAttribute("aria-expanded", String(open));
  }
  megaTrigger.addEventListener("click", function () {
    setMegaOpen(megaItem.dataset.open !== "true");
  });
  document.addEventListener("click", function (event) {
    if (!megaItem.contains(event.target)) setMegaOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMegaOpen(false);
  });
}

/* --------------------------------------------------------------------
   4. CATEGORIAS (grid + mega menu + rodapé)
-------------------------------------------------------------------- */
function renderMegaMenu() {
  var grid = document.getElementById("megaGrid");
  if (!grid) return; // páginas de serviço já recebem o mega menu pré-renderizado (ver tools/gerar-paginas.js)
  grid.innerHTML = DATA.categories.map(function (cat) {
    var count = DATA.getServicesByCategory(cat.id).length;
    return (
      '<a class="mega-link" href="#vitrine" data-category-link="' + cat.id + '">' +
      '<svg aria-hidden="true"><use href="assets/icons/sprite.svg#' + cat.icon + '"></use></svg>' +
      "<span><strong>" + cat.name + "</strong><span>" + count + " serviços</span></span>" +
      "</a>"
    );
  }).join("");
}

function renderCategoriesGrid() {
  var grid = document.getElementById("categoriesGrid");
  if (!grid) return;
  grid.innerHTML = DATA.categories.map(function (cat) {
    var count = DATA.getServicesByCategory(cat.id).length;
    return (
      '<button type="button" class="category-card" data-category-link="' + cat.id + '" aria-pressed="false">' +
      '<span class="category-icon"><svg aria-hidden="true"><use href="assets/icons/sprite.svg#' + cat.icon + '"></use></svg></span>' +
      "<h3>" + cat.name + "</h3>" +
      "<p>" + cat.description + "</p>" +
      '<span class="category-count">' + count + " serviços</span>" +
      "</button>"
    );
  }).join("");
}

function renderFooterLists() {
  var catList = document.getElementById("footerCategories");
  if (!catList) return; // páginas de serviço já recebem o rodapé pré-renderizado
  catList.innerHTML = DATA.categories.map(function (cat) {
    return '<li><a href="#vitrine" data-category-link="' + cat.id + '">' + cat.name + "</a></li>";
  }).join("");

  var featList = document.getElementById("footerFeatured");
  featList.innerHTML = DATA.services.filter(function (s) { return s.featured; }).slice(0, 5).map(function (s) {
    return '<li><a href="servicos/' + s.slug + '.html">' + s.name + "</a></li>";
  }).join("");
}

/* --------------------------------------------------------------------
   5. VITRINE DE SERVIÇOS (render de cards)
-------------------------------------------------------------------- */
function serviceCardHtml(service) {
  var cat = DATA.getCategoryById(service.category);
  var featuredBadge = service.featured
    ? '<span class="service-featured-badge"><svg aria-hidden="true"><use href="assets/icons/sprite.svg#icon-star"></use></svg>Destaque</span>'
    : "";
  var benefits = service.benefits.slice(0, 2).map(function (b) {
    return '<span class="tag">' + b + "</span>";
  }).join("");
  var modes = service.deliveryMethod.map(function (m) { return m; }).join(" · ");

  return (
    '<article class="service-card" data-service-card data-id="' + service.id + '" data-category="' + service.category + '" data-featured="' + service.featured + '" data-modes="' + service.deliveryMethod.join(",") + '" data-keywords="' + (service.name + " " + service.shortDescription + " " + service.keywords.join(" ")).toLowerCase() + '">' +
      '<div class="service-media" style="--card-a:' + service.gradient[0] + ";--card-b:" + service.gradient[1] + '">' +
        '<svg aria-hidden="true"><use href="assets/icons/sprite.svg#' + service.icon + '"></use></svg>' +
        featuredBadge +
        '<label class="service-compare-toggle" data-compare-toggle="' + service.id + '">' +
          '<input type="checkbox" aria-label="Comparar ' + service.name + '" data-compare-checkbox="' + service.id + '" />' +
          "Comparar" +
        "</label>" +
      "</div>" +
      '<div class="service-body">' +
        '<span class="service-category">' + (cat ? cat.name : "") + "</span>" +
        "<h3>" + service.name + "</h3>" +
        "<p>" + service.shortDescription + "</p>" +
        '<span class="service-mode"><svg aria-hidden="true"><use href="assets/icons/sprite.svg#icon-map-pin"></use></svg>' + modes + "</span>" +
        '<div class="service-benefits">' + benefits + "</div>" +
      "</div>" +
      '<div class="service-actions">' +
        '<a class="btn btn-secondary btn-sm" href="servicos/' + service.slug + '.html" data-track="select_service" data-service-id="' + service.id + '">Ver detalhes</a>' +
        '<a class="btn btn-primary btn-sm js-whatsapp-link" href="#" data-wa-message="Olá! Gostaria de receber mais informações sobre o serviço ' + service.name + '." data-wa-origem="CARD_SERVICO" data-wa-service="' + service.name + '" data-track="click_service_whatsapp" data-track-label="card" target="_blank" rel="noopener noreferrer">Solicitar orçamento</a>' +
      "</div>" +
    "</article>"
  );
}

function renderServicesGrid() {
  var grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = DATA.services.map(serviceCardHtml).join("");
  wireWhatsappLinks(grid);
  initClickTracking(grid);
  initCompareCheckboxes(grid);
}

function renderFeaturedGrid() {
  var grid = document.getElementById("featuredGrid");
  if (!grid) return;
  var featured = DATA.services.filter(function (s) { return s.featured; });
  grid.innerHTML = featured.map(serviceCardHtml).join("");
  wireWhatsappLinks(grid);
  initClickTracking(grid);
  initCompareCheckboxes(grid);
}

/* --------------------------------------------------------------------
   6. BUSCA E FILTROS
-------------------------------------------------------------------- */
var activeFilters = { category: "todos", mode: "", featured: "", search: "" };

function renderCategoryChips() {
  var wrap = document.getElementById("categoryChips");
  if (!wrap) return;
  var chips = ['<button type="button" class="filter-chip" data-chip="todos" aria-pressed="true">Todos os serviços</button>'];
  DATA.categories.forEach(function (cat) {
    chips.push('<button type="button" class="filter-chip" data-chip="' + cat.id + '" aria-pressed="false">' + cat.name + "</button>");
  });
  wrap.innerHTML = chips.join("");
}

function populateModeFilter() {
  var select = document.getElementById("filterMode");
  if (!select) return;
  DATA.business.serviceModes.forEach(function (mode) {
    var opt = document.createElement("option");
    opt.value = mode;
    opt.textContent = mode;
    select.appendChild(opt);
  });
}

function applyFilters() {
  var servicesGrid = document.getElementById("servicesGrid");
  if (!servicesGrid) return;
  var cards = document.querySelectorAll("#servicesGrid [data-service-card]");
  var visibleCount = 0;

  cards.forEach(function (card) {
    var matchesCategory = activeFilters.category === "todos" || card.dataset.category === activeFilters.category;
    var matchesMode = !activeFilters.mode || card.dataset.modes.split(",").indexOf(activeFilters.mode) !== -1;
    var matchesFeatured = !activeFilters.featured || card.dataset.featured === activeFilters.featured;
    var matchesSearch = !activeFilters.search || card.dataset.keywords.indexOf(activeFilters.search.toLowerCase()) !== -1;
    var visible = matchesCategory && matchesMode && matchesFeatured && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  var resultsEl = document.getElementById("resultsCount");
  resultsEl.innerHTML = "<strong>" + visibleCount + "</strong> " + (visibleCount === 1 ? "serviço encontrado" : "serviços encontrados");

  document.getElementById("emptyState").hidden = visibleCount !== 0;
  document.getElementById("servicesGrid").hidden = visibleCount === 0;
}

function setCategory(categoryId) {
  activeFilters.category = categoryId;
  document.querySelectorAll("#categoryChips .filter-chip").forEach(function (chip) {
    chip.setAttribute("aria-pressed", String(chip.dataset.chip === categoryId));
  });
  document.querySelectorAll("#categoriesGrid .category-card").forEach(function (card) {
    card.setAttribute("aria-pressed", String(card.dataset.categoryLink === categoryId));
  });
  applyFilters();
  var cat = DATA.getCategoryById(categoryId);
  trackEvent("filter_service_category", { category_name: cat ? cat.name : "Todos" });
}

function initFiltersUi() {
  var categoryChips = document.getElementById("categoryChips");
  if (!categoryChips) return; // só existe em index.html
  categoryChips.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-chip]");
    if (!btn) return;
    setCategory(btn.dataset.chip);
  });

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-category-link]");
    if (!link) return;
    event.preventDefault();
    setCategory(link.dataset.categoryLink);
    document.getElementById("vitrine").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  var searchInput = document.getElementById("serviceSearch");
  var searchBar = document.getElementById("searchBar");
  var searchDebounce;
  searchInput.addEventListener("input", function () {
    searchBar.dataset.hasValue = String(searchInput.value.length > 0);
    activeFilters.search = searchInput.value.trim();
    applyFilters();
    clearTimeout(searchDebounce);
    if (activeFilters.search) {
      searchDebounce = setTimeout(function () {
        trackEvent("search_service", { search_term: activeFilters.search });
      }, 500);
    }
  });
  document.getElementById("searchClear").addEventListener("click", function () {
    searchInput.value = "";
    searchBar.dataset.hasValue = "false";
    activeFilters.search = "";
    applyFilters();
    searchInput.focus();
  });

  document.getElementById("filterMode").addEventListener("change", function (event) {
    activeFilters.mode = event.target.value;
    applyFilters();
    trackEvent("filter_service_category", { selected_filter: "modalidade:" + (event.target.value || "todas") });
  });
  document.getElementById("filterFeatured").addEventListener("change", function (event) {
    activeFilters.featured = event.target.value;
    applyFilters();
  });

  document.getElementById("filtersClear").addEventListener("click", function () {
    activeFilters = { category: "todos", mode: "", featured: "", search: "" };
    searchInput.value = "";
    searchBar.dataset.hasValue = "false";
    document.getElementById("filterMode").value = "";
    document.getElementById("filterFeatured").value = "";
    setCategory("todos");
    trackEvent("clear_service_filters");
  });

  // Lê ?busca=termo na URL e já filtra ao carregar — mantém a promessa do
  // SearchAction do JSON-LD (WebSite) real e funcional, não apenas
  // decorativa (ver seção 25 do briefing: dados estruturados precisam
  // corresponder ao comportamento real do site).
  var initialQuery = new URLSearchParams(window.location.search).get("busca");
  if (initialQuery) {
    searchInput.value = initialQuery;
    searchBar.dataset.hasValue = "true";
    activeFilters.search = initialQuery.trim();
    applyFilters();
  }
}

/* --------------------------------------------------------------------
   7. COMPARAÇÃO
-------------------------------------------------------------------- */
var compareSelection = [];
var QUICK_COMPARE_IDS = ["diagnostico-empresarial", "planejamento-estrategico", "consultoria-personalizada"];

function updateCompareBar() {
  var bar = document.getElementById("compareBar");
  if (!bar) return;
  bar.dataset.visible = String(compareSelection.length > 0);
  document.getElementById("compareCount").textContent = compareSelection.length + " de 3 selecionados";
  document.getElementById("compareOpenBtn").disabled = compareSelection.length < 2;
}

function toggleCompare(serviceId, checked) {
  var idx = compareSelection.indexOf(serviceId);
  if (checked) {
    if (compareSelection.length >= 3) {
      document.querySelectorAll('[data-compare-checkbox="' + serviceId + '"]').forEach(function (cb) { cb.checked = false; });
      return;
    }
    if (idx === -1) compareSelection.push(serviceId);
  } else if (idx !== -1) {
    compareSelection.splice(idx, 1);
  }
  document.querySelectorAll('[data-compare-toggle="' + serviceId + '"]').forEach(function (el) {
    el.dataset.checked = String(checked);
  });
  updateCompareBar();
  if (checked) trackEvent("compare_service", { service_id: serviceId });
}

function initCompareCheckboxes(root) {
  (root || document).querySelectorAll("[data-compare-checkbox]").forEach(function (input) {
    input.addEventListener("change", function () {
      toggleCompare(input.dataset.compareCheckbox, input.checked);
    });
  });
}

function compareRow(label, key, formatter) {
  var cells = compareSelection.map(function (id) {
    var s = DATA.getServiceBySlug(id) || DATA.services.filter(function (x) { return x.id === id; })[0];
    var value = formatter ? formatter(s) : s[key];
    return '<td data-label="' + label + '">' + value + "</td>";
  }).join("");
  return "<tr><th>" + label + "</th>" + cells + "</tr>";
}

function openCompareModal(ids) {
  compareSelection = ids.slice(0, 3);
  var table = document.getElementById("compareTable");
  var headCells = compareSelection.map(function (id) {
    var s = DATA.services.filter(function (x) { return x.id === id; })[0];
    return "<th>" + s.name + "</th>";
  }).join("");

  table.innerHTML =
    "<thead><tr><th></th>" + headCells + "</tr></thead>" +
    "<tbody>" +
    compareRow("Categoria", null, function (s) { return DATA.getCategoryById(s.category).name; }) +
    compareRow("Indicado para", null, function (s) { return s.targetAudience.join(", "); }) +
    compareRow("Modalidade", null, function (s) { return s.deliveryMethod.join(", "); }) +
    compareRow("Personalização", "customizationLevel") +
    compareRow("Prazo estimado", "estimatedTimeline") +
    compareRow("Principais entregas", null, function (s) { return s.features.slice(0, 3).join(", "); }) +
    compareRow("Tipo de contratação", "contractType") +
    compareRow("", null, function (s) { return '<a class="btn btn-primary btn-sm" href="servicos/' + s.slug + '.html">Ver detalhes</a>'; }) +
    "</tbody>";

  var modal = document.getElementById("compareModal");
  openModal(modal);
}

function initCompareUi() {
  if (!document.getElementById("compareModal")) return; // comparação só existe em index.html
  var barHtml =
    '<div class="compare-bar" id="compareBar" data-visible="false">' +
    '<span id="compareCount">0 de 3 selecionados</span>' +
    '<button type="button" class="btn btn-primary btn-sm" id="compareOpenBtn" disabled>Comparar</button>' +
    '<button type="button" class="btn-ghost-light" id="compareClearBtn">Limpar</button>' +
    "</div>";
  document.body.insertAdjacentHTML("beforeend", barHtml);

  document.getElementById("compareOpenBtn").addEventListener("click", function () {
    openCompareModal(compareSelection);
  });
  document.getElementById("compareClearBtn").addEventListener("click", function () {
    compareSelection.slice().forEach(function (id) {
      document.querySelectorAll('[data-compare-checkbox="' + id + '"]').forEach(function (cb) { cb.checked = false; });
      toggleCompare(id, false);
    });
  });

  document.getElementById("quickCompareBtn").addEventListener("click", function () {
    openCompareModal(QUICK_COMPARE_IDS);
  });
}

/* --------------------------------------------------------------------
   8. NECESSIDADES
-------------------------------------------------------------------- */
function renderNeeds() {
  var grid = document.getElementById("needsGrid");
  if (!grid) return;
  grid.innerHTML = DATA.needs.map(function (need) {
    var tags = need.services.map(function (slug) {
      var s = DATA.services.filter(function (x) { return x.id === slug; })[0];
      return s ? '<span class="tag">' + s.name + "</span>" : "";
    }).join("");
    return (
      '<div class="need-card">' +
      "<h3>" + need.title + "</h3>" +
      "<p>" + need.explanation + "</p>" +
      '<div class="need-services">' + tags + "</div>" +
      '<button type="button" class="btn btn-secondary btn-sm" data-need="' + need.id + '" style="margin-top:var(--space-3)">Ver soluções</button>' +
      "</div>"
    );
  }).join("");

  grid.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-need]");
    if (!btn) return;
    var need = DATA.needs.filter(function (n) { return n.id === btn.dataset.need; })[0];
    if (!need) return;
    trackEvent("filter_service_need", { user_need: need.title });

    // Filtra a vitrine para mostrar só os serviços recomendados dessa necessidade.
    activeFilters = { category: "todos", mode: "", featured: "", search: "" };
    setCategory("todos");
    document.querySelectorAll("#servicesGrid [data-service-card]").forEach(function (card) {
      card.hidden = need.services.indexOf(card.dataset.id) === -1;
    });
    var visible = need.services.length;
    document.getElementById("resultsCount").innerHTML = "<strong>" + visible + "</strong> " + (visible === 1 ? "serviço recomendado" : "serviços recomendados");
    document.getElementById("vitrine").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* --------------------------------------------------------------------
   9. CASES / PROJETOS
-------------------------------------------------------------------- */
function renderCases() {
  var grid = document.getElementById("casesGrid");
  if (!grid) return;
  grid.innerHTML = DATA.cases.map(function (c) {
    return (
      '<article class="case-card">' +
      '<div class="case-media" style="background:linear-gradient(135deg,' + c.gradient[0] + "," + c.gradient[1] + ')"></div>' +
      '<div class="case-body">' +
      '<span class="case-segment">' + c.segment + "</span>" +
      "<p>" + c.problem + "</p>" +
      '<span class="case-result"><svg aria-hidden="true" style="width:14px;height:14px;display:inline;vertical-align:-2px"><use href="assets/icons/sprite.svg#icon-check-circle"></use></svg> ' + c.qualitativeResult + "</span>" +
      '<button type="button" class="btn btn-ghost" data-case="' + c.id + '" style="align-self:flex-start;padding-left:0">Ver projeto →</button>' +
      "</div></article>"
    );
  }).join("");

  grid.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-case]");
    if (!btn) return;
    var c = DATA.cases.filter(function (x) { return x.id === btn.dataset.case; })[0];
    if (!c) return;
    var servicesUsed = c.servicesUsed.map(function (slug) {
      var s = DATA.services.filter(function (x) { return x.id === slug; })[0];
      return s ? '<span class="tag">' + s.name + "</span>" : "";
    }).join("");
    document.getElementById("caseModalTitle").textContent = c.segment;
    document.getElementById("caseModalBody").innerHTML =
      '<div class="case-modal-media" style="background:linear-gradient(135deg,' + c.gradient[0] + "," + c.gradient[1] + ')"></div>' +
      "<div><strong>Problema</strong><p>" + c.problem + "</p></div>" +
      "<div><strong>Solução aplicada</strong><p>" + c.solution + "</p></div>" +
      '<div><strong>Serviços utilizados</strong><div class="service-benefits" style="margin-top:var(--space-2)">' + servicesUsed + "</div></div>" +
      "<div><strong>Resultado</strong><p>" + c.qualitativeResult + "</p></div>";
    openModal(document.getElementById("caseModal"));
  });
}

/* --------------------------------------------------------------------
   10. DEPOIMENTOS
-------------------------------------------------------------------- */
function renderTestimonials() {
  var grid = document.getElementById("testimonialsGrid");
  if (!grid) return;
  grid.innerHTML = DATA.testimonials.map(function (t) {
    var badge = t.isExample ? '<span class="testimonial-example-badge">Depoimento de exemplo</span>' : "";
    return (
      '<div class="testimonial-card">' + badge +
      '<p class="testimonial-quote">“' + t.quote + '”</p>' +
      '<span class="testimonial-role">' + t.role + "</span>" +
      "</div>"
    );
  }).join("");
}

/* --------------------------------------------------------------------
   11. FAQ
-------------------------------------------------------------------- */
function renderFaq() {
  var wrap = document.getElementById("faqAccordion");
  if (!wrap) return;
  wrap.innerHTML = DATA.faq.map(function (item, i) {
    return (
      '<details class="accordion-item" name="faq"' + (i === 0 ? " open" : "") + ">" +
      "<summary>" + item.q + '<svg aria-hidden="true"><use href="assets/icons/sprite.svg#icon-chevron-down"></use></svg></summary>' +
      "<p>" + item.a + "</p>" +
      "</details>"
    );
  }).join("");
}

/* --------------------------------------------------------------------
   12. FORMULÁRIO DE ORÇAMENTO
-------------------------------------------------------------------- */
function populateFormSelects() {
  var categorySelect = document.getElementById("field-category");
  if (!categorySelect) return; // formulário só existe em index.html
  DATA.categories.forEach(function (cat) {
    var opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    categorySelect.appendChild(opt);
  });

  var serviceSelect = document.getElementById("field-service");
  DATA.services.forEach(function (s) {
    var opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    serviceSelect.appendChild(opt);
  });

  var goalSelect = document.getElementById("field-goal");
  DATA.business.goals.forEach(function (goal) {
    var opt = document.createElement("option");
    opt.value = goal.id;
    opt.textContent = goal.label;
    goalSelect.appendChild(opt);
  });

  var modeSelect = document.getElementById("field-mode");
  DATA.business.serviceModes.forEach(function (mode) {
    var opt = document.createElement("option");
    opt.value = mode;
    opt.textContent = mode;
    modeSelect.appendChild(opt);
  });

  var investmentSelect = document.getElementById("field-investment");
  DATA.business.investmentRanges.forEach(function (range) {
    var opt = document.createElement("option");
    opt.value = range.id;
    opt.textContent = range.label;
    investmentSelect.appendChild(opt);
  });
}

/**
 * name/whatsapp-ou-email/goal/message são obrigatórios (ver seção 20).
 * whatsapp e email não são obrigatórios individualmente, mas ao menos
 * um dos dois precisa estar preenchido — por isso a validação de
 * ambos os campos é cruzada dentro do validator abaixo.
 */
var formValidators = {
  name: function (v) { return v.trim().length >= 3; },
  whatsapp: function (v) {
    var form = document.getElementById("quoteForm");
    var email = form.querySelector("#field-email").value.trim();
    return v.replace(/\D/g, "").length >= 10 || email.length > 0;
  },
  email: function (v) {
    var form = document.getElementById("quoteForm");
    var wa = form.querySelector("#field-whatsapp").value.trim();
    if (!v) return wa.replace(/\D/g, "").length >= 10;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  },
  company: function () { return true; },
  category: function () { return true; },
  service: function () { return true; },
  goal: function (v) { return v.length > 0; },
  mode: function () { return true; },
  timeline: function () { return true; },
  investment: function () { return true; },
  message: function (v) { return v.trim().length >= 10; },
  consent: function (v, el) { return el.checked; },
};

function maskPhone(value) {
  var digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d*)/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
}

function validateField(fieldWrap) {
  var input = fieldWrap.querySelector("input, textarea, select");
  var name = input && input.name;
  if (!input || !formValidators[name]) return true;
  var valid = formValidators[name](input.value, input);
  var required = input.hasAttribute("required") || name === "whatsapp" || name === "email";
  fieldWrap.dataset.invalid = String(required && !valid);
  return !required || valid;
}

function showFormError() {
  var form = document.getElementById("quoteForm");
  var submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.removeAttribute("data-loading");
  submitBtn.removeAttribute("disabled");
  document.getElementById("formGenericError").hidden = false;
}

function initQuoteForm() {
  var form = document.getElementById("quoteForm");
  if (!form) return; // formulário só existe em index.html
  var waInput = form.querySelector("#field-whatsapp");
  waInput.addEventListener("input", function (e) { e.target.value = maskPhone(e.target.value); });

  var fields = Array.prototype.slice.call(form.querySelectorAll("[data-field]"));
  fields.forEach(function (fieldWrap) {
    var input = fieldWrap.querySelector("input, textarea, select");
    if (!input) return;
    input.addEventListener("blur", function () { validateField(fieldWrap); });
    input.addEventListener("change", function () { validateField(fieldWrap); });
  });

  var started = false;
  form.addEventListener(
    "focusin",
    function () {
      if (started) return;
      started = true;
      trackEvent("start_quote_form");
    },
    { once: false }
  );

  if (typeof IntersectionObserver !== "undefined") {
    var showcaseObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            trackEvent("view_service_showcase");
            showcaseObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    var vitrineSection = document.getElementById("vitrine");
    if (vitrineSection) showcaseObserver.observe(vitrineSection);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) return;

    var results = fields.map(validateField);
    var firstInvalid = fields.filter(function (f) { return f.dataset.invalid === "true"; })[0];
    if (firstInvalid) {
      var el = firstInvalid.querySelector("input, textarea, select");
      if (el) el.focus();
      return;
    }
    if (results.indexOf(false) !== -1) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn.getAttribute("data-loading") === "true") return; // impede envio duplicado
    submitBtn.setAttribute("data-loading", "true");
    submitBtn.setAttribute("disabled", "true");

    var fd = new FormData(form);
    var categoryName = "";
    var serviceName = "";
    var goalLabel = "";
    var catOpt = form.querySelector("#field-category");
    var svcOpt = form.querySelector("#field-service");
    var goalOpt = form.querySelector("#field-goal");
    if (catOpt.selectedIndex > 0) categoryName = catOpt.options[catOpt.selectedIndex].textContent;
    if (svcOpt.selectedIndex > 0) serviceName = svcOpt.options[svcOpt.selectedIndex].textContent;
    if (goalOpt.selectedIndex > 0) goalLabel = goalOpt.options[goalOpt.selectedIndex].textContent;

    var summary = [
      "Olá! Gostaria de solicitar um orçamento.",
      "",
      "Nome: " + fd.get("name"),
      fd.get("company") ? "Empresa: " + fd.get("company") : null,
      categoryName ? "Categoria: " + categoryName : null,
      serviceName ? "Serviço de interesse: " + serviceName : null,
      goalLabel ? "Objetivo: " + goalLabel : null,
      "Mensagem: " + fd.get("message"),
    ].filter(Boolean).join("\n");
    var waUrl = DATA.buildWhatsappUrl(summary, { ORIGEM: "FORMULARIO_ORCAMENTO" });

    // A nova aba precisa abrir de forma SÍNCRONA dentro do handler de
    // submit — se for adiada para dentro do setTimeout abaixo, a maioria
    // dos navegadores perde o vínculo com o gesto do usuário e bloqueia a
    // abertura como pop-up.
    var waWindow = window.open(waUrl, "_blank", "noopener,noreferrer");

    // ------------------------------------------------------------------
    // INTEGRAÇÃO: sem backend configurado, o WhatsApp já foi aberto acima
    // com o resumo dos dados — ver seção 20 do briefing. Para enviar a um
    // endpoint próprio (além do WhatsApp, ou no lugar dele), troque o
    // bloco abaixo por:
    //
    //   fetch("https://sua-api.com/orcamentos", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(Object.fromEntries(fd)),
    //   })
    //     .then((res) => (res.ok ? onSuccess() : showFormError()))
    //     .catch(showFormError);
    // ------------------------------------------------------------------
    window.setTimeout(function () {
      trackEvent("submit_quote_form", {
        category_name: categoryName || undefined,
        service_id: fd.get("service") || undefined,
      });

      // Se waWindow vier null (pop-up bloqueado pelo navegador), seguimos
      // normalmente para a página de obrigado — o link de WhatsApp
      // também está disponível lá para o usuário completar o contato.
      submitBtn.removeAttribute("data-loading");
      submitBtn.removeAttribute("disabled");
      form.reset();
      fields.forEach(function (f) { f.dataset.invalid = "false"; });
      window.location.href = "obrigado.html";
    }, 700);
  });
}

/* --------------------------------------------------------------------
   13. MODAL GENÉRICO (focus trap)
-------------------------------------------------------------------- */
function getFocusable(container) {
  return Array.prototype.slice.call(
    container.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])')
  );
}

var lastModalTrigger = null;

function openModal(overlay) {
  lastModalTrigger = document.activeElement;
  overlay.dataset.open = "true";
  document.body.style.overflow = "hidden";
  var focusables = getFocusable(overlay);
  if (focusables[0]) focusables[0].focus();

  function trap(event) {
    if (event.key === "Escape") return closeModal(overlay);
    if (event.key !== "Tab") return;
    var items = getFocusable(overlay);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  overlay._trapHandler = trap;
  overlay.addEventListener("keydown", trap);
}

function closeModal(overlay) {
  overlay.dataset.open = "false";
  document.body.style.overflow = "";
  if (overlay._trapHandler) overlay.removeEventListener("keydown", overlay._trapHandler);
  if (lastModalTrigger) lastModalTrigger.focus();
}

function initModals() {
  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () { closeModal(overlay); });
    });
  });
}

/* --------------------------------------------------------------------
   14. BARRA MOBILE "PRECISA DE AJUDA"
   Aparece depois que o visitante passa da dobra inicial e some perto
   do rodapé/formulário para não cobrir botões ou campos.
-------------------------------------------------------------------- */
function initMobileHelpBar() {
  var bar = document.getElementById("mobileHelpBar");
  if (!bar || typeof IntersectionObserver === "undefined") return;
  var hero = document.getElementById("topo");
  var hideZone = document.getElementById("orcamento");
  var pastHero = false;
  // Trava de mão única: uma vez alcançado o formulário/rodapé, a barra
  // fica escondida pelo resto da página. Sem a trava, ao ultrapassar
  // #orcamento a interseção com ele deixa de ser verdadeira e a barra
  // reaparece sobre o rodapé — exatamente o que a seção 28 do briefing
  // pede para evitar.
  var reachedEnd = false;

  function update() {
    bar.dataset.visible = String(pastHero && !reachedEnd);
  }

  new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) { pastHero = !entry.isIntersecting; update(); });
    },
    { threshold: 0 }
  ).observe(hero);

  new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) reachedEnd = true;
        update();
      });
    },
    { rootMargin: "0px 0px -40% 0px" }
  ).observe(hideZone);
}

/* --------------------------------------------------------------------
   15. BANNER DE COOKIES (LGPD)
-------------------------------------------------------------------- */
function initCookieConsent() {
  var banner = document.getElementById("cookieBanner");
  var STORAGE_KEY = "cookie-consent";
  var stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) window.setTimeout(function () { banner.dataset.visible = "true"; }, 900);

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.dataset.visible = "false";
  }
  document.getElementById("cookieAccept").addEventListener("click", function () { choose("accepted"); });
  document.getElementById("cookieDecline").addEventListener("click", function () { choose("declined"); });
}

/* --------------------------------------------------------------------
   16. REVELAÇÃO AO ROLAR
   O CSS nunca esconde [data-reveal] por padrão — é este módulo que
   aplica .reveal-init e depois [data-visible="true"].
-------------------------------------------------------------------- */
function initReveal() {
  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length || typeof IntersectionObserver === "undefined") return;
  targets.forEach(function (el) { el.classList.add("reveal-init"); });
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach(function (el) { observer.observe(el); });
}

/* --------------------------------------------------------------------
   17. INICIALIZAÇÃO
-------------------------------------------------------------------- */
function initFooterYear() {
  var el = document.getElementById("currentYear");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", function () {
  if (!DATA) return; // guarda de segurança caso services-data.js não carregue

  trackEvent("page_view", { page_path: window.location.pathname });

  renderMegaMenu();
  renderCategoriesGrid();
  renderCategoryChips();
  renderFooterLists();
  renderServicesGrid();
  renderFeaturedGrid();
  renderNeeds();
  renderCases();
  renderTestimonials();
  renderFaq();
  populateModeFilter();
  populateFormSelects();

  wireWhatsappLinks(document);
  initClickTracking(document);
  initHeader();
  initFiltersUi();
  initCompareUi();
  initModals();
  initQuoteForm();
  initMobileHelpBar();
  initCookieConsent();
  initReveal();
  initFooterYear();
});
