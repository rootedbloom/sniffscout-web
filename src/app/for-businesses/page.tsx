import type { Metadata } from "next";
import Header from "@/blocks/header";
import ForBusinesses from "@/blocks/for-businesses";
import settings from "@/blocks/for-businesses.settings.json";
import { BlockSettings } from "@/lib/editable-settings";
import { BlockRecords } from "@/lib/datasource";
import { getIndexedPlaces } from "@/lib/places";

export const revalidate = 3600;

// Same title and description as the Softr For Businesses page.
const title = "For Dog-Friendly Businesses | SniffScout NKY & Cincinnati";
const description = "Get your dog-friendly business in front of local dog lovers in Northern Kentucky and Cincinnati. Free listings or Top Dog Partner for $47/mo. No contracts.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/for-businesses" },
  openGraph: { title, description, url: "/for-businesses" },
};

// The "See Your Business as a Top Dog" search only needs these fields.
const FIELDS = ["Business Name", "City", "State", "Business Type", "Short Description", "Main Photo", "Dog-Friendly Area", "Water Bowls Available", "Dog Treats Available", "Pup Cups Available", "Dog Menu Available", "Listing Status", "Claimed by Business"];

export default async function ForBusinessesPage() {
  const places = await getIndexedPlaces();
  const records = places.map(({ id, fields }) => ({ id, fields: Object.fromEntries(FIELDS.filter((k) => k in fields).map((k) => [k, fields[k]])) }));
  return (
    <>
      <Header />
      <main>
        <BlockSettings values={settings}>
          <BlockRecords records={records}><ForBusinesses /></BlockRecords>
        </BlockSettings>
      </main>
    </>
  );
}
