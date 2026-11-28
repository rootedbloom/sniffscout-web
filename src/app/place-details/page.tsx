import { permanentRedirect } from "next/navigation";
import { getIndexedPlaces } from "@/lib/places";

// Old Softr listing links (/place-details?recordId=rec...) move to /place/<slug>.
// "Share a photo" and "See pup photos" links keep their ?share=1 / ?photos=1.
// A listing that is no longer published sends visitors to the Directory instead of an error page.
export default async function LegacyPlace({ searchParams }: { searchParams: Promise<{ recordId?: string; share?: string; photos?: string }> }) {
  const { recordId, share, photos } = await searchParams;
  const p = recordId ? (await getIndexedPlaces()).find((x) => x.id === recordId) : null;
  if (!p) permanentRedirect("/directory");
  const q = share ? "?share=1" : photos ? "?photos=1" : "";
  permanentRedirect(`/place/${p.slug}${q}`);
}
