import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_LOCALE, LOCALE_PATH, LOCALES } from "../content.mjs";
import { localeUrl, renderPage } from "./render.mjs";
import "./check.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");

/** Copied verbatim. The HTML is generated per locale below. */
const staticFiles = [
  "styles.css",
  "logo.png",
  "_headers",
  "robots.txt",
];

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

for (const file of staticFiles) {
  await cp(join(root, file), join(output, file));
}

// The default locale is the site root; the other gets its own directory, so
// both are ordinary static files a CDN can serve without any redirect logic.
for (const locale of LOCALES) {
  const path = LOCALE_PATH[locale];
  const directory = join(output, path === "/" ? "." : path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), renderPage(locale), "utf8");
}

// Both locales are listed with reciprocal alternates, so a crawler that finds
// either one knows about the other.
const urls = LOCALES.map(locale => {
  const alternates = LOCALES
    .map(other => `    <xhtml:link rel="alternate" hreflang="${other}" href="${localeUrl(other)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE)}"/>`)
    .join("\n");
  return `  <url>\n    <loc>${localeUrl(locale)}</loc>\n${alternates}\n  </url>`;
}).join("\n");

await writeFile(
  join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:xhtml="https://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
  "utf8",
);

console.log(
  `Built ${staticFiles.length} static files and ${LOCALES.length} locales ` +
  `(default "${DEFAULT_LOCALE}" at /) in dist/`,
);
