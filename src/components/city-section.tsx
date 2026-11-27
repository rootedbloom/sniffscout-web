"use client";
import { BlockRecords } from "@/lib/datasource";
import { CitySlug } from "@/lib/city-context";
import { setPlaceLinks } from "@/lib/place-links";
import City from "@/blocks/city";
import "@/app/city-accent.css";

export default function CitySection({ slug, records, links }: { slug: string; records: any[]; links: Record<string, string> }) {
  setPlaceLinks(links);
  return (
    <CitySlug slug={slug}>
      <BlockRecords records={records}><City /></BlockRecords>
    </CitySlug>
  );
}
