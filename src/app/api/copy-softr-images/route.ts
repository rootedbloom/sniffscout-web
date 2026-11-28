import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// TEMPORARY (Nov 28 2026): copies the site images still hosted by Softr into
// SniffScout's own Vercel Blob storage, so nothing breaks when Softr is cancelled.
// It can only copy this fixed list of files. Removed once the copies are in place.
const BASE = "https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/";
const FILES = ["07157306-2df8-47ec-a729-9ffaed0f57ab.png", "24607092-cf1f-49df-8467-30dfbcae2824.jpeg", "2ed8f961-4c11-4d0d-ba61-74d1ffed4a37.jpeg", "48871c65-417f-43d7-b2fd-558fee7d2931.png", "5627a2ce-8807-42b6-ba34-9207145a2c5c.png", "60b4f0de-88e0-4242-a4d2-f9daa8cbd8ea.png", "7349e32f-37ba-4e45-9d3d-3770849aa5c2.png", "751e3816-51ca-4478-9ec1-56aa268b5793.jpeg", "8086b3aa-0d79-452d-b93d-07ddc12fa622.png", "a2ea45c5-2bfe-4f7f-ac78-02c798309694.jpeg", "adb818f8-0086-4fae-b75c-13b3634075a6.png", "bad64916-acab-45dc-967d-39fc0c34d75a.png", "cb92c176-2cea-4143-aa82-65515eaa949a.jpeg", "da607155-9f01-43a8-917a-aa65685479f2.jpeg", "ebdc523c-fe9e-4d6e-b162-8bd067de74c0.png", "f393f902-2dfe-4a80-8827-ef8b4c63764d.jpeg", "f55b2418-8f29-4814-98e2-c9eccae14651.jpeg", "f735f81a-4e3d-442e-9d54-f7379a23c9fe.jpeg"];

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  const out: Record<string, string> = {};
  for (const f of FILES) {
    try {
      const res = await fetch(BASE + f, { cache: "no-store" });
      if (!res.ok) { out[f] = "ERROR " + res.status; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const b = await put("site/" + f, buf, {
        access: "public", addRandomSuffix: false, allowOverwrite: true,
        contentType: res.headers.get("content-type") || (f.endsWith(".png") ? "image/png" : "image/jpeg"),
        cacheControlMaxAge: 31536000,
      });
      out[f] = b.url + " (" + buf.length + " bytes)";
    } catch (e: any) {
      out[f] = "ERROR " + (e?.message || e);
    }
  }
  return NextResponse.json(out);
}
