import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
