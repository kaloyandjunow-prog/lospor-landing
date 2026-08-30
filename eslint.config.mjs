import js from "@eslint/js"

// The landing site is hand-written ES modules rendered to static HTML by
// `scripts/build.mjs`, with `scripts/check.mjs` guarding the output. Until now
// there was no lint at all: an unused import or a typo'd global only showed up
// if the build happened to hit that line.
//
// There is no TypeScript here and no framework preset, so eslint 10 runs
// directly with the recommended baseline and nothing else. The goal is
// catching unused values, unreachable code and undefined globals -- not
// imposing a style on copy-heavy render code.
export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".wrangler/**",
    ],
  },
  js.configs.recommended,
  {
    // Everything here runs under Node during the build; nothing ships as
    // script (`_headers` sets `script-src 'none'`). Without these, console and
    // process report as undefined -- a configuration gap, not a defect.
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        fetch: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]
