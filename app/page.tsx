const amazonUrl =
  "https://www.amazon.com/s?k=kiah+aviyu&crid=3J571DNG4UE31&sprefix=%2Caps%2C345&ref=nb_sb_ss_recent_2_0_recent";
const merkavatUrl = "https://www.amazon.com/s?k=Merkavat+Ha%27El+Kiah+Aviyu";
const towerUrl = "https://www.amazon.com/s?k=Tower+of+Da%27at+Kiah+Aviyu";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Kiah Aviyu home">
          KIAH <i>·</i> AVIYU
        </a>
        <div className="nav-links">
          <a href="#books">Books</a>
          <a href="#about">About</a>
          <a className="nav-cta" href={amazonUrl} target="_blank" rel="noreferrer">
            Shop books <Arrow />
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="star star-one">✦</span>
          <span className="star star-two">✧</span>
        </div>
        <p className="eyebrow">Author · Seeker · Storyteller</p>
        <h1>
          Words for the
          <br />
          <em>inner ascent.</em>
        </h1>
        <p className="hero-copy">
          Enter the visionary worlds of <em>Merkavat Ha’El</em> and <em>Tower of
          Da’at</em>—the defining works of Kiah Aviyu.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href="#books">Explore the books <span>↓</span></a>
          <a className="text-link" href="#about">Meet Kiah <span>→</span></a>
        </div>
        <p className="scroll-note">Scroll to enter <span>⌄</span></p>
      </section>

      <section className="manifesto">
        <p className="section-number">01 / The work</p>
        <blockquote>
          “Some truths are not found.
          <br />
          They are <em>climbed.</em>”
        </blockquote>
        <p className="manifesto-copy">
          Kiah Aviyu writes at the meeting place of spiritual tradition and the
          lived human struggle—where questions become doorways and every trial
          carries an invitation.
        </p>
      </section>

      <section className="books" id="books">
        <div className="section-heading">
          <div>
            <p className="section-number">02 / The books</p>
            <h2>The essential works.</h2>
          </div>
          <a className="text-link dark-link" href={amazonUrl} target="_blank" rel="noreferrer">
            View all on Amazon <Arrow />
          </a>
        </div>

        <article className="book-row flagship">
          <div className="book-art prayer-cover merkavat-cover" aria-label="Stylized cover for Merkavat Ha’El">
            <span className="prayer-ring" />
            <p>MERKAVAT<br /><strong>HA’EL</strong></p>
            <div className="cover-rule" />
            <small>THE CHARIOT<br />OF THE DIVINE</small>
            <b>KIAH AVIYU</b>
          </div>
          <div className="book-info">
            <p className="book-index">THE BEST OF KIAH AVIYU · FEATURED</p>
            <h3>Merkavat Ha’El</h3>
            <p className="book-theme">The Chariot of the Divine.</p>
            <p className="book-meta">A flagship work by Kiah Aviyu</p>
            <a className="button button-dark" href={merkavatUrl} target="_blank" rel="noreferrer">
              Find on Amazon <Arrow />
            </a>
          </div>
        </article>

        <article className="book-row reverse flagship">
          <div className="book-art tower-cover" aria-label="Stylized cover for Tower of Da’at">
            <div className="cover-sun" />
            <p>TOWER<br />OF<br /><strong>DA’AT</strong></p>
            <small>KIAH AVIYU</small>
          </div>
          <div className="book-info">
            <p className="book-index">THE BEST OF KIAH AVIYU · FEATURED</p>
            <h3>Tower of Da’at</h3>
            <p className="book-theme">A meditation on knowledge, wisdom, and the climb toward understanding.</p>
            <p className="book-meta">Paperback · ISBN 978-1-969659-10-2</p>
            <a className="button button-dark" href={towerUrl} target="_blank" rel="noreferrer">
              Find on Amazon <Arrow />
            </a>
          </div>
        </article>
      </section>

      <section className="about" id="about">
        <p className="section-number">03 / The author</p>
        <div className="about-grid">
          <h2>Kiah<br /><em>Aviyu</em></h2>
          <div className="about-copy">
            <p className="lead">A pen name. A body of work. A lifelong pursuit of the questions beneath the questions.</p>
            <p>Kiah Aviyu writes for readers drawn to spiritual depth, honest inquiry, and the transformation hidden inside life’s most difficult encounters.</p>
            <a className="button button-light" href={amazonUrl} target="_blank" rel="noreferrer">
              Discover the books <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-mark">KIAH <span>AVIYU</span></div>
        <div className="footer-bottom">
          <p>Spiritual writing for the inner ascent.</p>
          <p>© {new Date().getFullYear()} Kiah Aviyu</p>
          <a href={amazonUrl} target="_blank" rel="noreferrer">Amazon <Arrow /></a>
        </div>
      </footer>
    </main>
  );
}
