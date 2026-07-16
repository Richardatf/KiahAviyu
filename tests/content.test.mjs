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
  for (const route of [
    "/books",
    "/series",
    "/231-gates",
    "/projects",
    "/about",
    "/news",
    "/press",
    "/contact",
    "/publisher-inquiries",
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
test("unverified books do not contain retailer or ISBN metadata", async () => {
  const content = await read("lib/content.ts");
  for (const slug of [
    "eheyeh",
    "kabbalist-of-the-code",
    "beneath-eden",
    "forgotten-star-saga",
    "cube-of-the-scribe",
  ]) {
    const start = content.indexOf(`slug:"${slug}"`);
    const end = content.indexOf("},", start);
    const record = content.slice(start, end);
    assert.doesNotMatch(record, /retailer:|isbn:/i);
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

test("catalog classifications match the author's taxonomy", async () => {
  const content = await read("lib/content.ts");
  assert.equal(
    [...content.matchAll(/category: "Mystical Nonfiction"/g)].length,
    1,
  );
  const eheyeh = content.slice(
    content.indexOf('title: "EHEYEH"'),
    content.indexOf("},", content.indexOf('title: "EHEYEH"')),
  );
  assert.match(eheyeh, /category: "Mystical Nonfiction"/);
  assert.doesNotMatch(eheyeh, /series:/);

  const cube = content.slice(
    content.indexOf('title: "THE CUBE OF THE SCRIBE"'),
    content.indexOf("},", content.indexOf('title: "THE CUBE OF THE SCRIBE"')),
  );
  assert.doesNotMatch(cube, /series:/);
});
