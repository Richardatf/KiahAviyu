# Kiah Aviyu content guide

Most ongoing updates happen in `lib/content.ts`.

## Add a book

Add one object to the `books` array. Supply a unique lowercase `slug`, category, honest status, concise descriptions, and a `coverStyle`. Leave dates, ISBNs, formats, and retailer links out until verified.

## Update a cover

Place an approved image in `public/covers/`, then extend `Book` with the image path and update `BookCover` to use it. Preserve the supplied art; do not recolor or redesign official covers without approval. Include meaningful alt text and dimensions.

## Add retailer links

Add a verified absolute URL as `retailer`. Never guess an Amazon product URL, price, format, or ISBN. The purchase button appears only when this value exists.

## Publish news

Add a dated item to the beginning of the `news` array with a unique slug, title, and excerpt. A matching `/news/[slug]` route and RSS entry are generated automatically.

## Add a series

Add an object to `series`, then use that exact title in each member book’s `series` field. Do not announce release order unless it is confirmed.

## Change the featured release

Set `featured: true` on the intended book and make it the first eligible item consumed by the homepage. Remove the old flag if only one title should be featured.

## Update projects

Edit the `projects` array with a verified public URL and restrained description. Related sites remain separate worlds; they do not replace the Kiah Aviyu navigation.
