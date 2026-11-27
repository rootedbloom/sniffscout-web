import type { Metadata } from "next";
import Header from "@/blocks/header";
import CitySection from "@/components/city-section";
import { cityPageData, slimRecords } from "@/lib/city-seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d = (await cityPageData(""))!;
  return { title: { absolute: d.title }, description: d.description, alternates: { canonical: d.canonical }, openGraph: { title: d.title, description: d.description, url: d.canonical } };
}

export default async function Cities() {
  const d = (await cityPageData(""))!;
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d.ld) }} />
        <CitySection slug="" records={slimRecords(d.places)} links={Object.fromEntries(d.places.map((p) => [p.id, p.slug]))} />
      </main>
    </>
  );
}
