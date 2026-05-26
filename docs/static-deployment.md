# Static Frontend Deployment

## Build Artifact

The frontend is a static Vite application. A production build is created with:

```bash
npm install
npm run build
```

The deployable output is written to:

```text
dist/
```

## Local Preview

After building, run:

```bash
npm run preview
```

Vite serves the static build locally so the release artifact can be checked before publishing.

## GitHub Actions Evidence

`.github/workflows/frontend_job.yml` runs the frontend quality gates and uploads `dist/` as an artifact named `terminumfrage-static-site`.

This gives a downloadable static-site package without requiring GitHub Pages. GitHub Pages for private repositories may require a paid plan, so it is not used here.

## External Static Hosts

The `dist/` folder can be uploaded to any static host that supports single-page apps, for example a school web server, Netlify, Vercel, Azure Static Web Apps, or S3-compatible hosting.

For hosts that need credentials, store tokens as CI secrets. Do not commit deployment tokens or `.env` files.
