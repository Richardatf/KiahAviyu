# Kiah Aviyu site rules

## Identity

- English name: **Kiah Aviyu**
- Hebrew name: **קיה אביעו**
- Render Hebrew with `lang="he"` and `dir="rtl"`, using Frank Ruhl Libre or a respectful equivalent.
- Preferred language: Author, Mystical Science, Living Library, Books • Gates • Trees • Light, Torah First, Welcome to the Gate.

## Visual and image rules

- Use midnight blue, charcoal, ink black, parchment, ivory, muted bronze, and warm gold.
- Literary headings use an elegant serif; interface text uses a highly readable sans serif.
- New decorative imagery must be aniconic: no people, faces, silhouettes, angels as beings, animals, idols, statues, or anthropomorphic divine imagery.
- Prefer geometry, typography, Hebrew letterforms, light, desert texture, stars, gates, trees, books, paths, waves, lattice, and architecture.
- Never use Divine Names casually as decoration or generate incorrect Hebrew.
- Existing approved book covers may be shown unchanged.

## Content architecture

- Central content lives in `lib/content.ts`.
- Shared page furniture and cards live in `components/site.tsx`.
- Root homepage is `app/page.tsx`; library routes are rendered by `app/[...path]/page.tsx`.
- Add books, series, projects, news, navigation, and verified external URLs to the centralized content file.

## Accuracy

- Never fabricate awards, reviews, endorsements, sales, credentials, dates, ISBNs, prices, retailer links, representation, or institutional relationships.
- When publication status is not verified, use `In Development` or `Coming Soon` and omit purchase controls.

## Testing and deployment

- Run lint, TypeScript checking, focused tests, and a full production build before publishing.
- Audit all navigation paths, malformed Hebrew, placeholder artifacts, and external-link safety.
- Preserve `.openai/hosting.json`; the site is deployed with Sites. Do not commit secrets.
- Keep responsive behavior sound at 375px, 768px, 1024px, and 1440px.
