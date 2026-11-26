import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PawPrint } from "lucide-react";
import Header from "@/blocks/header";
import Footer from "@/blocks/footer";
import PlaceCard from "@/components/place-card";
import { getCities, getIndexedPlaces } from "@/lib/places";
import { isTopDog, STATE_NAMES } from "@/lib/place-view";
import "../../listing.css";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCities()).map((c) => {
    const [, state, city] = c.path.split("/");
    return { state, city };
  });
}

async function load(state: string, city: string) {
  const path = `/${state}/${city}`;
  const cities = await getCities();
  const info = cities.find((c) => c.path === path);
  if (!info) return null;
  const places = (await getIndexedPlaces()).filter((p) => p.cityPath === path);
  // Top Dog Partners first, then alphabetical.
  places.sort((a, b) => Number(isTopDog(b.fields)) - Number(isTopDog(a.fields)) || String(a.fields["Business Name"]).localeCompare(String(b.fields["Business Name"])));
  const nearby = cities.filter((c) => c.state === info.state && c.path !== path).sort((a, b) => b.count - a.count).slice(0, 12);
  return { info, places, nearby };
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params;
  const d = await load(state, city);
  if (!d) return {};
  const { info } = d;
  return {
    title: `Dog-Friendly Places in ${info.city}, ${info.state} | SniffScout`,
    description: `Find ${info.count} dog-friendly restaurants, bars, breweries and coffee shops in ${info.city}, ${info.state}, with patio details and pup perks like water bowls and pup cups.`,
    alternates: { canonical: info.path },
  };
}

export default async function CityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const d = await load(state, city);
  if (!d) notFound();
  const { info, places, nearby } = d;
  const base = process.env.SITE_URL || "https://getsniffscout.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Dog-Friendly Places in ${info.city}, ${info.state}`,
    numberOfItems: places.length,
    itemListElement: places.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${base}/place/${p.slug}`, name: p.fields["Business Name"] })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Dog-Friendly Places", item: `${base}/dog-friendly-places` },
      { "@type": "ListItem", position: 3, name: `${info.city}, ${info.state}`, item: `${base}${info.path}` },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
        <section className="lp-hero">
          <PawPrint className="lp-paw" size={30} fill="currentColor" style={{ right: "6%", top: 22, transform: "rotate(16deg)" }} aria-hidden="true" />
          <PawPrint className="lp-paw" size={22} fill="currentColor" style={{ left: "4%", bottom: 54, transform: "rotate(-18deg)" }} aria-hidden="true" />
          <div className="lp-wrap">
            <nav className="lp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/dog-friendly-places">Dog-Friendly Places</a><span>›</span><span>{info.city}, {info.state}</span></nav>
            <h1 className="lp-h1"><em>Dog-Friendly</em> Places in {info.city}, {info.state}</h1>
            <p className="lp-intro">
              {info.count === 1 ? "1 dog-friendly spot" : `${info.count} dog-friendly spots`} in {info.city}, {STATE_NAMES[info.state] || info.state}, from patios and breweries to coffee shops. Check the pup perks before you head out.
            </p>
          </div>
        </section>
        <div className="lp-body">
          <div className="lp-grid">{places.map((p) => <PlaceCard key={p.id} p={p} />)}</div>
          {nearby.length > 0 && (
            <section className="lp-section">
              <h2 className="lp-h2">More dog-friendly cities in {STATE_NAMES[info.state] || info.state}</h2>
              <div className="lp-cities">{nearby.map((c) => <a key={c.path} href={c.path} className="lp-city">{c.city} <span>{c.count}</span></a>)}</div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
