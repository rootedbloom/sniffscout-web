"use client";
import { useState } from "react";
import { PawPrint, MapPin, Utensils, Beer, Coffee, Wine, BadgeCheck, Droplets, ArrowRight, Bone, Sun } from "lucide-react";
import { useTextSetting, useImageSetting } from "@/lib/editable-settings";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
@keyframes ss-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes ss-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes ss-wiggle{0%,100%{transform:rotate(14deg)}50%{transform:rotate(-8deg)}}
.ss-go{transition:filter .2s;cursor:pointer;box-shadow:none!important}
.ss-go:hover{filter:brightness(1.07)}
.ss-go:active{filter:brightness(.96);box-shadow:none!important}
.ss-in:focus{outline:3px solid #FF5A0A;outline-offset:2px}
.ss-h1{font-size:clamp(40px,12.65vw,76px);line-height:1}
@media (min-width:768px){.ss-h1{font-size:clamp(38px,11.4vw,76px);line-height:1.03}}
.ss-tile{display:flex;align-items:center;gap:12px;padding:14px;border-radius:20px;border:0;text-decoration:none;color:#fff;font-weight:800;font-size:16px;line-height:1.15;transition:transform .15s,filter .15s}
.ss-tile:hover{transform:translateY(-3px);filter:brightness(1.08)}
.ss-tile:active{transform:translateY(1px)}
.ss-ic{display:flex;height:40px;width:40px;flex-shrink:0;align-items:center;justify-content:center;border-radius:999px;background:#fff}
.ss-link{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;font-weight:800;font-size:15px;text-decoration:none;transition:transform .15s}
.ss-link:hover{transform:translateY(-2px)}
.ss-sbar{display:grid;grid-template-columns:1.45fr 1fr;gap:8px;margin-top:8px}
.ss-qwrap{grid-column:1/-1;position:relative;display:flex;align-items:center;background:#fff;border-radius:12px;height:50px;transition:box-shadow .15s}
.ss-qwrap:focus-within{box-shadow:0 0 0 3px rgba(255,90,10,.55)}
.ss-qi{flex:1;min-width:0;height:100%;border:0;background:transparent;padding:0 12px 0 40px;font:700 16px Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D;outline:none;border-radius:12px;text-overflow:ellipsis}
.ss-qi::placeholder{color:#7A8699;font-weight:600}
.ss-qpin{position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none}
.ss-btn2{display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;border:0;border-radius:12px;font:800 15.5px Manrope,'Helvetica Neue',Arial,sans-serif;white-space:nowrap;cursor:pointer;transition:background .15s,transform .15s,box-shadow .15s}
.ss-gb{order:2;background:#FF5A0A;color:#fff;padding:0 18px}
.ss-gb:hover{background:#E64E05;box-shadow:0 6px 14px rgba(255,90,10,.35);transform:translateY(-1px)}
.ss-nb{order:3;background:#EEF1F5;color:#00163D;padding:0 13px;font-size:14.5px}
.ss-nb:hover{background:#E1E6EE;transform:translateY(-1px)}
.ss-nb:disabled{cursor:wait;opacity:.85;transform:none}
.ss-btn2:focus-visible{outline:3px solid #FF9B68;outline-offset:2px}
@media(min-width:640px){.ss-sbar{display:flex;align-items:center;gap:6px;background:#fff;border-radius:16px;padding:6px;transition:box-shadow .15s}.ss-sbar:focus-within{box-shadow:0 0 0 3px rgba(255,90,10,.55)}.ss-qwrap{flex:1;min-width:0;height:46px;background:transparent;box-shadow:none!important}.ss-qi{padding-left:38px}.ss-gb{order:3}.ss-nb{order:2}}
@media(min-width:1024px) and (max-width:1279px){.ss-gb .ss-ar2{display:none}.ss-gb{padding:0 15px}.ss-nb{padding:0 11px}}
@media(prefers-reduced-motion:reduce){.ss-btn2,.ss-qwrap,.ss-sbar{transition:none}.ss-btn2:hover{transform:none}}
@media (prefers-reduced-motion:reduce){.ss-anim{animation:none!important}}
h1.ss-hh{font-weight:900!important}
@media(max-width:767px){.ss-badge{padding:6px 13px!important;font-size:clamp(9.5px,2.85vw,11px)!important;letter-spacing:.05em!important;gap:6px!important;white-space:nowrap!important;max-width:100%}.ss-badge svg{width:14px!important;height:14px!important}.ss-hh{margin-top:17px!important}.ss-hp{margin-top:10px!important;font-size:16px!important;line-height:1.42!important;max-width:360px!important}}
@media(max-width:1023px){.ss-hgrid{row-gap:12px!important}}
`;

const CATS = [
  { t: "Restaurants & Bars", k: "restaurants", I: Utensils, c: "#FF5A0A" },
  { t: "Breweries", k: "breweries", I: Beer, c: "#00163D" },
  { t: "Coffee Shops", k: "coffee shops", I: Coffee, c: "#00163D" },
  { t: "Wineries", k: "wineries", I: Wine, c: "#FF5A0A" },
];

const CHIPS = [
  { k: "water", t: "Water bowls", I: Droplets, c: "#FF5A0A", side: "l", d: "0s" },
  { k: "menu", t: "Dog menus", I: Utensils, c: "#00163D", side: "l", d: "0.8s" },
  { k: "treats", t: "Treats", I: Bone, c: "#FF5A0A", side: "l", d: "1.6s" },
  { k: "pupcups", t: "Pup cups", I: Coffee, c: "#00163D", side: "r", d: "0.4s" },
  { k: "covered", t: "Covered patios", I: Sun, c: "#FF5A0A", side: "r", d: "1.2s" },
  { k: "verified", t: "Verified", I: BadgeCheck, c: "#00163D", side: "r", d: "2s" },
];

function Chips({ side }) {
  return (
    <>
      {CHIPS.filter((c) => c.side === side).map((c) => {
        const I = c.I;
        return (
          <a key={c.t} href={"/?perk=" + c.k} onClick={(e) => { e.preventDefault(); try { window.history.pushState({}, "", "/?perk=" + c.k); } catch (err) { window.location.href = "/?perk=" + c.k; } }} className="ss-anim inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold no-underline" style={{ cursor: "pointer", color: "#00163D", border: "2px solid #00163D", boxShadow: "0 8px 18px rgba(0,22,61,.12)", animation: "ss-bob 4.4s ease-in-out " + c.d + " infinite" }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: c.c }}><I className="h-3.5 w-3.5 text-white" strokeWidth={2.8} /></span>
            <span>{c.t}</span>
          </a>
        );
      })}
    </>
  );
}

function Paws({ id, path, vb, n, dur, scale, colors, lat }) {
  const items = [];
  for (let i = 0; i < n; i++) {
    const begin = "-" + ((i * dur) / n).toFixed(2) + "s";
    items.push(
      <g key={i} opacity="0">
        <animateMotion dur={dur + "s"} begin={begin} repeatCount="indefinite" rotate="auto" path={path} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={dur + "s"} begin={begin} repeatCount="indefinite" />
        <use href={"#" + id} fill={colors[i % colors.length]} transform={"rotate(90) scale(" + scale + ") translate(" + (i % 2 ? lat : -lat) + " 0)"} />
      </g>
    );
  }
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <g id={id}>
          <ellipse cx="0" cy="1.3" rx="2.1" ry="1.8" />
          <ellipse cx="-2.5" cy="-1.1" rx="0.85" ry="1.2" />
          <ellipse cx="-0.9" cy="-2.7" rx="0.85" ry="1.2" />
          <ellipse cx="0.9" cy="-2.7" rx="0.85" ry="1.2" />
          <ellipse cx="2.5" cy="-1.1" rx="0.85" ry="1.2" />
        </g>
      </defs>
      {items}
    </svg>
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
try { if (typeof document !== "undefined" && !document.getElementById("ss-montserrat-900")) { const l = document.createElement("link"); l.id = "ss-montserrat-900"; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap"; document.head.appendChild(l); } } catch (e) {}

export default function Block() {
  const heroDesc = useTextSetting({ name: "hero-desc", label: "Supporting text", initialValue: "Find the restaurants, bars, breweries and coffee shops where your pup is truly welcome, and know before you go." });
  const placeholder = useTextSetting({ name: "hero-search-placeholder", label: "Search placeholder", initialValue: "City, ZIP or business name" });
  const btnText = useTextSetting({ name: "hero-search-button", label: "Search button text", initialValue: "Let's Sniff!" });
  const label = useTextSetting({ name: "hero-search-label", label: "Search card label", initialValue: "Where are we sniffing?" });
  const dogs = useImageSetting({ name: "hero-dogs", label: "Hero dogs photo", initialValue: { src: "", alt: "A golden retriever and a border collie waving, both wearing SniffScout bandanas" } });

  const [term, setTerm] = useState("");
  const [locMsg, setLocMsg] = useState("");
  const [locBusy, setLocBusy] = useState(false);
  const reduce = typeof window !== "undefined" && !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const goCat = (e, k) => {
    e.preventDefault();
    const url = "/?category=" + encodeURIComponent(k);
    try { window.history.pushState({}, "", url); } catch (err) { window.location.href = url; }
  };
  const go = (e) => {
    e.preventDefault();
    const t = term.trim();
    const url = t ? "/?q=" + encodeURIComponent(t) + "&t=" + Date.now() : "/?browse=all&t=" + Date.now();
    try { window.history.pushState({}, "", url); } catch (err) { window.location.href = url; }
  };

  const nearMe = () => {
    setLocMsg("");
    try {
      if (!navigator.geolocation) { setLocMsg("Your browser can't share your location. Type your city above instead."); return; }
      setLocBusy(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocBusy(false);
        const v = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        try { (window as any).__ssNear = v; } catch (e2) {}
        try { sessionStorage.setItem("ss-near", JSON.stringify(v)); } catch (e2) {}
        const url = "/?near=me&t=" + Date.now();
        try { window.history.pushState({}, "", url); } catch (e2) { window.location.href = url; }
      }, () => { setLocBusy(false); setLocMsg("We couldn't get your location. Allow location access, or type your city above."); }, { timeout: 10000, maximumAge: 600000 });
    } catch (e) { setLocBusy(false); setLocMsg("We couldn't get your location. Type your city above instead."); }
  };

  const navy = "#00163D";
  const orange = "#FF5A0A";

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#fff", fontFamily: "Manrope,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{CSS}</style>

      <div className="ss-hgrid relative mx-auto grid max-w-[1280px] xl:max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-y-5 px-5 pb-24 pt-7 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-16 lg:pb-28 lg:pt-8">
        {/* A: headline */}
        <div className="relative z-10 min-w-0 text-center lg:col-start-1 lg:row-start-1 lg:self-center lg:text-left">
          <div className="ss-anim ss-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-extrabold uppercase tracking-wider text-white" style={{ background: navy, transform: "rotate(-2deg)", animation: "ss-up .6s ease both" }}>
            <PawPrint className="h-4 w-4" color={orange} fill={orange} />
            The dog-friendly places directory
          </div>

          <h1 className="ss-anim ss-h1 ss-hh mt-5" style={{ fontFamily: "Montserrat,Manrope,sans-serif", fontWeight: 900, color: navy, letterSpacing: "-0.03em", animation: "ss-up .7s ease .1s both" }}>
            <span className="block">Sniff out</span>
            <span className="block">your next</span>
            <span className="relative mt-2 inline-block whitespace-nowrap pb-[0.3em] px-[0.1em]" style={{ color: navy }}>
              
              <span className="relative inline-block"><span className="relative inline-flex items-center gap-[0.17em] py-[0.2em] pl-[0.28em] pr-[0.48em] text-[0.8em] md:gap-[0.2em] md:py-[0.17em] md:pl-[0.3em] md:pr-[0.52em] md:text-[1em]" style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", background: orange, borderRadius: "0.22em", boxShadow: "0.07em 0.07em 0 " + navy, transform: "rotate(-3deg)", transformOrigin: "50% 50%" }}><span className="relative">favorite spot</span><img className="relative h-[1.03em] w-auto flex-none" aria-hidden="true" alt="" src="data:image/webp;base64,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" style={{ maxWidth: "none", transform: "rotate(10deg)", filter: "drop-shadow(0.02em 0 0 #fff) drop-shadow(-0.02em 0 0 #fff) drop-shadow(0 0.02em 0 #fff) drop-shadow(0 -0.02em 0 #fff)" }} /></span></span>
            </span>
          </h1>

          <div className="hidden" aria-hidden="true">
            {false && <Paws id="ss-paw1" path="M-20 30 C 70 4, 150 54, 230 28 S 380 8, 440 28" vb="0 0 400 56" n={8} dur={14} scale={4.4} colors={[orange, navy]} lat={1.2} />}
          </div>

          <p className="ss-anim ss-hp mx-auto mt-3 max-w-[520px] lg:mt-3 text-[17px] leading-snug lg:mx-0 lg:text-xl" style={{ color: "#2B3B55", fontWeight: 600, animation: "ss-up .7s ease .2s both" }}>{heroDesc}</p>

          <form onSubmit={go} className="ss-anim relative mx-auto mt-4 w-full max-w-[600px] px-3.5 pb-3.5 pt-3 text-left md:px-4 md:pb-4 lg:mx-0 lg:mt-5" style={{ background: navy, borderRadius: 20, boxShadow: "0 12px 28px -14px rgba(0,22,61,.32), 0 3px 8px -4px rgba(0,22,61,.10)", animation: "ss-up .7s ease .3s both" }}>
            <label htmlFor="ss-q" className="block text-[11.5px] font-extrabold uppercase" style={{ color: "#FF7A33", letterSpacing: ".14em" }}>{label}</label>
            <div className="ss-sbar">
              <div className="ss-qwrap">
                <MapPin className="ss-qpin h-5 w-5" color={orange} strokeWidth={2.6} />
                <input id="ss-q" className="ss-qi" aria-label="Search dog-friendly places by city, ZIP or business name" value={term} onChange={(e) => setTerm(e.target.value)} placeholder={placeholder} autoComplete="off" />
              </div>
              <button type="button" onClick={nearMe} disabled={locBusy} className="ss-btn2 ss-nb" aria-label="Show dog-friendly places near me">
                <MapPin className="h-4 w-4" color={orange} strokeWidth={2.8} />
                {locBusy ? "Finding…" : "Near Me"}
              </button>
              <button type="submit" className="ss-btn2 ss-gb">
                {btnText}
                <ArrowRight className="ss-ar2 h-[18px] w-[18px]" strokeWidth={3} />
              </button>
            </div>
            {locMsg && <p role="alert" className="text-[13px] font-bold" style={{ color: "#FFB48A", margin: "8px 2px 0" }}>{locMsg}</p>}
          </form>
        </div>

        {/* B: dogs */}
        <div className="relative mx-auto flex w-full max-w-[640px] items-center justify-center lg:col-start-2 lg:row-start-1 lg:mt-0 lg:mx-auto lg:max-w-[600px] lg:self-center">
          <img src={dogs.src} alt={dogs.alt} className="block h-auto w-full lg:w-[115%] lg:max-w-none lg:flex-none" />
        </div>

        {/* paws trail */}
        <div className="relative -mx-5 h-[48px] md:-mx-10 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-0" aria-hidden="true">
          {!reduce && <Paws id="ss-paw2" path="M-30 30 C 220 2, 420 56, 640 28 S 1040 4, 1310 30" vb="0 0 1280 56" n={18} dur={20} scale={4.4} colors={[orange, navy]} lat={1.2} />}
        </div>

      </div>

      <svg className="absolute bottom-[-1px] left-0 z-20 h-[56px] w-full md:h-[88px]" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 46 C260 104 520 6 800 48 C1060 88 1260 98 1440 36 L1440 100 L0 100 Z" fill="#00163D" />
      </svg>
    </section>
  );
}
