import { news, site } from "../../lib/content";
export async function GET() {
  const items = news
    .map(
      (n) =>
        `<item><title>${escape(n.title)}</title><link>${site.domain}/news/${n.slug}</link><guid>${site.domain}/news/${n.slug}</guid><pubDate>${new Date(`${n.date}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(n.excerpt)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Kiah Aviyu News</title><link>${site.domain}/news</link><description>Notes from the Living Library.</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}
