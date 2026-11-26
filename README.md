# SniffScout website (Next.js)

Dog-friendly directory for getsniffscout.com. Listings come from the Airtable "Places" table (read-only).

## Hosting settings (Vercel environment variables)
- `AIRTABLE_TOKEN`: Airtable personal access token with read access to the SniffScout base
- `SITE_URL`: https://getsniffscout.com
- `NEXT_PUBLIC_CONTACT_EMAIL`: public contact address shown in the footer

Pages refresh from Airtable at most once an hour.
