# SniffScout website (Next.js)

Dog-friendly directory for getsniffscout.com. Listings come from the Airtable "Places" table (read-only).

## Hosting settings (Vercel environment variables)
- `AIRTABLE_TOKEN`: Airtable personal access token with read access to the SniffScout base
- `AIRTABLE_WRITE_TOKEN`: Airtable token (data.records:write, SniffScout base only) used by the website forms
- `BLOB_READ_WRITE_TOKEN`: added by the Vercel Blob store `sniffscout-uploads`; holds form photos until Airtable copies them
- `FORMS_LIVE`: `true` lets Submit a Place, Claim Your Business, place-page photo/update forms and Join the Pack save to Airtable. Leave unset in preview.
- `NEXT_PUBLIC_FORMS_LIVE`: `true` at launch; also turns on the Contact form (sends to GoHighLevel)
- `SITE_URL`: https://getsniffscout.com
- `NEXT_PUBLIC_CONTACT_EMAIL`: public contact address shown in the footer
- `ALLOW_INDEXING`: leave unset during preview; set to `true` only at launch so Google can index the site

Forms were tested end to end on Nov 28 2026 and are switched off again until launch.

Pages refresh from Airtable at most once an hour.
