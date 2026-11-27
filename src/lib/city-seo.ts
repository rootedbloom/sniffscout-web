// Page titles, descriptions and structured data for city pages, worded exactly
// like the Softr city pages set them. Runs on the server so search engines see it.
import "server-only";
import { getCities, getIndexedPlaces, label, type Place } from "@/lib/places";

const TYPE_PLURAL: Record<string, string> = { Restaurant: "restaurants", Brewery: "breweries", "Coffee Shop": "coffee shops", Bar: "bars", "Wine Bar": "wine bars", Winery: "wineries" };
const types = (v: any) => label(v).split(",").map((x) => x.trim()).filter(Boolean);
const typePlural = (t: string) => TYPE_PLURAL[t] || t.toLowerCase() + "s";
const listJoin = (a: string[]) => (a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);

export const CITY_INDEX = "/dog-friendly-places";

// Only the fields the city section reads are sent to the browser.
export const CITY_FIELDS = [
  "Business Name", "Business Type", "City", "State", "Main Photo", "Additional Photos", "Short Description",
  "Dog-Friendly Area", "Listing Status", "Claimed by Business", "Claim Status", "Information Confidence",
  "Water Bowls Available", "Dog Treats Available", "Pup Cups Available", "Dog Menu Available", "Outdoor Area Coverage",
  "Featured Listing", "Featured Start Date", "Featured End Date", "Market / Metro Area", "Promotion Title",
  "Promotion Details", "Promotion Start", "Promotion End", "Promotion Approved", "Outdoor Seating", "Dog Access",
  "Outdoor Area Heating", "Verification Method", "Business-Confirmed Perks",
];
export function slimRecords(places: Place[]) {
  return places.map((p) => ({ id: p.id, fields: Object.fromEntries(CITY_FIELDS.filter((f) => p.fields[f] !== undefined).map((f) => [f, p.fields[f]])) }));
}

export async function cityPageData(slug: string) {
  const [places, cities] = await Promise.all([getIndexedPlaces(), getCities()]);
  const base = process.env.SITE_URL || "https://getsniffscout.com";
  if (!slug) {
    return {
      places, cities,
      title: "Dog-Friendly Places by City | SniffScout",
      description: "Find dog-friendly restaurants, breweries, bars and coffee shops by city. Browse " + places.length + " places across " + cities.length + " cities on SniffScout.",
      canonical: CITY_INDEX,
      ld: { "@context": "https://schema.org", "@type": "ItemList", name: "Dog-friendly places by city", itemListElement: cities.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.city + ", " + c.state, url: base + c.path })) },
    };
  }
  const city = cities.find((c) => c.slug === slug);
  if (!city) return null;
  const items = places.filter((p) => p.cityPath === city.path);
  const counts: Record<string, number> = {};
  items.forEach((p) => types(p.fields["Business Type"]).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => typePlural(t));
  const place = city.city + ", " + city.state;
  const n = items.length;
  const url = base + city.path;
  return {
    places, cities, city,
    title: "Dog-Friendly Places in " + place + " (" + n + ") | SniffScout",
    description: (n + " dog-friendly " + (top.length ? listJoin(top) : "spots") + " in " + place + ". See patios, water bowls, pup cups and dog policies before you go. Local picks from SniffScout.").slice(0, 300),
    canonical: city.path,
    ld: { "@context": "https://schema.org", "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base + "/" },
        { "@type": "ListItem", position: 2, name: "Dog-Friendly Places", item: base + CITY_INDEX },
        { "@type": "ListItem", position: 3, name: place, item: url }] },
      { "@type": "ItemList", name: "Dog-friendly places in " + place, numberOfItems: n, itemListElement: items.slice(0, 100).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: String(p.fields["Business Name"] || ""), url: base + "/place/" + p.slug })) }] },
  };
}
