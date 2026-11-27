import type { Metadata } from "next";
import Header from "@/blocks/header";
import ClaimBusiness from "@/blocks/claim-business";
import { BlockRecords } from "@/lib/datasource";
import { getIndexedPlaces } from "@/lib/places";

export const revalidate = 3600;

// Same title and description as the Softr Claim Your Business page.
const title = "Claim Your Business | SniffScout";
const description = "Own a dog-friendly business in Northern Kentucky or Cincinnati? Claim your free SniffScout listing and tell local dog owners what to expect before they visit.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/claim-your-business" },
  openGraph: { title, description, url: "/claim-your-business" },
};

// The business search only needs these fields.
const FIELDS = ["Business Name", "Street Address", "City", "State", "ZIP Code", "Website", "Phone Number", "Business Type", "Dog-Friendly Area", "Water Bowls Available", "Dog Treats Available", "Dog Menu Available", "Pup Cups Available", "Outdoor Area Coverage", "Outdoor Area Heating", "Outdoor Area Cooling", "Claimed by Business"];

export default async function ClaimBusinessPage() {
  const places = await getIndexedPlaces();
  const records = places.map(({ id, fields }) => ({ id, fields: Object.fromEntries(FIELDS.filter((k) => k in fields).map((k) => [k, fields[k]])) }));
  return (
    <>
      <Header />
      <main><BlockRecords records={records}><ClaimBusiness /></BlockRecords></main>
    </>
  );
}
