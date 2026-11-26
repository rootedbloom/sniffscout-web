import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, Crown, Globe, Info, MapPin, PawPrint, Phone, Tag } from "lucide-react";
import Header from "@/blocks/header";
import Footer from "@/blocks/footer";
import PlaceCard from "@/components/place-card";
import { getIndexedPlaces, label } from "@/lib/places";
import { activePromo, address, firstPhoto, goodToKnow, isApproved, isTopDog, perks, schemaType, STATE_NAMES, types } from "@/lib/place-view";
import "../../listing.css";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getIndexedPlaces()).map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
  const all = await getIndexedPlaces();
  const p = all.find((x) => x.slug === slug);
  if (!p) return null;
  const more = all.filter((x) => x.cityPath === p.cityPath && x.id !== p.id).slice(0, 3);
  return { p, more };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = await load(slug);
  if (!d) return {};
  const { p } = d;
  const f = p.fields;
  const desc = String(f["Short Description"] || `Dog-friendly ${types(f).join(" and ").toLowerCase() || "spot"} in ${p.city}, ${p.state}.`);
  const photo = firstPhoto(f);
  return {
    title: `${f["Business Name"]} in ${p.city}, ${p.state} | Dog-Friendly | SniffScout`,
    description: desc.slice(0, 160),
    alternates: { canonical: `/place/${p.slug}` },
    openGraph: { title: `${f["Business Name"]} | Dog-Friendly in ${p.city}, ${p.state}`, description: desc, ...(photo ? { images: [photo] } : {}) },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await load(slug);
  if (!d) notFound();
  const { p, more } = d;
  const f = p.fields;
  const name = String(f["Business Name"]);
  const photo = firstPhoto(f);
  const list = perks(f);
  const gtk = goodToKnow(f);
  const promo = activePromo(f);
  const verified = isApproved(f);
  const topDog = isTopDog(f);
  const base = process.env.SITE_URL || "https://getsniffscout.com";
  const maps = String(f["Google Maps URL"] || "");
  const phone = String(f["Phone Number"] || "");
  const site = String(f["Website"] || "");

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": schemaType(f),
    name,
    url: `${base}/place/${p.slug}`,
    address: { "@type": "PostalAddress", streetAddress: f["Street Address"] || undefined, addressLocality: p.city, addressRegion: p.state, postalCode: f["ZIP Code"] || undefined, addressCountry: "US" },
    ...(f["Latitude"] && f["Longitude"] ? { geo: { "@type": "GeoCoordinates", latitude: f["Latitude"], longitude: f["Longitude"] } } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(site ? { sameAs: [site, f["Facebook URL"], f["Instagram URL"]].filter(Boolean) } : {}),
    ...(photo ? { image: photo } : {}),
    ...(f["Short Description"] ? { description: f["Short Description"] } : {}),
    ...(list.length ? { amenityFeature: list.map((x) => ({ "@type": "LocationFeatureSpecification", name: x, value: true })) } : {}),
    ...(label(f["Dog Access"]) === "Dogs Allowed Inside" || label(f["Outdoor Seating"]) === "Patio / Outdoor Area" ? { petsAllowed: true } : {}),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: `${p.city}, ${p.state}`, item: `${base}${p.cityPath}` },
      { "@type": "ListItem", position: 3, name, item: `${base}/place/${p.slug}` },
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
          <div className="lp-wrap">
            <nav className="lp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href={p.cityPath}>{p.city}, {p.state}</a><span>›</span><span>{name}</span></nav>
            <h1 className="lp-h1">{name}</h1>
            <p className="lp-intro">{[types(f).join(" · "), `${p.city}, ${STATE_NAMES[p.state] || p.state}`].filter(Boolean).join(" in ")}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {topDog ? <span className="lp-td" style={{ position: "static" }}><Crown size={14} strokeWidth={2.6} aria-hidden="true" /> Top Dog Partner</span>
                : verified ? <span className="pp-verified"><BadgeCheck size={15} strokeWidth={2.6} aria-hidden="true" /> SniffScout Verified</span> : null}
            </div>
          </div>
        </section>

        <div className="pp">
          <div style={{ display: "grid", gap: 18 }}>
            <div className="pp-photo">
              {photo ? <img src={photo} alt={`${name}, a dog-friendly spot in ${p.city}, ${p.state}`} /> : <span className="lp-img" style={{ background: "none" }}><span className="lp-ph"><PawPrint size={26} color="#fff" strokeWidth={2.4} aria-hidden="true" /></span></span>}
            </div>
            {f["Short Description"] && <div className="pp-box"><h2>About</h2><p>{f["Short Description"]}</p></div>}
            {f["Dog-Friendly Notes"] && <div className="pp-box"><h2><PawPrint size={19} color="#FF5A0A" strokeWidth={2.5} aria-hidden="true" /> Dog-friendly notes</h2><p>{f["Dog-Friendly Notes"]}</p></div>}
            {promo && (
              <div className="pp-box pp-promo"><h2><Tag size={18} aria-hidden="true" /> {promo.title}</h2>{promo.details && <p>{promo.details}</p>}</div>
            )}
          </div>

          <aside style={{ display: "grid", gap: 18 }}>
            {list.length > 0 && (
              <div className="pp-box">
                <h2><PawPrint size={19} color="#FF5A0A" strokeWidth={2.5} aria-hidden="true" /> {verified ? "The Pup Perks!" : "Pup Perks"}</h2>
                <ul className="pp-list">{list.map((x) => <li key={x}><Check size={18} color="#FF5A0A" strokeWidth={3} aria-hidden="true" />{x}</li>)}</ul>
              </div>
            )}
            {gtk.length > 0 && (
              <div className="pp-box">
                <h2><Info size={18} color="#00163D" strokeWidth={2.6} aria-hidden="true" /> Good to Know Before You Go</h2>
                <ul className="pp-list">{gtk.map((x) => <li key={x}><span aria-hidden="true" style={{ color: "#FF5A0A" }}>•</span>{x}</li>)}</ul>
              </div>
            )}
            <div className="pp-box">
              <h2><MapPin size={18} color="#00163D" strokeWidth={2.6} aria-hidden="true" /> Visit</h2>
              <p style={{ marginBottom: 12 }}>{address(p)}</p>
              <div className="pp-actions">
                {maps.startsWith("https://") && <a className="pp-act or" href={maps} target="_blank" rel="noopener noreferrer">Get Directions <ArrowRight size={17} strokeWidth={2.8} aria-hidden="true" /></a>}
                {site.startsWith("http") && <a className="pp-act nv" href={site} target="_blank" rel="noopener noreferrer"><Globe size={17} aria-hidden="true" /> Visit Website</a>}
                {phone && <a className="pp-act ol" href={`tel:${phone.replace(/[^\d+]/g, "")}`}><Phone size={17} aria-hidden="true" /> {phone}</a>}
              </div>
            </div>
            {!verified && (
              <div className="pp-box">
                <h2>Own {name}?</h2>
                <p style={{ marginBottom: 12 }}>Claim your free listing to confirm your dog-friendly details and add photos.</p>
                <a className="pp-act or" href="/claim-your-business">Claim Your Listing <ArrowRight size={17} strokeWidth={2.8} aria-hidden="true" /></a>
              </div>
            )}
          </aside>
        </div>

        {more.length > 0 && (
          <div className="lp-body" style={{ paddingTop: 0 }}>
            <h2 className="lp-h2">More dog-friendly spots in {p.city}</h2>
            <div className="lp-grid">{more.map((m) => <PlaceCard key={m.id} p={m} />)}</div>
            <p style={{ marginTop: 16 }}><a href={p.cityPath} style={{ color: "#FF5A0A", fontWeight: 800 }}>See all dog-friendly places in {p.city}, {p.state} →</a></p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
