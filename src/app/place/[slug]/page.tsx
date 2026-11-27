import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/blocks/header";
import PlaceDetails from "@/blocks/place-details";
import { BlockRecord } from "@/lib/datasource";
import { getIndexedPlaces, label } from "@/lib/places";
import { firstPhoto, perks, schemaType, types } from "@/lib/place-view";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getIndexedPlaces()).map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
  const all = await getIndexedPlaces();
  const p = all.find((x) => x.slug === slug);
  if (!p) return null;
  return { p };
}

// Same title and description wording the Softr listing page used.
function seo(p: any) {
  const f = p.fields;
  const nm = String(f["Business Name"] || "");
  const ty = types(f).join(", ");
  const place = [p.city, p.state].filter(Boolean).join(", ");
  const known = label(f["Claim Status"]) === "Claimed & Approved" || label(f["Information Confidence"]) === "Publicly Researched";
  const pk: string[] = [];
  if (known) {
    if (label(f["Water Bowls Available"]) === "Yes") pk.push("water bowls");
    if (label(f["Pup Cups Available"]) === "Yes") pk.push("pup cups");
    if (label(f["Dog Treats Available"]) === "Yes") pk.push("dog treats");
    if (label(f["Dog Menu Available"]) === "Yes") pk.push("a dog menu");
    const h = label(f["Outdoor Area Heating"]);
    if (h === "Yes") pk.push("outdoor heaters"); else if (h === "Seasonal") pk.push("seasonal outdoor heaters");
  }
  const title = nm + " | Dog-Friendly " + (ty || "Spot") + (place ? " in " + place : "") + " | SniffScout";
  const desc = (String(f["Short Description"] || "") || (nm + " is a dog-friendly " + (ty || "spot").toLowerCase() + (place ? " in " + place : "") + ".")) + (pk.length ? " Pup perks: " + pk.join(", ") + "." : "");
  return { title, desc };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = await load(slug);
  if (!d) return {};
  const { p } = d;
  const { title, desc } = seo(p);
  const photo = firstPhoto(p.fields);
  return {
    title: { absolute: title },
    description: desc.slice(0, 300),
    alternates: { canonical: `/place/${p.slug}` },
    openGraph: { title, description: desc, ...(photo ? { images: [photo] } : {}) },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await load(slug);
  if (!d) notFound();
  const { p } = d;
  const f = p.fields;
  const name = String(f["Business Name"]);
  const photo = firstPhoto(f);
  const list = perks(f);
  const base = process.env.SITE_URL || "https://getsniffscout.com";
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
        <BlockRecord record={{ id: p.id, fields: p.fields }}>
          <PlaceDetails />
        </BlockRecord>
      </main>
    </>
  );
}
