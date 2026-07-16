export type BookStatus = "Available";
export type PublicationStatus = "published" | "unpublished";
export type Book = {
  title: string;
  subtitle?: string;
  slug: string;
  series?: string;
  sequence?: number;
  category: "Fiction & Myth" | "Mystical Nonfiction" | "Series, Gates & Trees";
  publicationStatus: PublicationStatus;
  status: BookStatus;
  short: string;
  long: string;
  approvedExcerpt?: string;
  isbn?: string;
  formats?: string[];
  retailer: string;
  productId: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  featured?: boolean;
  coverStyle: string;
  seo: string;
  verification: {
    title: "approved-cover";
    subtitle?: "approved-cover";
    publicationStatus: "owner-confirmed";
    retailer: "owner-provided";
    cover: "amazon-product-image";
  };
};

const verified = (hasSubtitle = false): Book["verification"] => ({
  title: "approved-cover",
  ...(hasSubtitle ? { subtitle: "approved-cover" as const } : {}),
  publicationStatus: "owner-confirmed",
  retailer: "owner-provided",
  cover: "amazon-product-image",
});

// This is the single source of truth for the public catalog. The former live
// site is reference material only; owner-provided links and approved covers
// take precedence when sources disagree.
export const books: Book[] = [
  {
    title: "MERKAVAT HA’EL",
    subtitle: "The Chariot of the Divine",
    slug: "merkavat-hael",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short:
      "A central work in Kiah Aviyu’s growing library of mystical inquiry.",
    long: "MERKAVAT HA’EL stands at the threshold of the Living Library, inviting careful inquiry into divine mystery, language, and the architecture of meaning.",
    retailer:
      "https://www.amazon.com/MERKAVAT-HAEL-CHARIOT-DIVINE-AVIYU/dp/B0GPW2KX2T",
    productId: "B0GPW2KX2T",
    coverImage: "/covers/merkavat-hael.jpg",
    coverWidth: 334,
    coverHeight: 500,
    featured: true,
    coverStyle: "merkavat",
    seo: "MERKAVAT HA’EL — The Chariot of the Divine by Kiah Aviyu.",
    verification: verified(true),
  },
  {
    title: "TOWER OF DA’AT",
    slug: "tower-of-daat",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short:
      "A meditation on knowledge, wisdom, and the climb toward understanding.",
    long: "TOWER OF DA’AT considers knowledge as ascent: a disciplined movement through language, symbol, and the questions that shape understanding.",
    isbn: "033692142X",
    formats: ["Paperback"],
    retailer: "https://www.amazon.com/Tower-Daat-Kiah-Aviyu/dp/033692142X",
    productId: "033692142X",
    coverImage: "/covers/tower-of-daat.jpg",
    coverWidth: 333,
    coverHeight: 500,
    featured: true,
    coverStyle: "tower",
    seo: "TOWER OF DA’AT by Kiah Aviyu.",
    verification: verified(),
  },
  {
    title: "ADAM KADMON",
    subtitle: "A Story in Ten Lights",
    slug: "adam-kadmon",
    series: "Celestial Library of the 231 Gates",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short:
      "A literary work within the wider architecture of the Living Library.",
    long: "A work of mystical speculative fiction arranged within the connected world of the Living Library.",
    isbn: "196965953X",
    retailer: "https://www.amazon.com/ADAM-KADMON-KIAH-AVIYU/dp/196965953X",
    productId: "196965953X",
    coverImage: "/covers/adam-kadmon.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "ten-lights",
    seo: "ADAM KADMON — A Story in Ten Lights by Kiah Aviyu.",
    verification: verified(true),
  },
  {
    title: "THE ADVERSARY’S PRAYER",
    subtitle: "Thanking HaShem for the One Who Tries Us",
    slug: "the-adversarys-prayer",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short:
      "A reflection on trial, gratitude, and the difficult work of prayer.",
    long: "A contemplative work about meeting adversity without flattening its difficulty, and about the place of gratitude within trial.",
    isbn: "1969659459",
    retailer:
      "https://www.amazon.com/ADVERSARYS-PRAYER-Thanking-HaShem-Tries/dp/1969659459",
    productId: "1969659459",
    coverImage: "/covers/the-adversarys-prayer.jpg",
    coverWidth: 313,
    coverHeight: 500,
    coverStyle: "prayer",
    seo: "THE ADVERSARY’S PRAYER — Thanking HaShem for the One Who Tries Us by Kiah Aviyu.",
    verification: verified(true),
  },
  {
    title: "DO YOU HEAR VOICES?",
    slug: "do-you-hear-voices",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short: "An inquiry into voice, interpretation, and discernment.",
    long: "A published exploration of voice, interpretation, and discernment. Additional descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/You-Hear-Voices-Kiah-Aviyu/dp/B0H7LB9KGP",
    productId: "B0H7LB9KGP",
    coverImage: "/covers/do-you-hear-voices.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "voices",
    seo: "DO YOU HEAR VOICES? by Kiah Aviyu.",
    verification: verified(),
  },
  {
    title: "THE GOD THAT ATE GRASS",
    subtitle: "The True Story of Passover",
    slug: "the-god-that-ate-grass",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short: "A Passover-related literary work.",
    long: "A published Passover-related work. Further descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/God-That-Ate-Grass/dp/B0H6VW4QS4",
    productId: "B0H6VW4QS4",
    coverImage: "/covers/the-god-that-ate-grass.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "grass",
    seo: "THE GOD THAT ATE GRASS — The True Story of Passover by Kiah Aviyu.",
    verification: verified(true),
  },
  {
    title: "QUANTUM ETZ CHAIM",
    slug: "quantum-etz-chaim",
    series: "Quantum Etz Chaim",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short: "The Tree of Life considered as quantum architecture.",
    long: "A work connecting the architecture of the Tree of Life with questions of physics, computation, consciousness, and information.",
    isbn: "1969659254",
    retailer:
      "https://www.amazon.com/QUANTUM-ETZ-CHAIM-KIAH-AVIYU/dp/1969659254",
    productId: "1969659254",
    coverImage: "/covers/quantum-etz-chaim.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "quantum",
    seo: "QUANTUM ETZ CHAIM by Kiah Aviyu.",
    verification: verified(),
  },
  {
    title: "INFINITE WAVE",
    slug: "infinite-wave",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short: "A published work in Kiah Aviyu’s expanding literary library.",
    long: "INFINITE WAVE is part of Kiah Aviyu’s growing body of published work. Additional descriptive details will be added when confirmed.",
    isbn: "1969659688",
    retailer: "https://www.amazon.com/INFINITE-WAVE-Kiah-Aviyu/dp/1969659688",
    productId: "1969659688",
    coverImage: "/covers/infinite-wave.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "wave",
    seo: "INFINITE WAVE by Kiah Aviyu.",
    verification: verified(),
  },
  {
    title: "TIFERET",
    slug: "tiferet",
    category: "Fiction & Myth",
    publicationStatus: "published",
    status: "Available",
    short: "A published work in Kiah Aviyu’s expanding literary library.",
    long: "TIFERET is part of Kiah Aviyu’s growing body of published work. Additional descriptive details will be added when confirmed.",
    isbn: "1969659394",
    retailer: "https://www.amazon.com/TIFERET-Kiah-Aviyu/dp/1969659394",
    productId: "1969659394",
    coverImage: "/covers/tiferet.jpg",
    coverWidth: 334,
    coverHeight: 500,
    coverStyle: "tiferet",
    seo: "TIFERET by Kiah Aviyu.",
    verification: verified(),
  },
];

export const findBook = (slug: string) =>
  books.find((book) => book.slug === slug);
