export { books, findBook } from "./books";
export type { Book, BookStatus, PublicationStatus } from "./books";

export const site = {
  name: "Kiah Aviyu",
  hebrew: "קיה אביעו",
  domain: "https://kiahaviyu.com",
  amazon: "https://www.amazon.com/s?k=kiah+aviyu",
  contactDestinations: {
    siteForm: "/contact",
    publicProject: "https://luminaNexus.org",
  },
  brandAssets: {
    logo: "/brand/kiah-aviyu-logo.jpg",
    titlePageSigil: "/brand/title-page.jpg",
  },
};

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
  ["Contact", site.contactDestinations.siteForm],
] as const;

export const findSeries = (slug: string) => series.find((s) => s.slug === slug);
