"use client";
import dynamic from "next/dynamic";
import { BlockSettings } from "@/lib/editable-settings";
import { BlockRecords } from "@/lib/datasource";
import { setPlaceLinks } from "@/lib/place-links";
import directorySettings from "@/blocks/directory.settings.json";

// The directory uses the map library, which only runs in the browser.
const DirectoryPage = dynamic(() => import("@/blocks/directory-page"), { ssr: false });

export default function DirectorySection({ records, links }: { records: any[]; links: Record<string, string> }) {
  setPlaceLinks(links);
  return (
    <BlockSettings values={directorySettings}>
      <BlockRecords records={records}><DirectoryPage /></BlockRecords>
    </BlockSettings>
  );
}
