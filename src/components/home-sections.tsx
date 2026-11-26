"use client";
import dynamic from "next/dynamic";
import { BlockSettings } from "@/lib/editable-settings";
import { BlockRecords } from "@/lib/datasource";
import { setPlaceLinks } from "@/lib/place-links";
import Hero from "@/blocks/hero";
import heroSettings from "@/blocks/hero.settings.json";
import directorySettings from "@/blocks/directory.settings.json";

// The directory uses the map library, which only runs in the browser.
const Directory = dynamic(() => import("@/blocks/directory"), { ssr: false });

export default function HomeSections({ records, links }: { records: any[]; links: Record<string, string> }) {
  setPlaceLinks(links);
  return (
    <>
      <BlockSettings values={heroSettings}><Hero /></BlockSettings>
      <BlockSettings values={directorySettings}>
        <BlockRecords records={records}><Directory /></BlockRecords>
      </BlockSettings>
    </>
  );
}
