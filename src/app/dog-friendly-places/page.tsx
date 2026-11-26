import type { Metadata } from "next";
import Header from "@/blocks/header";
import Footer from "@/blocks/footer";
import { getCities } from "@/lib/places";
import { STATE_NAMES } from "@/lib/place-view";
import "../listing.css";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Dog-Friendly Places by City | SniffScout",
  description: "Browse dog-friendly restaurants, bars, breweries and coffee shops by city.",
  alternates: { canonical: "/dog-friendly-places" },
};

export default async function Cities() {
  const cities = await getCities();
  const states = [...new Set(cities.map((c) => c.state))];
  return (
    <>
      <Header />
      <main>
        <section className="lp-hero">
          <div className="lp-wrap">
            <nav className="lp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Dog-Friendly Places</span></nav>
            <h1 className="lp-h1"><em>Dog-Friendly</em> Places by City</h1>
            <p className="lp-intro">{cities.reduce((n, c) => n + c.count, 0)} dog-friendly spots across {cities.length} cities. Pick a city to see where your pup is welcome.</p>
          </div>
        </section>
        <div className="lp-body">
          {states.map((st) => (
            <section key={st} className="lp-section">
              <h2 className="lp-h2">{STATE_NAMES[st] || st}</h2>
              <div className="lp-cities">{cities.filter((c) => c.state === st).map((c) => <a key={c.path} href={c.path} className="lp-city">{c.city} <span>{c.count}</span></a>)}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
