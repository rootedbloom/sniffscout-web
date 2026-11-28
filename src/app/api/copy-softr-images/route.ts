import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// TEMPORARY (Nov 28 2026): copies the last site images still hosted by Softr (About page photos)
// into SniffScout's own Vercel Blob storage. It can only copy this fixed list. Removed afterwards.
const BASE = "https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/";
const FILES = ["3b2430d0-f649-4adf-a5f8-da30b8ff4f34.jpeg", "63a2d874-bae7-4c2d-a2c3-ba49e8b577ee.jpeg", "828a77c0-78cf-4ef0-aeea-05762148c3fc.jpeg", "eec44d70-54b4-4b8a-a9ec-2ae3a05ad883.jpeg"];

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  const out: Record<string, string> = {};
  for (const f of FILES) {
    try {
      const res = await fetch(BASE + f, { cache: "no-store" });
      if (!res.ok) { out[f] = "ERROR " + res.status; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const b = await put("site/" + f, buf, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: res.headers.get("content-type") || "image/jpeg", cacheControlMaxAge: 31536000 });
      out[f] = b.url + " (" + buf.length + " bytes)";
    } catch (e: any) {
      out[f] = "ERROR " + (e?.message || e);
    }
  }
  return NextResponse.json(out);
}
