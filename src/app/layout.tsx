import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://getsniffscout.com"),
  title: "SniffScout | Dog-Friendly Places in NKY and Cincinnati",
  description: "Find dog-friendly restaurants, bars, breweries and coffee shops in Northern Kentucky and Cincinnati. Verified listings, pup perks and local picks.",
  // Hidden from search engines until launch. Set ALLOW_INDEXING=true when the real domain points here.
  robots: process.env.ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
