import type { Metadata } from "next";
import "./globals.css";
import { site } from "../lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Kiah Aviyu — Living Library",
    template: "%s | Kiah Aviyu",
  },
  description:
    "The author home and Living Library of Kiah Aviyu — books, gates, trees, light, and connected literary worlds.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title: "Kiah Aviyu — Welcome to the Gate",
    description: "Books, gates, trees, light, and connected literary worlds.",
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
    title: "Kiah Aviyu — Welcome to the Gate",
    description: "Author · Mystical Science · Living Library",
    images: ["/brand/living-gate-hero.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
