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

test("legacy addresses permanently redirect", async () => {
  const app = await worker();
  for (const [from, to] of [
    ["/published", "/books"],
    ["/unpublished", "/books"],
    ["/pathways", "/projects"],
  ]) {
    const response = await app.fetch(new Request(`http://localhost${from}`));
    assert.equal(response.status, 308, `${from} did not permanently redirect`);
    assert.equal(new URL(response.headers.get("location")).pathname, to);
  }
});

test("SEO routes and structured data are complete", async () => {
  const app = await worker();
  const home = await app.fetch(new Request("http://localhost/"));
  const homeHtml = await home.text();
  assert.match(homeHtml, /schema\.org/);
  assert.match(homeHtml, /Person/);
  assert.match(homeHtml, /WebSite/);
  assert.match(homeHtml, /og:image/);
  assert.match(homeHtml, /twitter:image/);

  const book = await app.fetch(
    new Request("http://localhost/books/merkavat-hael"),
  );
  const bookHtml = await book.text();
  assert.match(bookHtml, /BreadcrumbList/);
  assert.match(bookHtml, /\"@type\":\"Book\"/);

  const sitemap = await app.fetch(new Request("http://localhost/sitemap.xml"));
  assert.match(await sitemap.text(), /https:\/\/kiahaviyu\.com\/books/);
  const robots = await app.fetch(new Request("http://localhost/robots.txt"));
  assert.match(
    await robots.text(),
    /Sitemap: https:\/\/kiahaviyu\.com\/sitemap\.xml/,
  );
});

test("every canonical URL in the sitemap resolves", async () => {
  const app = await worker();
  const sitemap = await app.fetch(new Request("http://localhost/sitemap.xml"));
  const xml = await sitemap.text();
  const paths = [
    ...xml.matchAll(/<loc>https:\/\/kiahaviyu\.com([^<]*)<\/loc>/g),
  ].map((match) => match[1] || "/");
  assert.ok(paths.length > 10, "sitemap did not contain the catalog routes");
  for (const path of paths) {
    const response = await app.fetch(new Request(`http://localhost${path}`));
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
  }
});
