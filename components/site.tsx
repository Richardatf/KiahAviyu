import Link from "next/link";
import Image from "next/image";
import { nav, site, type Book } from "../lib/content";

export function HebrewName({ className = "" }: { className?: string }) {
  return (
    <span className={`hebrew ${className}`} lang="he" dir="rtl">
      {site.hebrew}
    </span>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-inner">
        <Link className="brand" href="/">
          <span>Kiah Aviyu</span>
          <HebrewName />
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(([label, url]) => (
            <Link key={url} href={url}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="search-link" href="/search" aria-label="Search">
            ⌕
          </Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav>
            {nav.map(([label, url]) => (
              <Link key={url} href={url}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            Kiah Aviyu
          </Link>
          <HebrewName />
          <p>Author · Mystical Science · Living Library</p>
        </div>
        <div>
          <h2>Library</h2>
          <Link href="/books">Books</Link>
          <Link href="/series">Series</Link>
          <Link href="/231-gates">231 Gates</Link>
          <Link href="/search">Search</Link>
        </div>
        <div>
          <h2>Information</h2>
          <Link href="/press">Press</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div>
          <p className="footer-phrase">Books • Gates • Trees • Light</p>
          <a href="https://luminaNexus.org" target="_blank" rel="noreferrer">
            LuminaNexus.org ↗
          </a>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Kiah Aviyu. All rights reserved.
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero">
      <div className="line-motif" aria-hidden="true" />
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}
export function Breadcrumbs({
  items,
  currentPath,
}: {
  items: Array<[string, string?]>;
  currentPath: string;
}) {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {items.map(([label, url], i) => (
          <span key={label}>
            {i > 0 && <b aria-hidden="true">/</b>}
            {url ? <Link href={url}>{label}</Link> : label}
          </span>
        ))}
      </nav>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(([name, url], index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
            item: `${site.domain}${url ?? currentPath}`,
          })),
        }}
      />
    </>
  );
}
export function BookCover({ book }: { book: Book }) {
  if (book.coverImage) {
    return (
      <div className="book-cover official-cover">
        <Image
          src={book.coverImage}
          alt={`${book.title}${book.subtitle ? `: ${book.subtitle}` : ""} book cover`}
          width={book.coverWidth}
          height={book.coverHeight}
          unoptimized
        />
      </div>
    );
  }
  return (
    <div
      className={`book-cover cover-${book.coverStyle}`}
      role="img"
      aria-label={`Cover treatment for ${book.title}`}
    >
      <span className="cover-lines" aria-hidden="true" />
      <small>{book.series ?? "KIAH AVIYU"}</small>
      <strong>{book.title}</strong>
      {book.subtitle && <em>{book.subtitle}</em>}
      <b>KIAH AVIYU</b>
    </div>
  );
}
export function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Link href={`/books/${book.slug}`}>
        <BookCover book={book} />
      </Link>
      <div className="book-card-copy">
        <p className="meta">
          {book.category} · {book.status}
        </p>
        <h2>
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h2>
        {book.subtitle && <p className="subtitle">{book.subtitle}</p>}
        <p>{book.short}</p>
        <Link className="arrow-link" href={`/books/${book.slug}`}>
          Open book page <span>→</span>
        </Link>
      </div>
    </article>
  );
}
export function Status({ children }: { children: string }) {
  return <span className="status">{children}</span>;
}
export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <div aria-hidden="true">◇</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function FormBlock({ kind, title }: { kind: string; title: string }) {
  return (
    <section className="form-panel">
      <h2>{title}</h2>
      <p className="form-notice" id={`${kind}-status`}>
        This form is ready for a delivery provider. Until one is connected, use
        the project links for public information; no submission will be falsely
        reported as sent.
      </p>
      <form data-form-kind={kind} aria-describedby={`${kind}-status`}>
        <div className="field-row">
          <label>
            First name
            <input name="firstName" autoComplete="given-name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
        </div>
        <label>
          Topic
          <select name="topic" required>
            <option value="">Choose a topic</option>
            <option>General inquiry</option>
            <option>Press or interview</option>
            <option>Reader message</option>
          </select>
        </label>
        <label>
          Message
          <textarea name="message" rows={6} required minLength={20} />
        </label>
        <label className="consent">
          <input type="checkbox" required /> I consent to the use of this
          information to respond to my inquiry.
        </label>
        <label className="honeypot" aria-hidden="true">
          Leave blank
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" disabled aria-describedby={`${kind}-status`}>
          Send inquiry
        </button>
      </form>
    </section>
  );
}
export function Newsletter() {
  return (
    <section className="newsletter">
      <div>
        <p className="kicker">Letters from the library</p>
        <h2>News at the threshold.</h2>
        <p>
          Occasional notes on books, gates, and connected projects. Delivery
          will open when a newsletter provider is connected.
        </p>
      </div>
      <form>
        <label>
          First name
          <input name="firstName" disabled />
        </label>
        <label>
          Email address
          <input type="email" name="email" disabled />
        </label>
        <button disabled>Join the list</button>
      </form>
    </section>
  );
}
