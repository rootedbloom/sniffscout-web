"use client";
// Page title, description, canonical link and structured data are set on the server (lib/city-seo.ts).
const SEO_ON_SERVER = true;
import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { useState as ssxUseState, useEffect as ssxUseEffect } from "react";
const SSX_SOCIAL=[{n:"Facebook",u:"https://www.facebook.com/sniffscout",k:"fb"},{n:"Instagram",u:"https://www.instagram.com/getsniffscout",k:"ig"},{n:"TikTok",u:"",k:"tt"}];
const SSF_CSS=".ssf{background:#00163D;width:100%;font-family:Figtree,'Helvetica Neue',Arial,sans-serif;color:#fff}.ssf *{box-sizing:border-box}.ssf-in{max-width:1400px;margin:0 auto;padding:24px 20px 16px}.ssf-top{display:flex;flex-direction:column;gap:20px}.ssf-cols{display:grid;grid-template-columns:minmax(0,1.25fr) max-content minmax(0,1fr);gap:0 12px;align-items:start}.ssf h4{margin:0 0 10px;font-family:'Bricolage Grotesque',Figtree,sans-serif;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#FF7A3D;line-height:1.2}.ssf ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}.ssf-l{display:inline-block;color:rgba(255,255,255,.82);font-size:13px;line-height:1.3;text-decoration:none;transition:color .2s}.ssf-l:hover{color:#FF9B68}.ssf-bot{margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,.14);display:flex;flex-direction:column;gap:4px;font-size:12px;color:rgba(255,255,255,.55)}.ssf-bot p{margin:0}@media(min-width:768px){.ssf-in{padding:32px 40px 20px}.ssf-top{flex-direction:row;justify-content:space-between;gap:32px}.ssf-cols{grid-template-columns:repeat(3,auto);gap:0 64px}.ssf h4{font-size:12px;letter-spacing:.1em}.ssf ul{gap:6px}.ssf-bot{flex-direction:row;justify-content:space-between;align-items:center;margin-top:24px;padding-top:16px}}";
const SSF_COLS=[["Explore",[["Home","/"],["Submit a Dog-Friendly Spot","/submit-a-place"],["Claim Your Listing","/claim-your-business"],["Browse by City","/dog-friendly-places"],["For Businesses","/for-businesses"]]],["Company",[["About","/about"],["Contact","/contact"]]],["Legal",[["Privacy Policy","/privacy-policy"],["Terms of Use","/terms"]]]];
function ssfFindLogo(){const walk=r=>{try{const im=r.querySelector('img[alt="SniffScout"]');if(im&&im.src)return im.src;const all=r.querySelectorAll("*");for(let k=0;k<all.length;k++){const sr=all[k].shadowRoot;if(sr){const x=walk(sr);if(x)return x}}}catch(e){}return ""};return walk(document)}
const SSG_CSS=".ssg{background:#fff;font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D}.ssg *{box-sizing:border-box}.ssg-in{max-width:1180px;margin:0 auto;padding:26px 20px 28px;display:grid;gap:14px;align-items:center}.ssg-hrow{display:flex;align-items:center;gap:9px}.ssg h2{margin:0;font-size:22px;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:#00163D}.ssg-intro p{margin:6px 0 0;font-size:15px;line-height:1.45;font-weight:600;color:#3A4A63;max-width:420px}.ssg-box{background:#F4F6F9;border-radius:16px;padding:14px}.ssg-tabs{display:inline-flex;gap:2px;background:#fff;border:1px solid #E3E8EF;border-radius:999px;padding:3px}.ssg-tabs button{border:0;background:transparent;color:#3A4A63;font:inherit;font-size:13.5px;font-weight:800;padding:0 16px;min-height:34px;border-radius:999px;cursor:pointer}.ssg-tabs button[aria-selected=true]{background:#00163D;color:#fff}.ssg-tabs button:focus-visible{outline:2px solid #FF5A0A;outline-offset:2px}.ssg-steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}.ssg-steps li{display:flex;align-items:center;gap:9px;font-size:14.5px;line-height:1.35;font-weight:700;color:#00163D}.ssg-n{flex:none;width:22px;height:22px;border-radius:50%;background:#fff;border:1.5px solid #FF5A0A;color:#00163D;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center}.ssg-steps svg{flex:none}@media(min-width:768px){.ssg-in{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:40px;padding:34px 40px}.ssg h2{font-size:26px}.ssg-box{padding:16px 18px}.ssg-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px}}.sss{display:flex;gap:10px;margin-top:2px}.sss a{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.1);display:inline-flex;align-items:center;justify-content:center;transition:background-color .15s,transform .15s}.sss a:hover{background:#FF5A0A;transform:translateY(-2px)}.sss a:focus-visible{outline:2px solid #FF9B68;outline-offset:3px}div.sss{gap:12px}div.sss a{width:36px;height:36px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.22);transition:transform .18s,box-shadow .18s}div.sss a:hover{background:#fff;transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.3)}@media(prefers-reduced-motion:reduce){div.sss a{transition:none}}";
const ssgSvg=(c)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c}</svg>;
const SSGI={globe:ssgSvg(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>),share:ssgSvg(<><path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></>),plus:ssgSvg(<path d="M12 5v14M5 12h14"/>),check:ssgSvg(<path d="M5 12l5 5 9-10"/>),dots:ssgSvg(<><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></>)};
const SSG_STEPS={ios:[["globe","Open getsniffscout.com in Safari"],["share","Tap the Share button"],["plus","Select “Add to Home Screen”"],["check","Tap Add"]],android:[["globe","Open getsniffscout.com in Chrome"],["dots","Open the browser menu"],["plus","Select “Add to Home Screen” or “Install app”"]]};
function SSGo(){const [os,setOs]=ssxUseState("ios");ssxUseEffect(()=>{try{if(/android/i.test(navigator.userAgent))setOs("android")}catch(e){}},[]);const onKey=(e)=>{if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const n=os==="ios"?"android":"ios";setOs(n);const p=e.currentTarget.parentElement;const el=p&&p.querySelector('[data-k="'+n+'"]');if(el)el.focus()};return <section className="ssg" aria-labelledby="ssg-h"><style>{SSG_CSS}</style><div className="ssg-in"><div className="ssg-intro"><div className="ssg-hrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg><h2 id="ssg-h">SniffScout on the Go!</h2></div><p>Add SniffScout to your home screen for quick access to dog-friendly spots.</p></div><div className="ssg-box"><div className="ssg-tabs" role="tablist" aria-label="Choose your phone">{[["ios","iPhone"],["android","Android"]].map(([k,t])=><button key={k} data-k={k} id={"ssg-t-"+k} type="button" role="tab" aria-selected={os===k} aria-controls="ssg-p" tabIndex={os===k?0:-1} onClick={()=>setOs(k)} onKeyDown={onKey}>{t}</button>)}</div><ol className="ssg-steps" id="ssg-p" role="tabpanel" aria-labelledby={"ssg-t-"+os}>{SSG_STEPS[os].map(([i,t],n)=><li key={t}><span className="ssg-n">{n+1}</span>{SSGI[i]}<span>{t}</span></li>)}</ol></div></div></section>}
function SSSocial(){const soc=SSX_SOCIAL.filter(s=>(s.k==="fb"||s.k==="ig")&&/^https:\/\//.test(s.u));if(!soc.length)return null;return <div className="sss">{soc.map(s=><a key={s.k} href={s.u} target="_blank" rel="noopener noreferrer" aria-label={"SniffScout on "+s.n} title={s.n}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{s.k==="fb"?<path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>:<><defs><radialGradient id="ssigg" cx="6" cy="25" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC80"/><stop offset=".12" stopColor="#FCAF45"/><stop offset=".25" stopColor="#F77737"/><stop offset=".38" stopColor="#F56040"/><stop offset=".5" stopColor="#FD1D1D"/><stop offset=".62" stopColor="#E1306C"/><stop offset=".75" stopColor="#C13584"/><stop offset=".88" stopColor="#833AB4"/><stop offset="1" stopColor="#5851DB"/></radialGradient></defs><g fill="none" stroke="url(#ssigg)" strokeWidth="2.3"><rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6"/><circle cx="12" cy="12" r="4.4"/></g><circle cx="17.6" cy="6.4" r="1.4" fill="url(#ssigg)"/></>}</svg></a>)}</div>}
function SSFooter(){const [lg,setLg]=ssxUseState("");ssxUseEffect(()=>{let n=0;const t=setInterval(()=>{const s=ssfFindLogo();if(s){setLg(s);clearInterval(t)}else if(++n>20)clearInterval(t)},300);return()=>clearInterval(t)},[]);return <><style>{SSG_CSS}</style><SSGo/><footer className="ssf"><style>{SSF_CSS}</style><div style={{height:2,background:"#FF5A0A"}}/><div className="ssf-in"><div className="ssf-top"><div style={{display:"grid",gap:10,alignContent:"start"}}>{lg?<img src={lg} alt="" aria-hidden="true" style={{height:48,width:"auto",display:"block"}}/>:<span style={{fontFamily:"'Bricolage Grotesque',Figtree,sans-serif",fontSize:26,fontWeight:800,color:"#fff",lineHeight:"48px"}}>Sniff<span style={{color:"#FF7A3D"}}>Scout</span></span>}<a href="/contact" className="ssf-l">Contact SniffScout →</a><SSSocial/></div><div className="ssf-cols">{SSF_COLS.map(([h,ls])=><div key={h} style={{minWidth:0}}><h4>{h}</h4><ul>{ls.map(([t,u])=><li key={t}><a href={u} className="ssf-l">{t}</a></li>)}</ul></div>)}</div></div><div className="ssf-bot"><p>© {new Date().getFullYear()} SniffScout. All rights reserved.</p><p>Made with <span aria-hidden="true">🐾</span> for dog lovers</p></div></div></footer></>}

import { PawPrint, MapPin, ArrowRight, ChevronRight, Utensils, Beer, Coffee, Sun, Umbrella, Home, Trees, Ban, Crown, Droplets, Bone, CupSoda, Flame, Camera, Store, Tag, Armchair } from "lucide-react";
import { datasource, useRecords, q } from "@/lib/datasource";
import { placeHref as __ph } from "@/lib/place-links";
import { useCitySlug } from "@/lib/city-context";

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
const VERIFIED_PILL = "https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/07157306-2df8-47ec-a729-9ffaed0f57ab.png";
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

const RC_CSS = ".ss-rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}.ss-rc{background:#fff;color:#00163D;border:1.5px solid #DDE3EC;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 3px 10px rgba(0,22,61,.05)}.ss-rimg{display:block;position:relative;height:150px;background:#EEF1F5;overflow:hidden;text-decoration:none;flex:none}.ss-rbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(18px) brightness(.85);transform:scale(1.15)}.ss-rfg{position:relative;width:100%;height:100%;object-fit:contain}.ss-nophoto{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;height:100%;width:100%;padding:12px 16px;text-align:center;background:linear-gradient(160deg,#FFEBDF 0%,#FFF6F0 45%,#FFFFFF 100%)}.ss-npi{position:relative;flex:none;width:46px;height:46px;border-radius:50%;background:#fff;border:1.5px solid #FFD2BC;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(255,90,10,.14)}.ss-npp{position:absolute;right:-3px;bottom:-2px;width:18px;height:18px;border-radius:50%;background:#FF5A0A;border:2px solid #fff;display:flex;align-items:center;justify-content:center}.ss-npx{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0}.ss-nph{font-size:15.5px;font-weight:800;color:#00163D;line-height:1.2;letter-spacing:-.01em}.ss-nps{font-size:12px;color:#46556A;line-height:1.35}.ss-npb{margin-top:7px;display:inline-flex;align-items:center;gap:5px;background:#fff;color:#FF5A0A;border:1.5px solid #FF5A0A;border-radius:99px;padding:5px 13px;font-size:12px;font-weight:800;line-height:1.2;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}.ss-npb:hover,.ss-npb:focus-visible{background:#FF5A0A;color:#fff}.ss-npb:focus-visible{outline:2px solid #00163D;outline-offset:2px}.ss-rb{padding:12px 14px 13px;display:flex;flex-direction:column;gap:6px;flex:1}.ss-rn{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}.ss-rn h3{margin:0;position:relative;padding-left:13px;font-size:20px;line-height:1.18;font-weight:800;letter-spacing:-.015em;overflow-wrap:break-word;text-wrap:pretty;min-width:0}.ss-rn h3::before{content:'';position:absolute;left:0;top:.16em;width:4px;height:.9em;border-radius:4px;background:#FF5A0A}.ss-rn h3 a{color:#00163D;text-decoration:none}.ss-vp{width:88px;height:auto}.ss-rm{margin-top:-3px;padding-left:13px;font-size:12.5px;font-weight:600;color:#6B7689;letter-spacing:.005em;line-height:1.4}.ss-rd{margin:0;font-size:14px;line-height:1.5;color:#2C3550}.ss-pk{margin-top:2px}.ss-pkl{display:flex;align-items:center;gap:4px;font-size:11.5px;font-weight:800;color:#00163D;margin:0 0 5px;letter-spacing:.01em}.ss-rp{display:flex;flex-wrap:wrap;gap:5px}.ss-rp span,.ss-rp a{background:#FFF0E7;color:#923709;font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:99px;line-height:1.35;text-decoration:none}.ss-rp .ss-more{background:#fff;border:1px solid #FFD2BA;color:#B5470D}.ss-sp{flex:1 0 0}.ss-rv{margin-top:0;display:flex;align-items:center;justify-content:center;min-height:42px;box-sizing:border-box;background:#00163D;color:#fff;font-weight:800;font-size:14.5px;padding:10px 12px;border-radius:11px;text-decoration:none}.ss-rcl{align-self:center;display:inline-flex;align-items:center;gap:6px;min-height:34px;box-sizing:border-box;background:#FFF0E7;color:#00163D;font-size:12.5px;font-weight:700;padding:7px 14px;border-radius:99px;text-decoration:none;white-space:nowrap;margin-top:1px}.ss-rcl:hover{background:#FFE4D4}.ss-tdc{grid-column:1/-1;border:2px solid #FF5A0A;box-shadow:0 10px 26px rgba(255,90,10,.16)}.ss-tdc .ss-rimg{height:200px}.ss-tdc .ss-rb{padding:14px 16px 15px;gap:7px}.ss-tdc .ss-rn h3{font-size:23px}.ss-tdb{position:absolute;top:10px;left:10px;display:inline-flex;align-items:center;gap:6px;background:#00163D;color:#fff;font-size:12px;font-weight:800;padding:6px 11px 6px 9px;border-radius:99px;box-shadow:0 4px 12px rgba(0,0,0,.25)}.ss-rp span{display:inline-flex;align-items:center;gap:5px;color:#00163D}.ss-rp span svg{flex:none;color:#FF5A0A}.ss-rp span.ss-un{background:#fff;box-shadow:inset 0 0 0 1px #FFC9AD;color:#46556A}.ss-rgrid.ss-rgrid{gap:22px}.ss-rc.ss-c2{border:1.5px solid #C6D1E2;border-radius:16px;box-shadow:0 6px 18px rgba(0,22,61,.09),0 1px 3px rgba(0,22,61,.06);padding:14px 14px 13px;gap:10px;min-width:0;background:#fff}.ss-c2h{display:flex;gap:12px;align-items:flex-start;min-width:0}.ss-c2t{flex:none;width:64px;height:64px;border-radius:14px;overflow:hidden;display:block;background:#EEF3FA;border:1.5px solid #D3DCEA;box-sizing:border-box}.ss-c2t img{width:100%;height:100%;object-fit:cover;display:block}.ss-c2i{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#0D2A58,#00163D);color:#FF7A3D}.ss-c2n{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.ss-c2n h3{margin:0;font-size:19px;line-height:1.22;font-weight:800;letter-spacing:-.01em;overflow-wrap:break-word}.ss-c2n h3 a{color:#00163D;text-decoration:none}.ss-c2m{display:flex;align-items:flex-start;gap:4px;font-size:12.5px;font-weight:600;color:#5A6880;line-height:1.35}.ss-c2m svg{flex:none;color:#FF5A0A;margin-top:1px}.ss-c2n .ss-vp{width:92px;height:auto;margin-top:2px}.ss-c2b{align-self:flex-start;display:inline-flex;align-items:center;gap:5px;background:#00163D;color:#fff;font-size:11px;font-weight:800;padding:3px 9px 3px 7px;border-radius:99px;letter-spacing:.02em;margin-bottom:1px}.ss-c2b svg{color:#FF7A3D}.ss-rc.ss-c2td{border:2px solid #FF5A0A;box-shadow:0 8px 24px rgba(255,90,10,.18),0 1px 3px rgba(0,22,61,.06)}.ss-c2td .ss-c2t{border:2px solid #FF5A0A}.ss-rc.ss-c2 .ss-rd{font-size:13.5px;line-height:1.45}.ss-rc.ss-c2 .ss-pk{margin-top:0;padding:7px 8px 8px}.ss-rc.ss-c2 .ss-pkl{font-size:11px;margin:0 0 5px}.ss-rc.ss-c2 .ss-rp{gap:5px}.ss-rc.ss-c2 .ss-rp span{padding:3px 8px 3px 6px;font-size:11.5px}.ss-c2v{display:flex;align-items:center;justify-content:center;gap:6px;min-height:42px;box-sizing:border-box;background:#00163D;color:#fff;font-weight:800;font-size:14px;padding:9px 14px;border-radius:11px;text-decoration:none}.ss-c2v:hover{background:#0A2752}.ss-c2v svg{color:#fff}.ss-c2cl{align-self:center;font-size:12.5px;font-weight:600;color:#46556A;text-decoration:underline;text-underline-offset:3px;text-decoration-color:#FFB48C;padding:3px 6px;margin-top:-3px}.ss-c2cl:hover{color:#00163D}@media(max-width:767px){.ss-rgrid.ss-rgrid{gap:20px}.ss-rc.ss-c2{padding:13px 12px 12px}.ss-c2t{width:56px;height:56px;border-radius:12px}.ss-c2n h3{font-size:18px}}.ss-c2d{margin:0;font-size:13.5px;line-height:1.45;color:#3B475C;font-weight:500;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.ss-rc.ss-c2 .ss-c2p{border-top:1px solid #E6EBF3;padding-top:10px;display:flex;flex-direction:column;gap:8px;position:relative}.ss-rc.ss-c2 .ss-c2p::before{content:'';position:absolute;top:-1px;left:0;width:34px;height:2px;border-radius:2px;background:#FF5A0A}.ss-c2ph{display:flex;align-items:center;gap:7px;margin:0;font-size:17px;font-weight:800;color:#00163D;line-height:1.2;letter-spacing:-.005em}.ss-c2ph svg{color:#FF5A0A;flex:none}.ss-c2ph small{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#7D889B;border:1px solid #DDE3EC;border-radius:99px;padding:2px 7px;margin-left:2px;line-height:1.3}.ss-rc.ss-c2 .ss-c2p .ss-rp{display:flex;flex-wrap:wrap;gap:6px}.ss-rc.ss-c2 .ss-c2p .ss-rp span{display:inline-flex;align-items:center;gap:5px;background:#FFF5EE;border:1.5px solid #FF8A4C;color:#00163D;font-weight:800;font-size:12px;line-height:1.3;padding:4px 10px 4px 8px;border-radius:99px;box-shadow:none}.ss-rc.ss-c2 .ss-c2p .ss-rp span svg{color:#FF5A0A;flex:none}.ss-rc.ss-c2 .ss-c2p .ss-rp span.ss-un{background:#fff;border:1.5px solid #FFC9AD;color:#46556A;font-weight:700}.ss-c2g{display:flex;align-items:center;flex-wrap:wrap;gap:8px 10px;background:#FFF4EC;border-radius:12px;padding:9px 10px}.ss-c2gi{flex:none;width:34px;height:34px;border-radius:50%;background:#fff;border:1px solid #FFD3BC;display:flex;align-items:center;justify-content:center;color:#FF5A0A}.ss-c2gt{flex:1 1 120px;min-width:0;display:flex;flex-direction:column;line-height:1.25;gap:1px}.ss-c2gt b{font-size:13.5px;font-weight:800;color:#00163D}.ss-c2gt span{font-size:12px;color:#5A6880;font-weight:600}.ss-c2gb{flex:none;margin-left:auto;display:inline-flex;align-items:center;gap:5px;min-height:34px;box-sizing:border-box;border:1.5px solid #FF5A0A;color:#C2490B;background:#fff;font-size:12px;font-weight:800;padding:6px 12px;border-radius:99px;text-decoration:none}.ss-c2gb:hover{background:#FF5A0A;color:#fff}@media(max-width:767px){.ss-c2ph{font-size:18px}.ss-c2d{font-size:13.5px}}.ss-c2x{display:flex;align-items:center;gap:10px;align-self:flex-start;text-decoration:none;color:#00163D;font-size:13px;font-weight:800;min-height:38px}.ss-c2xt{display:flex;padding-left:8px}.ss-c2xt img{width:36px;height:36px;border-radius:9px;object-fit:cover;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,22,61,.2);margin-left:-8px;background:#EEF3FA}.ss-c2x b{color:#FF5A0A;font-weight:900}.ss-c2x:hover span:last-child{text-decoration:underline;text-underline-offset:3px}.ss-rc.ss-c2:not(.ss-c2td){border:1px solid #D3DCE9;box-shadow:0 4px 14px rgba(0,22,61,.07),0 1px 2px rgba(0,22,61,.05)}.ss-rc.ss-c2{gap:10px}.ss-c2t{width:72px;height:72px;border-radius:14px}.ss-c2n{gap:4px}.ss-c2n h3{position:relative;padding-left:12px}.ss-c2n h3::before{content:'';position:absolute;left:0;top:3px;bottom:3px;width:4px;border-radius:4px;background:#FF5A0A}.ss-c2m{padding-left:12px;color:#6B7689;font-weight:600;font-size:12.5px}.ss-c2n .ss-vp,.ss-c2n .ss-c2b{margin-left:12px}.ss-c2d{color:#4A5568;line-height:1.55;font-weight:400}.ss-rc.ss-c2 .ss-c2p::before{display:none}.ss-c3g{display:flex;align-items:center;gap:10px;min-height:44px;border-top:1px solid #EEF1F6;padding-top:8px;text-decoration:none;color:#00163D}.ss-c3gi{flex:none;color:#FF5A0A}.ss-c3gt{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.25}.ss-c3gt b{font-size:13.5px;font-weight:800;color:#00163D}.ss-c3gt span{font-size:12px;color:#6B7689;font-weight:500}.ss-c3gb{flex:none;font-size:13px;font-weight:800;color:#E5530A;padding:6px 0 6px 6px}.ss-c3g:hover .ss-c3gb{text-decoration:underline;text-underline-offset:3px}.ss-c2v{min-height:42px;padding:8px 14px}.ss-c2cl{font-size:12px;font-weight:600;color:#6B7689;text-decoration-color:#C9D2DF;margin-top:-4px;padding:5px 6px}@media(max-width:767px){.ss-c2t{width:64px;height:64px;border-radius:13px}}.ss-c2cl{display:inline-flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:2px 6px;align-self:center;text-align:center;text-decoration:none;font-size:13px;line-height:1.35;padding:5px 6px 2px;margin-top:0}.ss-c2cli{color:#FF5A0A;flex:none}.ss-c2clq{color:#00163D;font-weight:600}.ss-c2cl b{color:#E5530A;font-weight:800;font-size:13.5px;white-space:nowrap}.ss-c2cl:hover b{text-decoration:underline;text-underline-offset:3px}.ss-rc.ss-c2 .ss-c2p{background:#F2F5FA;border-top:0;border-radius:12px;padding:10px 11px 11px;gap:7px}.ss-c3g{border-top:0;padding-top:0}.ss-c2hd{position:relative;display:flex;flex-direction:column;gap:4px;padding-left:12px}.ss-c2hd::before{content:'';position:absolute;left:0;top:3px;bottom:3px;width:4px;border-radius:4px;background:#FF5A0A}.ss-c2n .ss-c2hd h3{padding-left:0}.ss-c2n .ss-c2hd h3::before{content:none}.ss-c2n .ss-c2hd .ss-c2m{padding-left:0}.ss-rgrid.ss-rgrid{gap:22px}.ss-rgrid .ss-rc.ss-c2:not(.ss-c2td){box-shadow:0 4px 14px rgba(0,0,0,.22)}.ss-rnav{background:#00163D;margin:14px -16px -16px;padding:22px 16px 26px}.ss-rnav-c{background:#00163D;box-shadow:0 0 0 100vmax #00163D;clip-path:inset(0 -100vmax);margin:20px 0 -44px;padding:22px 0 30px}@media(max-width:767px){.ss-rgrid.ss-rgrid{gap:22px}.ss-rnav{padding:18px 4px 22px}}.ss-rc .ss-pk{background:#F5F7FA;border-radius:12px;padding:9px 10px 10px;margin-top:4px}.ss-rc .ss-pkl{margin:0 0 7px;font-size:12px;letter-spacing:.01em}.ss-rc .ss-rp{gap:6px}.ss-rc .ss-rp span{background:#FFF1E8;border:1px solid #FF8A4C;color:#00163D;font-weight:800;padding:4px 10px 4px 8px;box-shadow:none}.ss-rc .ss-rp span.ss-un{background:#fff;border:1px solid #FFC9AD;color:#46556A;font-weight:700}.ss-rc .ss-rp .ss-more{background:#fff;border:1px solid #FFC9AD;color:#B5470D;font-weight:800;padding:4px 10px}.ss-rc .ss-nophoto{background:linear-gradient(160deg,#FFF3EC 0%,#FFFAF7 55%,#FFFFFF 100%)}.ss-rc .ss-npi{width:40px;height:40px;box-shadow:none;border-color:#FFDCC9}.ss-rc .ss-nph{font-size:14px;font-weight:700}.ss-rc .ss-nps{font-size:11.5px;color:#6B7689}.ss-rc .ss-npb{font-size:11.5px;padding:4px 11px;border-width:1px}@media(max-width:767px){.ss-rc .ss-pk{padding:8px 9px 9px}.ss-rc .ss-npi{width:42px;height:42px}.ss-rc .ss-nph{font-size:14px}.ss-rc .ss-nps{font-size:11px}}.ss-cls{display:flex;flex-wrap:wrap;gap:5px;margin-top:2px}.ss-cb{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:800;line-height:1.2;padding:5px 10px 5px 8px;border-radius:99px;background:#00163D;color:#fff}.ss-cb svg{flex:none;color:#FF7A3D}.ss-cb.acc{background:#fff;color:#00163D;box-shadow:inset 0 0 0 1.5px #00163D}.ss-cb.acc svg{color:#FF5A0A}@media(min-width:768px){.ss-tdc{flex-direction:row}.ss-tdc .ss-rimg{height:auto;min-height:250px;width:44%}.ss-tdc .ss-rb{padding:18px 22px}.ss-tdc .ss-rv{align-self:flex-start;padding:10px 28px}.ss-tdc .ss-rcl{align-self:flex-start}}@media(max-width:767px){.ss-rgrid{gap:12px}.ss-rc:not(.ss-tdc) .ss-rimg{height:140px}.ss-tdc .ss-rimg{height:190px}.ss-rb{padding:11px 13px 12px}.ss-rn h3{font-size:22px}.ss-tdc .ss-rn h3{font-size:24px}.ss-rc:not(.ss-tdc) .ss-rimg:has(.ss-nophoto){height:112px}.ss-nophoto{flex-direction:row;justify-content:flex-start;gap:13px;padding:10px 16px;text-align:left}.ss-npx{align-items:flex-start}.ss-npi{width:50px;height:50px}.ss-nph{font-size:15px}.ss-nps{font-size:11.5px}.ss-npb{margin-top:6px;padding:4px 12px}.ss-tdc .ss-rimg:has(.ss-nophoto){height:146px}}@media(max-width:360px){.ss-rcl{font-size:12px;padding:7px 11px}}.ss-promo{display:flex;gap:9px;align-items:flex-start;background:#FFF6F0;border:1.5px solid #FFC9AD;border-radius:12px;padding:9px 11px;text-decoration:none;color:#00163D}.ss-promo b{display:block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:#C2490B;font-weight:900}.ss-promo strong{display:block;font-size:14px;line-height:1.3;font-weight:800;margin-top:1px}.ss-promo span{display:block;font-size:12.5px;line-height:1.4;color:#46556A;margin-top:2px}.ss-tdbrk{grid-column:1/-1;height:0}.ss-rc.ss-c2.ss-c2td{box-shadow:0 12px 30px rgba(255,90,10,.24),0 1px 3px rgba(0,22,61,.06)}.ss-c2td .ss-c2h{flex-direction:column;align-items:stretch;gap:12px}.ss-c2td .ss-c2t{width:100%;height:116px;border-radius:14px}.ss-c2td .ss-c2i svg{width:34px;height:34px}.ss-c2td .ss-c2n h3,.ss-c2td .ss-c2hd h3{font-size:21px}.ss-c2td .ss-c2b{font-size:12.5px;padding:5px 12px 5px 9px;margin-bottom:2px}.ss-c2td .ss-c2b svg{width:14px;height:14px}.ss-c2td .ss-promo{background:#FFF1E6;border:1.5px solid #FF8A4C;border-left:5px solid #FF5A0A;border-radius:12px;padding:11px 13px}.ss-c2td .ss-promo strong{font-size:15px}@media(max-width:767px){.ss-c2td .ss-c2t{width:100%;height:120px}}.tds{background:#FFF5EF;border:1px solid #FFD6BF;border-radius:20px;padding:18px 18px 18px;margin:0 0 24px;color:#00163D;box-shadow:0 10px 30px -18px rgba(0,22,61,.45)}.tds-h{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 14px}.tds-t{display:flex;align-items:center;gap:10px;min-width:0}.tds-ic{flex:none;width:40px;height:40px;border-radius:50%;background:#FF5A0A;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(255,90,10,.3)}.tds h2{margin:0;font-size:23px;line-height:1.15;font-weight:800;color:#00163D;font-family:'Bricolage Grotesque',Figtree,sans-serif;letter-spacing:-.01em}.tds-t p{margin:2px 0 0;font-size:13px;font-weight:600;color:#8A4A22}.tds-nav{display:none;align-items:center;gap:6px;flex:none}.tds-ct{font-size:12.5px;font-weight:800;color:#00163D;margin-right:2px;white-space:nowrap}.tds-nav button{width:36px;height:36px;border-radius:50%;border:1.5px solid #00163D;background:#fff;color:#00163D;font-size:24px;line-height:1;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 0 3px;font-family:inherit}.tds-nav button:disabled{opacity:.35;cursor:default}.tds-nav button:focus-visible,.tds-all:focus-visible{outline:2px solid #FF5A0A;outline-offset:2px}.tds-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:18px}.tds-i{grid-column:span var(--sd);min-width:0;display:flex}.tds-i>.ss-rc{flex:1;min-width:0}.tds-all{display:none;margin:12px auto 0;background:none;border:0;color:#C2490B;font-weight:800;font-size:14.5px;text-decoration:underline;text-underline-offset:3px;cursor:pointer;font-family:inherit;min-height:40px}@media(min-width:1024px){.tds-i[data-wd=\"1\"] .ss-c2td{display:grid;grid-template-columns:minmax(0,42%) minmax(0,1fr);column-gap:18px;row-gap:0;align-content:start}.tds-i[data-wd=\"1\"] .ss-c2h{display:contents}.tds-i[data-wd=\"1\"] .ss-c2t{grid-column:1;grid-row:1 / span 12;width:auto;height:auto;min-height:250px;align-self:stretch}.tds-i[data-wd=\"1\"] .ss-c2td>*:not(.ss-c2h){grid-column:2;margin-bottom:10px}.tds-i[data-wd=\"1\"] .ss-c2n{grid-column:2;margin-bottom:10px}.tds-i[data-wd=\"1\"] .ss-sp{display:none}}@media(min-width:768px) and (max-width:1023px){.tds-g{grid-template-columns:repeat(2,minmax(0,1fr))}.tds-i{grid-column:span var(--st)}.tds-i[data-wt=\"1\"] .ss-c2td{display:grid;grid-template-columns:minmax(0,42%) minmax(0,1fr);column-gap:18px;row-gap:0;align-content:start}.tds-i[data-wt=\"1\"] .ss-c2h{display:contents}.tds-i[data-wt=\"1\"] .ss-c2t{grid-column:1;grid-row:1 / span 12;width:auto;height:auto;min-height:250px;align-self:stretch}.tds-i[data-wt=\"1\"] .ss-c2td>*:not(.ss-c2h){grid-column:2;margin-bottom:10px}.tds-i[data-wt=\"1\"] .ss-c2n{grid-column:2;margin-bottom:10px}.tds-i[data-wt=\"1\"] .ss-sp{display:none}}@media(max-width:767px){.tds{padding:14px 0 14px 14px;border-radius:16px}.tds-h{padding-right:14px;align-items:flex-start}.tds h2{font-size:20px}.tds-nav{display:flex}.tds-g{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding:2px 14px 8px 0;scrollbar-width:none;-webkit-overflow-scrolling:touch}.tds-g::-webkit-scrollbar{display:none}.tds-g{align-items:flex-start}.tds-i{flex:0 0 86%;scroll-snap-align:start}.tds-i .ss-c3g{display:none}.tds-i .ss-c2d{-webkit-line-clamp:2}.tds.one .tds-i{flex-basis:calc(100% - 14px)}.tds-all{display:block}.tds.exp .tds-g{display:grid;grid-template-columns:minmax(0,1fr);overflow:visible;padding-right:14px}.tds.exp .tds-nav{display:none}}";
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
            <h1 className="cp-h" style={{ fontSize: "clamp(34px,5.4vw,56px)", lineHeight: 1.04, margin: "10px 0 12px", fontWeight: 800 }}>Dog-Friendly Places by City</h1>
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
          <h1 className="cp-h" style={{ fontSize: "clamp(32px,5.2vw,54px)", lineHeight: 1.05, margin: "16px 0 12px", fontWeight: 800 }}>Dog-Friendly Places in {place}</h1>
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
        <h2 className="cp-h" style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, margin: 0 }}>{city ? "Know a dog-friendly spot in " + city + "?" : "Know a dog-friendly spot we're missing?"}</h2>
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