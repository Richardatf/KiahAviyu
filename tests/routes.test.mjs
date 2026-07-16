import assert from "node:assert/strict";
import test from "node:test";
const routes = [
  "/",
  "/books",
  "/books/merkavat-hael",
  "/series",
  "/series/celestial-library",
  "/231-gates",
  "/projects",
  "/about",
  "/news",
  "/news/living-library-rebuild",
  "/press",
  "/contact",
  "/privacy",
  "/terms",
  "/search?q=Alef",
  "/rss.xml",
  "/sitemap.xml",
  "/robots.txt",
];
async function worker() {
  const url = new URL("../dist/server/index.js", import.meta.url);
  url.searchParams.set("v", Date.now());
  return (await import(url.href)).default;
}
test("primary routes return successful responses", async () => {
  const app = await worker();
  for (const path of routes) {
    const response = await app.fetch(
      new Request(`http://localhost${path}`),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    const body = await response.text();
    assert.ok(body.length > 30, `${path} returned an empty body`);
  }
});
test("unknown routes return 404", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/not-a-real-gate"),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 404);
});
