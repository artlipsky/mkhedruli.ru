# mkhedruli.ru

Flashcard trainer for the Georgian alphabet (mkhedruli): pick the Russian sound that matches the letter.

Built with Astro + React + Tailwind + HeroUI. Deployed to GitHub Pages at https://mkhedruli.ru.

## Development

```sh
make install   # npm install
make dev       # dev server at http://localhost:4321
make verify    # astro check + production build
```

## Content and SEO

The site targets Russian-language search, so all page copy lives in Russian.

- `src/components/react/Georgian/letters.ts` — `ALPHABET`, the reference table of all
  33 letters rendered under the trainer, and the trainer levels, which pick their letters
  from it so each transcription is defined once.
- `src/data/faq.ts` — single source for both the visible FAQ and the `FAQPage`
  JSON-LD, so the two can never drift apart.
- `src/pages/index.astro` — builds the schema.org `@graph` (WebSite, WebApplication,
  LearningResource, FAQPage) and passes it into the layout's `head` slot.
- `public/og.png` — 1200×630 social preview, rendered from a throwaway HTML file with
  headless Chrome; regenerate it by hand if the wording changes.
- `sitemap-index.xml` comes from `@astrojs/sitemap` at build time; `public/robots.txt`
  points at it.
