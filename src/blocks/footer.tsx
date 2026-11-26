"use client";
import React, { useEffect, useState } from "react";
import { Mail, PawPrint, ArrowRight, CheckCircle2, Heart, Smartphone, Globe, Share, Plus, Check, MoreVertical } from "lucide-react";
import { LOGO } from "@/lib/logo";

// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const PACK_PHOTO = { src: "https://cdn.jsdelivr.net/gh/rootedbloom/sniffscout-sitemap@main/marley-bella-patio.webp", alt: "A goldendoodle in a navy SniffScout bandana and a cavapoo in an orange bandana smiling together on a cafe patio" };

function Social() {
  return (
    <div className="sss">
      <style>{".sss{display:flex;gap:12px;margin-top:6px}.sss a{width:36px;height:36px;border-radius:50%;background:#fff;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.22);transition:transform .18s,box-shadow .18s}.sss a:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.3)}.sss a:focus-visible{outline:2px solid #FF9B68;outline-offset:3px}"}</style>
      <a href="https://www.facebook.com/sniffscout" target="_blank" rel="noopener noreferrer" aria-label="SniffScout on Facebook" title="Facebook">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
      </a>
      <a href="https://www.instagram.com/getsniffscout" target="_blank" rel="noopener noreferrer" aria-label="SniffScout on Instagram" title="Instagram">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="ssigg" cx="6" cy="25" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC80" /><stop offset=".12" stopColor="#FCAF45" /><stop offset=".25" stopColor="#F77737" /><stop offset=".38" stopColor="#F56040" /><stop offset=".5" stopColor="#FD1D1D" /><stop offset=".62" stopColor="#E1306C" /><stop offset=".75" stopColor="#C13584" /><stop offset=".88" stopColor="#833AB4" /><stop offset="1" stopColor="#5851DB" /></radialGradient></defs><g fill="none" stroke="url(#ssigg)" strokeWidth="2.3"><rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6" /><circle cx="12" cy="12" r="4.4" /></g><circle cx="17.6" cy="6.4" r="1.4" fill="url(#ssigg)" /></svg>
      </a>
    </div>
  );
}

const SSG_CSS = ".ssg{background:#fff;font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D}.ssg *{box-sizing:border-box}.ssg-in{max-width:1180px;margin:0 auto;padding:26px 20px 28px;display:grid;gap:14px;align-items:center}.ssg-hrow{display:flex;align-items:center;gap:9px}.ssg h2{margin:0;font-size:22px;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:#00163D}.ssg-intro p{margin:6px 0 0;font-size:15px;line-height:1.45;font-weight:600;color:#3A4A63;max-width:420px}.ssg-box{background:#F4F6F9;border-radius:16px;padding:14px}.ssg-tabs{display:inline-flex;gap:2px;background:#fff;border:1px solid #E3E8EF;border-radius:999px;padding:3px}.ssg-tabs button{border:0;background:transparent;color:#3A4A63;font:inherit;font-size:13.5px;font-weight:800;padding:0 16px;min-height:34px;border-radius:999px;cursor:pointer}.ssg-tabs button[aria-selected=true]{background:#00163D;color:#fff}.ssg-tabs button:focus-visible{outline:2px solid #FF5A0A;outline-offset:2px}.ssg-steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}.ssg-steps li{display:flex;align-items:center;gap:9px;font-size:14.5px;line-height:1.35;font-weight:700;color:#00163D}.ssg-n{flex:none;width:22px;height:22px;border-radius:50%;background:#fff;border:1.5px solid #FF5A0A;color:#00163D;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center}.ssg-steps svg{flex:none}@media(min-width:768px){.ssg-in{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:40px;padding:34px 40px}.ssg h2{font-size:26px}.ssg-box{padding:16px 18px}.ssg-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px}}";

function OnTheGo() {
  const [os, setOs] = useState("ios");
  useEffect(() => { try { if (/android/i.test(navigator.userAgent)) setOs("android"); } catch (e) {} }, []);
  const steps: any[] = os === "ios"
    ? [[Globe, "Open getsniffscout.com in Safari"], [Share, "Tap the Share button"], [Plus, "Select “Add to Home Screen”"], [Check, "Tap Add"]]
    : [[Globe, "Open getsniffscout.com in Chrome"], [MoreVertical, "Open the browser menu"], [Plus, "Select “Add to Home Screen” or “Install app”"]];
  return (
    <section className="ssg" aria-labelledby="ssg-h">
      <style>{SSG_CSS}</style>
      <div className="ssg-in">
        <div className="ssg-intro">
          <div className="ssg-hrow"><Smartphone size={24} color="#FF5A0A" strokeWidth={2.4} aria-hidden="true" /><h2 id="ssg-h">SniffScout on the Go!</h2></div>
          <p>Add SniffScout to your home screen for quick access to dog-friendly spots.</p>
        </div>
        <div className="ssg-box">
          <div className="ssg-tabs" role="tablist" aria-label="Choose your phone">
            {[["ios", "iPhone"], ["android", "Android"]].map(([k, t]) => <button key={k} type="button" role="tab" aria-selected={os === k} onClick={() => setOs(k)}>{t}</button>)}
          </div>
          <ol className="ssg-steps" role="tabpanel">
            {steps.map(([I, t], i) => <li key={t}><span className="ssg-n">{i + 1}</span><I size={16} color="#FF5A0A" strokeWidth={2.4} aria-hidden="true" /><span>{t}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

function JoinPack() {
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Please enter a valid email address."); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/join-pack", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), first: first.trim() }) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (x: any) { setErr(x?.message || "Something went wrong. Please try again."); }
    setBusy(false);
  }
  const input: React.CSSProperties = { width: "100%", boxSizing: "border-box", padding: "12px 15px", fontSize: 16, fontWeight: 600, fontFamily: "inherit", color: "#00163D", background: "#F8FAFD", border: "1.5px solid #D5DCE8", borderRadius: 12 };
  return (
    <section style={{ background: "#00163D", fontFamily: "Manrope,'Helvetica Neue',Arial,sans-serif", color: "#fff", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,.14)" }}>
      <style>{".ss-pack input:focus{outline:none;border-color:#FF5A0A!important;box-shadow:0 0 0 4px rgba(255,90,10,.18)}.ss-pack-btn{transition:transform .15s,box-shadow .15s,filter .15s}.ss-pack-btn:hover{filter:brightness(1.06);transform:translateY(-1px);box-shadow:0 8px 18px rgba(255,90,10,.35)!important}"}</style>
      <div className="ss-pack mx-auto grid max-w-[1180px] items-center gap-5 px-5 py-8 md:grid-cols-2 md:gap-10 md:px-10 md:py-10">
        <div className="order-2 mx-auto w-full max-w-[380px] md:order-1 md:mx-0 md:max-w-[480px] md:justify-self-end">
          <div style={{ position: "relative", width: "100%", aspectRatio: "1252 / 828", borderRadius: 16, overflow: "hidden", boxShadow: "0 14px 28px -14px rgba(0,0,0,.5)" }}>
            <img src={PACK_PHOTO.src} alt={PACK_PHOTO.alt} style={{ position: "absolute", left: "-6.39%", top: "-8.45%", width: "111.82%", maxWidth: "none", height: "auto", display: "block" }} />
          </div>
        </div>
        <div className="order-1 text-center md:order-2 md:text-left">
          <h2 className="inline-flex items-center gap-3 font-extrabold" style={{ fontSize: "clamp(30px,5vw,46px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}><span>Join the Email <span style={{ color: "#FF5A0A" }}>Pack</span></span> <PawPrint aria-hidden="true" color="#FFFFFF" strokeWidth={2.6} style={{ width: "0.85em", height: "0.85em", flex: "none" }} /></h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[16px] font-semibold leading-snug md:mx-0" style={{ color: "rgba(255,255,255,.85)" }}>Get new dog-friendly finds around Northern Kentucky and Cincinnati, plus a first look as SniffScout grows.</p>
          {done ? (
            <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl p-5 md:justify-start" style={{ background: "#FFF0E6", border: "2px solid #FFD9C2" }}>
              <CheckCircle2 className="h-8 w-8 flex-none" color="#15946B" />
              <p className="text-left text-[16px] font-extrabold" style={{ color: "#00163D" }}>Welcome to the pack! Check your inbox for a note from me. 🐾</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 grid gap-2.5" noValidate>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input style={input} type="text" autoComplete="given-name" placeholder="First name (optional)" aria-label="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
                <input style={input} type="email" autoComplete="email" required placeholder="Your email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {err && <p role="alert" style={{ color: "#FFB4A8", fontSize: 14, fontWeight: 700, margin: 0 }}>{err}</p>}
              <button type="submit" disabled={busy} className="ss-pack-btn inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[19px] font-extrabold text-white" style={{ background: "#FF5A0A", border: 0, boxShadow: "none", cursor: "pointer", fontFamily: "inherit" }}>{busy ? "Joining…" : "Join the Pack"}<ArrowRight className="h-5 w-5" strokeWidth={3} /></button>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.7)", margin: 0 }}>By joining, you agree to get occasional emails from SniffScout. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h4 className="mb-2.5 text-[11px] font-extrabold uppercase tracking-wider md:text-xs md:tracking-widest" style={{ color: "#FF7A3D", fontFamily: "'Bricolage Grotesque',Figtree,sans-serif" }}>{children}</h4>
  );
  return (
    <>
      <JoinPack />
      <OnTheGo />
      <footer className="relative w-full" style={{ background: "#00163D", fontFamily: "Figtree,'Helvetica Neue',Arial,sans-serif" }}>
        <style>{".ss-flink{display:inline-block;max-width:100%;color:rgba(255,255,255,.82);font-size:13px;line-height:1.3;text-decoration:none;overflow-wrap:break-word;transition:color .2s}.ss-fcol{min-width:0}.ss-fcol h4{margin-top:0;line-height:1.2}.ss-flink:hover{color:#FF9B68}"}</style>
        <div className="mx-auto max-w-[1400px] px-5 pb-4 pt-6 md:px-10 md:pb-5 md:pt-8">
          <div className="flex flex-col gap-5 md:gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2 md:space-y-3">
              <img src={LOGO} alt="SniffScout" className="h-[40px] w-auto md:h-[52px]" style={{ display: "block" }} />
              {CONTACT_EMAIL && <a href={"mailto:" + CONTACT_EMAIL} className="inline-flex items-center gap-2 text-sm font-bold text-white no-underline hover:opacity-80"><Mail className="h-4 w-4" color="#FF7A3D" strokeWidth={2.4} /> {CONTACT_EMAIL}</a>}
              <Social />
            </div>
            <div className="grid grid-cols-[minmax(0,1.25fr)_max-content_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-3 md:gap-x-14">
              <div className="ss-fcol">
                <H>Explore</H>
                <ul className="space-y-2.5 md:space-y-1.5">
                  <li><a href="/" className="ss-flink">Home</a></li>
                  <li><a href="/claim-your-business" className="ss-flink">Claim Your Listing</a></li>
                  <li><a href="/submit-a-place" className="ss-flink">Submit a Dog-Friendly Spot</a></li>
                  <li><a href="/dog-friendly-places" className="ss-flink">Browse by City</a></li>
                  <li><a href="/for-businesses" className="ss-flink">For Businesses</a></li>
                </ul>
              </div>
              <div className="ss-fcol">
                <H>Company</H>
                <ul className="space-y-2.5 md:space-y-1.5">
                  <li><a href="/about" className="ss-flink">About</a></li>
                  <li><a href="/contact" className="ss-flink">Contact</a></li>
                </ul>
              </div>
              <div className="ss-fcol">
                <H>Legal</H>
                <ul className="space-y-2.5 md:space-y-1.5">
                  <li><a href="/privacy-policy" className="ss-flink">Privacy Policy</a></li>
                  <li><a href="/terms" className="ss-flink">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-1 border-t pt-3 md:mt-6 md:gap-2 md:pt-4 text-xs sm:flex-row sm:items-center" style={{ borderColor: "rgba(255,255,255,.14)", color: "rgba(255,255,255,.55)" }}>
            <p>© {new Date().getFullYear()} SniffScout. All rights reserved.</p>
            <p className="inline-flex items-center gap-1.5">Made with <Heart className="h-3.5 w-3.5" color="#FF7A3D" fill="#FF7A3D" strokeWidth={2.4} aria-label="love" /> for dog lovers</p>
          </div>
        </div>
      </footer>
    </>
  );
}
