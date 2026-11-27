import { NextResponse } from "next/server";
import { PACK_TABLE, formsLive, PREVIEW_MSG, airtableCreate } from "@/lib/forms-config";

// Join the Pack: adds the person to the Airtable "Email List" table, exactly like
// the current form. Airtable then adds them to GoHighLevel and the welcome email sends.
export async function POST(req: Request) {
  if (!formsLive()) return NextResponse.json({ error: "This is a preview. Sign-ups will open when the new site goes live." }, { status: 503 });
  let body: any = {};
  try { body = await req.json(); } catch {}
  const email = String(body?.email ?? "").trim().slice(0, 254);
  const first = String(body?.first ?? "").trim().slice(0, 100);
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  const fields: Record<string, any> = { Email: email, "Signup Date": new Date().toISOString(), Source: "Website - Join the Pack", Status: "Subscribed" };
  if (first) fields["First Name"] = first;
  try {
    await airtableCreate(PACK_TABLE, fields);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Something went wrong. Please try again." }, { status: 502 });
  }
}
