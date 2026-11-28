"use client";
// Page title and description are set on the server (app/for-businesses/page.tsx).
import React, { useEffect, useState } from "react";
import { useState as ssxUseState, useEffect as ssxUseEffect } from "react";
import { OnTheGo as SSGo } from "@/components/on-the-go";
const SSX_SOCIAL=[{n:"Facebook",u:"https://www.facebook.com/sniffscout",k:"fb"},{n:"Instagram",u:"https://www.instagram.com/getsniffscout",k:"ig"},{n:"TikTok",u:"",k:"tt"}];

import { datasource, q, useRecords } from "@/lib/datasource";
import { useTextSetting, useImageSetting, useBooleanSetting } from "@/lib/editable-settings";
import { Crown, PawPrint, Check, Star, BadgeCheck, MapPin, Search, Phone, MessageCircle, Mail, ChevronDown, Sparkles, Tag, Bone, Clock, ShieldCheck, Navigation, Store, ClipboardCheck, RefreshCw, ArrowRight, Megaphone } from "lucide-react";
import { LOGO } from "@/lib/logo";
import { ssTypoInit } from "@/lib/ss-typo";
import { FB_CSS as CSS } from "./for-businesses-style";
import { starPath, CafeScene, GoldenPeek, CrownPeek, LabBall, FluffyWhite, CoffeeDog, HuskyPup, BeagleLeash, CorgiWave, PugLook, SchnauzerClip, DalmatianStars } from "./for-businesses-art";
// Sample cafe photo: Unsplash (free under the Unsplash License), unsplash.com/photos/TWnkzAgeJNc
const SAMPLE_CAFE = "https://images.unsplash.com/photo-1682591901241-568a0def684a?fm=jpg&q=75&w=1000&h=640&fit=crop&crop=focalpoint&fp-x=.55&fp-y=.5";
const SAMPLE_COFFEE = SAMPLE_CAFE;
const SAMPLE_PATIO = SAMPLE_CAFE;

const ds = datasource.define({ places: "places" });
const placeSel = q.select({ name: "Business Name", city: "City", state: "State", type: "Business Type", desc: "Short Description", photo: "Main Photo", area: "Dog-Friendly Area", water: "Water Bowls Available", treats: "Dog Treats Available", cups: "Pup Cups Available", menu: "Dog Menu Available", status: "Listing Status", claimed: "Claimed by Business" });

const BRAND_DOGS = "https://lmqrgeh284epdg91.public.blob.vercel-storage.com/site/48871c65-417f-43d7-b2fd-558fee7d2931.png";

const PHONE_DISPLAY = "859-468-8016";
const TEL = "tel:+18594688016";
const SMS = "sms:+18594688016";
const CLAIM = "/claim-your-business";
// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const WAITLIST = "mailto:" + CONTACT_EMAIL + "?subject=Top%20Dog%20Partner%20Membership";

const NAVY = "#00163D", OR = "#FF5A0A", PEACH = "#FFF0E6";

const readable = (v: any): string => Array.isArray(v) ? v.map(readable).filter(Boolean).join(", ") : v && typeof v === "object" ? String(v.name ?? v.label ?? v.value ?? "") : String(v ?? "");
const photoOf = (v: any): string => { const a = Array.isArray(v) ? v[0] : v; if (!a) return ""; if (typeof a === "string") return a; return a.thumbnails?.large?.url || a.url || a.src || ""; };
const isYes = (v: any) => /^yes$/i.test(readable(v));

const Ck = () => <span className="fb-ck"><Check size={15} strokeWidth={3.4} /></span>;

const FREE = ["Name, location, category and contact info", "Shown in the directory and on the map", "Dog-friendly amenities and pup perks", "Website and directions links", "SniffScout Verified badge once you're approved", "Free updates, reviewed by me"];
const TOPDOG_KEY: [any, string, string][] = [[Search, "Get Seen First in Search", "Show up above free listings in relevant searches, including nearby."], [Crown, "Stand Out With a Featured Listing", "A highlighted card with a Top Dog Partner badge."], [Tag, "Promote Your Specials", "Your current special shows right on your listing."], [Megaphone, "Get a Social Media Shout-Out", "A welcome spotlight on SniffScout's social media pages."]];
const TOPDOG = ["Everything in the Free Listing", "Rotating homepage features near you", "Swap your special anytime", "Top Dog Partner window decal"];

const FAQS: [string, string][] = [
  ["Is my basic listing really free?", "Yep, 100% free and it stays that way. No credit card, no catch. Your free listing shows your business, your dog-friendly details and links to your website and directions."],
  ["How do I claim my business?", "Click Find & Claim My Listing, type your business name and pick it from the list. Then fill out a short form so I know you're with the business. Not listed yet? Check the box that says your business isn't listed and I'll review it to be added."],
  ["What does SniffScout Verified mean?", "It means I've confirmed you're the owner or manager, and I've checked your dog-friendly details. The badge only shows up after I approve your claim, so dog lovers know they can trust what they see."],
  ["What's included in Top Dog Partner?", "Everything in the free listing, plus a Top Dog Partner badge, a highlighted premium card, priority placement in relevant local searches, a chance to rotate into nearby homepage features, one active special or pup-friendly promotion, a welcome shout-out on SniffScout's social media pages and a Top Dog window decal."],
  ["Will I always appear on the homepage?", "No, and I want to be upfront about that. Homepage features rotate between Top Dog Partners near the city or area a visitor picks, so everyone gets a fair turn. No business is promised a permanent spot or the #1 position."],
  ["How do I submit a special or promotion?", "Just call, text or email me with your special and I'll get it added. You can have one active special at a time, and you can ask me to swap it out whenever you'd like."],
  ["How much does Top Dog Partner cost?", "Founding Top Dog Partners get a special rate of $37/month (regularly $47/month). Your founding rate stays the same as long as your membership remains active. Once founding spots are filled, new partners pay $47/month."],
  ["Is there a contract or setup fee?", "Nope! No setup fees, no long-term contracts, and you can cancel anytime."],
  ["Can I promote specials that aren't dog-related?", "Absolutely! Your promotions can be anything your business is offering, from happy hour and weekly food specials to seasonal drinks, events, or dog-friendly deals."],
  ["How does my business get verified?", "Claim your free listing and confirm your business details. Once your claim has been reviewed and approved, your listing earns the SniffScout Verified badge."],
  ["How do I cancel?", "Call, text or email me and I'll take care of it. No cancellation fees and no hard feelings."],
  ["How long does activation take?", "Checkout takes about two minutes. After that, I personally review your business and set up your Top Dog listing, so it can take a little extra time before everything goes live. I'll keep you posted along the way."],
];

function FaqItem({ q: qq, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="fb-qi">
      <button type="button" className="fb-q" aria-expanded={open} aria-controls={"fbq" + i} onClick={() => setOpen(!open)}>{qq}<span className="ic"><ChevronDown size={18} /></span></button>
      {open && <div id={"fbq" + i} className="fb-a">{a}</div>}
    </div>
  );
}

const FB_PE: any = { "Dog-friendly patio": "🌳 Patio", "Dogs allowed inside": "🏠 Dogs allowed inside", "Water bowls": "💧 Water bowls", "Pup cups": "🥤 Pup cups", "Dog treats": "🦴 Dog treats", "Dog menu": "🍽️ Dog menu" };
function ListingCard({ big, name, place, type, desc, photo, art, perks, verified, claimed, deal, dealLabel }: any) {
  const all = (perks || []).map((p: string) => FB_PE[p] || p);
  const shown = all;
  const extra = all.length - shown.length;
  return (
    <div className={"fb-rc" + (big ? " td" : "")}>
      <div className="fb-rh">
        <span className="fb-rt">{photo ? <img src={photo} alt="" loading="lazy" /> : art ? <CafeScene /> : <Store size={big ? 30 : 24} />}</span>
        <div className="fb-rn">
          {big && <span className="fb-rb"><Crown size={13} /> Top Dog Partner</span>}
          <div className="fb-rhd"><h3>{name}</h3><div className="fb-rm"><MapPin size={13} /> {place}{type ? " · " + type : ""}</div></div>
          {verified && <span className="fb-ver"><BadgeCheck size={13} /> Verified</span>}
        </div>
      </div>
      {desc && <p className="fb-rd">{desc}</p>}
      {big && deal && <div className="fb-rpromo"><Tag size={17} color="#FF5A0A" style={{ flex: "none", marginTop: 2 }} /><div><b>{dealLabel || "Current special"}</b><strong>{deal}</strong></div></div>}
      {all.length > 0 && <div className="fb-rpk"><div className="fb-rpkh"><PawPrint size={16} /> Pup Perks</div><div className="fb-rps">{all.map((p: string) => <span key={p}>{p}</span>)}</div></div>}
      <span className="fb-rg"><PawPrint size={17} /><span><b>Got a pup pic?</b><small>Share your dog's visit!</small></span><em>Add Photo</em></span>
      <span className="fb-rv">View Details <ArrowRight size={15} /></span>
      {!big && !claimed && <span className="fb-rcl"><Store size={14} /> Own this business? <b>Claim Your Free Listing →</b></span>}
    </div>
  );
}

function perksOf(f: any): string[] {
  const out: string[] = [];
  const area = readable(f.area);
  if (/patio|outdoor|rooftop/i.test(area)) out.push("Dog-friendly patio");
  if (/indoor/i.test(area)) out.push("Dogs allowed inside");
  if (isYes(f.water)) out.push("Water bowls");
  if (isYes(f.treats)) out.push("Dog treats");
  if (isYes(f.cups)) out.push("Pup cups");
  if (isYes(f.menu)) out.push("Dog menu");
  return out;
}

const PS2_CSS = ".fb .fb-search.ps2{position:relative;overflow:hidden;background:#00163D;border:2px solid #FF5A0A;border-radius:20px;padding:20px 20px 18px;box-shadow:0 18px 40px -20px rgba(0,22,61,.55)}.fb .ps2>*{position:relative;z-index:1}.fb .ps2>.ps2-paw{position:absolute;z-index:0;color:#fff;opacity:.06;pointer-events:none}.fb .fb-search.ps2>h3{color:#fff!important;font-size:clamp(22px,3vw,27px);line-height:1.15;margin:0 0 10px}.fb .ps2>h3 em{font-style:normal;color:#FF5A0A}.fb .ps2 .fb-sic{width:42px;height:42px;border-radius:12px;background:#FF5A0A;color:#fff;box-shadow:none}.fb .fb-search.ps2>p.ps2-tag{margin:0 0 2px;font-size:15.5px;color:#FF9B68!important;font-weight:800!important}.fb .fb-search.ps2>p.ps2-sub{margin:0 0 14px;font-size:14.5px;line-height:1.45;color:rgba(255,255,255,.88)!important;font-weight:600!important}.fb .ps2 .fb-in{border:1.5px solid #FF5A0A;color:#00163D;background:#fff}.fb .ps2 .fb-in:focus{border-color:#FF5A0A;box-shadow:0 0 0 3px rgba(255,90,10,.3)}.fb .ps2 .fb-pnote{color:rgba(255,255,255,.85)}.fb .ps2 .fb-pnote svg{color:#FF5A0A;stroke:#FF5A0A}.fb .ps2 .fb-lbl.o{background:#FF5A0A}.fb .ps2 .fb-nv{background:#FF5A0A;box-shadow:none}.fb .ps2 .fb-nv:hover{background:#FF6F2B}@media(min-width:768px){.fb .fb-search.ps2{padding:24px 26px 20px}}";

function PreviewSearch() {
  const [term, setTerm] = useState("");
  const [deb, setDeb] = useState("");
  const [pick, setPick] = useState<any>(null);
  useEffect(() => { const t = setTimeout(() => setDeb(term.trim()), 250); return () => clearTimeout(t); }, [term]);
  // All places are already on the page, so the name match happens just below.
  const res = useRecords({ from: ds.places, select: placeSel });
  const d: any = res.data;
  const rows: any[] = (d?.pages ? d.pages.flatMap((p: any) => p.items ?? []) : []).filter((r: any) => !/inactive/i.test(readable(r.fields?.status)) && deb.length >= 2 && !pick && readable(r.fields?.name).toLowerCase().includes(deb.toLowerCase())).slice(0, 6);
  const f = pick?.fields || {};
  const place = [f.city, f.state].filter(Boolean).join(", ");
  const verified = !!f.claimed && /^verified$/i.test(readable(f.status));
  const ph = photoOf(f.photo);
  return (
    <div className={"fb-search ps2" + (pick ? " wide" : "")}>
      <style>{PS2_CSS}</style>
      <PawPrint aria-hidden="true" className="ps2-paw" size={70} fill="currentColor" strokeWidth={1.5} style={{ right: -14, top: -12, transform: "rotate(18deg)" }} />
      <PawPrint aria-hidden="true" className="ps2-paw" size={52} fill="currentColor" strokeWidth={1.5} style={{ left: -12, bottom: -14, transform: "rotate(-22deg)" }} />
      <h3 style={{ display: "flex", alignItems: "center", gap: 12 }}><span className="fb-sic"><Crown size={21} strokeWidth={2.4} /></span><span>Imagine Your Business as a <em>Top Dog!</em></span></h3>
      <p className="ps2-tag">Get a sneak peek at your upgraded listing.</p>
      <p className="ps2-sub">Search for your business and see how you could stand out from the pack.</p>
      {!pick && <div style={{ position: "relative" }}>
        <Search size={18} style={{ position: "absolute", left: 14, top: 14, color: "#FF5A0A" }} />
        <input className="fb-in" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Enter your business name..." aria-label="Business name" autoComplete="off" />
        {deb.length >= 2 && <div style={{ border: "1.5px solid #E6CDBF", borderRadius: 14, overflow: "hidden", marginTop: 8, background: "#fff" }}>
          {res.status === "pending" && <div style={{ padding: "11px 14px", fontSize: 14, color: "#4A5370" }}>Sniffing around…</div>}
          {rows.map((r: any) => <button key={r.id} type="button" className="fb-res" onClick={() => { setPick(r); setTerm(""); }}><b style={{ display: "block" }}>{readable(r.fields?.name)}</b><span style={{ fontSize: 13, color: "#4A5370" }}>{[r.fields?.city, r.fields?.state].filter(Boolean).join(", ")}</span></button>)}
          {res.status === "success" && rows.length === 0 && <div style={{ padding: "12px 14px", fontSize: 14, color: "#2C3550" }}>We couldn't find that one yet. <a href={CLAIM} style={{ color: "#FF5A0A", fontWeight: 800 }}>Submit your business</a> and I'll take a look.</div>}
          {res.status === "error" && <div style={{ padding: "12px 14px", fontSize: 14, color: "#B42318", fontWeight: 700 }}>Search isn't available right now. Please try again in a bit.</div>}
        </div>}
        <p className="fb-pnote"><ShieldCheck size={14} color="#FF5A0A" /> Free preview. No commitment. Your live listing won't change.</p>
      </div>}
      {pick && <>
        <div className="fb-cmp" style={{ marginTop: 18 }}>
          <div><span className="fb-lbl" style={{ background: "#F4F6F9" }}>Your listing today</span><ListingCard name={readable(f.name)} place={place} type={readable(f.type)} desc="" photo={ph} perks={perksOf(f)} verified={verified} claimed={!!f.claimed} /></div>
          <div><span className="fb-lbl o">As a Top Dog Partner (preview)</span><ListingCard big name={readable(f.name)} place={place} type={readable(f.type)} desc={readable(f.desc)} photo={ph} perks={perksOf(f)} verified={verified} deal="Your business special goes here" dealLabel="Your special" /></div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16, alignItems: "center" }}>
          <button type="button" className="fb-btn fb-gh" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => setPick(null)}>Try another business</button>
          {!f.claimed && <a href={CLAIM} className="fb-btn fb-nv" style={{ padding: "10px 18px", fontSize: 14 }}>Claim this listing free</a>}
        </div>
      </>}
    </div>
  );
}

const VERIFIED_BADGE = "https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b76/sniffscout-verified-dog-friendly-badge.png";
// Nov 28 2026 layout refinements (Find & Claim callout, plan cards, comparison width, founder tint, FAQ).
const REFINE_CSS = ".fb .fb-packsec{padding:18px 0 20px}.fb .fb-pack2{gap:14px}.fb .fb-pack2 .fb-h2{font-size:clamp(22px,2.6vw,27px);margin:0 0 4px}.fb .fb-pack2 .fb-lead{margin:0;font-size:15.5px;max-width:none}.fb .fb-pack2 .fb-sublink{margin:6px 0 0;font-size:13.5px}.fb .fb-plan{height:100%;box-sizing:border-box}.fb .fb-plan>.fb-btn{margin-top:auto}.fb .fb-plan .fb-vb+.fb-btn{margin-top:0}.fb .fb-vb{margin:auto 0;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;padding:4px 0 2px}.fb .fb-vb img{display:block;width:150px;height:auto}.fb .fb-vb p{margin:0;font-size:14px;line-height:1.4;font-weight:700;color:#00163D;max-width:260px}.fb .fb-plan .fb-tdcta,.fb .fb-plan .fb-tdcta:hover{box-shadow:none}.fb .fb-tdfine{margin-top:auto;display:grid;gap:6px}.fb .fb-tdfine .fb-note{margin:0}.fb .fb-plan .fb-tdfine+.fb-btn{margin-top:0}.fb .fb-tint{background:#FFF3EB;color:#00163D;position:relative}.fb .fb-tint .fb-founder p{color:#2C3550}.fb .fb-tpaw{position:absolute;color:#FF5A0A;opacity:.09;pointer-events:none}.fb .fb-tint .fb-founder{position:relative;z-index:1}.fb .fb-txt{background:#00163D;color:#fff;border:1px solid #00163D;box-shadow:none}.fb .fb-txt:hover{background:#0B2554}.fb .fb-txt svg{color:#fff}.fb .fb-q{font-size:16.5px;font-weight:800}.fb .fb-qi{border:1px solid rgba(0,22,61,.16)}.fb .fb-qi:hover{border-color:rgba(0,22,61,.3)}.fb .fb-plhead{position:relative;overflow:hidden;background:#FFF3EB;border:1px solid #FF5A0A;border-radius:20px;padding:18px 18px 20px;margin:0 auto;box-sizing:border-box}.fb .fb-plhead>*{position:relative;z-index:1}.fb .fb-plhead>.fb-plpaw{position:absolute;z-index:0;color:#FF5A0A;opacity:.1;pointer-events:none}.fb .fb-plhead .fb-h2{margin:6px 0 6px}.fb .fb-plhead .fb-lead{margin:0 auto}#plans.fb-sec{padding-top:28px}#plans .fb-plans{margin-top:140px}.fb .fb-plan.fr{border:2px solid rgba(0,22,61,.22);box-shadow:0 14px 32px -12px rgba(0,22,61,.18),0 2px 6px rgba(0,22,61,.06);transition:box-shadow .2s}.fb .fb-plan.fr .fb-per{background:#00163D;color:#fff}.fb .fb-tdhead{position:relative;align-self:stretch}.fb .fb-tdb{position:absolute;left:auto;right:-18px;top:30px;width:124px;height:auto;pointer-events:none;background:none;border-radius:0;padding:0;box-shadow:none;border:0;max-width:none}@media(hover:hover) and (pointer:fine){.fb .fb-plan.fr:hover{box-shadow:0 22px 44px -14px rgba(0,22,61,.3),0 3px 8px rgba(0,22,61,.08)}}@media(max-width:759px){.fb .fb-vb img{width:104px}}@media(min-width:760px) and (max-width:1099px){.fb .fb-tdb{width:172px;right:-30px;top:30px}.fb .fb-plan .fb-vb img{width:136px}}@media(min-width:1100px){.fb .fb-tdb{width:194px;right:-10px;top:14px}}@media(min-width:760px){#plans.fb-sec{padding-top:34px}.fb .fb-plhead{padding:22px 32px 24px}#plans .fb-plans{margin-top:136px}.fb .fb-packsec{padding:22px 0 24px}.fb .fb-pack2{padding:22px 30px 22px 34px;gap:28px}.fb .fb-vb img{width:170px}.fb .fb-sec .fb-cmp{max-width:830px}.fb .fb-rc{padding:16px}.fb .fb-rc.td .fb-rt{height:140px}.fb .fb-search{max-width:830px}.fb .fb-search.wide{max-width:830px}.fb .fb-search .fb-cmp{max-width:none}.fb .fb-q{font-size:17px;padding:16px 18px}}@media(max-width:759px){.fb .fb-tdb{width:clamp(96px,calc(100vw - 262px),124px)}}@media(max-width:399px){.fb .fb-vb img{width:90px}}@media(min-width:760px) and (max-width:819px){.fb .fb-tdb{width:120px;right:-32px;top:36px}.fb .fb-plan .fb-vb img{width:110px}}@media(min-width:820px) and (max-width:899px){.fb .fb-tdb{width:134px;right:-24px;top:36px}.fb .fb-plan .fb-vb img{width:118px}}@media(min-width:900px) and (max-width:1099px){.fb .fb-tdb{width:160px;right:-28px;top:32px}.fb .fb-plan .fb-vb img{width:128px}}@media(max-width:1023px){.fb .fb-tpaw.t1{display:none}}@media(max-width:374px){.fb .fb-btn{font-size:14px;padding-left:12px;padding-right:12px;gap:7px}.fb .fb-txt{white-space:nowrap}.fb .fb-in{padding-right:8px}.fb .fb-in::placeholder{font-size:15px}}.fb .fb-hcta{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;max-width:none}.fb .fb-hcta .fb-or{grid-column:1;grid-row:1;width:100%}.fb .fb-hcta small{grid-column:1;grid-row:2;margin:0;text-align:center}.fb .fb-hcta .fb-or,.fb .fb-pack2 .fb-or{box-shadow:0 4px 12px -2px rgba(0,22,61,.28),0 1px 3px rgba(0,22,61,.16)}.fb .fb-hcta .fb-or:hover,.fb .fb-pack2 .fb-or:hover{box-shadow:0 8px 18px -4px rgba(0,22,61,.32),0 2px 5px rgba(0,22,61,.16)}@media(min-width:760px){.fb .fb-hcta{max-width:340px}}";

const SSG_CSS=".ssg{background:#fff;font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D}.ssg *{box-sizing:border-box}.ssg-in{max-width:1180px;margin:0 auto;padding:26px 20px 28px;display:grid;gap:14px;align-items:center}.ssg-hrow{display:flex;align-items:center;gap:9px}.ssg h2{margin:0;font-size:22px;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:#00163D}.ssg-intro p{margin:6px 0 0;font-size:15px;line-height:1.45;font-weight:600;color:#3A4A63;max-width:420px}.ssg-box{background:#F4F6F9;border-radius:16px;padding:14px}.ssg-tabs{display:inline-flex;gap:2px;background:#fff;border:1px solid #E3E8EF;border-radius:999px;padding:3px}.ssg-tabs button{border:0;background:transparent;color:#3A4A63;font:inherit;font-size:13.5px;font-weight:800;padding:0 16px;min-height:34px;border-radius:999px;cursor:pointer}.ssg-tabs button[aria-selected=true]{background:#00163D;color:#fff}.ssg-tabs button:focus-visible{outline:2px solid #FF5A0A;outline-offset:2px}.ssg-steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}.ssg-steps li{display:flex;align-items:center;gap:9px;font-size:14.5px;line-height:1.35;font-weight:700;color:#00163D}.ssg-n{flex:none;width:22px;height:22px;border-radius:50%;background:#fff;border:1.5px solid #FF5A0A;color:#00163D;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center}.ssg-steps svg{flex:none}@media(min-width:768px){.ssg-in{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:40px;padding:34px 40px}.ssg h2{font-size:26px}.ssg-box{padding:16px 18px}.ssg-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px}}.sss{display:flex;gap:10px;margin-top:2px}.sss a{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.1);display:inline-flex;align-items:center;justify-content:center;transition:background-color .15s,transform .15s}.sss a:hover{background:#FF5A0A;transform:translateY(-2px)}.sss a:focus-visible{outline:2px solid #FF9B68;outline-offset:3px}div.sss{gap:12px}div.sss a{width:36px;height:36px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.22);transition:transform .18s,box-shadow .18s}div.sss a:hover{background:#fff;transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.3)}@media(prefers-reduced-motion:reduce){div.sss a{transition:none}}";
const ssgSvg=(c)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c}</svg>;
const SSGI={globe:ssgSvg(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>),share:ssgSvg(<><path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></>),plus:ssgSvg(<path d="M12 5v14M5 12h14"/>),check:ssgSvg(<path d="M5 12l5 5 9-10"/>),dots:ssgSvg(<><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></>)};
const SSG_STEPS={ios:[["globe","Open getsniffscout.com in Safari"],["share","Tap the Share button"],["plus","Select “Add to Home Screen”"],["check","Tap Add"]],android:[["globe","Open getsniffscout.com in Chrome"],["dots","Open the browser menu"],["plus","Select “Add to Home Screen” or “Install app”"]]};
// "SniffScout on the Go!" is the shared component (components/on-the-go.tsx).
function SSSocial(){const soc=SSX_SOCIAL.filter(s=>(s.k==="fb"||s.k==="ig")&&/^https:\/\//.test(s.u));if(!soc.length)return null;return <div className="sss">{soc.map(s=><a key={s.k} href={s.u} target="_blank" rel="noopener noreferrer" aria-label={"SniffScout on "+s.n} title={s.n}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{s.k==="fb"?<path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>:<><defs><radialGradient id="ssigg" cx="6" cy="25" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC80"/><stop offset=".12" stopColor="#FCAF45"/><stop offset=".25" stopColor="#F77737"/><stop offset=".38" stopColor="#F56040"/><stop offset=".5" stopColor="#FD1D1D"/><stop offset=".62" stopColor="#E1306C"/><stop offset=".75" stopColor="#C13584"/><stop offset=".88" stopColor="#833AB4"/><stop offset="1" stopColor="#5851DB"/></radialGradient></defs><g fill="none" stroke="url(#ssigg)" strokeWidth="2.3"><rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6"/><circle cx="12" cy="12" r="4.4"/></g><circle cx="17.6" cy="6.4" r="1.4" fill="url(#ssigg)"/></>}</svg></a>)}</div>}
function Footer() {
  const col = (h: string, links: string[][]) => <div><h4 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", color: "#FF7A3D" }}>{h}</h4><ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>{links.map(([t, u]) => <li key={t}><a href={u} className="fb-f2">{t}</a></li>)}</ul></div>;
  return (
    <><style>{SSG_CSS}</style><SSGo /><footer style={{ background: "#00163D", width: "100%" }}>
      <div style={{ height: 2, width: "100%", background: "#FF5A0A" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 18px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "grid", gap: 10 }}>
            <img src={LOGO} alt="SniffScout" style={{ height: 48, width: "auto", display: "block" }} />
            {CONTACT_EMAIL && <a href={"mailto:" + CONTACT_EMAIL} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}><Mail size={16} color="#FF7A3D" /> {CONTACT_EMAIL}</a>}
            <a href={SMS} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}><MessageCircle size={16} color="#FF7A3D" /> Call or text Jamie: <span style={{ whiteSpace: "nowrap" }}>{PHONE_DISPLAY}</span></a>
            <SSSocial />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", gap: "16px 40px" }}>
            {col("Explore", [["Home", "/"], ["Claim Your Listing", CLAIM], ["Submit a Dog-Friendly Spot", "/submit-a-place"], ["For Businesses", "/for-businesses"]])}
            {col("Company", [["About", "/about"], ["Contact", "/contact"]])}
            {col("Legal", [["Privacy Policy", "/privacy-policy"], ["Terms of Use", "/terms"]])}
          </div>
        </div>
        <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.14)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 6, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
          <span>© {new Date().getFullYear()} SniffScout. All rights reserved.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Made with <PawPrint size={14} color="#FF7A3D" /> in Northern Kentucky</span>
        </div>
      </div>
    </footer></>
  );
}

const BoneSvg = ({ c = "#FF7A3D", s = 34 }: { c?: string; s?: number }) => <svg width={s} height={s * 0.5} viewBox="0 0 40 20" aria-hidden="true"><path d="M8 4 a4 4 0 1 1 0 6 h24 a4 4 0 1 1 0 -6 a4 4 0 1 1 0 6 a4 4 0 1 1 0 6 h-24 a4 4 0 1 1 0 -6 a4 4 0 1 1 0 -6z" fill={c} transform="translate(0,-2)" /></svg>;
const StarSvg = ({ c = "#FFC23D", s = 18 }: { c?: string; s?: number }) => <svg width={s} height={s} viewBox="0 0 20 20" aria-hidden="true"><path d={starPath(10, 10, 9)} fill={c} /></svg>;
ssTypoInit();

export default function Block() {
  const stripeLink = useTextSetting({ name: "stripe-link", label: "Regular $47 Top Dog Stripe Payment Link", initialValue: "" });
  const stripeFounding = useTextSetting({ name: "stripe-link-founding", label: "Founding $37 Top Dog Stripe Payment Link", initialValue: "" });
  const foundingOpen = useBooleanSetting({ name: "founding-open", label: "Founding $37 offer still open (turn off when all 20 spots are filled)", initialValue: true });
  const isStripe = (u: string) => /^https:\/\/(buy|checkout)\.stripe\.com\//i.test((u || "").trim());
  const activeLink = foundingOpen ? stripeFounding : stripeLink;
  const checkoutLive = isStripe(activeLink);
  const joinHref = checkoutLive ? activeLink.trim() : WAITLIST;
  const [welcome, setWelcome] = useState(false);
  useEffect(() => { try { setWelcome(new URLSearchParams(window.location.search).get("welcome") === "1"); } catch (e) {} }, []);
  const joinLabel = foundingOpen ? "Become a Founding Top Dog — $37/month" : "Become a Top Dog Partner — $47/month";
  const heroImg = useImageSetting({ name: "img-hero", label: "Hero café photo", initialValue: { src: "", alt: "Golden Retriever in an orange SniffScout bandana sitting on a dog-friendly café patio" } });
  const doodleImg = useImageSetting({ name: "img-doodle", label: "Free card peeking dog", initialValue: { src: "", alt: "Goldendoodle in a SniffScout bandana peeking over the card" } });
  const corgiImg = useImageSetting({ name: "img-corgi", label: "Top Dog card peeking dog", initialValue: { src: "", alt: "Corgi in a SniffScout bandana peeking over the card" } });
  const labImg = useImageSetting({ name: "img-lab", label: "Already on SniffScout dog", initialValue: { src: "", alt: "Black Labrador in an orange bandana waving and holding an orange ball" } });
  const playImg = useImageSetting({ name: "img-play", label: "Local visibility dogs", initialValue: { src: "", alt: "Golden Retriever and fluffy white doodle playing together" } });
  const jamieImg = useImageSetting({ name: "img-jamie", label: "Meet Jamie portrait", initialValue: { src: "", alt: "Jamie, founder of SniffScout, sitting with her Goldendoodles Marley and Bella" } });
  const finalImg = useImageSetting({ name: "img-final", label: "Final CTA dog photo (circle)", initialValue: { src: "", alt: "Smiling dog in a SniffScout bandana" } });
  const cafeImg = useImageSetting({ name: "img-cafe", label: "Sample listing café photo", initialValue: { src: "https://images.unsplash.com/photo-1532204555-0725a25daf63?fm=jpg&q=70&w=900&auto=format&fit=crop", alt: "Dog relaxing at a café (sample photo)" } });

  return (
    <div className="fb">
      <style>{CSS + REFINE_CSS}</style>
      {welcome && (
        <div style={{ background: NAVY, padding: "18px 16px 6px" }}>
          <div role="status" style={{ maxWidth: 880, margin: "0 auto", display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", color: NAVY, borderRadius: 18, border: "2px solid " + OR, borderLeftWidth: 8, padding: "18px 16px", boxShadow: "0 14px 32px -12px rgba(255,90,10,.55)" }}>
            <span style={{ flex: "none", width: 40, height: 40, borderRadius: 99, background: OR, display: "grid", placeItems: "center" }}><Crown size={20} color="#fff" /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.25, color: NAVY }}>Welcome to the Top Dog pack! 🐾</div>
              <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.55, color: "#3A4A66" }}>Thank you for becoming a Top Dog Partner. Your payment went through and a receipt is on its way to your email. I'll reach out within 1 to 2 business days to set up your premium listing and your first promotion. Questions? Call or text me at <a href={TEL} style={{ color: "#E5530A", fontWeight: 800 }}>{PHONE_DISPLAY}</a>.</p>
            </div>
            <button onClick={() => setWelcome(false)} aria-label="Close" style={{ flex: "none", background: "transparent", border: 0, color: NAVY, fontSize: 22, lineHeight: 1, cursor: "pointer", padding: 4 }}>×</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="fb-hero">
        <div className="fb-w fb-hg">
          <div>
            <span className="fb-eye" style={{ color: "#FF9B68" }}><PawPrint size={14} /> For dog-friendly businesses</span>
            <h1>More Dog Lovers. More Visibility. <em>More Wagging Tails.</em></h1>
            <p>Get discovered by local dog lovers. List your business for free, or become a Top Dog Partner for extra visibility.</p>
            <div className="fb-hcta">
              <a href={joinHref} className="fb-btn fb-or"><Crown size={17} /> {foundingOpen ? "Become a Founding Top Dog" : "Become a Top Dog Partner"}</a>
              <small>{foundingOpen ? "$37/month founding rate" : "$47/month"}</small>
            </div>
          </div>
          {heroImg.src && <div className="fb-heroimg"><img src={heroImg.src} alt={heroImg.alt} /></div>}
        </div>
      </section>

      {/* ALREADY ON SNIFFSCOUT */}
      <section className="fb-sec fb-peach fb-packsec">
        <div className="fb-w">
          <div className="fb-pack fb-pack2">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="fb-h2">Already Part of the Pack?</h2>
              <p className="fb-lead">Your business might already be listed! Find and claim your free listing in minutes.</p>
              <p className="fb-sublink">Not listed yet? <a href={CLAIM}>Submit Your Business</a> on the same page by checking “My business isn't listed.”</p>
            </div>
            <a href={CLAIM} className="fb-btn fb-or" style={{ position: "relative", zIndex: 1 }}><Search size={18} /> Find &amp; Claim My Listing</a>
          </div>
        </div>
      </section>

      {/* FREE VS TOP DOG */}
      <section className="fb-sec" id="plans">
        <div className="fb-w">
          <div className="fb-c fb-plhead">
            <PawPrint aria-hidden="true" className="fb-plpaw" size={46} fill="currentColor" strokeWidth={1.5} style={{ left: -8, top: -10, transform: "rotate(-22deg)" }} />
            <PawPrint aria-hidden="true" className="fb-plpaw" size={38} fill="currentColor" strokeWidth={1.5} style={{ right: -6, bottom: -10, transform: "rotate(160deg)" }} />
            <span className="fb-eye"><Sparkles size={14} /> Free vs. Top Dog Partner</span>
            <h2 className="fb-h2">Pick the Plan That <span style={{ color: OR }}>Fits Your Pack</span></h2>
            <p className="fb-lead">Every business can be listed for free. Top Dog Partners get extra visibility with dog lovers close by.</p>
          </div>
          <div className="fb-plans">
            <div className="fb-plan fr">
              {doodleImg.src ? <><span className="fb-rest back pk-dd" aria-hidden="true"><span className="pkc"><img src={doodleImg.src} alt="" loading="lazy" /></span></span><span className="fb-rest front pk-dd"><span className="pkc"><img src={doodleImg.src} alt={doodleImg.alt} loading="lazy" /></span></span></> : <span className="fb-peek dd fb-dog"><GoldenPeek /></span>}
              <span className="fb-ribbon"><PawPrint size={12} /> Always Free</span>
              <div><h3>Free Listing</h3><div className="fb-pr"><span className="fb-price">$0</span><span className="fb-per">forever</span></div></div>
              <ul className="fb-list">{FREE.map((t) => <li key={t}><Ck />{t}</li>)}</ul>
              <div className="fb-nope"><div className="fb-also" style={{ color: "#00163D" }}>Top Dog extras not included</div><ul>{TOPDOG_KEY.map(([I, t]) => <li key={t}><span className="fb-nx">–</span>{t}</li>)}</ul></div>
              <div className="fb-vb"><img src={VERIFIED_BADGE} alt="SniffScout Verified Dog-Friendly Business badge" width={1536} height={1024} loading="lazy" decoding="async" /><p>Earn your Verified badge when your listing is approved.</p></div>
              <a href={CLAIM} className="fb-btn fb-nv">Claim Your Free Listing</a>
            </div>
            <div className="fb-plan td">
              {corgiImg.src ? <><span className="fb-rest back pk-cg" aria-hidden="true"><span className="pkc"><img src={corgiImg.src} alt="" loading="lazy" /></span></span><span className="fb-rest front pk-cg"><span className="pkc"><img src={corgiImg.src} alt={corgiImg.alt} loading="lazy" /></span></span></> : <span className="fb-peek cg fb-dog"><CrownPeek /></span>}
              <span className="fb-ribbon">{foundingOpen ? <><Crown size={12} /> Most visibility</> : <><Star size={12} fill="#fff" /> Most visibility</>}</span>
              {foundingOpen ? <div className="fb-tdhead"><img className="fb-tdb" src="https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b70/sniffscout-top-dog-partner-badge.png" alt="SniffScout Top Dog Partner badge" width={1536} height={1024} loading="lazy" decoding="async" /><h3 style={{ color: "#fff" }}>Founding Top Dog Partner</h3><div className="fb-pr"><span className="fb-price">$37</span><span className="fb-per">/month</span></div><div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", borderRadius: 99, padding: "5px 12px", fontSize: 16, fontWeight: 800, color: "#fff" }}>Regularly <span style={{ textDecoration: "line-through", textDecorationColor: "#FF7A3D", textDecorationThickness: "2.5px" }}>$47/month</span></div><p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Lock in your founding rate for as long as your membership stays active.</p></div> : <div className="fb-tdhead"><img className="fb-tdb" src="https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b70/sniffscout-top-dog-partner-badge.png" alt="SniffScout Top Dog Partner badge" width={1536} height={1024} loading="lazy" decoding="async" /><h3 style={{ color: "#fff" }}>Top Dog Partner</h3><div className="fb-pr"><span className="fb-price">$47</span><span className="fb-per">/month</span></div></div>}
              <ul className="fb-key">{TOPDOG_KEY.map(([I, t, d]) => <li key={t}><span className="fb-kico"><I size={18} strokeWidth={2.4} /></span><span><b>{t}</b>{d}</span></li>)}</ul>
              <div><div className="fb-also">Also included</div><ul className="fb-list sm">{TOPDOG.map((t) => <li key={t}><Ck />{t}</li>)}</ul></div>
              <div className="fb-tdfine"><p style={{ margin: 0, textAlign: "center", fontSize: 14, fontWeight: 800, color: "#FF9B68" }}>No setup fee. No contracts. Cancel anytime.</p>
              <p className="fb-note">{checkoutLive ? "Secure checkout through Stripe." : "Online checkout is opening soon. Tap below to save your spot, or call or text me and I'll get you set up."}</p></div>
              <a href={joinHref} className="fb-btn fb-or fb-tdcta">{joinLabel}</a>
            </div>
          </div>
        </div>
      </section>

      {/* SEE THE DIFFERENCE */}
      <section className="fb-sec fb-peach">
        <div className="fb-w">
          <div className="fb-c fb-head-row">
            <span className="fb-dog"><img className="fb-tdbadge" src="https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b70/sniffscout-top-dog-partner-badge.png" alt="SniffScout Top Dog Partner Dog-Friendly Business badge with crown" width={1536} height={1024} loading="lazy" decoding="async" /></span>
            <div>
              <span className="fb-eye"><Star size={14} /> See the difference</span>
              <h2 className="fb-h2">See the Top Dog <span style={{ whiteSpace: "nowrap" }}>Difference 🐾</span></h2>
              <p className="fb-lead">See how your business can stand out from the pack.</p>
            </div>
          </div>
          <div className="fb-cmp">
            <div><span className="fb-lbl o"><Crown size={12} /> Top Dog Partner Listing</span><ListingCard big art photo={SAMPLE_COFFEE} name="The Happy Pup Cantina" place="Florence, KY" type="Restaurant & Bar" desc="Neighborhood cantina with a shady patio made for pups and their people." perks={["Dog-friendly patio", "Water bowls", "Pup cups", "Dog treats"]} verified={true} dealLabel="Sample promotion" deal="Thursday Margarita Special — $2 Margaritas" /></div>
            <div><span className="fb-lbl">Standard Free Listing</span><ListingCard art photo={SAMPLE_PATIO} name="The Happy Pup Cantina" place="Florence, KY" type="Restaurant & Bar" desc="Neighborhood cantina with a shady patio made for pups and their people." perks={["Dog-friendly patio", "Water bowls", "Pup cups", "Dog treats"]} verified={false} /></div>
          </div>
          <div className="fb-diff"><span><Crown size={14} /> Top Dog Partner badge</span><span><Sparkles size={14} /> Orange highlighted card</span><span><Tag size={14} /> Your special on the card</span><span><Search size={14} /> Shown first in relevant searches</span></div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#4A5370", marginTop: 10, fontWeight: 700 }}>Sample preview only. Not a real business. Photos are stock examples.</p>
          <PreviewSearch />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="fb-sec fb-navy">
        <div className="fb-w">
          <div className="fb-c">
            <span className="fb-eye"><PawPrint size={14} /> How it works</span>
            <h2 className="fb-h2" style={{ color: "#fff" }}>Joining the Pack Is Easy!</h2>
          </div>
          <div className="fb-steps">
            <div className="fb-step"><div className="fb-sico"><Search size={22} strokeWidth={2.4} /></div><div><span className="fb-num">Step 1</span><h3>Find Your Listing or Choose Top Dog</h3></div><p>Claim your free listing, or choose Top Dog Partner for extra visibility.</p></div>
            <div className="fb-step"><div className="fb-sico"><ClipboardCheck size={22} strokeWidth={2.4} /></div><div><span className="fb-num">Step 2</span><h3>Confirm Your Details</h3></div><p>Share your details and pup perks. Top Dog Partners also complete a quick, secure Stripe checkout.</p></div>
            <div className="fb-step"><div className="fb-sico"><BadgeCheck size={22} strokeWidth={2.4} /></div><div><span className="fb-num">Step 3</span><h3>Get Listed and Start Getting Discovered</h3></div><p>Once I review and approve everything, your listing or Top Dog membership goes live.</p></div>
          </div>
          <p style={{ textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.85)", margin: "16px auto 0", maxWidth: 620, lineHeight: 1.5 }}><Clock size={16} style={{ display: "inline", verticalAlign: "-3px", color: "#FF7A3D" }} /> Checkout takes about two minutes. Because I review every business personally, verification and activation can take a little extra time.</p>
          <div className="fb-reas"><span className="fb-rp"><Tag size={15} color="#FF9B68" /> {foundingOpen ? "$37/month founding rate" : "$47/month"}</span><span className="fb-rp"><Check size={15} color="#FF9B68" /> No setup fee</span><span className="fb-rp"><ShieldCheck size={15} color="#FF9B68" /> No long-term contract</span><span className="fb-rp"><PawPrint size={15} color="#FF9B68" /> Cancel anytime</span></div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="fb-sec fb-tint" style={{ overflow: "hidden" }}>
        <PawPrint aria-hidden="true" className="fb-tpaw t1" size={56} fill="currentColor" strokeWidth={1.5} style={{ right: "4%", top: 26, transform: "rotate(18deg)" }} />
        <PawPrint aria-hidden="true" className="fb-tpaw" size={40} fill="currentColor" strokeWidth={1.5} style={{ left: "3%", bottom: 30, transform: "rotate(-20deg)" }} />
        <PawPrint aria-hidden="true" className="fb-tpaw" size={26} fill="currentColor" strokeWidth={1.5} style={{ right: "12%", bottom: 40, transform: "rotate(-8deg)" }} />
        <div className="fb-w">
          <div className="fb-founder">
            {jamieImg.src ? <div className="fb-jport"><img src={jamieImg.src} alt={jamieImg.alt} loading="lazy" /></div> : <div className="fb-jpic"><div className="ring" /><img src={BRAND_DOGS} alt="A Goldendoodle and a border collie waving, both wearing SniffScout bandanas" loading="lazy" /><span className="fb-deco" style={{ right: -8, top: 10 }}><StarSvg s={22} /></span><span className="fb-deco" style={{ left: -14, bottom: 26, animationDelay: "1.5s" }}><BoneSvg c="#FF7A3D" s={34} /></span></div>}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="fb-h2" style={{ color: NAVY, marginTop: 0 }}>Hey There! I'm <span style={{ whiteSpace: "nowrap" }}><span style={{ color: OR }}>Jamie!</span> 🐾</span></h2>
              <p>I'm the founder of SniffScout, and I started this little adventure right here in Northern Kentucky to make it easier for dog lovers to discover places where their pups are welcome.</p>
              <p>We're starting with Northern Kentucky and Cincinnati, and my dream is to help dog-friendly businesses get discovered in communities all across the country.</p>
              <p>And when you reach out to SniffScout, you're talking directly to me. No sales team, no runaround. Just me, helping businesses like yours get noticed.</p>
              <p style={{ fontWeight: 800, color: NAVY }}>Questions? Call or text me at <span style={{ color: OR, whiteSpace: "nowrap" }}>{PHONE_DISPLAY}</span>. I'd love to hear from you!</p>
              <div className="fb-btns fb-jbtns" style={{ marginTop: 6 }}>
                <a href={TEL} className="fb-btn fb-or"><Phone size={18} /> Call Jamie</a>
                <a href={SMS} className="fb-btn fb-nv fb-txt"><MessageCircle size={18} /> Text Jamie</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fb-sec fb-peach">
        <div className="fb-w">
          <div className="fb-c"><span className="fb-eye" style={{ fontSize: 16 }}><Bone size={18} /> FAQs</span><h2 className="fb-h2" style={{ fontSize: "clamp(32px,4.6vw,48px)" }}>Questions? I've Got Answers.</h2></div>
          <div className="fb-faqwrap">
            <div className="fb-faq">{FAQS.map(([qq, a], i) => <FaqItem key={qq} q={qq} a={a} i={i} />)}</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="fb-sec" style={{ paddingTop: 44, paddingBottom: 52 }}>
        <div className="fb-w">
          <div className="fb-final">
            <div className="fdog">{(finalImg.src || doodleImg.src) ? <img src={finalImg.src || doodleImg.src} alt={finalImg.src ? finalImg.alt : doodleImg.alt} loading="lazy" /> : <BeagleLeash />}</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Ready to Be the Top Dog in Your Neighborhood?</h2>
              <div className="fb-btns" style={{ justifyContent: "center" }}>
                <a href={CLAIM} className="fb-btn fb-gh" style={{ borderColor: "#fff" }}>Claim Your Free Listing</a>
                <a href={joinHref} className="fb-btn fb-nv">{joinLabel}</a>
              </div>
              <small>Questions? Call or text Jamie at <a href={TEL} style={{ whiteSpace: "nowrap" }}>{PHONE_DISPLAY}</a>.</small>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
