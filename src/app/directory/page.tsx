import type { Metadata } from "next";
import Header from "@/blocks/header";
import DirectoryCta from "@/blocks/directory-cta";
import Footer from "@/blocks/footer";
import DirectorySection from "@/components/directory-section";
import { getIndexedPlaces } from "@/lib/places";

export const revalidate = 3600;

// Same title and description as the Softr Directory page.
const title = "Dog-Friendly Directory: Restaurants, Breweries & Coffee Shops | SniffScout";
const description = "Browse dog-friendly restaurants, bars, breweries and coffee shops in Northern Kentucky and Cincinnati. Filter by patios, water bowls, pup cups and more.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/directory" },
  openGraph: { title, description, url: "/directory" },
};

// Hidden from view, read by search engines and screen readers (the live page has no main heading).
const srOnly = { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 } as const;

export default async function Directory() {
  const places = await getIndexedPlaces();
  const records = places.map(({ id, fields }) => ({ id, fields }));
  const links = Object.fromEntries(places.map((p) => [p.id, p.slug]));
  return (
    <>
      <Header />
      <main>
        <h1 style={srOnly}>Dog-Friendly Directory for Northern Kentucky and Cincinnati</h1>
        <DirectorySection records={records} links={links} />
        <DirectoryCta />
      </main>
      <Footer gap classic />
    </>
  );
}
