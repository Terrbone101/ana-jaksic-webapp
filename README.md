# Ana Jaksic — Portfolio, Kursbuchung & Shop

React + TypeScript + Vite. Enthält Portfolio, Kursbuchung (Stripe/PayPal) und einen kleinen Shop.

## Lokale Entwicklung

```bash
npm install
cp .env.example .env   # eigene Stripe/PayPal Keys eintragen
npm run dev
```

## Deployment

Die Seite kann parallel über **zwei** Wege veröffentlicht werden — beide bauen automatisch bei jedem Push auf `main`, und beide lassen sich jederzeit manuell erneut auslösen (GitHub → Actions → Workflow → "Run workflow").

### Option A: Cloudflare Pages (empfohlen für die Custom Domain)

**Einmalige Einrichtung:**

1. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** und dieses Repo auswählen.
   - Build command: `npm run build`
   - Build output directory: `dist`
2. Oder, falls lieber über GitHub Actions (`.github/workflows/deploy-cloudflare.yml`) deployt werden soll, in Cloudflare einen **API Token** erstellen (Berechtigung "Cloudflare Pages — Edit") und in den GitHub-Repo-Settings unter **Secrets and variables → Actions** hinterlegen:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_PROJECT_NAME` (Name des Pages-Projekts in Cloudflare)
3. Zusätzlich die gleichen `VITE_...` Secrets wie in `.env.example` hinterlegen, damit Stripe/PayPal auch im Build funktionieren.
4. Custom Domain (`anajaksic.com`) im Cloudflare-Pages-Projekt unter **Custom domains** hinzufügen.

Danach: jeder Push auf `main` veröffentlicht automatisch, und über den "Run workflow"-Button (oder "Retry deployment" in Cloudflare) kann jederzeit manuell neu veröffentlicht werden.

### Option B: GitHub Pages

Bereits eingerichtet über `.github/workflows/deploy.yml`, nutzt die Custom Domain aus `public/CNAME`. Erfordert dieselben `VITE_...` Secrets in den GitHub-Repo-Settings.

## Umgebungsvariablen

Siehe `.env.example` — alles sind öffentliche/publishable Keys, niemals Secret Keys in dieses Frontend eintragen.
