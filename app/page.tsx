import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BookCard,
  BookCover,
  HebrewName,
  Newsletter,
  Shell,
  StructuredData,
} from "../components/site";
import { books, news, projects, site } from "../lib/content";

export default function Home() {
  const featured = books[0];
  const fireLetters = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ",
    "ק",
    "ר",
    "ש",
    "ת",
  ];
  return (
    <Shell>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${site.domain}/#author`,
              name: site.name,
              alternateName: site.hebrew,
              url: site.domain,
            },
            {
              "@type": "WebSite",
              "@id": `${site.domain}/#website`,
              name: site.name,
              url: site.domain,
              publisher: { "@id": `${site.domain}/#author` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${site.domain}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }}
      />
      <section className="landing-gate" aria-label="Welcome to Kiah Aviyu">
        <Image
          className="landing-gate-artwork"
          src="/brand/fiery-gate-landing.png"
          alt="A luminous golden gateway surrounded by fire, stars, and sacred geometry"
          fill
          priority
          sizes="100vw"
        />
        <div className="landing-gate-vignette" aria-hidden="true" />
        <Link className="enter-gate" href="#welcome">
          <span>Enter the Gate</span>
          <i aria-hidden="true">↓</i>
        </Link>
      </section>
      <section className="home-hero" id="welcome">
        <div className="ember-field" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Author · Mystical Fiction · Living Library</p>
          <HebrewName />
          <h1>
            Welcome to
            <br />
            the <em>Gate.</em>
          </h1>
          <p>
            Kiah Aviyu writes connected works of story, Hebrew symbolism,
            metaphysical inquiry, and speculative imagination—a living literary
            library of books, gates, trees, and light.
          </p>
          <div className="button-row">
            <Link className="button gold" href="/books">
              Explore the Books
            </Link>
            <Link className="button ghost" href="/231-gates">
              Enter the Living Library
            </Link>
          </div>
          <p className="torah">
            <HebrewName /> • Torah First
          </p>
        </div>
        <div className="fire-letter-stage" aria-hidden="true">
          <div className="letter-orbit" lang="he" dir="rtl">
            {fireLetters.map((letter, index) => (
              <span
                key={letter}
                style={{ "--letter-index": index } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="fire-aleph" lang="he" dir="rtl">
            א
          </div>
          <div className="ember-core" />
          <p>Books • Gates • Trees • Light</p>
        </div>
      </section>

      <section className="featured-section section-pad">
        <div className="section-label">01 · Featured book</div>
        <div className="featured-grid">
          <BookCover book={featured} />
          <div>
            <p className="kicker">At the center of the library</p>
            <h2>{featured.title}</h2>
            <h3>{featured.subtitle}</h3>
            <p>{featured.long}</p>
            <div className="button-row">
              <Link className="button dark" href={`/books/${featured.slug}`}>
                Enter the book
              </Link>
              {featured.retailer && (
                <a
                  className="arrow-link"
                  href={featured.retailer}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find on Amazon ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="journey section-pad">
        <div className="section-heading">
          <div>
            <p className="kicker">Begin your journey</p>
            <h2>Three ways through the gate.</h2>
          </div>
          <p>
            Each path enters the same connected library from a different
            threshold.
          </p>
        </div>
        <div className="journey-grid">
          {[
            [
              "01",
              "Mystical Fiction",
              "Stories of sacred imagination, symbolic worlds, and speculative questions.",
              "/books?category=Mystical+Fiction",
            ],
            [
              "02",
              "Series & Worlds",
              "Explore the connected architectures that unfold across books.",
              "/series",
            ],
            [
              "03",
              "Connected Projects",
              "Visit the research, educational, and creative work beyond the books.",
              "/projects",
            ],
          ].map(([n, t, d, u]) => (
            <Link className="journey-card" href={u} key={t}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <b>Enter →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="library-intro section-pad">
        <Image
          className="library-artwork"
          src="/brand/celestial-library.jpg"
          alt="An abstract open book branching into gates, paths, and geometric light"
          width={1536}
          height={1024}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div>
          <p className="kicker">The Living Library</p>
          <h2>
            The Celestial Library
            <br />
            of the <em>231 Gates</em>
          </h2>
          <p>
            A connected body of books, gates, trees, reflections, and related
            explorations. The architecture invites many entries without
            insisting on a single path.
          </p>
          <p className="aleph-note">
            At its veiled edge rests <strong>Aleph Olam</strong>—the hidden
            twenty-third element, named but not unfolded.
          </p>
          <Link className="button gold" href="/231-gates">
            Approach the gates
          </Link>
        </div>
      </section>

      <section className="catalog-preview section-pad">
        <div className="section-heading">
          <div>
            <p className="kicker">Selected books</p>
            <h2>A growing body of work.</h2>
          </div>
          <Link className="arrow-link" href="/books">
            View the full catalog →
          </Link>
        </div>
        <div className="book-grid">
          {books.slice(0, 6).map((b) => (
            <BookCard book={b} key={b.slug} />
          ))}
        </div>
      </section>

      <section className="lumina section-pad">
        <div className="lumina-mark" aria-hidden="true">
          ◇
        </div>
        <div>
          <p className="kicker">Primary public-benefit mission</p>
          <h2>LuminaNexus</h2>
          <p>
            LuminaNexus.org is the educational, curriculum, research, outreach,
            and public-benefit mission connected to this body of work—a separate
            home for learning and public engagement.
          </p>
          <a
            className="button gold"
            href="https://luminaNexus.org"
            target="_blank"
            rel="noreferrer"
          >
            Visit LuminaNexus.org ↗
          </a>
        </div>
      </section>

      <section className="worlds section-pad">
        <div className="section-heading">
          <div>
            <p className="kicker">Connected worlds</p>
            <h2>Separate doors. Shared light.</h2>
          </div>
          <p>
            KiahAviyu.com remains the calm author gate. These related projects
            have their own purposes and paths.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <a href={p.url} target="_blank" rel="noreferrer" key={p.title}>
              <span aria-hidden="true">◇</span>
              <h3>{p.title}</h3>
              <p>{p.short}</p>
              <b>Visit project ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="latest section-pad">
        <p className="kicker">Latest news</p>
        <article>
          <time dateTime={news[0].date}>
            {new Date(`${news[0].date}T12:00:00`).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <h2>{news[0].title}</h2>
          <p>{news[0].excerpt}</p>
          <Link className="arrow-link" href={`/news/${news[0].slug}`}>
            Read the update →
          </Link>
        </article>
      </section>
      <Newsletter />
    </Shell>
  );
}
