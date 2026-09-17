# EasyFolio — Next.js

The EasyFolio Bootstrap template converted to a Next.js 14 application (App Router, TypeScript). All four pages, every section, and all of the original interactive behaviour are preserved.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

| Original file | Route |
| --- | --- |
| `index.html` | `/` |
| `portfolio-details.html` | `/portfolio-details` |
| `service-details.html` | `/service-details` |
| `starter-page.html` | `/starter-page` |
| `forms/contact.php` | `/api/contact` |

## Structure

```
app/
  layout.tsx              html/body shell, font links, vendor CSS, header/footer
  page.tsx                home page, composed of the section components
  portfolio-details/      service-details/      starter-page/
  api/contact/route.ts    contact form handler
components/
  Header.tsx              nav, mobile toggle, scrolled class, scrollspy
  NavDropdown.tsx         dropdown / deep-dropdown menu item
  Footer.tsx  ScrollTop.tsx  AosInit.tsx  BodyClass.tsx
  SectionTitle.tsx  PageTitle.tsx  ContactForm.tsx  ServiceDetailsSlider.tsx
  sections/               Hero, About, Skills, Resume, Portfolio,
                          Testimonials, Services, Faq, Contact
hooks/useScrollspy.ts
styles/main.css           the template's stylesheet, unmodified
public/assets/img/        all original images
types/vendor.d.ts         ambient types for isotope-layout and imagesloaded
```

Repeated markup (portfolio cards, testimonials, timeline entries, FAQs, services, skills) is now driven by arrays at the top of each section component, so editing content means editing a list rather than duplicating JSX.

## How `assets/js/main.js` was translated

| Original behaviour | Now |
| --- | --- |
| `.scrolled` on body while scrolling | effect in `Header` |
| Mobile nav toggle + `.mobile-nav-active` | state in `Header` |
| Dropdown toggling | state in `NavDropdown` |
| Scroll-to-top button | `ScrollTop` |
| AOS init | `AosInit` (also refreshes after client-side navigation) |
| Skill bars animating on reveal (Waypoints) | `IntersectionObserver` in `Skills` |
| GLightbox | dynamic import in `Portfolio` |
| Isotope + imagesLoaded filtering | dynamic import in `Portfolio`, filter state in React |
| Swiper configured from a `<script type="application/json">` block | config object passed to `new Swiper(...)` in `Testimonials` and `ServiceDetailsSlider` |
| FAQ accordion | state in `Faq` |
| Navmenu scrollspy | `useScrollspy` |
| Hash-link scroll correction on load | handled by Next's router |

Vendor libraries now come from npm (`bootstrap`, `bootstrap-icons`, `aos`, `glightbox`, `swiper`, `isotope-layout`, `imagesloaded`) instead of `assets/vendor/`, so they are versioned, tree-shaken and bundled.

Two things from the original are intentionally gone: **Bootstrap's JavaScript bundle**, which the markup never used (no `data-bs-*` attributes anywhere), and **Waypoints**, replaced by `IntersectionObserver`.

## Contact form

`ContactForm` reproduces the original loading / error / sent states, posting to `/api/contact` instead of `forms/contact.php`. The route validates the submission and then:

- sends it via SMTP when `SMTP_HOST` and `CONTACT_TO` are set (see `.env.example`), using nodemailer;
- otherwise logs it to the server console and returns success, so the form works out of the box in development.

## Notes

- Images are plain `<img>` tags pointing at `/assets/img/...`, matching the template's CSS and keeping Isotope's masonry measurements intact. Swap in `next/image` per-image if you want automatic optimisation — supply `width`/`height` and re-check the portfolio grid layout.
- Fonts load from Google Fonts via `<link>` in the root layout, exactly as the template did. To self-host them instead, move to `next/font/google` and re-point `--default-font`, `--heading-font` and `--nav-font`.
- `styles/main.css` is byte-for-byte the original stylesheet, so template updates can be dropped straight in.
- EasyFolio is a BootstrapMade template; its license requires the footer credit link to remain unless you hold the pro version. See https://bootstrapmade.com/license/
