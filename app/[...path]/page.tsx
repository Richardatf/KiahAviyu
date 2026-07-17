import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import {
  BookCard,
  BookCover,
  Breadcrumbs,
  EmptyState,
  FormBlock,
  Newsletter,
  PageHero,
  Shell,
  Status,
  StructuredData,
} from "../../components/site";
import {
  books,
  celestialLibraryVolumes,
  findBook,
  findSeries,
  news,
  projects,
  series,
  site,
} from "../../lib/content";
import { gates } from "../../lib/gates";

type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const legacyRedirects: Record<string, string> = {
  published: "/books",
  unpublished: "/books",
  pathways: "/projects",
};
const titleFor = (path: string[]) =>
  path[0] === "books" && path[1]
    ? findBook(path[1])?.title
    : path[0] === "series" && path[1]
      ? findSeries(path[1])?.title
      : (
          {
            books: "Books",
            series: "Series",
            "231-gates": "231 Gates",
            projects: "Projects",
            about: "About",
            news: "News",
            press: "Press",
            contact: "Contact",
            privacy: "Privacy",
            terms: "Terms",
            search: "Search",
          } as Record<string, string>
        )[path[0]];
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const title = titleFor(path);
  if (!title) return {};
  const book = path[0] === "books" && path[1] ? findBook(path[1]) : undefined;
  return {
    title,
    description: book?.seo ?? `${title} — Kiah Aviyu’s Living Library.`,
    alternates: { canonical: `/${path.join("/")}` },
    openGraph: {
      title: `${title} | Kiah Aviyu`,
      description: book?.seo ?? `${title} — Kiah Aviyu’s Living Library.`,
      images: [
        {
          url: "/brand/living-gate-hero.jpg",
          width: 1672,
          height: 941,
          alt: "A luminous navy-and-gold gateway opening from a book",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kiah Aviyu`,
      description: book?.seo ?? `${title} — Kiah Aviyu’s Living Library.`,
      images: ["/brand/living-gate-hero.jpg"],
    },
  };
}

export default async function RoutePage({ params, searchParams }: Props) {
  const { path } = await params;
  const query = await searchParams;
  const [root, slug] = path;
  if (legacyRedirects[root] && !slug) permanentRedirect(legacyRedirects[root]);
  if (root === "books" && slug) {
    const b = findBook(slug);
    if (!b) notFound();
    const related = books
      .filter(
        (x) =>
          x.slug !== b.slug &&
          (x.series === b.series || x.category === b.category),
      )
      .slice(0, 3);
    return (
      <Shell>
        <Breadcrumbs
          items={[["Home", "/"], ["Books", "/books"], [b.title]]}
          currentPath={`/books/${b.slug}`}
        />
        <article className="book-detail section-pad">
          <BookCover book={b} />
          <div>
            <p className="kicker">{b.category}</p>
            <Status>{b.status}</Status>
            <h1>{b.title}</h1>
            {b.subtitle && <h2>{b.subtitle}</h2>}
            <p className="lead">{b.long}</p>
            {b.series && (
              <p>
                <strong>Series:</strong>{" "}
                <Link
                  href={`/series/${series.find((s) => b.series?.startsWith(s.title.split(" ")[0]))?.slug ?? "celestial-library"}`}
                >
                  {b.series}
                </Link>
              </p>
            )}
            {b.formats && (
              <p>
                <strong>Formats:</strong> {b.formats.join(", ")}
              </p>
            )}
            {b.isbn && (
              <p>
                <strong>ISBN:</strong> {b.isbn}
              </p>
            )}
            <div className="button-row">
              {b.retailer ? (
                <a
                  className="button gold"
                  href={b.retailer}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find a copy ↗
                </a>
              ) : (
                <p className="availability">
                  Retailer information will appear when confirmed.
                </p>
              )}
            </div>
          </div>
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "Book",
              "@id": `${site.domain}/books/${b.slug}#book`,
              name: b.title,
              alternateName: b.subtitle,
              author: { "@id": `${site.domain}/#author` },
              isbn: b.isbn,
              bookFormat: b.formats?.join(", "),
              image: `${site.domain}${b.coverImage}`,
              inLanguage: "en",
              sameAs: b.retailer,
              url: `${site.domain}/books/${b.slug}`,
            }}
          />
        </article>
        <section className="related section-pad">
          <h2>Related books</h2>
          <div className="book-grid">
            {related.map((x) => (
              <BookCard book={x} key={x.slug} />
            ))}
          </div>
        </section>
      </Shell>
    );
  }
  if (root === "books" && !slug) {
    const term = String(query.q ?? "").toLowerCase();
    const cat = String(query.category ?? "");
    const filtered = books.filter(
      (b) =>
        (!term ||
          `${b.title} ${b.subtitle ?? ""} ${b.short}`
            .toLowerCase()
            .includes(term)) &&
        (!cat || b.category === cat),
    );
    return (
      <Shell>
        <PageHero
          kicker="The catalog"
          title="Books as gates."
          intro="Browse the published books of Kiah Aviyu."
        />
        <form className="filters" action="/books">
          <label>
            Search
            <input
              name="q"
              defaultValue={String(query.q ?? "")}
              placeholder="Title or subject"
            />
          </label>
          <label>
            Category
            <select name="category" defaultValue={cat}>
              <option value="">All categories</option>
              {[...new Set(books.map((b) => b.category))].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <button>Filter</button>
        </form>
        <section className="book-grid catalog section-pad">
          {filtered.length ? (
            filtered.map((b) => <BookCard book={b} key={b.slug} />)
          ) : (
            <EmptyState
              title="No books found"
              text="Try removing a filter or searching with a broader phrase."
            />
          )}
        </section>
      </Shell>
    );
  }
  if (root === "series" && slug) {
    const s = findSeries(slug);
    if (!s) notFound();
    const entries = books.filter((b) =>
      b.series
        ?.toLowerCase()
        .includes(s.title.split(" ").slice(-2).join(" ").toLowerCase()),
    );
    return (
      <Shell>
        <Breadcrumbs
          items={[["Home", "/"], ["Series", "/series"], [s.title]]}
          currentPath={`/series/${s.slug}`}
        />
        <PageHero kicker="Series & worlds" title={s.title} intro={s.short} />
        <section className="book-grid catalog section-pad">
          {entries.length ? (
            entries.map((b) => <BookCard book={b} key={b.slug} />)
          ) : (
            <EmptyState
              title="The shelf is forming"
              text="Entries will appear here as their placement is confirmed."
            />
          )}
        </section>
      </Shell>
    );
  }
  if (root === "series")
    return (
      <Shell>
        <PageHero
          kicker="Connected bodies of work"
          title="Series & worlds."
          intro="Some books stand alone. Others open onto architectures that continue across volumes, gates, and related projects."
        />
        <section className="series-grid section-pad">
          {series.map((s, i) => (
            <Link href={`/series/${s.slug}`} key={s.slug}>
              <span>0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.short}</p>
              <b>Enter series →</b>
            </Link>
          ))}
        </section>
      </Shell>
    );
  if (root === "231-gates")
    return (
      <Shell>
        <PageHero
          kicker="The Living Library"
          title="The Celestial Library of the 231 Gates"
          intro="Twenty-three volumes form the literary architecture around the Gates. The Gates themselves have not yet been opened with public text."
        />
        <section className="gates section-pad">
          <Image
            className="gates-artwork"
            src="/brand/gates-lattice.jpg"
            alt="Abstract lattice of luminous architectural gates with one veiled position"
            width={1536}
            height={1536}
            sizes="(max-width: 700px) 100vw, 55vw"
          />
          <div>
            <h2>The Gates are empty—for now.</h2>
            <p>
              No individual Gate currently contains public text. Their places
              remain deliberately open within the architecture until Kiah Aviyu
              opens them.
            </p>
            <h3>Twenty-two letters. One hidden register.</h3>
            <p>
              The twenty-two lettered volumes lead to Aleph Olam, the
              twenty-third volume and hidden register. These are volume titles,
              not completed Gate entries.
            </p>
            <a className="button dark" href="#gate-map">
              View the reserved Gates
            </a>
          </div>
        </section>
        <section className="gate-map section-pad" id="gate-map">
          <div className="section-heading">
            <div>
              <p className="kicker">The mapped architecture</p>
              <h2>231 reserved Gates.</h2>
            </div>
            <p>
              Every distinct pair has a place. Each entry identifies its
              position without supplying unwritten interpretation or text.
            </p>
          </div>
          <div className="reserved-gate-grid">
            {gates.map((gate) => (
              <article className="reserved-gate-card" key={gate.slug}>
                <div>
                  <span>Gate {String(gate.number).padStart(3, "0")}</span>
                  <b>{gate.status}</b>
                </div>
                <p className="hebrew" lang="he" dir="rtl">
                  {gate.hebrew}
                </p>
                <h3>{gate.title}</h3>
                <small>
                  This position is mapped. Its text has not yet been opened.
                </small>
              </article>
            ))}
          </div>
        </section>
        <section className="volume-library section-pad">
          <div className="section-heading">
            <div>
              <p className="kicker">The Celestial Library</p>
              <h2>The Twenty-Three Volumes</h2>
            </div>
            <p>
              The named volumes establish the library’s order while the 231
              Gates remain unfilled.
            </p>
          </div>
          <ol className="volume-grid">
            {celestialLibraryVolumes.map((volume, index) => (
              <li key={volume.letter}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{volume.letter}</p>
                <h3>{volume.title}</h3>
              </li>
            ))}
          </ol>
        </section>
      </Shell>
    );
  if (root === "projects")
    return (
      <Shell>
        <PageHero
          kicker="Connected worlds"
          title="Separate doors. Shared light."
          intro="Related projects have their own purposes and audiences. KiahAviyu.com remains the author gate."
        />
        <section className="project-grid page-projects section-pad">
          {projects.map((p) => (
            <a href={p.url} target="_blank" rel="noreferrer" key={p.title}>
              <span>◇</span>
              <h2>{p.title}</h2>
              <p>{p.short}</p>
              <b>Visit project ↗</b>
            </a>
          ))}
        </section>
      </Shell>
    );
  if (root === "about")
    return (
      <Shell>
        <PageHero
          kicker="The author"
          title="Kiah Aviyu"
          intro="An author working with Hebrew letters, sacred symbolism, speculative story, and the persistent questions beneath language and reality."
        />
        <section className="about-story section-pad">
          <Image
            className="title-page-art"
            src="/brand/title-page.jpg"
            alt="Kiah Aviyu title-page mark with the Hebrew name קיה אביעו"
            width={1086}
            height={1450}
            sizes="(max-width: 700px) 90vw, 35vw"
          />
          <div className="prose">
            <h2>Books as gates and maps of return.</h2>
            <p>
              Kiah Aviyu’s work attends to Hebrew letters as architecture and
              language, and to story as a disciplined space for questions about
              physics, symbolism, meaning, and return.
            </p>
            <p>
              The mystical fiction belongs to connected literary worlds without
              collapsing those worlds into doctrine. Torah-first respect,
              careful language, and aniconic visual thought guide the public
              presentation of the work.
            </p>
            <p>
              No public claim is made here to rabbinic, academic, institutional,
              or religious authority.
            </p>
          </div>
        </section>
      </Shell>
    );
  if (root === "news" && slug) {
    const n = news.find((x) => x.slug === slug);
    if (!n) notFound();
    return (
      <Shell>
        <Breadcrumbs
          items={[["Home", "/"], ["News", "/news"], [n.title]]}
          currentPath={`/news/${n.slug}`}
        />
        <article className="news-detail section-pad">
          <p className="kicker">
            News · <time dateTime={n.date}>{n.date}</time>
          </p>
          <h1>{n.title}</h1>
          <p className="lead">{n.excerpt}</p>
          <p>
            The new structure brings the catalog, series, 231 Gates, connected
            projects, and public-benefit mission into one calm, maintainable
            home. Confirmed details will continue to replace conservative status
            notes as the library grows.
          </p>
        </article>
      </Shell>
    );
  }
  if (root === "news")
    return (
      <Shell>
        <PageHero
          kicker="Notes from the library"
          title="News"
          intro="Release notes, publication updates, and changes across the connected worlds."
        />
        <section className="news-list section-pad">
          {news.map((n) => (
            <article key={n.slug}>
              <time dateTime={n.date}>{n.date}</time>
              <h2>
                <Link href={`/news/${n.slug}`}>{n.title}</Link>
              </h2>
              <p>{n.excerpt}</p>
              <Link className="arrow-link" href={`/news/${n.slug}`}>
                Read update →
              </Link>
            </article>
          ))}
        </section>
        <Newsletter />
      </Shell>
    );
  if (root === "press")
    return (
      <Shell>
        <PageHero
          kicker="Press room"
          title="Press & interviews"
          intro="Approved background, interview themes, selected book covers, and a clear path for media inquiries."
        />
        <section className="press-grid section-pad">
          <div>
            <h2>Short biography</h2>
            <p>
              Kiah Aviyu is an author of mystical fiction shaped by Hebrew
              language, sacred symbolism, and questions of meaning.
            </p>
            <h2>Long biography</h2>
            <p>
              Kiah Aviyu writes across connected literary and conceptual worlds.
              The work considers Hebrew letters as architecture, story as a
              vessel for inquiry, and books as gates into recurring questions of
              knowledge, trial, return, and reality. KiahAviyu.com is the author
              home; LuminaNexus.org carries the related educational and
              public-benefit mission.
            </p>
          </div>
          <div>
            <h2>Interview topics</h2>
            <ul>
              <li>Building a connected living library</li>
              <li>Hebrew letters as literary architecture</li>
              <li>Mystical inquiry and speculative fiction</li>
              <li>Torah-first respect in imaginative work</li>
              <li>Aniconic design and sacred symbolism</li>
            </ul>
            <h2>Rights & permissions</h2>
            <p>
              Book-cover use, excerpts, interviews, and permissions require
              written approval. No rights status should be inferred from this
              page.
            </p>
            <Link className="button dark" href="/contact">
              Request press materials
            </Link>
          </div>
        </section>
        <section className="author-mark section-pad">
          <Image
            src="/brand/kiah-aviyu-logo.jpg"
            alt="Kiah Aviyu logo: an open book, ascending flame forms, and a gold star"
            width={1254}
            height={1254}
            sizes="(max-width: 700px) 90vw, 420px"
          />
          <div>
            <p className="kicker">Approved author mark</p>
            <h2>Kiah Aviyu identity artwork</h2>
            <p>
              This supplied mark may be used with permission in approved press
              coverage. Do not alter, redraw, recolor, or extract its elements.
            </p>
            <a
              className="button dark"
              href="/brand/kiah-aviyu-logo.jpg"
              download
            >
              Download author mark
            </a>
          </div>
        </section>
        <section className="selected-covers section-pad">
          {books.slice(0, 2).map((b) => (
            <BookCover book={b} key={b.slug} />
          ))}
        </section>
      </Shell>
    );
  if (root === "contact")
    return (
      <Shell>
        <PageHero
          kicker="Contact"
          title="Begin a conversation."
          intro="General, press, and reader messages can begin here."
        />
        <FormBlock kind="contact" title="Contact Kiah Aviyu" />
      </Shell>
    );
  if (root === "privacy")
    return (
      <Shell>
        <PageHero
          kicker="Policy"
          title="Privacy"
          intro="A privacy-first site with no unnecessary tracking or cookies."
        />
        <section className="prose section-pad">
          <h2>Information you provide</h2>
          <p>
            Forms are not currently connected to a delivery provider and
            therefore do not submit or store personal information. This notice
            will be updated before form delivery is enabled.
          </p>
          <h2>Analytics and cookies</h2>
          <p>
            No optional analytics or advertising cookies are intentionally
            configured in this site.
          </p>
          <h2>External links</h2>
          <p>
            External sites apply their own privacy practices. Review those
            policies before providing information.
          </p>
        </section>
      </Shell>
    );
  if (root === "terms")
    return (
      <Shell>
        <PageHero
          kicker="Policy"
          title="Terms"
          intro="Terms for use of the Kiah Aviyu author site."
        />
        <section className="prose section-pad">
          <h2>Copyright</h2>
          <p>
            Site text, book titles, cover treatments, and original materials are
            protected by applicable rights. No license is granted except
            ordinary personal viewing of the site.
          </p>
          <h2>Accuracy</h2>
          <p>
            Publication and project information may change. Unconfirmed details
            are intentionally marked or omitted.
          </p>
          <h2>External services</h2>
          <p>
            Links to retailers and related projects are provided for
            convenience; their terms govern your use of those services.
          </p>
        </section>
      </Shell>
    );
  if (root === "search") {
    const q = String(query.q ?? "").trim();
    const hay = [
      ...books.map((b) => ({
        type: "Book",
        title: b.title,
        text: `${b.subtitle ?? ""} ${b.short}`,
        url: `/books/${b.slug}`,
      })),
      ...series.map((s) => ({
        type: "Series",
        title: s.title,
        text: s.short,
        url: `/series/${s.slug}`,
      })),
      ...news.map((n) => ({
        type: "News",
        title: n.title,
        text: n.excerpt,
        url: `/news/${n.slug}`,
      })),
      ...projects.map((p) => ({
        type: "Project",
        title: p.title,
        text: p.short,
        url: p.url,
      })),
    ];
    const results = q
      ? hay.filter((x) =>
          `${x.title} ${x.text}`.toLowerCase().includes(q.toLowerCase()),
        )
      : [];
    return (
      <Shell>
        <PageHero
          kicker="Across the library"
          title="Search"
          intro="Search books, series, news, and connected projects."
        />
        <form className="search-form" action="/search">
          <label>
            Search the library
            <input
              name="q"
              defaultValue={q}
              autoFocus
              placeholder="Try ‘Alef’ or ‘Gates’"
            />
          </label>
          <button>Search</button>
        </form>
        <section className="search-results section-pad">
          {q ? (
            results.length ? (
              results.map((r) => (
                <article key={`${r.type}-${r.title}`}>
                  <span>{r.type}</span>
                  <h2>
                    {r.url.startsWith("http") ? (
                      <a href={r.url} target="_blank" rel="noreferrer">
                        {r.title} ↗
                      </a>
                    ) : (
                      <Link href={r.url}>{r.title}</Link>
                    )}
                  </h2>
                  <p>{r.text}</p>
                </article>
              ))
            ) : (
              <EmptyState
                title="No results"
                text={`Nothing matched “${q}”. Try a title, series, or broader subject.`}
              />
            )
          ) : (
            <EmptyState
              title="The library is ready"
              text="Enter a word or phrase to begin searching."
            />
          )}
        </section>
      </Shell>
    );
  }
  notFound();
}
