import { CONTENT, DEFAULT_LOCALE, LOCALE_PATH, LOCALES } from "../content.mjs";

/**
 * Renders one locale of the landing page as a complete static document.
 *
 * There is no client-side templating and no runtime language switch, because
 * `_headers` sets `script-src 'none'`. Each locale is a real URL with its own
 * `lang`, canonical and alternates, which is what search engines want anyway.
 */

const SITE = "https://lospor.org";

/** Absolute URL for a locale, with the default locale living at the root. */
export function localeUrl(locale) {
  return SITE + LOCALE_PATH[locale];
}

/** Paths are relative to the document, so `/en/` can find the shared assets. */
function asset(path) {
  return path;
}

function escape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Copy already containing entities (&copy;, &middot;) is passed through. */
function raw(value) {
  return String(value);
}

function alternates(locale) {
  const links = LOCALES.map(
    other => `  <link rel="alternate" hreflang="${other}" href="${localeUrl(other)}">`,
  );
  links.push(`  <link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE)}">`);
  return links.join("\n") + `\n  <link rel="canonical" href="${localeUrl(locale)}">`;
}

function supportLink(item, index) {
  return `          <a class="support-link" href="${item.href}">
            <span class="support-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>${escape(item.title)}</strong>
              <small>${escape(item.body)}</small>
            </span>
            <span class="support-arrow" aria-hidden="true">&rarr;</span>
          </a>`;
}

function productLinks(links) {
  return links
    .map(link => `              <a href="${link.href}">${escape(link.text)} <span aria-hidden="true">&rarr;</span></a>`)
    .join("\n");
}

function workflowStep(step, index) {
  return `          <li>
            <span class="step-number">${index + 1}</span>
            <div>
              <h3>${escape(step.title)}</h3>
              <p>${escape(step.body)}</p>
            </div>
          </li>`;
}

export function renderPage(locale) {
  const t = CONTENT[locale];
  const other = LOCALES.find(item => item !== locale);
  const otherPath = LOCALE_PATH[other];

  return `<!doctype html>
<html lang="${t.htmlLang}" dir="${t.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f4f7f6" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#071411" media="(prefers-color-scheme: dark)">
  <meta name="description" content="${escape(t.description)}">
  <meta name="robots" content="index, follow">
${alternates(locale)}
  <link rel="icon" href="${asset("/logo.png")}" type="image/png">
  <link rel="preload" href="${asset("/hero-operating-room.jpg")}" as="image" fetchpriority="high">
  <link rel="stylesheet" href="${asset("/styles.css")}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LOSPOR">
  <meta property="og:locale" content="${locale === "bg" ? "bg_BG" : "en_GB"}">
  <meta property="og:title" content="${escape(t.title)}">
  <meta property="og:description" content="${escape(t.ogDescription)}">
  <meta property="og:url" content="${localeUrl(locale)}">
  <meta property="og:image" content="${SITE}/logo.png">

  <title>${escape(t.title)}</title>
</head>
<body>
  <a class="skip-link" href="#main-content">${escape(t.skipToContent)}</a>

  <header class="site-header" aria-label="${escape(t.primaryNav)}">
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="${escape(t.brandHome)}">
        <span class="brand-mark" aria-hidden="true">L</span>
        <span>LOSPOR</span>
      </a>

      <nav class="nav-links" aria-label="${escape(t.destinationsNav)}">
        <a href="#products">${escape(t.nav.products)}</a>
        <a href="https://docs.lospor.org">${escape(t.nav.documentation)}</a>
        <a href="https://github.com/kaloyandjunow-prog">${escape(t.nav.source)}</a>
        <a class="lang-switch" href="${otherPath}" lang="${other}" hreflang="${other}" title="${escape(t.languageSwitch.hint)}">${escape(t.languageSwitch.to)}</a>
        <a class="nav-action" href="https://app.lospor.org">${escape(t.nav.openApp)}</a>
      </nav>
    </div>
  </header>

  <main id="main-content">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">${escape(t.hero.eyebrow)}</p>
          <h1 id="hero-title">LOSPOR</h1>
          <p class="hero-summary">
            ${escape(t.hero.summary)}
          </p>

          <div class="hero-actions">
            <a class="button button-primary" href="https://app.lospor.org">
              ${escape(t.hero.openApp)} <span aria-hidden="true">&rarr;</span>
            </a>
            <a class="button button-secondary" href="https://database.lospor.org">
              ${escape(t.hero.exploreDatabase)} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <ul class="hero-points" aria-label="${escape(t.hero.pointsLabel)}">
${t.hero.points.map(point => `            <li>${escape(point)}</li>`).join("\n")}
          </ul>
        </div>
      </div>
    </section>

    <section class="products section" id="products" aria-labelledby="products-title">
      <div class="section-inner">
        <div class="section-heading">
          <p class="section-kicker">${escape(t.products.kicker)}</p>
          <h2 id="products-title">${escape(t.products.title)}</h2>
          <p>
            ${escape(t.products.intro)}
          </p>
        </div>

        <div class="primary-products">
          <article class="product product-clinical">
            <div>
              <p class="product-label">${escape(t.products.clinical.label)}</p>
              <h3>${escape(t.products.clinical.title)}</h3>
              <p>
                ${escape(t.products.clinical.body)}
              </p>
            </div>
            <div class="product-links">
${productLinks(t.products.clinical.links)}
            </div>
          </article>

          <article class="product product-research">
            <div>
              <p class="product-label">${escape(t.products.research.label)}</p>
              <h3>${escape(t.products.research.title)}</h3>
              <p>
                ${escape(t.products.research.body)}
              </p>
            </div>
            <div class="product-links">
${productLinks(t.products.research.links)}
            </div>
          </article>
        </div>

        <div class="support-grid" aria-label="${escape(t.products.supportLabel)}">
${t.products.support.map(supportLink).join("\n\n")}
        </div>
      </div>
    </section>

    <section class="workflow section" aria-labelledby="workflow-title">
      <div class="section-inner workflow-layout">
        <div class="workflow-heading">
          <p class="section-kicker">${escape(t.workflow.kicker)}</p>
          <h2 id="workflow-title">${escape(t.workflow.title)}</h2>
        </div>

        <ol class="workflow-steps">
${t.workflow.steps.map(workflowStep).join("\n")}
        </ol>
      </div>
    </section>

    <section class="open-source section" aria-labelledby="open-source-title">
      <div class="section-inner open-source-inner">
        <div>
          <p class="section-kicker">${escape(t.openSource.kicker)}</p>
          <h2 id="open-source-title">${escape(t.openSource.title)}</h2>
          <p>
            ${escape(t.openSource.body)}
          </p>
        </div>
        <div class="open-source-actions">
          <a class="button button-light" href="https://github.com/kaloyandjunow-prog">
            ${escape(t.openSource.viewSource)} <span aria-hidden="true">&rarr;</span>
          </a>
          <a class="text-link" href="https://docs.lospor.org/self-hosting">
            ${escape(t.openSource.selfHosting)} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <strong>LOSPOR</strong>
        <p>${escape(t.footer.tagline)}</p>
      </div>
      <div class="footer-links">
${t.footer.links.map(link => `        <a href="${link.href}">${escape(link.text)}</a>`).join("\n")}
      </div>
      <p class="copyright">${raw(t.footer.copyright)}</p>
    </div>
  </footer>
</body>
</html>
`;
}
