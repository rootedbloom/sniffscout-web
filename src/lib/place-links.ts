// Maps Airtable record IDs to clean place URLs for the client-side directory.
let map: Record<string, string> = {};
export function setPlaceLinks(m: Record<string, string>) { map = m; }
export function placeHref(id: string) { return map[id] ? `/place/${map[id]}` : `/place-details?recordId=${encodeURIComponent(id)}`; }
