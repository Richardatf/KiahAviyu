export type BookStatus = "Available" | "Coming Soon" | "In Development";
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
    category: "Mystical Nonfiction",
    status: "Available",
    short:
      "A central work in Kiah Aviyu’s growing library of mystical inquiry.",
    long: "MERKAVAT HA’EL stands at the threshold of the Living Library, inviting careful inquiry into divine mystery, language, and the architecture of meaning.",
    retailer:
      "https://www.amazon.com/MERKAVAT-HAEL-CHARIOT-DIVINE-AVIYU/dp/B0GPW2KX2T",
    featured: true,
    coverStyle: "merkavat",
    seo: "MERKAVAT HA’EL — The Chariot of the Divine by Kiah Aviyu.",
  },
  {
    title: "TOWER OF DA’AT",
    slug: "tower-of-daat",
    category: "Mystical Nonfiction",
    status: "Available",
    short:
      "A meditation on knowledge, wisdom, and the climb toward understanding.",
    long: "TOWER OF DA’AT considers knowledge as ascent: a disciplined movement through language, symbol, and the questions that shape understanding.",
    isbn: "978-1-969659-10-2",
    formats: ["Paperback"],
    retailer: "https://www.amazon.com/Tower-Daat-Kiah-Aviyu/dp/033692142X",
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
    status: "In Development",
    short:
      "A literary work within the wider architecture of the Living Library.",
    long: "A developing work of mystical speculative fiction arranged within the connected world of the Living Library.",
    coverStyle: "ten-lights",
    seo: "ADAM KADMON — A Story in Ten Lights, a developing work by Kiah Aviyu.",
  },
  {
    title: "THE ADVERSARY’S PRAYER",
    subtitle: "Thanking HaShem When He Tries You",
    slug: "the-adversarys-prayer",
    category: "Mystical Nonfiction",
    status: "Available",
    short:
      "A reflection on trial, gratitude, and the difficult work of prayer.",
    long: "A contemplative work about meeting adversity without flattening its difficulty, and about the place of gratitude within trial.",
    retailer:
      "https://www.amazon.com/ADVERSARYS-PRAYER-Thanking-HaShem-Tries/dp/1969659459",
    coverStyle: "prayer",
    seo: "THE ADVERSARY’S PRAYER by Kiah Aviyu.",
  },
  {
    title: "EHEYEH",
    subtitle: "Mysteries of Alef",
    slug: "eheyeh",
    series: "Celestial Library of the 231 Gates",
    category: "Series, Gates & Trees",
    status: "In Development",
    short: "An exploration in the architecture of Hebrew letters.",
    long: "A developing entry in the Living Library, centered on Alef and the interpretive spaces opened by Hebrew language.",
    coverStyle: "alef",
    seo: "EHEYEH: Mysteries of Alef, a developing work by Kiah Aviyu.",
  },
  {
    title: "DO YOU HEAR VOICES?",
    slug: "do-you-hear-voices",
    category: "Mystical Nonfiction",
    status: "In Development",
    short: "A developing inquiry into voice, interpretation, and discernment.",
    long: "A forthcoming exploration whose complete publication details have not yet been announced.",
    coverStyle: "voices",
    seo: "DO YOU HEAR VOICES?, a developing work by Kiah Aviyu.",
  },
  {
    title: "THE GOD THAT ATE GRASS",
    subtitle: "The True Story of Passover",
    slug: "the-god-that-ate-grass",
    category: "Fiction & Myth",
    status: "In Development",
    short: "A developing Passover-related literary project.",
    long: "A work in development. Further description and publication details will be added when confirmed.",
    coverStyle: "grass",
    seo: "THE GOD THAT ATE GRASS, a developing work by Kiah Aviyu.",
  },
  {
    title: "KABBALIST OF THE CODE",
    slug: "kabbalist-of-the-code",
    series: "Quantum Etz Chaim",
    category: "Fiction & Myth",
    status: "In Development",
    short: "A speculative work connecting code, symbol, and meaning.",
    long: "A developing project in the orbit of Quantum Etz Chaim. Further details will be added when confirmed.",
    coverStyle: "code",
    seo: "KABBALIST OF THE CODE, a developing work by Kiah Aviyu.",
  },
  {
    title: "QUANTUM ETZ CHAIM",
    slug: "quantum-etz-chaim",
    series: "Quantum Etz Chaim",
    category: "Mystical Nonfiction",
    status: "Available",
    short: "The Tree of Life considered as quantum architecture.",
    long: "A work connecting the architecture of the Tree of Life with questions of physics, computation, consciousness, and information.",
    retailer:
      "https://www.amazon.com/QUANTUM-ETZ-CHAIM-KIAH-AVIYU/dp/1969659254",
    coverStyle: "quantum",
    seo: "QUANTUM ETZ CHAIM by Kiah Aviyu.",
  },
  {
    title: "BENEATH EDEN",
    slug: "beneath-eden",
    category: "Fiction & Myth",
    status: "In Development",
    short: "A developing work of speculative fiction.",
    long: "A work in development. Its full premise and publication details have not yet been announced.",
    coverStyle: "eden",
    seo: "BENEATH EDEN, a developing work by Kiah Aviyu.",
  },
  {
    title: "THE FORGOTTEN STAR SAGA",
    slug: "forgotten-star-saga",
    series: "The Forgotten Star Saga",
    sequence: 1,
    category: "Fiction & Myth",
    status: "In Development",
    short: "The threshold of a developing speculative saga.",
    long: "A connected fictional world in development. Reading order and release details will appear here when confirmed.",
    coverStyle: "star",
    seo: "THE FORGOTTEN STAR SAGA, a developing series by Kiah Aviyu.",
  },
  {
    title: "THE CUBE OF THE SCRIBE",
    slug: "cube-of-the-scribe",
    series: "Celestial Library of the 231 Gates",
    category: "Series, Gates & Trees",
    status: "In Development",
    short: "A developing entry in the Living Library.",
    long: "A work in development within the conceptual architecture of the Celestial Library of the 231 Gates.",
    coverStyle: "cube",
    seo: "THE CUBE OF THE SCRIBE, a developing work by Kiah Aviyu.",
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
    slug: "forgotten-star",
    title: "The Forgotten Star Saga",
    short: "A speculative saga in development.",
  },
  {
    slug: "quantum-etz-chaim",
    title: "Quantum Etz Chaim",
    short:
      "A related world exploring tree, pattern, code, and interpretive structure.",
  },
  {
    slug: "mystical-nonfiction",
    title: "Standalone Mystical Nonfiction",
    short:
      "Works of contemplative inquiry that stand independently while echoing across the library.",
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
