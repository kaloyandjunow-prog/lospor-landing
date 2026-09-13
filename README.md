# LOSPOR Landing

Public entry point for the LOSPOR ecosystem at
[lospor.org](https://lospor.org).

## Destinations

- Clinical web app: [app.lospor.org](https://app.lospor.org)
- Mobile PWA: [pwa.lospor.org](https://pwa.lospor.org)
- Research database: [database.lospor.org](https://database.lospor.org)
- Documentation: [docs.lospor.org](https://docs.lospor.org)
- OpenAPI contract: [api.lospor.org/openapi.json](https://api.lospor.org/openapi.json)

## Languages

Bulgarian is the default and is served at `/`. English is served at `/en/`.

Both are generated as complete static documents at build time from
`content.mjs` — there is no client-side language switch, because `_headers`
sets `script-src 'none'` and this page ships no JavaScript at all. The switch in
the header is an ordinary link between two real URLs, which also gives each
locale its own `lang`, canonical, `hreflang` alternates and sitemap entry.

To change copy, edit `content.mjs`. To change structure, edit
`scripts/render.mjs` — it renders both locales, so the two cannot drift apart.

## Theme

Light and dark, following the reader's operating system via
`prefers-color-scheme`. There is no manual toggle: with no JavaScript there is
nowhere to persist a choice, and a toggle that resets on every page load is
worse than none.

Only the pale sections invert. The hero, the open-source band and the footer are
dark by design in both themes.

## Build

    npm run check
    npm run build

The production-ready static output is written to dist/. `npm run check` also
runs as part of the build and verifies both locales: required destinations,
`lang`/canonical/`hreflang`, no copy leaking between languages, no Cyrillic on
the English page, no script tags or inline handlers (which CSP would block),
and that the dark theme is still present.

## LOSPOR Hospital install files

lospor.org also publishes what a LOSPOR Hospital first installation needs:

- `/install/losporctl-install.sh` — the bootstrap, copied verbatim from
  `lospor-hospital/scripts/losporctl-install.sh`;
- `/install/losporctl-install.sh.sha256` — its checksum, for checking by hand;
- `/.well-known/lospor-release-key.txt` — the release signing key fingerprint.

The checksum and fingerprint are derived from `install/losporctl-install.sh` at
build time, so they can never disagree with the script. `npm run check` refuses
a script whose key is not the LOSPOR release key. The bootstrap requires this
fingerprint to be reachable and to match before it installs anything online,
so update `install/` whenever the bootstrap changes, and deploy before a
release that depends on the new copy.

## Cloudflare Pages

- Build command: npm run build
- Build output directory: dist
- Node.js version: 20 or later

The custom domain is lospor.org.

## License

AGPL-3.0. See [LICENSE](LICENSE).
