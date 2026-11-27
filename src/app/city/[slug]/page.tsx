import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/blocks/header";
import CitySection from "@/components/city-section";
import { cityPageData, slimRecords } from "@/lib/city-seo";
import { getCities } from "@/lib/places";

// Served at /dog-friendly-places-<city>-<state> (see middleware.ts), the same addresses the Softr site used.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCities()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = await cityPageData(slug);
  if (!d) return {};
  return { title: { absolute: d.title }, description: d.description, alternates: { canonical: d.canonical }, openGraph: { title: d.title, description: d.description, url: d.canonical } };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await cityPageData(slug);
  if (!d) notFound();
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d.ld) }} />
        <CitySection slug={slug} records={slimRecords(d.places)} links={Object.fromEntries(d.places.map((p) => [p.id, p.slug]))} />
      </main>
    </>
  );
}
