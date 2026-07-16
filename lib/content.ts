export type BookStatus = "Available";
export type Book = {
  title: string;
  subtitle?: string;
  slug: string;
  series?: string;
  sequence?: number;
  category: "Fiction & Myth" | "Mystical Nonfiction" | "Series, Gates & Trees";
  status: BookStatus;
  short: string;
  long: string;
  isbn?: string;
  formats?: string[];
  retailer?: string;
  coverImage?: string;
  featured?: boolean;
  coverStyle: string;
  seo: string;
  warnings?: string[];
};

export const site = {
  name: "Kiah Aviyu",
  hebrew: "קיה אביעו",
  domain: "https://kiahaviyu.com",
  amazon: "https://www.amazon.com/s?k=kiah+aviyu",
};

export const books: Book[] = [
  {
    title: "MERKAVAT HA’EL",
    subtitle: "The Chariot of the Divine",
    slug: "merkavat-hael",
    category: "Fiction & Myth",
    status: "Available",
    short:
      "A central work in Kiah Aviyu’s growing library of mystical inquiry.",
    long: "MERKAVAT HA’EL stands at the threshold of the Living Library, inviting careful inquiry into divine mystery, language, and the architecture of meaning.",
    retailer:
      "https://www.amazon.com/MERKAVAT-HAEL-CHARIOT-DIVINE-AVIYU/dp/B0GPW2KX2T",
    coverImage: "/covers/merkavat-hael.jpg",
    featured: true,
    coverStyle: "merkavat",
    seo: "MERKAVAT HA’EL — The Chariot of the Divine by Kiah Aviyu.",
  },
  {
    title: "TOWER OF DA’AT",
    slug: "tower-of-daat",
    category: "Fiction & Myth",
    status: "Available",
    short:
      "A meditation on knowledge, wisdom, and the climb toward understanding.",
    long: "TOWER OF DA’AT considers knowledge as ascent: a disciplined movement through language, symbol, and the questions that shape understanding.",
    isbn: "978-1-969659-10-2",
    formats: ["Paperback"],
    retailer: "https://www.amazon.com/Tower-Daat-Kiah-Aviyu/dp/033692142X",
    coverImage: "/covers/tower-of-daat.jpg",
    featured: true,
    coverStyle: "tower",
    seo: "TOWER OF DA’AT by Kiah Aviyu.",
  },
  {
    title: "ADAM KADMON",
    subtitle: "A Story in Ten Lights",
    slug: "adam-kadmon",
    series: "Celestial Library of the 231 Gates",
    category: "Fiction & Myth",
    status: "Available",
    short:
      "A literary work within the wider architecture of the Living Library.",
    long: "A work of mystical speculative fiction arranged within the connected world of the Living Library.",
    retailer: "https://www.amazon.com/ADAM-KADMON-KIAH-AVIYU/dp/196965953X",
    coverImage: "/covers/adam-kadmon.jpg",
    coverStyle: "ten-lights",
    seo: "ADAM KADMON — A Story in Ten Lights by Kiah Aviyu.",
  },
  {
    title: "THE ADVERSARY’S PRAYER",
    subtitle: "Thanking HaShem When He Tries You",
    slug: "the-adversarys-prayer",
    category: "Fiction & Myth",
    status: "Available",
    short:
      "A reflection on trial, gratitude, and the difficult work of prayer.",
    long: "A contemplative work about meeting adversity without flattening its difficulty, and about the place of gratitude within trial.",
    retailer:
      "https://www.amazon.com/ADVERSARYS-PRAYER-Thanking-HaShem-Tries/dp/1969659459",
    coverImage: "/covers/the-adversarys-prayer.jpg",
    coverStyle: "prayer",
    seo: "THE ADVERSARY’S PRAYER by Kiah Aviyu.",
  },
  {
    title: "DO YOU HEAR VOICES?",
    slug: "do-you-hear-voices",
    category: "Fiction & Myth",
    status: "Available",
    short: "An inquiry into voice, interpretation, and discernment.",
    long: "A published exploration of voice, interpretation, and discernment. Additional descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/You-Hear-Voices-Kiah-Aviyu/dp/B0H7LB9KGP",
    coverImage: "/covers/do-you-hear-voices.jpg",
    coverStyle: "voices",
    seo: "DO YOU HEAR VOICES? by Kiah Aviyu.",
  },
  {
    title: "THE GOD THAT ATE GRASS",
    subtitle: "The True Story of Passover",
    slug: "the-god-that-ate-grass",
    category: "Fiction & Myth",
    status: "Available",
    short: "A Passover-related literary work.",
    long: "A published Passover-related work. Further descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/God-That-Ate-Grass/dp/B0H6VW4QS4",
    coverImage: "/covers/the-god-that-ate-grass.jpg",
    coverStyle: "grass",
    seo: "THE GOD THAT ATE GRASS by Kiah Aviyu.",
  },
  {
    title: "QUANTUM ETZ CHAIM",
    slug: "quantum-etz-chaim",
    series: "Quantum Etz Chaim",
    category: "Fiction & Myth",
    status: "Available",
    short: "The Tree of Life considered as quantum architecture.",
    long: "A work connecting the architecture of the Tree of Life with questions of physics, computation, consciousness, and information.",
    retailer:
      "https://www.amazon.com/QUANTUM-ETZ-CHAIM-KIAH-AVIYU/dp/1969659254",
    coverImage: "/covers/quantum-etz-chaim.jpg",
    coverStyle: "quantum",
    seo: "QUANTUM ETZ CHAIM by Kiah Aviyu.",
  },
  {
    title: "INFINITE WAVE",
    slug: "infinite-wave",
    category: "Fiction & Myth",
    status: "Available",
    short: "A published work in Kiah Aviyu’s expanding literary library.",
    long: "INFINITE WAVE is part of Kiah Aviyu’s growing body of published work. Additional descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/INFINITE-WAVE-Kiah-Aviyu/dp/1969659688",
    coverImage: "/covers/infinite-wave.jpg",
    coverStyle: "wave",
    seo: "INFINITE WAVE by Kiah Aviyu.",
  },
  {
    title: "TIFERET",
    slug: "tiferet",
    category: "Fiction & Myth",
    status: "Available",
    short: "A published work in Kiah Aviyu’s expanding literary library.",
    long: "TIFERET is part of Kiah Aviyu’s growing body of published work. Additional descriptive details will be added when confirmed.",
    retailer: "https://www.amazon.com/TIFERET-Kiah-Aviyu/dp/1969659394",
    coverImage: "/covers/tiferet.jpg",
    coverStyle: "tiferet",
    seo: "TIFERET by Kiah Aviyu.",
  },
];

export const series = [
  {
    slug: "celestial-library",
    title: "The Celestial Library of the 231 Gates",
    short:
      "Books, gates, trees, reflections, and veiled connections arranged as a living literary architecture.",
  },
  {
    slug: "elijah-blaze",
    title: "Elijah Blaze",
    short:
      "A separate story world connected to the wider body of Kiah Aviyu’s work.",
  },
  {
    slug: "quantum-etz-chaim",
    title: "Quantum Etz Chaim",
    short:
      "A related world exploring tree, pattern, code, and interpretive structure.",
  },
];

export const projects = [
  {
    title: "LuminaNexus",
    url: "https://luminaNexus.org",
    short:
      "The primary public-benefit, curriculum, educational, research, and outreach mission connected to this body of work.",
  },
  {
    title: "Quantum Etz Chaim",
    url: "https://quantumetzchaim.com",
    short:
      "A related exploration of trees, patterns, and conceptual architecture.",
  },
  {
    title: "Ivrit Code",
    url: "https://ivritcode.org",
    short: "A separate project world focused on Hebrew, structure, and code.",
  },
  {
    title: "Elijah Blaze",
    url: "https://elijahblaze.com",
    short:
      "A distinct story world connected to the larger literary constellation.",
  },
];

export const news = [
  {
    slug: "living-library-rebuild",
    date: "2026-07-15",
    title: "The Living Library opens a new gate",
    excerpt:
      "KiahAviyu.com is being rebuilt as a clearer home for the books, series, gates, and connected projects.",
  },
];

export const nav = [
  ["Home", "/"],
  ["Books", "/books"],
  ["Series", "/series"],
  ["231 Gates", "/231-gates"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["News", "/news"],
  ["Press", "/press"],
  ["Contact", "/contact"],
] as const;

export const findBook = (slug: string) => books.find((b) => b.slug === slug);
export const findSeries = (slug: string) => series.find((s) => s.slug === slug);
