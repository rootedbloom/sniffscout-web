import "server-only";
// Which website forms may write to Airtable, and exactly which fields each may fill.
// The field lists match the Softr forms, so every existing Airtable automation
// (alert emails, GoHighLevel contacts, geocoding) runs the same way as today.
// "fixed" values are always set by the server, whatever the browser sends, so
// nobody can, for example, submit a place that is already marked Verified.

export const BASE_ID = "appftyqdAtj9V64e4";

export type FormDef = {
  table: string; // Airtable table ID
  fields: Record<string, string>; // form field name -> Airtable field name
  required: string[];
  fixed: Record<string, any>;
  attachments?: string[]; // form fields that hold uploaded photos
  links?: string[]; // form fields that link to a Places record
};

export const FORMS: Record<string, FormDef> = {
  // Submit a Place
  places: {
    table: "tblPVBIPqTbLvPbqe",
    fields: { business: "Business Name", category: "Business Type", address: "Street Address", city: "City", state: "State", zip: "ZIP Code", website: "Website", phone: "Phone Number", areas: "Dog-Friendly Area", notes: "Dog-Friendly Notes", water: "Water Bowls Available", treats: "Dog Treats Available", menu: "Dog Menu Available", cups: "Pup Cups Available", cover: "Outdoor Area Coverage", heat: "Outdoor Area Heating", cool: "Outdoor Area Cooling", seating: "Outdoor Seating", access: "Dog Access", accessNote: "Dog Access Notes", submitter: "Submitted By Name", email: "Submitter Email", relationship: "Submitter Relationship", lastVisit: "Submitter Last Visit", sid: "Submission ID", photos: "Additional Photos", permission: "Photo Usage Permission", pack: "Submitter Join the Pack" },
    required: ["business", "category", "city", "state", "email"],
    fixed: { "Listing Status": "Pending Review", "Claim Status": "Unclaimed", "Information Confidence": "Needs Research", "Submission Source": "User Suggestion" },
    attachments: ["photos"],
  },
  // Claim Your Business
  claims: {
    table: "tbl4N0t8NsS9mfbI2",
    fields: { name: "Claimant Name", business: "Business", email: "Claimant Email", phone: "Claimant Phone", role: "Claimant Role", details: "Claim Verification Details", photos: "Claim Photos", permission: "Claim Photo Permission", sid: "Submission ID", seat: "Outdoor Seating", access: "Dog Access", accessNote: "Dog Access Notes", pkWater: "Water Bowls", pkTreats: "Dog Treats", pkCups: "Pup Cups", pkMenu: "Dog Menu", pkHeat: "Outdoor Heaters", newsOpt: "Partner News Opt-In" },
    required: ["name", "email", "role"],
    fixed: { "Claim Status": "Pending Review", "Authorized to Manage": true },
    attachments: ["photos"],
    links: ["business"],
  },
  // Photo and listing-update forms on each place page
  photo_submissions: {
    table: "tbl7ITWh2H3jil8So",
    fields: { request: "Update Request", business: "Business", submitter: "Submitter Name", email: "Submitter Email", photos: "Update Photos", permission: "Photo Usage Permission", notes: "Requested Changes", dog: "Dog's Name", role: "Submitter Role", type: "Update Type", pack: "Join the Pack" },
    required: ["request", "business"],
    fixed: { "Update Status": "Pending Review" },
    attachments: ["photos"],
    links: ["business"],
  },
};

// Email List (Join the Pack in the footer)
export const PACK_TABLE = "tbloII7d5L5N0N0KS";

// Photos may only come from this site's own upload storage.
export const isOurUpload = (u: unknown) => {
  try { const h = new URL(String(u)).hostname; return h.endsWith(".public.blob.vercel-storage.com"); } catch { return false; }
};

// Real sending is switched on only when the site goes live (or for an approved test).
export const formsLive = () => process.env.NEXT_PUBLIC_FORMS_LIVE === "true" || process.env.FORMS_LIVE === "true";
export const PREVIEW_MSG = "This is a preview of the new SniffScout site, so forms aren't sent yet.";

export async function airtableCreate(table: string, fields: Record<string, any>) {
  const token = process.env.AIRTABLE_WRITE_TOKEN;
  if (!token) throw new Error("Saving isn't set up yet. Please try again later.");
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${table}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }] }),
    cache: "no-store",
  });
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Airtable create failed", table, res.status, JSON.stringify(json?.error ?? json).slice(0, 500));
    throw new Error("We couldn't save that just now. Please try again.");
  }
  return json.records?.[0]?.id as string;
}
