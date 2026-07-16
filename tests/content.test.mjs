import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
const root = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, root), "utf8");
test("identity and routes are centralized", async () => {
  const [content, site] = await Promise.all([
    read("lib/content.ts"),
    read("components/site.tsx"),
  ]);
  const source = content + site;
  assert.match(content, /קיה אביעו/);
  assert.doesNotMatch(content, /קיה אביו/);
  for (const route of [
    "/books",
    "/series",
    "/231-gates",
    "/projects",
    "/about",
    "/news",
    "/press",
    "/contact",
    "/privacy",
    "/terms",
    "/search",
  ])
    assert.match(source, new RegExp(route.replace("/", "\\/")));
  assert.match(site, /lang="he" dir="rtl"/);
});
test("forbidden placeholders and artifacts are absent", async () => {
  const files = [
    "app/page.tsx",
    "app/[...path]/page.tsx",
    "components/site.tsx",
    "lib/content.ts",
  ];
  for (const f of files) {
    const text = await read(f);
    assert.doesNotMatch(
      text,
      /contentReference|Lorem ipsum|Paste announcements|Phase 2|Optional later|TODO/i,
    );
  }
});
test("owner-verified Amazon products use direct links", async () => {
  const content = await read("lib/content.ts");
  for (const product of [
    "Tower-Daat-Kiah-Aviyu/dp/033692142X",
    "MERKAVAT-HAEL-CHARIOT-DIVINE-AVIYU/dp/B0GPW2KX2T",
    "ADVERSARYS-PRAYER-Thanking-HaShem-Tries/dp/1969659459",
    "QUANTUM-ETZ-CHAIM-KIAH-AVIYU/dp/1969659254",
    "God-That-Ate-Grass/dp/B0H6VW4QS4",
    "You-Hear-Voices-Kiah-Aviyu/dp/B0H7LB9KGP",
    "ADAM-KADMON-KIAH-AVIYU/dp/196965953X",
    "INFINITE-WAVE-Kiah-Aviyu/dp/1969659688",
    "TIFERET-Kiah-Aviyu/dp/1969659394",
  ]) {
    assert.match(content, new RegExp(product));
  }
});

test("verified products use local official cover files", async () => {
  const content = await read("lib/content.ts");
  for (const slug of [
    "merkavat-hael",
    "tower-of-daat",
    "the-adversarys-prayer",
    "quantum-etz-chaim",
    "the-god-that-ate-grass",
    "do-you-hear-voices",
    "adam-kadmon",
    "infinite-wave",
    "tiferet",
  ]) {
    assert.match(content, new RegExp(`coverImage: "/covers/${slug}\\.jpg"`));
    await access(new URL(`../public/covers/${slug}.jpg`, import.meta.url));
  }
});

test("approved and generated brand artwork is project-local", async () => {
  for (const file of [
    "kiah-aviyu-logo.jpg",
    "title-page.jpg",
    "living-gate-hero.jpg",
    "celestial-library.jpg",
    "gates-lattice.jpg",
  ]) {
    await access(new URL(`../public/brand/${file}`, import.meta.url));
  }
});

test("unpublished catalog and publisher inquiry content are absent", async () => {
  const [content, page, shell, sitemap] = await Promise.all([
    read("lib/content.ts"),
    read("app/[...path]/page.tsx"),
    read("components/site.tsx"),
    read("app/sitemap.ts"),
  ]);
  const source = content + page + shell + sitemap;
  assert.doesNotMatch(
    source,
    /In Development|Coming Soon|publisher-inquiries/i,
  );
  for (const slug of [
    "eheyeh",
    "kabbalist-of-the-code",
    "beneath-eden",
    "forgotten-star-saga",
    "cube-of-the-scribe",
  ]) {
    assert.doesNotMatch(content, new RegExp(`slug: "${slug}"`));
  }
});

test("book facts have one verified source of truth", async () => {
  const [content, shell] = await Promise.all([
    read("lib/content.ts"),
    read("components/site.tsx"),
  ]);
  assert.match(content, /export const books: Book\[\]/);
  assert.match(content, /Thanking HaShem for the One Who Tries Us/);
  assert.doesNotMatch(content + shell, /Through the Tries|When He Tries You/);
  assert.match(content, /isbn: "033692142X"/);
  assert.doesNotMatch(content, /978-1-969659-10-2/);
  assert.match(content, /publicationStatus: "published"/);
  assert.match(content, /verification: verified/);
  assert.match(shell, /width=\{book\.coverWidth\}/);
});

test("the catalog uses the author's mystical fiction taxonomy", async () => {
  const [content, home] = await Promise.all([
    read("lib/content.ts"),
    read("app/page.tsx"),
  ]);
  assert.doesNotMatch(content + home, /Mystical Nonfiction|Fiction & Myth/);
  assert.equal(
    [...content.matchAll(/category: "Mystical Fiction"/g)].length,
    10,
  );
  assert.match(content, /title: "The Forgotten Star Saga"/);
  assert.match(content, /slug: "forgotten-star"/);
});
