# Ana Jaksic Webapp — Agent Handoff Notes

Context for any AI coding tool (Codex, ChatGPT, Claude, etc.) picking up
this project. Read this before making changes — it documents decisions
that look arbitrary but aren't, and mistakes already made once.

## Stack

React 19 + TypeScript + Vite 8 + Tailwind v4. i18next for translations
(en/de/sr/hr/fr). Stripe + PayPal for payments (not yet configured with
real keys — see "Open TODOs").

## Deployment — Cloudflare Workers (static assets)

- Hosted on **Cloudflare Workers** (the newer "Workers with static
  assets" product, not classic Cloudflare Pages), project name
  `ana-jaksic-webapp`, connected via Cloudflare's own Git integration
  (dashboard → Workers & Pages → the project → Settings). It is **not**
  driven by `.github/workflows/deploy-cloudflare.yml` — that workflow
  exists but Cloudflare's own Git-connected build is what's actually
  live.
- **Production branch is `main`**, not any feature branch. Cloudflare
  auto-builds on every push to `main`. If you work on another branch,
  changes will NOT go live until that branch is merged/pushed to `main`.
- Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
  Output directory: `dist`.
- Live URL: `https://ana-jaksic-webapp.slomotion101.workers.dev` (a
  `workers.dev` subdomain). **Heads up:** many corporate firewalls,
  antivirus tools, and even some sandboxed dev environments block
  `*.workers.dev` outright as a generic abused-domain category — a 403
  there is very often not a real bug. The real fix is the custom domain
  (`anajaksic.com`, being purchased via domaintechnik as of this
  writing, not yet connected).
- There's also a parallel `.github/workflows/deploy.yml` for GitHub
  Pages (relative Vite `base: './'`), kept as a fallback/secondary
  deploy target. Not the primary one.

### Critical gotcha: do NOT add a custom Worker script (`main` in wrangler.jsonc)

This was tried once (a `worker.js` fetch handler for geo-based language
cookies) and **it broke every deploy silently** — Cloudflare's
Git-connected build produces a build-scoped deploy token that appears to
only have permission to upload static assets, not to convert the
project into a code-running Worker. The build log looked almost
successful (assets uploaded fine, bindings listed) and then failed with
an opaque `Failed: error occurred while running deploy command` and no
further detail.

Current `wrangler.jsonc` is intentionally minimal and asset-only:

```jsonc
{
  "name": "ana-jaksic-webapp",
  "compatibility_date": "2024-09-23",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

**Keep it this way.** If you need server-side logic (geo detection,
redirects, headers, etc.), do it client-side in the React app instead,
or set it up as a from-scratch Cloudflare Worker project outside this
Git-connected deploy — don't add `main`/bindings to this config and
push it, you will break production deploys again.

## Language / i18n

- 5 languages: `en`, `de`, `sr`, `hr`, `fr` — files in
  `src/i18n/locales/*.json`, loaded in `src/i18n/index.ts`.
- Manual switcher in `src/components/LanguageSwitcher.tsx`; choice is
  cached to `localStorage` (`i18nextLng`) and always wins on repeat
  visits.
- **Country-based auto-detection is client-side**, in
  `src/i18n/geoLanguage.ts`, invoked once from `src/main.tsx`
  (`applyCountryLanguage()`). It calls `https://ipapi.co/json/` (no API
  key) on first visit only (skipped if `localStorage.i18nextLng` is
  already set), maps the returned country code to a language, and calls
  `i18n.changeLanguage()`. Fails silently (try/catch) if the geo API is
  unreachable — falls back to browser-language detection. This exists
  specifically because a server-side (Cloudflare Worker) version of the
  same feature was tried first and broke deploys (see gotcha above) —
  don't reintroduce a server-side version without solving that problem
  first.
- Country → language map (in `geoLanguage.ts`): RS/ME/BA → sr, HR → hr,
  DE/AT/CH/LI → de, FR/BE/LU/MC → fr, everything else → en (default).

## Recent content restructuring (per Ana's brief, Aug 2026)

Ana sent WhatsApp instructions: "Ana Jakšić first, courses second" — the
site should sell her personally (knowledge/experience/eye/mentorship),
not read like a generic course catalog. Concretely:

- `src/components/Education.tsx` was rewritten from a single course
  list into **two clearly separated paths**: "Official MUD Education"
  (path1, structured/institutional) and "Ana Jakšić Masterclasses"
  (path2, her own artistry-focused offering). Content keys:
  `education.path1*` / `education.path2*` in each locale file.
- `src/components/Services.tsx` was repositioned as an "Artistry"
  section (nav label changed from "Services" to "Artistry"): Editorial,
  Fashion, Beauty, Creative Direction — pure artistry services, no
  course/education items mixed in anymore.
- `src/components/About.tsx` was rewritten to match the bio structure
  from her real portfolio site `anajaksic-makeup.art/about`: a
  highlights bullet list, a two-line quote, then a 5-paragraph bio
  (`about.bioP1`–`about.bioP5` per locale). The bio's last sentence was
  reconstructed from a partially cut-off screenshot — worth a final
  proofread against the live portfolio site if anyone can reach it.
  Portrait image URL was hand-copied from that site by the client (my
  own sandboxed environment could not fetch `anajaksic-makeup.art` or
  `images.squarespace-cdn.com` directly — network egress was blocked;
  this may or may not apply to your environment).

## Color palette

Accent colors intentionally moved away from pink/magenta to a warm
beige/terracotta range (per explicit client request — "keine Farbe
Pink/Rosa, eher Beige wie verschiedene Hautfarben"). Defined as CSS
custom properties in `src/index.css` under `@theme`:
`--color-gold`, `--color-gold-light`, `--color-rose`,
`--color-rose-dark`. All buttons/accents pull from these tokens — to
retheme, edit these 4 values only, don't hunt through components.

## Open TODOs / known gaps

- **Stripe/PayPal not configured** — `.env.example` lists the required
  `VITE_STRIPE_*` / `VITE_PAYPAL_*` vars, all currently empty. Booking
  and shop checkout UI works but payment won't actually process until
  real keys are set (as Cloudflare env vars/build variables AND as
  GitHub Actions secrets if the GH Pages workflow is ever used).
- **Custom domain not yet connected** — `anajaksic.com` is being
  purchased via an external registrar (domaintechnik), not yet added as
  a Cloudflare zone or connected to the Worker's Domains tab.
- **A separate, unrelated project** — "2ndchance" / "Zweite Chance"
  (a nonprofit association site, different content entirely: Terry
  Ugue, LogoLand/Next Gen Talent/Sharepayd projects) came up in the same
  conversation this handoff originates from. It is a **different GitHub
  repo** (`zweite-chance-website` under the same GitHub account), not
  part of this codebase — don't conflate the two.
- Last sentence of the About bio (`about.bioP5` in each locale) was
  reconstructed from a cut-off screenshot — flagged for the client to
  confirm wording against the source.
