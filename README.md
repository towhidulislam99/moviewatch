# MovieWatch

A responsive dark movie browsing website recreated from the supplied reference video. It includes 30 video-derived poster cards on first load, a **Load More Movie** control, responsive mobile layout, filters, sorting, bookmarks, SEO metadata, JSON-LD, `sitemap.xml`, `robots.txt`, and the configured Watch Now destinations.

## Requirements

- Node.js 20+ (Node.js 22 recommended)
- pnpm 11 (Corepack can install it automatically)

## Run locally

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm run build
```

The deployable static output is written to `dist/`.

## GitHub upload

1. Create an empty GitHub repository.
2. Upload all files and folders from this package, including `package.json`, `pnpm-lock.yaml`, `src/`, `public/`, `index.html`, `vite.config.js`, `netlify.toml`, and `render.yaml`.
3. Do not upload `node_modules/` or `dist/`; they are generated during deployment.

## Netlify

Import the GitHub repository in Netlify. The included `netlify.toml` configures:

- Build command: `pnpm install --frozen-lockfile && pnpm run build`
- Publish directory: `dist`
- SPA fallback rewrite to `/index.html`

## Render

Use **New → Blueprint** and select the repository. The included `render.yaml` configures a Render Static Site with the same build command and `dist/` publish directory.

Alternatively create a Static Site manually:

- Build command: `corepack enable && pnpm install --frozen-lockfile && pnpm run build`
- Publish directory: `dist`

## SEO files

- `index.html` contains canonical, Open Graph, Twitter Card and JSON-LD metadata.
- `public/sitemap.xml` lists the public homepage.
- `public/robots.txt` allows crawling and points crawlers to the sitemap.

The canonical/social URLs currently reference the Manus public domain. If the site is deployed on a different custom domain, update the absolute URLs in `index.html`, `public/sitemap.xml`, and `public/robots.txt` to the new domain before publishing.
