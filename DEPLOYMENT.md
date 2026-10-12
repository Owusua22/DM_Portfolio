# Deployment — Sarah Nkansah Static Portfolio (No SSR)

This build is **100% static**. There is no Node server, no database, no env vars, no API routes.

## Quick Start (Local Preview)

```bash
# 1) Install
npm install

# 2) Dev (hot reload, still fully static)
npm run dev        # http://localhost:3000

# 3) Production build → out/
npm run build

# 4) Preview the static export (no Node server needed)
npx serve out      # then open http://localhost:3000
# or
python3 -m http.server --directory out 8000
```

## What `npm run build` Produces

- `out/index.html` — the portfolio (all sections: Hero → About → Skills → TechStack → Services → Resume → Portfolio → Testimonials → Contact)
- `out/_next/static/` — hashed JS/CSS
- `out/assets/img/` — all images copied from `public/assets/img`
- `out/portfolio-details/`, `out/service-details/`, `out/starter-page/` — template sub-pages (static)
- `out/404.html`, `out/sn_logo.png`, etc.

Upload the **entire `out` folder** to any static host. Do **not** run `next start` — there is no server.

## Host Anywhere

| Host | Steps |
|------|-------|
| **Netlify** | Drag & drop `out/` in Netlify Dashboard, or `netlify deploy --dir=out --prod` |
| **Vercel** | `vercel --prod` (Vercel detects `output: export` and serves `out` automatically) — or set “Build Command: `npm run build`” and “Output Directory: `out`” |
| **Cloudflare Pages** | Connect repo, Build command `npm run build`, Output `out` |
| **GitHub Pages** | `npm run build && npx gh-pages -d out` (or copy `out` to `docs/` and enable Pages) |
| **Any static file host / S3 / Nginx** | Upload `out/` contents; ensure `index.html` serves on `/` and `404.html` on 404 |

No environment variables required.

## Contact Form Behavior (Static)

- Validates fields client-side.
- Shows a success toast after ~900 ms.
- Saves the inquiry to `localStorage` under key `sn_inbox` (open DevTools → Application → Local Storage to see the demo inbox).
- Shows a “Open in your email app” `mailto:` link as a real-world fallback.

To wire a real backend later, replace `components/ContactForm.tsx` `onSubmit` with a POST to Formspree, Getform, or your own API — no other file needs to change.

## Portfolio Data (Static)

All portfolio items live in `lib/portfolioMock.ts` as `STATIC_PORTFOLIO`. Edit that file to add/update case studies, full-stack projects, designs, or UGC videos. Images should be placed in `public/assets/img/portfolio/` (or any `/public` path) and referenced with a leading `/`.

## Updating Content

- **Hero / About / Resume / Skills / Services / Testimonials** — edit the corresponding file in `components/sections/`.
- **Header nav** — edit `SECTION_LINKS` in `components/Header.tsx`.
- **Colors** — `styles/main.css` `:root` vars: `--accent-color`, `--heading-color`, etc., plus inline `ACCENT` constants in section files.

## Original Server Code (Archived)

The server features (Supabase admin, Resend email, middleware, API routes) still exist in git history on `main` @ `91fd9ce`. To restore, check out `main` or cherry-pick `lib/supabase-server.ts`, `middleware.ts`, `app/api/`, `app/admin/`, and the original `lib/supabase.ts`.

## Zip Contents

The delivered `DM_Portfolio_Static_FrontEnd.zip` contains:

- Source project (ready for `npm install && npm run build`)
- Pre-built `out/` folder (ready to host — no build step needed)
- `SSR_REMOVAL_REPORT.md` (audit trail) + `DEPLOYMENT.md` (this file)

© Sarah Nkansah — All Rights Reserved.
