# Jaspher Tania Portfolio

A Next.js portfolio presenting UI/UX design, front-end development, and selected product work across web and mobile.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

```bash
npm run lint
npm run build
npm run start
```

## Structure

- `app/page.tsx` contains the homepage composition.
- `app/projects/[slug]/page.tsx` generates the static case-study routes.
- `data/` contains project, case-study, experience, service, and toolkit content.
- `components/` contains presentation, interaction, and layout components.
- `public/projects/` contains project interface imagery.
- `public/resume/` contains the résumé PDF.

The site uses Plus Jakarta Sans, Open Sans, and Space Grotesk through `next/font`. Smooth scrolling and entrance animations are disabled when the user prefers reduced motion.

## Site URL

Canonical and social metadata use `NEXT_PUBLIC_SITE_URL` when it is set. Otherwise, the project falls back to the current Vercel URL configured in `app/layout.tsx`.
