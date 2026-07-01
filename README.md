# Shore Fantasy Football League Website

Official static site build for the Shore Fantasy Football League (SFFL).

## Current release

**v1.1 Launch Ready**

This package is ready to preview locally and deploy to Netlify, Vercel, or GitHub Pages.

## Local preview

```bash
cd sffl_site
npm run dev
```

Open:

```text
http://localhost:4173
```

No install step is required unless you add dependencies later.

## Release check

```bash
npm run check
```

This scans local HTML files for missing internal `href` and `src` targets.

## Demo build

```bash
npm run release
```

This updates demo build metadata, generates weekly demo article JSON, and runs the release checker.

## Sleeper sync

Sleeper league ID is already configured:

```text
1315114040313278464
```

Run:

```bash
npm run sync:sleeper
```

Optional overrides:

```bash
SFFL_SLEEPER_LEAGUE_ID=1315114040313278464 SFFL_WEEK=10 npm run sync:sleeper
```

The sync writes current league data to:

```text
data/current/sleeper-live.json
```

If the live request fails, the site keeps the demo fallback file.

## Deploy to Netlify

1. Upload this folder to a GitHub repository.
2. In Netlify, choose **Add new site > Import an existing project**.
3. Build command: `npm run release`
4. Publish directory: `.`
5. Deploy.

## Deploy to Vercel

1. Upload this folder to a GitHub repository.
2. In Vercel, choose **Add New Project**.
3. Framework preset: **Other**.
4. Build command: `npm run release`
5. Output directory: `.`
6. Deploy.

## Recommended launch workflow

1. Keep Demo Mode enabled until the site is reviewed by league members.
2. Replace fictional article text with real weekly SFFL stories.
3. Add real draft, trophy, and championship photos.
4. Run `npm run check` before each deploy.
5. Deploy from GitHub to Netlify or Vercel.

## Important folders

```text
assets/           Team and league logos
graphics/news/    Generated article graphics
data/             Historical and demo data
scripts/          Sleeper sync, article generation, QA checks
*.html            Static site pages
```
