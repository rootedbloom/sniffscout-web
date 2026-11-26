import { notFound, permanentRedirect } from "next/navigation";
import { getIndexedPlaces } from "@/lib/places";

// Old Softr listing links (/place-details?recordId=rec...) move to /place/<slug>.
export default async function LegacyPlace({ searchParams }: { searchParams: Promise<{ recordId?: string }> }) {
  const { recordId } = await searchParams;
  const p = recordId ? (await getIndexedPlaces()).find((x) => x.id === recordId) : null;
  if (!p) notFound();
  permanentRedirect(`/place/${p.slug}`);
}
