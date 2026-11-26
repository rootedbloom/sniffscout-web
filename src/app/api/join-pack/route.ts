import { NextResponse } from "next/server";

// Preview build: sign-ups are not saved yet. At launch this will add the
// person to the Airtable "Email List" table, exactly like the current form.
export async function POST() {
  return NextResponse.json({ error: "This is a preview. Sign-ups will open when the new site goes live." }, { status: 503 });
}
