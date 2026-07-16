import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiah Aviyu — Author",
  description: "Spiritual writing on wisdom, adversity, and the sacred work of becoming. Discover the books of Kiah Aviyu.",
  metadataBase: new URL("https://kiahaviyu.com"),
  openGraph: {
    title: "Kiah Aviyu — Words for the inner ascent",
    description: "Books about wisdom, adversity, and the sacred work of becoming.",
    url: "https://kiahaviyu.com",
    siteName: "Kiah Aviyu",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kiah Aviyu — Author", description: "Words for the inner ascent." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
