import { NextResponse } from "next/server";
import { FORMS, formsLive, PREVIEW_MSG, isOurUpload, airtableCreate } from "@/lib/forms-config";

// Saves Submit a Place, Claim Your Business and place-page photo/update forms to Airtable.
export async function POST(req: Request) {
  if (!formsLive()) return NextResponse.json({ error: PREVIEW_MSG }, { status: 503 });

  const raw = await req.text();
  if (raw.length > 60_000) return NextResponse.json({ error: "That submission is too large." }, { status: 413 });
  let body: any;
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 }); }

  const def = FORMS[String(body?.form)];
  const data = body?.data;
  if (!def || !data || typeof data !== "object") return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });

  for (const k of def.required) {
    const v = data[k];
    if (v === undefined || v === null || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && !v.length))
      return NextResponse.json({ error: "Please fill in all the required fields." }, { status: 400 });
  }
  if (data.email !== undefined && !/^\S+@\S+\.\S+$/.test(String(data.email).trim()))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    const name = def.fields[k];
    if (!name || v === undefined || v === null) continue; // unknown fields are ignored
    if (def.attachments?.includes(k)) {
      const list = (Array.isArray(v) ? v : []).filter((a: any) => a && isOurUpload(a.url)).slice(0, 5)
        .map((a: any) => ({ url: String(a.url), filename: String(a.filename || "photo").slice(0, 200) }));
      if (list.length) fields[name] = list;
      continue;
    }
    if (def.links?.includes(k)) {
      const ids = (Array.isArray(v) ? v : []).filter((id: any) => /^rec[A-Za-z0-9]{14}$/.test(String(id))).slice(0, 1);
      if (ids.length) fields[name] = ids;
      continue;
    }
    if (typeof v === "string") fields[name] = v.slice(0, 5000);
    else if (typeof v === "boolean") fields[name] = v;
    else if (Array.isArray(v)) fields[name] = v.filter((x) => typeof x === "string").map((x) => x.slice(0, 200)).slice(0, 20);
  }
  Object.assign(fields, def.fixed);

  try {
    const id = await airtableCreate(def.table, fields);
    return NextResponse.json({ id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "We couldn't save that just now. Please try again." }, { status: 502 });
  }
}
