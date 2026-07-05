# pablovester.com — Frontend

A headless React frontend for [pablovester.com](https://pablovester.com), the portfolio site of illustrator and comic artist Pablo Vester. Content (posts, artwork, events, comics, FAQs, pricing) is authored in WordPress and consumed through WPGraphQL; this repository contains only the frontend that renders it.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite 5 |
| Routing | React Router 7 |
| Data | Apollo Client 3 → WPGraphQL (cache-first) |
| CMS | WordPress (headless) + ACF |
| Styling | SASS (mobile-first, neobrutalist design system) |
| i18n | i18next + react-i18next (ES / EN) |
| Media | PhotoSwipe (lightbox), react-pageflip (flipbook) |

## Requirements

- **Node.js 18+** (required by Vite 5)
- npm

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite) with HMR
```

### Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Produce an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Project structure

```
src/
├── api/          # Apollo Client setup (WPGraphQL endpoint)
├── components/
│   ├── layout/   # Header, Footer, Layout shell
│   ├── sections/ # Page sections (Hero, Gallery, ContactForm, Agenda…)
│   └── ui/       # Reusable presentational components (Icon, Image, Skeleton…)
├── hooks/        # Data-fetching and behavior hooks (the app's core logic)
├── pages/        # Route-level components
├── styles/       # SASS design system (tokens, layout, per-page styles)
├── locales/      # i18next translation files (es / en)
├── utils/        # Pure helpers (image localization, pricing…)
└── docs/         # Internal documentation
```

### Import aliases

Configured in [`vite.config.js`](vite.config.js):

| Alias | Path |
|-------|------|
| `@ui` | `src/components/ui` |
| `@sections` | `src/components/sections` |
| `@layout` | `src/components/layout` |
| `@hooks` | `src/hooks` |
| `@utils` | `src/utils` |
| `@data` | `src/data` |

## Architecture

The app follows a **hooks-first** pattern: components stay presentational while data fetching, validation, and business logic live in custom hooks under `src/hooks`. GraphQL queries hit a single Apollo Client (`cache-first`) pointed at the WordPress GraphQL endpoint.

The site is bilingual (Spanish default, English under the `/en` prefix). UI strings come from `src/locales`; CMS content is localized at the data layer via ACF translation fields and `src/utils/localizeImage.js`.

## Backend / CMS

This repository is **frontend only**. The WordPress backend (`cms.pablovester.com`) manages all content and exposes:

- **GraphQL** at `https://cms.pablovester.com/graphql` (WPGraphQL + WPGraphQL for ACF)
- **Contact endpoint** `POST /wp-json/pablovester/v1/contact` (custom REST route, protected by Akismet + a honeypot field)

Both endpoints are currently hardcoded (see [`src/api/apolloClient.js`](src/api/apolloClient.js) and [`src/hooks/useContactForm.js`](src/hooks/useContactForm.js)).

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to static hosting. Redirects for `pablovester.com` are handled in the root `.htaccess`.

## License

Private. All rights reserved.
