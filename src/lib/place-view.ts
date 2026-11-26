// Turns an Airtable listing into what the public pages show, following
// SniffScout's accuracy rules: unknown never counts as yes or no, and dog
// details only show for researched or business-confirmed listings.
import { label, type Place } from "./places";

export const isApproved = (f: any) => label(f["Claim Status"]) === "Claimed & Approved";
export const isKnown = (f: any) => isApproved(f) || label(f["Information Confidence"]) === "Publicly Researched";

export function isTopDog(f: any) {
  if (!f["Featured Listing"]) return false;
  const now = Date.now();
  const s = f["Featured Start Date"] ? Date.parse(label(f["Featured Start Date"])) : NaN;
  const e = f["Featured End Date"] ? Date.parse(label(f["Featured End Date"])) : NaN;
  if (!isNaN(s) && s > now) return false;
  if (!isNaN(e) && e < now) return false;
  return true;
}

export const types = (f: any): string[] => (Array.isArray(f["Business Type"]) ? f["Business Type"] : []).map(label).filter(Boolean);

export function perks(f: any): string[] {
  if (!isKnown(f)) return [];
  const out: string[] = [];
  if (label(f["Outdoor Seating"]) === "Patio / Outdoor Area") {
    const cov = label(f["Outdoor Area Coverage"]);
    out.push(cov === "Fully Covered" ? "Covered patio" : cov === "Partially Covered" ? "Partially covered patio" : cov === "Covered" ? "Covered patio" : "Patio / outdoor area");
  }
  if (label(f["Dog Access"]) === "Dogs Allowed Inside") out.push("Dogs allowed inside");
  if (label(f["Water Bowls Available"]) === "Yes") out.push("Water bowls");
  if (label(f["Pup Cups Available"]) === "Yes") out.push("Pup cups");
  if (label(f["Dog Treats Available"]) === "Yes") out.push("Dog treats");
  if (label(f["Dog Menu Available"]) === "Yes") out.push("Dog menu");
  if (["Yes", "Seasonal"].includes(label(f["Outdoor Area Heating"]))) out.push("Outdoor heaters");
  return out;
}

// "Good to Know Before You Go": only known access details and restrictions.
export function goodToKnow(f: any): string[] {
  if (!isKnown(f)) return [];
  const out: string[] = [];
  const access = label(f["Dog Access"]);
  const seat = label(f["Outdoor Seating"]);
  if (access === "Dogs Allowed Inside") out.push("Dogs are welcome inside.");
  if (access === "Dogs Outside Only") out.push("Dogs are welcome in the outdoor area only.");
  if (seat === "Patio / Outdoor Area" && access === "Access Not Yet Verified") out.push("Indoor access not yet confirmed.");
  if (seat === "No Dog-Friendly Outdoor Area") out.push("No dog-friendly outdoor area.");
  const notes = String(f["Dog Access Notes"] || "").trim();
  if (notes) out.push(notes);
  return out;
}

export function firstPhoto(f: any): string | null {
  const ph = Array.isArray(f["Main Photo"]) ? f["Main Photo"][0] : null;
  return ph ? ph.thumbnails?.large?.url || ph.url : null;
}

export function address(p: Place) {
  const f = p.fields;
  return [f["Street Address"], [p.city, [p.state, f["ZIP Code"]].filter(Boolean).join(" ")].filter(Boolean).join(", ")].filter(Boolean).join(", ");
}

export function activePromo(f: any) {
  if (!isTopDog(f) || !f["Promotion Approved"] || !f["Promotion Title"]) return null;
  const now = Date.now();
  if (f["Promotion Start"] && Date.parse(f["Promotion Start"]) > now) return null;
  if (f["Promotion End"] && Date.parse(f["Promotion End"]) + 86400000 < now) return null;
  return { title: String(f["Promotion Title"]), details: String(f["Promotion Details"] || ""), link: f["Promotion Link"] || null };
}

// schema.org type for Google, matched to the business type.
export function schemaType(f: any) {
  const t = types(f);
  if (t.includes("Brewery")) return "Brewery";
  if (t.includes("Coffee Shop")) return "CafeOrCoffeeShop";
  if (t.includes("Winery")) return "Winery";
  if (t.includes("Bar") && !t.includes("Restaurant")) return "BarOrPub";
  if (t.includes("Restaurant")) return "Restaurant";
  return "LocalBusiness";
}

export const STATE_NAMES: Record<string, string> = { KY: "Kentucky", OH: "Ohio", IN: "Indiana" };
