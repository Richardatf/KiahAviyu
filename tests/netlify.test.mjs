import assert from "node:assert/strict";
import test from "node:test";

test("Netlify adapter renders the homepage and a dynamic book route", async () => {
  const adapterUrl = new URL("../netlify/functions/site.mjs", import.meta.url);
  adapterUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: handler, config } = await import(adapterUrl.href);

  assert.equal(config.path, "/*");
  assert.equal(config.preferStatic, true);

  for (const path of ["/", "/books/merkavat-hael", "/search?q=Alef"]) {
    const response = await handler(
      new Request(`https://example.netlify.app${path}`),
    );
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.ok((await response.text()).length > 500);
  }
});
