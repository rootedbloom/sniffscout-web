"use client";
// Page title, description, canonical link and structured data are set on the server (lib/city-seo.ts).
const SEO_ON_SERVER = true;
import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { SSFooter } from "./softr-footer";
import { PawPrint, MapPin, ArrowRight, ChevronRight, Utensils, Beer, Coffee, Sun, Umbrella, Home, Trees, Ban, Crown, Droplets, Bone, CupSoda, Flame, Camera, Store, Tag, Armchair } from "lucide-react";
import { datasource, useRecords, q } from "@/lib/datasource";
import { placeHref as __ph } from "@/lib/place-links";
import { useCitySlug } from "@/lib/city-context";
import { RC_CSS } from "./city-cards-style";

const ds = datasource.define({ places: "places" });
const select = q.select({
  name: "Business Name", type: "Business Type", city: "City", state: "State", photo: "Main Photo", extra: "Additional Photos",
  description: "Short Description", area: "Dog-Friendly Area", status: "Listing Status", claimed: "Claimed by Business", claimStatus: "Claim Status", confidence: "Information Confidence",
  water: "Water Bowls Available", treats: "Dog Treats Available", pupCups: "Pup Cups Available", menu: "Dog Menu Available",
  coverage: "Outdoor Area Coverage", featured: "Featured Listing", featStart: "Featured Start Date", featEnd: "Featured End Date", market: "Market / Metro Area",
  promoTitle: "Promotion Title", promoDetails: "Promotion Details", promoStart: "Promotion Start", promoEnd: "Promotion End", promoOk: "Promotion Approved",
  seating: "Outdoor Seating", access: "Dog Access", heating: "Outdoor Area Heating", method: "Verification Method", bcp: "Business-Confirmed Perks",
});

const SEAT_VALUES = ["Patio / Outdoor Area", "Covered (Coverage Unknown)", "Patio / Outdoor Area (Uncovered)", "Partially Covered Outdoor Area", "Fully Covered Outdoor Area", "No Dog-Friendly Outdoor Area"];
const isApproved = (f: any) => label(f.claimStatus) === "Claimed & Approved";
const known = (f: any) => isApproved(f) || label(f.confidence) === "Publicly Researched";
const clsOf = (f: any): string[] => { const out: string[] = []; if (!known(f)) return out; const seat = label(f.seating); if (SEAT_VALUES.includes(seat)) out.push(seat); const a = label(f.access); if (a === "Dogs Allowed Inside" || a === "Dogs Outside Only") out.push(a); return out; };
const VERIFIED_PILL = "https://lmqrgeh284epdg91.public.blob.vercel-storage.com/site/07157306-2df8-47ec-a729-9ffaed0f57ab.png";
const PATH = "/dog-friendly-places";
const cityHref = (s: string) => PATH + "-" + s; // every city has its own page now
const STATES: Record<string, string> = { AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "Washington, D.C.", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming" };

const label = (v: any): string => Array.isArray(v) ? v.map(label).filter(Boolean).join(", ") : v && typeof v === "object" ? String(v.label ?? v.name ?? v.value ?? "") : String(v ?? "");
// Top Dog Partner rules: kept identical to the main directory (home search + /directory)
const isPartner = (f: any) => { if (!f || !f.featured) return false; const now = Date.now(); const s = f.featStart ? Date.parse(label(f.featStart)) : NaN; const e = f.featEnd ? Date.parse(label(f.featEnd)) : NaN; if (!isNaN(s) && s > now) return false; if (!isNaN(e) && e < now) return false; return true; };
const SEED = Math.floor(Math.random() * 1e9);
const rot = (id: any) => { let h = SEED >>> 0; const s = String(id); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 2654435761) >>> 0; return h; };
const promoOf = (f: any) => { if (!f || !f.promoOk) return null; const t = label(f.promoTitle).trim(); if (!t) return null; const now = Date.now(); const s = f.promoStart ? Date.parse(label(f.promoStart)) : NaN; const e = f.promoEnd ? Date.parse(label(f.promoEnd)) : NaN; if (!isNaN(s) && s > now) return null; if (!isNaN(e) && e + 864e5 < now) return null; return { t, d: label(f.promoDetails).trim() }; };
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const slugOf = (city: string, st: string) => (clean(city) + "-" + clean(st)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const types = (v: any) => label(v).split(",").map((x) => x.trim()).filter(Boolean);
const yes = (v: any) => label(v) === "Yes";
const photoUrl = (p: any) => { const x = Array.isArray(p) ? p[0] : p; return typeof x === "string" ? x : x?.url || x?.thumbnails?.large?.url || ""; };
const plural = (n: number, one: string, many?: string) => n + " " + (n === 1 ? one : (many || one + "s"));
const TYPE_PLURAL: Record<string, string> = { "Restaurant": "restaurants", "Brewery": "breweries", "Coffee Shop": "coffee shops", "Bar": "bars", "Wine Bar": "wine bars", "Winery": "wineries" };
const SEAT_TXT: Record<string, string> = { "Patio / Outdoor Area": "Patio / Outdoor Area", "Patio / Outdoor Area (Uncovered)": "Patio / Outdoor Area", "Partially Covered Outdoor Area": "Patio / Outdoor Area", "Fully Covered Outdoor Area": "Patio / Outdoor Area", "Covered (Coverage Unknown)": "Patio / Outdoor Area", "No Dog-Friendly Outdoor Area": "No Dog-Friendly Outdoor Area" };
const seatTxt = (f: any, t: string) => SEAT_TXT[t] || t;
const bcpSet = (f: any) => new Set((Array.isArray(f.bcp) ? f.bcp : f.bcp ? [f.bcp] : []).map(label));
const CATS: [string, string[]][] = [["Restaurants & Bars", ["Restaurant", "Bar", "Wine Bar", "Winery"]], ["Breweries", ["Brewery"]], ["Coffee Shops", ["Coffee Shop"]]];
const inCat = (r: any, c: string) => { const w = (CATS.find((x) => x[0] === c) || ["", [] as string[]])[1]; return types(r.fields?.type).some((t: string) => w.includes(t)); };
const typePlural = (t: string, n: number) => n === 1 ? t.toLowerCase() : (TYPE_PLURAL[t] || t.toLowerCase() + "s");
const listJoin = (a: string[]) => a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];

function setHead(title: string, desc: string, canonical: string, ld: any) {
  try {
    document.title = title;
    let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = desc;
    const og: [string, string][] = [["og:title", title], ["og:description", desc], ["og:url", canonical]];
    og.forEach(([p, c]) => { let e = document.querySelector('meta[property="' + p + '"]') as HTMLMetaElement | null; if (!e) { e = document.createElement("meta"); e.setAttribute("property", p); document.head.appendChild(e); } e.content = c; });
    let c = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
    c.href = canonical;
    let s = document.getElementById("ss-city-ld") as HTMLScriptElement | null;
    if (!s) { s = document.createElement("script"); s.id = "ss-city-ld"; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.text = JSON.stringify(ld);
  } catch (e) {}
}

const CSS = `

.cp-h{font-family:'Bricolage Grotesque',Figtree,sans-serif;letter-spacing:-.02em}
.cp-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
@media(max-width:767px){.cp-chips{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin:0 -20px 18px;padding:2px 20px 4px}.cp-chips::-webkit-scrollbar{display:none}.cp-chip{flex:none;white-space:nowrap}}
.cp-chip{border:2px solid #00163D;background:#fff;color:#00163D;font-weight:800;font-size:13px;padding:7px 13px;border-radius:999px;cursor:pointer;font-family:inherit}
.cp-chip[data-on="1"]{background:#00163D;color:#fff}
.cp-city{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#fff;border:2px solid #00163D;border-radius:14px;padding:12px 14px;color:#00163D;text-decoration:none;font-weight:800;box-shadow:0 3px 0 #FF5A0A;transition:transform .15s}
.cp-city:hover{transform:translateY(-2px)}
.cp-card{background:#fff;color:#00163D;border:2px solid #00163D;border-radius:15px;overflow:hidden;box-shadow:0 4px 0 #FF5A0A;display:flex;flex-direction:column}
.cp-btn{display:inline-flex;align-items:center;gap:8px;font-weight:800;text-decoration:none;border-radius:999px;padding:12px 20px;font-size:15px}
`;

const SEAT_ICON: Record<string, any> = { "Patio / Outdoor Area": Armchair, "Covered (Coverage Unknown)": Armchair, "Patio / Outdoor Area (Uncovered)": Armchair, "Partially Covered Outdoor Area": Armchair, "Fully Covered Outdoor Area": Armchair, "No Dog-Friendly Outdoor Area": Ban };

function tdPlan(n: number, max: number) { const r = Math.ceil(n / max), b = Math.floor(n / r), x = n % r; const out: number[] = []; for (let i = 0; i < r; i++) { const c = b + (i < x ? 1 : 0); for (let j = 0; j < c; j++) out.push(c); } return out; }
function TopDogSection({ items, hide }: any) {
  const [exp, setExp] = useState(false);
  const [idx, setIdx] = useState(0);
  const tr = useRef<any>(null);
  const n = items ? items.length : 0;
  useEffect(() => { const el = tr.current; if (!el) return; const h = () => { const c = el.children[0]; const s = c ? c.getBoundingClientRect().width + 12 : 1; setIdx(Math.min(el.children.length - 1, Math.max(0, Math.round(el.scrollLeft / s)))); }; el.addEventListener("scroll", h, { passive: true }); return () => el.removeEventListener("scroll", h); }, [n]);
  if (!n) return null;
  const pd = tdPlan(n, 3), pt = tdPlan(n, 2);
  const step = () => { const el = tr.current; const c = el && el.children[0]; return c ? c.getBoundingClientRect().width + 12 : 1; };
  const go = (d: number) => { const el = tr.current; if (el) el.scrollBy({ left: d * step(), behavior: "smooth" }); };
  const onS = () => { const el = tr.current; if (el) setIdx(Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / step())))); };
  return (
    <section className={"tds" + (hide ? " ss-hm" : "") + (exp ? " exp" : "") + (n === 1 ? " one" : "")} aria-label="Top Dog Partners">
      <div className="tds-h">
        <div className="tds-t"><span className="tds-ic" aria-hidden="true"><Crown size={19} strokeWidth={2.6} /></span><div><h2>Top Dog Partners</h2><p>Featured local favorites</p></div></div>
        {n > 1 && <div className="tds-nav"><span className="tds-ct" aria-live="polite">{idx + 1} of {n}</span><button type="button" onClick={() => go(-1)} disabled={idx === 0} aria-label="Previous Top Dog Partner">‹</button><button type="button" onClick={() => go(1)} disabled={idx >= n - 1} aria-label="Next Top Dog Partner">›</button></div>}
      </div>
      <div className="tds-g" ref={tr} onScroll={onS}>
        {items.map((r: any, i: number) => <div key={r.id} className="tds-i" data-wd={pd[i] < 3 ? "1" : "0"} data-wt={pt[i] < 2 ? "1" : "0"} style={{ ["--sd" as any]: String(6 / pd[i]), ["--st" as any]: String(2 / pt[i]) } as any}><Card r={r} /></div>)}
      </div>
      {n > 1 && <button type="button" className="tds-all" onClick={() => setExp((e) => !e)} aria-expanded={exp}>{exp ? "Show fewer" : "See All Top Dogs (" + n + ")"}</button>}
    </section>
  );
}
function Card({ r }: { r: any }) {
  const f = r.fields || {};
  const img = photoUrl(f.photo);
  const p = isPartner(f);
  const promo = p ? promoOf(f) : null;
  const href = __ph(r.id);
  const all = (!known(f) ? [] : [yes(f.water) ? "💧 Water bowls" : null, yes(f.pupCups) ? "🥤 Pup cups" : null, yes(f.treats) ? "🦴 Dog treats" : null, yes(f.menu) ? "🍽️ Dog menu" : null, ["Yes", "Seasonal"].includes(label(f.heating)) ? "🔥 Outdoor heaters" : null].filter(Boolean)) as string[];
  const ap = isApproved(f); const cs = bcpSet(f);
  const items: any[] = [...clsOf(f).map((t) => ({ t: t.startsWith("Dogs") ? t : seatTxt(f, t), I: SEAT_ICON[t] || (t === "Dogs Allowed Inside" ? Home : Trees), k: t.startsWith("Dogs") ? "Dog Access" : "Outdoor Seating" })), ...(!known(f) ? [] : [yes(f.water) && { t: "Water Bowls", I: Droplets, k: "Water Bowls" }, yes(f.menu) && { t: "Dog Menu", I: Utensils, k: "Dog Menu" }, yes(f.treats) && { t: "Dog Treats", I: Bone, k: "Dog Treats" }, yes(f.pupCups) && { t: "Pup Cups", I: CupSoda, k: "Pup Cups" }, ["Yes", "Seasonal"].includes(label(f.heating)) && { t: label(f.heating) === "Seasonal" ? "Outdoor Heaters (Seasonal)" : "Outdoor Heaters", I: Flame, k: "Outdoor Heaters" }].filter(Boolean))].map((x: any) => ({ ...x, c: ap && cs.has(x.k) })).sort((a: any, b: any) => Number(b.c) - Number(a.c));
  const perks = items;
  const xp: string[] = (Array.isArray(f.extra) ? f.extra : []).map((a: any) => typeof a === "string" ? a : a?.thumbnails?.large?.url || a?.url).filter(Boolean);
  const meta = [label(f.city), label(f.type)].filter(Boolean).join(" · ");
  const tt = types(f.type);
  const NI = tt.includes("Brewery") ? Beer : tt.includes("Coffee Shop") ? Coffee : Utensils;
  return (
    <article className={p ? "ss-rc ss-c2 ss-c2td" : "ss-rc ss-c2"}>
      <div className="ss-c2h">
        <a href={href} className="ss-c2t" aria-label={label(f.name)}>{img ? <img src={img} alt={label(f.name) + " in " + label(f.city)} loading="lazy" /> : <span className="ss-c2i" aria-hidden="true"><NI size={26} strokeWidth={2.2} /></span>}</a>
        <div className="ss-c2n">
          {p && <span className="ss-c2b"><Crown size={12} strokeWidth={2.6} /> Top Dog Partner</span>}
          <div className="ss-c2hd"><h3><a href={href}>{label(f.name) || "Dog-friendly place"}</a></h3>
          {meta && <div className="ss-c2m"><MapPin size={13} strokeWidth={2.4} aria-hidden="true" /><span>{meta}</span></div>}</div>
          {isApproved(f) && <img src={VERIFIED_PILL} alt="SniffScout Verified" width={360} height={96} className="ss-vp" />}
        </div>
      </div>
      {f.description && <p className="ss-c2d">{String(f.description)}</p>}
      {promo && <a href={href} className="ss-promo"><Tag size={17} color="#FF5A0A" strokeWidth={2.4} style={{ flex: "none", marginTop: 2 }} /><div><b>Current special</b><strong>{promo.t}</strong>{promo.d && <span>{promo.d.length > 110 ? promo.d.slice(0, 107) + "…" : promo.d}</span>}</div></a>}
      {perks.length > 0 && <div className="ss-c2p"><h4 className="ss-c2ph"><PawPrint size={19} strokeWidth={2.5} aria-hidden="true" />{ap ? "The Pup Perks!" : "Pup Perks"}</h4><div className="ss-rp">{perks.map((x) => { const I = x.I; return <span key={x.t} className={ap && !x.c ? "ss-un" : undefined} title={ap && !x.c ? "Reported online, not yet confirmed by the business" : undefined}><I size={13} strokeWidth={2.5} aria-hidden="true" />{x.t}</span>; })}</div></div>}
      {xp.length > 0 && <a href={href + "?photos=1"} className="ss-c2x" aria-label={"See pup photos of " + label(f.name)}><span className="ss-c2xt" aria-hidden="true">{xp.slice(0, 3).map((u: string, i: number) => <img key={i} src={u} alt="" loading="lazy" />)}</span><span>See Pup Photos{xp.length > 3 ? " (" + xp.length + ")" : ""} <b>→</b></span></a>}
      <span className="ss-sp" aria-hidden="true" />
      <a href={href + "?share=1"} className="ss-c3g" aria-label={"Add a photo of your dog at " + label(f.name)}><Camera size={19} strokeWidth={2.3} aria-hidden="true" className="ss-c3gi" /><span className="ss-c3gt"><b>Got a pup pic?</b><span>Share your dog's visit!</span></span><span className="ss-c3gb">Add Photo</span></a>
      <a href={href} className="ss-c2v">View Details <ArrowRight size={15} strokeWidth={2.6} aria-hidden="true" /></a>
      {!isApproved(f) && <a href={"/claim-your-business?recordId=" + encodeURIComponent(r.id)} className="ss-c2cl"><Store size={15} strokeWidth={2.4} aria-hidden="true" className="ss-c2cli" /><span className="ss-c2clq">Own this business?</span><b>Claim Your Free Listing →</b></a>}
    </article>
  );
}

const SS_TYPO_CSS = "h1,h2{font-weight:800!important}h3,h4,h5,h6{font-weight:700!important}p,li,dd,td,blockquote,figcaption{font-weight:500}button,input[type=submit],a[class*='btn'],a[class*='cta'],[class*='-btn']{font-weight:700!important}label{font-weight:700!important}input,select,textarea{font-weight:500}";
function ssTypoInit() {
  try {
    if (typeof document === "undefined" || (window as any).__ssTypo) return;
    (window as any).__ssTypo = 1;
    const st = document.createElement("style"); st.id = "ss-font-manrope"; document.head.appendChild(st);
    fetch("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap").then((r) => r.text()).then((css) => { st.textContent = ["Manrope", "Bricolage Grotesque", "Figtree", "Lato"].map((f) => css.split("font-family: 'Manrope';").join("font-family: '" + f + "';")).join("\n") + "\nhtml,body{font-family:Manrope,'Helvetica Neue',Arial,sans-serif}"; }).catch(() => {});
    const apply = (root: any) => { try { if (!root || !root.getElementById || root.getElementById("ss-typo")) return; const s = document.createElement("style"); s.id = "ss-typo"; s.textContent = SS_TYPO_CSS; (root.head || root).appendChild(s); } catch (e) {} };
    const big = (root: any) => { try { root.querySelectorAll("h3").forEach((h: any) => { if (parseFloat(getComputedStyle(h).fontSize) >= 22) h.style.setProperty("font-weight", "800", "important"); }); } catch (e) {} };
    const scan = () => { apply(document); big(document); document.querySelectorAll("*").forEach((el: any) => { if (el.shadowRoot) { apply(el.shadowRoot); big(el.shadowRoot); el.shadowRoot.querySelectorAll("*").forEach((x: any) => { if (x.shadowRoot) { apply(x.shadowRoot); big(x.shadowRoot); } }); } }); };
    scan(); let n = 0; const t = setInterval(() => { scan(); if (++n > 30) clearInterval(t); }, 700);
    let pend = false; try { new MutationObserver(() => { if (pend) return; pend = true; setTimeout(() => { pend = false; scan(); }, 250); }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  } catch (e) {}
}
ssTypoInit();

export default function Block() {
  const [slug, setSlug] = useState<string>(useCitySlug());
  const [cat, setCat] = useState<string>("");
  useEffect(() => { try { const pm = window.location.pathname.match(/^\/dog-friendly-places-([a-z0-9-]+)\/?$/); setSlug(((pm && pm[1]) || new URLSearchParams(window.location.search).get("city") || "").toLowerCase().trim()); } catch (e) {} }, []);

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useRecords({ from: ds.places, select, count: 100 });
  useEffect(() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }, [hasNextPage, isFetchingNextPage, data]);
  const rows: any[] = (data?.pages || []).flatMap((p: any) => p.items || []);
  const loaded = status === "success" && !hasNextPage;

  const cities = useMemo(() => {
    const m = new Map<string, { slug: string; city: string; state: string; market: string; items: any[] }>();
    rows.forEach((r) => {
      const f = r.fields || {}; const city = clean(label(f.city)); const st = clean(label(f.state)).toUpperCase();
      if (!city || !st) return;
      const s = slugOf(city, st);
      if (!m.has(s)) m.set(s, { slug: s, city, state: st, market: label(f.market), items: [] });
      m.get(s)!.items.push(r);
    });
    return Array.from(m.values());
  }, [rows.length]);

  const current = slug ? cities.find((c) => c.slug === slug) : undefined;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.getsniffscout.com";

  const typeCounts = useMemo(() => {
    const m: Record<string, number> = {};
    (current?.items || []).forEach((r) => types(r.fields?.type).forEach((t) => { m[t] = (m[t] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [current?.slug, current?.items.length]);

  const items = useMemo(() => {
    const list = (current?.items || []).filter((r) => !cat || inCat(r, cat));
    return [...list].sort((a, b) => { const pa = isPartner(a.fields), pb = isPartner(b.fields); if (pa !== pb) return pa ? -1 : 1; if (pa) return rot(a.id) - rot(b.id); return label(a.fields?.name).localeCompare(label(b.fields?.name)); });
  }, [current?.slug, cat, current?.items.length]);
  const tdAll = items.filter((r) => isPartner(r.fields));
  const freeAll = items.filter((r) => !isPartner(r.fields));

  const perkCount = (k: string) => (current?.items || []).filter((r) => known(r.fields || {}) && yes(r.fields?.[k])).length;
  const patioCount = (current?.items || []).filter((r) => known(r.fields || {}) && types(r.fields?.area).some((x) => /patio|outdoor|rooftop/i.test(x))).length;

  const nearby = useMemo(() => {
    if (!current) return [];
    return cities.filter((c) => c.slug !== current.slug && ((current.market && c.market === current.market) || c.state === current.state))
      .sort((a, b) => Number(b.market === current.market) - Number(a.market === current.market) || b.items.length - a.items.length).slice(0, 12);
  }, [current?.slug, cities.length]);

  const place = current ? current.city + ", " + current.state : "";
  const intro = current ? (() => {
    const n = current.items.length;
    const parts = typeCounts.slice(0, 4).map(([t, c]) => plural(c, typePlural(t, 1), typePlural(t, 2)));
    const perks: string[] = [];
    if (patioCount) perks.push(plural(patioCount, "spot") + " with a patio or outdoor area");
    if (perkCount("water")) perks.push(perkCount("water") + " with water bowls");
    const goodies = current.items.filter((r) => known(r.fields || {}) && (yes(r.fields?.pupCups) || yes(r.fields?.treats))).length;
    if (goodies) perks.push(goodies + " that hand out pup cups or treats");
    return "Looking for somewhere to bring your dog in " + place + "? SniffScout lists " + plural(n, "dog-friendly spot") + " here" + (parts.length ? ", including " + listJoin(parts) : "") + "." + (perks.length ? " You'll find " + listJoin(perks) + "." : "");
  })() : "";

  useEffect(() => {
    if (!loaded || SEO_ON_SERVER) return;
    if (current) {
      const n = current.items.length;
      const url = origin + cityHref(current.slug);
      const top = typeCounts.slice(0, 3).map(([t]) => typePlural(t, 2));
      setHead(
        "Dog-Friendly Places in " + place + " (" + n + ") | SniffScout",
        (n + " dog-friendly " + (top.length ? listJoin(top) : "spots") + " in " + place + ". See patios, water bowls, pup cups and dog policies before you go. Local picks from SniffScout.").slice(0, 300),
        url,
        { "@context": "https://schema.org", "@graph": [
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: origin + "/" },
            { "@type": "ListItem", position: 2, name: "Dog-Friendly Places", item: origin + PATH },
            { "@type": "ListItem", position: 3, name: place, item: url }] },
          { "@type": "ItemList", name: "Dog-friendly places in " + place, numberOfItems: n, itemListElement: current.items.slice(0, 100).map((r, i) => ({ "@type": "ListItem", position: i + 1, name: label(r.fields?.name), url: origin + "/place-details?recordId=" + r.id })) }] }
      );
    } else {
      setHead(
        "Dog-Friendly Places by City | SniffScout",
        "Find dog-friendly restaurants, breweries, bars and coffee shops by city. Browse " + rows.length + " places across " + cities.length + " cities on SniffScout.",
        origin + PATH,
        { "@context": "https://schema.org", "@type": "ItemList", name: "Dog-friendly places by city", itemListElement: cities.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.city + ", " + c.state, url: origin + cityHref(c.slug) })) }
      );
    }
  }, [loaded, current?.slug, rows.length]);

  const wrap: any = { fontFamily: "Figtree,'Helvetica Neue',Arial,sans-serif", color: "#00163D" };
  const inner = "mx-auto max-w-[1180px] px-5 md:px-10";

  if (!loaded) return <section style={{ ...wrap, background: "#00163D", color: "#fff", padding: "70px 20px", textAlign: "center" }}><style>{CSS}</style><PawPrint size={34} color="#FF5A0A" style={{ margin: "0 auto" }} /><p style={{ marginTop: 12, fontWeight: 700 }}>Sniffing out dog-friendly spots…</p></section>;

  if (!current) {
    const byState: Record<string, typeof cities> = {};
    cities.forEach((c) => { (byState[c.state] = byState[c.state] || []).push(c); });
    const stateKeys = Object.keys(byState).sort((a, b) => (STATES[a] || a).localeCompare(STATES[b] || b));
    return (
      <div style={wrap}>
        <style>{CSS}</style>
        <section style={{ background: "#00163D", color: "#fff" }}>
          <div className={inner} style={{ paddingTop: 44, paddingBottom: 48 }}>
            {slug && <p style={{ background: "#FFF0E6", color: "#00163D", display: "inline-block", padding: "8px 14px", borderRadius: 12, fontWeight: 700, fontSize: 14, marginBottom: 16 }}>We don't have any spots listed for that city yet. Pick one below or suggest a place.</p>}
            <div style={{ color: "#FF7A3D", fontWeight: 800, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase" }}><PawPrint size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />Browse by city</div>
            <h1 className="cp-h" style={{ fontSize: "clamp(34px,5.4vw,56px)", lineHeight: 1.04, margin: "10px 0 12px", fontWeight: 800 }}><span style={{ color: "#FF5A0A" }}>Dog-Friendly</span> Places by City</h1>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,.85)", margin: 0 }}>Pick a town to see every dog-friendly restaurant, brewery, bar and coffee shop we've found there, with patios, water bowls and pup perks all in one spot. {rows.length} places across {cities.length} cities and counting.</p>
          </div>
        </section>
        <section style={{ background: "#FFF0E6" }}>
          <div className={inner} style={{ paddingTop: 36, paddingBottom: 48 }}>
            {stateKeys.map((st) => (
              <div key={st} style={{ marginBottom: 30 }}>
                <h2 className="cp-h" style={{ fontSize: 26, fontWeight: 800, margin: "0 0 14px" }}>{STATES[st] || st}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
                  {byState[st].sort((a, b) => b.items.length - a.items.length || a.city.localeCompare(b.city)).map((c) => (
                    <a key={c.slug} href={cityHref(c.slug)} className="cp-city"><span><MapPin size={15} color="#FF5A0A" style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />{c.city}</span><span style={{ background: "#FFF0E6", color: "#B83B00", fontSize: 12, padding: "3px 9px", borderRadius: 99 }}>{c.items.length}</span></a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <Bottom city="" />
        <SSFooter />
      </div>
    );
  }

  return (
    <div style={wrap}>
      <style>{CSS}</style>
      <section style={{ background: "#00163D", color: "#fff" }}>
        <div className={inner} style={{ paddingTop: 30, paddingBottom: 44 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.7)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
            <a href="/" style={{ color: "rgba(255,255,255,.8)", textDecoration: "none" }}>Home</a><ChevronRight size={14} />
            <a href={PATH} style={{ color: "rgba(255,255,255,.8)", textDecoration: "none" }}>Dog-Friendly Places</a><ChevronRight size={14} />
            <span style={{ color: "#FF9B68" }}>{place}</span>
          </nav>
          <h1 className="cp-h" style={{ fontSize: "clamp(32px,5.2vw,54px)", lineHeight: 1.05, margin: "16px 0 12px", fontWeight: 800 }}><span style={{ color: "#FF5A0A" }}>Dog-Friendly</span> Places in {place}</h1>
          <p style={{ maxWidth: 720, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.88)", margin: 0 }}>{intro}</p>
          <p style={{ maxWidth: 720, fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,.65)", margin: "10px 0 0" }}>Dog rules can change with the weather or the crowd, so it's always smart to call ahead before you go.</p>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div className={inner} style={{ paddingTop: 28, paddingBottom: 44 }}>
          {(() => { const cc = CATS.map(([n]) => [n, current.items.filter((r) => inCat(r, n)).length] as [string, number]).filter(([, c]) => c > 0); return cc.length > 1 ? (
            <div className="cp-chips" role="group" aria-label="Filter by category">
              <button type="button" className="cp-chip" aria-pressed={!cat} data-on={cat ? "0" : "1"} onClick={() => setCat("")}>All ({current.items.length})</button>
              {cc.map(([n, c]) => <button key={n} type="button" className="cp-chip" aria-pressed={cat === n} data-on={cat === n ? "1" : "0"} onClick={() => setCat(n)}>{n} ({c})</button>)}
            </div>
          ) : null; })()}
          <style>{RC_CSS}</style>
          <div className="ss-rnav-c"><TopDogSection items={tdAll} /><div className="ss-rgrid">
            {freeAll.map((r) => <Card key={r.id} r={r} />)}
          </div></div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section style={{ background: "#fff" }}>
          <div className={inner} style={{ paddingTop: 36, paddingBottom: 40 }}>
            <h2 className="cp-h" style={{ fontSize: 28, fontWeight: 800, margin: "0 0 14px" }}>More dog-friendly towns nearby</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
              {nearby.map((c) => <a key={c.slug} href={cityHref(c.slug)} className="cp-city"><span>{c.city}, {c.state}</span><span style={{ background: "#FFF0E6", color: "#B83B00", fontSize: 12, padding: "3px 9px", borderRadius: 99 }}>{c.items.length}</span></a>)}
            </div>
            <a href={PATH} style={{ display: "inline-block", marginTop: 16, color: "#FF5A0A", fontWeight: 800, textDecoration: "none" }}>See all cities →</a>
          </div>
        </section>
      )}
      <Bottom city={current.city} />
      <SSFooter />
    </div>
  );
}

function Bottom({ city }: { city: string }) {
  return (
    <section style={{ background: "#00163D", color: "#fff" }}>
      <div className="mx-auto max-w-[1180px] px-5 md:px-10" style={{ paddingTop: 40, paddingBottom: 44, display: "grid", gap: 16 }}>
        <h2 className="cp-h" style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, margin: 0 }}>{city ? <>Know a dog-friendly spot in <span style={{ color: "#FF5A0A" }}>{city}</span>?</> : "Know a dog-friendly spot we're missing?"}</h2>
        <p style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,.85)", maxWidth: 620 }}>Tell us about it and I'll check it out and add it. Own a dog-friendly business? Claim your free listing so pup parents know what to expect.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="/submit-a-place" className="cp-btn" style={{ background: "#FF5A0A", color: "#fff" }}>Submit a Dog-Friendly Spot <ArrowRight size={18} /></a>
          <a href="/claim-your-business" className="cp-btn" style={{ background: "#fff", color: "#00163D" }}>Claim Your Free Listing</a>
          <a href="/directory" className="cp-btn" style={{ border: "2px solid rgba(255,255,255,.5)", color: "#fff" }}>Search the full directory</a>
        </div>
      </div>
    </section>
  );
}
