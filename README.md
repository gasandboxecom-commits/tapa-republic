# TAPA REPUBLIC — Filipino Silog House

A fictional, portfolio-only Filipino food brand and simulated ordering experience. Built with Next.js App Router, TypeScript, and Tailwind CSS, then exported as a fully static site for GitHub Pages.

## Local preview

```bash
npm install
npm run dev
```

Open `http://localhost:3000/tapa-republic/`.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

The production build is written to `out/`. The site is configured specifically for the GitHub Pages repository path `/tapa-republic/`.

## Deployment

The included `.github/workflows/deploy-pages.yml` builds and deploys `out/` to GitHub Pages on pushes to `main` or via manual dispatch. In the repository settings, set **Pages → Source** to **GitHub Actions** before the first deployment.

No repository has been created, and nothing has been committed, pushed, or deployed.

## Demo behavior

- All ordering is simulated in browser memory.
- No payment is accepted.
- No order or customer details are sent to a server or third party.
- Refreshing the page safely starts a fresh demo session.
