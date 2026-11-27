import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { formsLive, PREVIEW_MSG } from "@/lib/forms-config";

// Lets the browser upload form photos straight to the site's Vercel Blob storage.
// Airtable then copies each photo from its link when the record is saved,
// the same way the Softr forms work today.
export async function POST(req: Request) {
  if (!formsLive()) return NextResponse.json({ error: PREVIEW_MSG }, { status: 503 });
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"],
        maximumSizeInBytes: 20 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (e: any) {
    console.error("Photo upload failed", e?.message);
    return NextResponse.json({ error: "Photo upload failed. Please try again." }, { status: 400 });
  }
}
