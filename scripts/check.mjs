import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { CONTENT, DEFAULT_LOCALE, LOCALES } from "../content.mjs";
import { localeUrl, renderPage } from "./render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "styles.css",
  "logo.png",
  "hero-operating-room.jpg",
  "_headers",
  "robots.txt",
];

await Promise.all(requiredFiles.map((file) => access(join(root, file))));

const css = await readFile(join(root, "styles.css"), "utf8");
const pages = Object.fromEntries(LOCALES.map(locale => [locale, renderPage(locale)]));
const source = Object.values(pages).join("\n") + "\n" + css;

const requiredDestinations = [
  "https://app.lospor.org",
  "https://database.lospor.org",
  "https://docs.lospor.org",
  "https://api.lospor.org/openapi.json",
  "https://pwa.lospor.org",
  "https://github.com/kaloyandjunow-prog",
];

// Cyrillic copy makes this guard load-bearing rather than decorative: a file
// saved in the wrong encoding turns into exactly these sequences.
const mojibakeMarkers = [
  "Â",
  "Ã",
  "â",
  "Ð²ÐЂ",
  "�",
];

for (const marker of mojibakeMarkers) {
  if (source.includes(marker)) {
    throw new Error("Possible mojibake detected: " + JSON.stringify(marker));
  }
}

if (source.includes("http://")) {
  throw new Error("Insecure HTTP URL found in public source.");
}

// `_headers` sets script-src 'none'. Anything script-shaped would be silently
// dropped by the browser, so it must not be written in the first place.
for (const [locale, html] of Object.entries(pages)) {
  if (/<script[\s>]/i.test(html) || /\son[a-z]+=/i.test(html)) {
    throw new Error(`Locale "${locale}" contains script or inline handlers, which CSP blocks.`);
  }
}

for (const [locale, html] of Object.entries(pages)) {
  for (const destination of requiredDestinations) {
    if (!html.includes(destination)) {
      throw new Error(`Locale "${locale}" is missing destination: ${destination}`);
    }
  }

  if (!html.includes(`<html lang="${CONTENT[locale].htmlLang}"`)) {
    throw new Error(`Locale "${locale}" does not declare its language.`);
  }

  if (!html.includes(`<link rel="canonical" href="${localeUrl(locale)}">`)) {
    throw new Error(`Locale "${locale}" has a wrong or missing canonical URL.`);
  }

  for (const other of LOCALES) {
    if (!html.includes(`hreflang="${other}" href="${localeUrl(other)}"`)) {
      throw new Error(`Locale "${locale}" is missing the hreflang alternate for "${other}".`);
    }
  }

  if (!html.includes(`hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE)}"`)) {
    throw new Error(`Locale "${locale}" does not point x-default at the default locale.`);
  }

  // An untranslated string is the failure this whole change exists to prevent,
  // and it is invisible on a page nobody reads in that language.
  const otherLocale = LOCALES.find(item => item !== locale);
  const marker = CONTENT[otherLocale].hero.summary;
  if (html.includes(marker)) {
    throw new Error(`Locale "${locale}" contains copy from "${otherLocale}".`);
  }
}

// Bulgarian must actually be Bulgarian, not English with a bg tag on it.
if (!/[Ѐ-ӿ]/.test(pages.bg)) {
  throw new Error("The Bulgarian page contains no Cyrillic at all.");
}
// The switch itself is Cyrillic on the English page on purpose — it is labelled
// in the language it leads to, so a Bulgarian reader recognises it. Strip the
// whole element rather than one word, or its title attribute trips this.
const englishWithoutSwitch = pages.en.replace(/<a class="lang-switch"[\s\S]*?<\/a>/g, "");
if (/[Ѐ-ӿ]/.test(englishWithoutSwitch)) {
  throw new Error("The English page contains Cyrillic outside the language switch.");
}

// The dark theme is CSS-only for the same CSP reason.
if (!css.includes("prefers-color-scheme: dark")) {
  throw new Error("styles.css has no dark theme.");
}

console.log(`Landing source checks passed for ${LOCALES.length} locales.`);
