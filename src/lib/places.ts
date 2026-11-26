// Server-side data access for SniffScout listings.
// Reads the Airtable "Places" table (read-only). With no AIRTABLE_TOKEN set,
// it falls back to a local snapshot so the site can be previewed offline.
import "server-only";
import fs from "node:fs";
import path from "node:path";

export type PlaceRecord = { id: string; fields: Record<string, any> };

const BASE_ID = "appftyqdAtj9V64e4";
const TABLE_ID = "tblPVBIPqTbLvPbqe";
const PUBLIC_STATUSES = ["Verified", "Needs Verification"];

// Only public fields are ever requested. Private fields (internal notes,
// contact details, Stripe IDs, submitter info) are never read by the site.
export const PUBLIC_FIELDS = [
  "Business Name", "Business Type", "Street Address", "City", "State", "ZIP Code",
  "Market / Metro Area", "Latitude", "Longitude", "Phone Number", "Website", "Google Maps URL",
  "Facebook URL", "Instagram URL", "Dog-Friendly Area", "Dog-Friendly Notes",
  "Water Bowls Available", "Dog Treats Available", "Dog Menu Available", "Pup Cups Available",
  "Short Description", "Outdoor Area Coverage", "Outdoor Area Heating", "Main Photo",
  "Additional Photos", "Listing Status", "Featured Listing", "Featured Start Date",
  "Featured End Date", "Outdoor Seating", "Dog Access", "Dog Access Notes", "Claim Status",
  "Information Confidence", "Verification Method", "Business-Confirmed Perks",
  "Promotion Title", "Promotion Details", "Promotion Start", "Promotion End",
  "Promotion Approved", "Promotion Link", "Last Verified Date", "Claimed by Business",
];

async function fetchFromAirtable(token: string): Promise<PlaceRecord[]> {
  const out: PlaceRecord[] = [];
  let offset: string | undefined;
  const formula = `OR(${PUBLIC_STATUSES.map((s) => `{Listing Status}='${s}'`).join(",")})`;
  do {
    const params = new URLSearchParams({ pageSize: "100", filterByFormula: formula });
    PUBLIC_FIELDS.forEach((f) => params.append("fields[]", f));
    if (offset) params.set("offset", offset);
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      // Pages are cached and refreshed at most once an hour, which keeps
      // Airtable API usage low no matter how much traffic the site gets.
      next: { revalidate: 3600, tags: ["places"] },
    });
    if (!res.ok) throw new Error(`Airtable ${res.status}`);
    const json = await res.json();
    out.push(...json.records.map((r: any) => ({ id: r.id, fields: r.fields })));
    offset = json.offset;
  } while (offset);
  return out;
}

const label = (v: any): string =>
  Array.isArray(v) ? v.map(label).filter(Boolean).join(", ")
  : v && typeof v === "object" ? String(v.name ?? v.label ?? v.value ?? "")
  : String(v ?? "");

// Local preview only: data/places.snapshot.json (not stored in GitHub).
function readSnapshot(): PlaceRecord[] {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "places.snapshot.json"), "utf8")); } catch { return []; }
}

let memo: Promise<PlaceRecord[]> | null = null;
export function getPlaces(): Promise<PlaceRecord[]> {
  if (!memo) {
    const token = process.env.AIRTABLE_TOKEN;
    memo = (token ? fetchFromAirtable(token) : Promise.resolve(readSnapshot()))
      .then((rows) => rows.filter((r) => PUBLIC_STATUSES.includes(label(r.fields["Listing Status"]))));
  }
  return memo;
}

// ---------- URL helpers ----------
export const slugify = (s: string) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/['’]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const citySlug = (city: string) => slugify(city);
export const stateSlug = (st: string) => slugify(st);

// Place slug = business name + city, without repeating the city when the
// name already ends with it ("Braxton Brewing Company - Union" -> braxton-brewing-company-union).
function baseSlug(f: Record<string, any>) {
  const name = slugify(String(f["Business Name"] || "place"));
  const city = slugify(String(f["City"] || ""));
  if (!city || name === city || name.endsWith("-" + city)) return name;
  return `${name}-${city}`;
}

export type Place = PlaceRecord & { slug: string; city: string; state: string; cityPath: string };

let indexed: Promise<Place[]> | null = null;
export function getIndexedPlaces(): Promise<Place[]> {
  if (!indexed) {
    indexed = getPlaces().then((rows) => {
      const seen = new Map<string, number>();
      // Oldest record keeps the clean slug; later duplicates get -2, -3 ...
      return [...rows].sort((a, b) => a.id.localeCompare(b.id)).map((r) => {
        let slug = baseSlug(r.fields);
        const n = (seen.get(slug) || 0) + 1;
        seen.set(slug, n);
        if (n > 1) slug = `${slug}-${n}`;
        const city = String(r.fields["City"] || "").trim();
        const state = String(r.fields["State"] || "").trim().toUpperCase();
        return { ...r, slug, city, state, cityPath: `/${stateSlug(state)}/${citySlug(city)}` };
      });
    });
  }
  return indexed;
}

export type CityInfo = { city: string; state: string; path: string; count: number };
export async function getCities(): Promise<CityInfo[]> {
  const places = await getIndexedPlaces();
  const m = new Map<string, CityInfo>();
  for (const p of places) {
    if (!p.city || !p.state) continue;
    const c = m.get(p.cityPath) || { city: p.city, state: p.state, path: p.cityPath, count: 0 };
    c.count++;
    m.set(p.cityPath, c);
  }
  return [...m.values()].sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city));
}

export { label };
