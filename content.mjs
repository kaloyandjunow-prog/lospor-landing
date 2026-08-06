/**
 * Landing page copy, per locale.
 *
 * Bulgarian is the default and is served at `/`; English is served at `/en/`.
 * Both are generated as static files at build time rather than switched in the
 * browser, because `_headers` sets `script-src 'none'` — there is no JavaScript
 * on this page at all, so the language switch has to be a real link between two
 * real URLs. That is also better for indexing than a client-side toggle.
 *
 * The expansion "Large Open Source Perioperative Register" stays in English in
 * both locales: it is what the acronym LOSPOR stands for, and the clinical app
 * keeps it in English inside Bulgarian copy for the same reason.
 */

export const EXPANSION = "Large Open Source Perioperative Register";

export const LOCALES = ["bg", "en"];
export const DEFAULT_LOCALE = "bg";

/** Where each locale is served from, relative to the site root. */
export const LOCALE_PATH = { bg: "/", en: "/en/" };

export const CONTENT = {
  bg: {
    htmlLang: "bg",
    dir: "ltr",
    title: `LOSPOR | ${EXPANSION}`,
    description:
      "LOSPOR е отворена периоперативна инфраструктура за клинична документация, локален одит, сравнителен анализ и научни изследвания.",
    ogDescription:
      "Отворена периоперативна инфраструктура за клинична работа, локален одит, сравнителен анализ и научни изследвания.",
    skipToContent: "Към съдържанието",
    brandHome: "LOSPOR — начало",
    primaryNav: "Основна навигация",
    destinationsNav: "Връзки към LOSPOR",
    nav: {
      products: "Продукти",
      documentation: "Документация",
      source: "Изходен код",
      openApp: "Отвори приложението",
    },
    languageSwitch: { label: "Език", to: "English", hint: "Switch to English" },
    hero: {
      eyebrow: EXPANSION,
      summary:
        "Една отворена платформа за периоперативна документация, локално подобряване на качеството, сравнителен анализ и научни изследвания.",
      openApp: "Отвори клиничното приложение",
      exploreDatabase: "Разгледай базата данни",
      pointsLabel: "Характеристики на платформата",
      points: ["Отворен код", "Работи офлайн", "Съвместимост с OMOP"],
    },
    products: {
      kicker: "Екосистемата",
      title: "Клиничната работа и научните изследвания, свързани",
      intro:
        "LOSPOR държи документацията до леглото на пациента и достъпа за научни цели разделени, като и двете използват едни и същи управлявани клинични дефиниции.",
      clinical: {
        label: "За клинични екипи",
        title: "Протоколно приложение",
        body:
          "Записвайте предоперативна оценка, интраоперативни събития, витални показатели, медикаменти, течности и следоперативно възстановяване.",
        links: [
          { href: "https://app.lospor.org", text: "Отвори уеб приложението" },
          { href: "https://pwa.lospor.org", text: "Отвори мобилното PWA" },
        ],
      },
      research: {
        label: "За одит и научни изследвания",
        title: "Браузър на базата данни",
        body:
          "Изграждайте управлявани кохорти, проверявайте качеството на данните, сравнявайте групи, съпоставяйте практиката и подготвяйте възпроизводими експорти.",
        links: [
          { href: "https://database.lospor.org", text: "Отвори базата данни" },
          { href: "https://docs.lospor.org/research-browser", text: "Ръководство за изследователи" },
        ],
      },
      supportLabel: "Допълнителни ресурси",
      support: [
        {
          href: "https://docs.lospor.org",
          title: "Документация",
          body: "Клинични ръководства, архитектура, управление и самостоятелно хостване.",
        },
        {
          href: "https://api.lospor.org/openapi.json",
          title: "OpenAPI договор",
          body: "Машинно четимият публичен API договор.",
        },
        {
          href: "https://github.com/kaloyandjunow-prog",
          title: "Изходен код",
          body: "Прегледайте, хоствайте сами, допринесете или надградете върху LOSPOR.",
        },
      ],
    },
    workflow: {
      kicker: "Практичен път на данните",
      title: "Полезно до леглото на пациента. Използваемо и след случая.",
      steps: [
        {
          title: "Записване",
          body: "Клиницистите документират периоперативния запис в един структуриран работен процес.",
        },
        {
          title: "Управление",
          body: "Институциите запазват локален контрол, права на достъп, одитна история и политика за експорт.",
        },
        {
          title: "Учене",
          body: "Одобрени екипи могат да одитират грижата, да съпоставят практиката и да подготвят изследователски набори от данни.",
        },
      ],
    },
    openSource: {
      kicker: "Отворен по замисъл",
      title: "Създаден, за да бъде проверяван и хостван самостоятелно",
      body:
        "LOSPOR е лицензиран под AGPL-3.0. Институциите могат да прегледат кода, да пуснат собствена инсталация и да запазят оперативните данни под локален контрол.",
      viewSource: "Виж изходния код",
      selfHosting: "Прочети ръководството за самостоятелно хостване",
    },
    footer: {
      tagline: EXPANSION,
      links: [
        { href: "https://app.lospor.org", text: "Клинично приложение" },
        { href: "https://database.lospor.org", text: "База данни" },
        { href: "https://docs.lospor.org", text: "Документация" },
        { href: "https://github.com/kaloyandjunow-prog", text: "GitHub" },
      ],
      copyright: "&copy; 2026 LOSPOR &middot; AGPL-3.0",
    },
  },

  en: {
    htmlLang: "en",
    dir: "ltr",
    title: `LOSPOR | ${EXPANSION}`,
    description:
      "LOSPOR is open-source perioperative infrastructure for clinical documentation, local audit, benchmarking, and research.",
    ogDescription:
      "Open-source perioperative infrastructure for clinical care, local audit, benchmarking, and research.",
    skipToContent: "Skip to content",
    brandHome: "LOSPOR home",
    primaryNav: "Primary navigation",
    destinationsNav: "LOSPOR destinations",
    nav: {
      products: "Products",
      documentation: "Documentation",
      source: "Source",
      openApp: "Open app",
    },
    languageSwitch: { label: "Language", to: "Български", hint: "Превключи на български" },
    hero: {
      eyebrow: EXPANSION,
      summary:
        "One open platform for perioperative documentation, local quality improvement, benchmarking, and research.",
      openApp: "Open clinical app",
      exploreDatabase: "Explore database",
      pointsLabel: "Platform characteristics",
      points: ["Open source", "Offline-capable", "OMOP-ready"],
    },
    products: {
      kicker: "The ecosystem",
      title: "Clinical work and research, connected",
      intro:
        "LOSPOR keeps bedside documentation and research access separate, while both use the same governed clinical definitions.",
      clinical: {
        label: "For clinical teams",
        title: "Protocol App",
        body:
          "Record preoperative assessment, intraoperative events, vital signs, medications, fluids, and postoperative recovery.",
        links: [
          { href: "https://app.lospor.org", text: "Open web app" },
          { href: "https://pwa.lospor.org", text: "Open mobile PWA" },
        ],
      },
      research: {
        label: "For audit and research",
        title: "Database Browser",
        body:
          "Build governed cohorts, inspect data quality, compare groups, benchmark practice, and prepare reproducible exports.",
        links: [
          { href: "https://database.lospor.org", text: "Open database" },
          { href: "https://docs.lospor.org/research-browser", text: "Research guide" },
        ],
      },
      supportLabel: "Supporting resources",
      support: [
        {
          href: "https://docs.lospor.org",
          title: "Documentation",
          body: "Clinical guides, architecture, governance, and self-hosting.",
        },
        {
          href: "https://api.lospor.org/openapi.json",
          title: "OpenAPI contract",
          body: "The machine-readable public API contract.",
        },
        {
          href: "https://github.com/kaloyandjunow-prog",
          title: "Source code",
          body: "Review, self-host, contribute, or build on LOSPOR.",
        },
      ],
    },
    workflow: {
      kicker: "A practical data path",
      title: "Useful at the bedside. Reusable after the case.",
      steps: [
        {
          title: "Capture",
          body: "Clinicians document the perioperative record in one structured workflow.",
        },
        {
          title: "Govern",
          body: "Institutions retain local control, permissions, audit history, and export policy.",
        },
        {
          title: "Learn",
          body: "Approved teams can audit care, benchmark practice, and prepare research datasets.",
        },
      ],
    },
    openSource: {
      kicker: "Open by design",
      title: "Built to be inspected and self-hosted",
      body:
        "LOSPOR is licensed under AGPL-3.0. Institutions can review the code, run their own deployment, and keep operational data under local control.",
      viewSource: "View source",
      selfHosting: "Read the self-hosting guide",
    },
    footer: {
      tagline: EXPANSION,
      links: [
        { href: "https://app.lospor.org", text: "Clinical app" },
        { href: "https://database.lospor.org", text: "Database" },
        { href: "https://docs.lospor.org", text: "Documentation" },
        { href: "https://github.com/kaloyandjunow-prog", text: "GitHub" },
      ],
      copyright: "&copy; 2026 LOSPOR &middot; AGPL-3.0",
    },
  },
};
