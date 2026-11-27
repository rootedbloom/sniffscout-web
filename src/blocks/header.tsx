"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LOGO } from "@/lib/logo";

const LINKS = [
  { label: "Home", href: "/", match: (p) => p === "/" || p === "" },
  { label: "About", href: "/about", match: (p) => p.indexOf("/about") === 0 },
  { label: "For Businesses", href: "/for-businesses", match: (p) => p.indexOf("/for-businesses") === 0 || p.indexOf("/top-dog-partners") === 0 },
  { label: "Claim Your Listing", href: "/claim-your-business", match: (p) => p.indexOf("/claim-your-business") === 0 },
  { label: "Contact", href: "/contact", match: (p) => p.indexOf("/contact") === 0 },
];
const CTA = { label: "Submit a Spot 🐾", href: "/submit-a-place" };

const CSS = `

.ss-nl{position:relative;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:8px 2px;white-space:nowrap;transition:color .2s}
.ss-nl:hover{color:#FF9B68}
.ss-nl[data-on="1"]::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:3px;border-radius:3px;background:#FF5A0A}
.ss-cta{display:inline-flex;align-items:center;gap:9px;background:#FF5A0A;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:999px;border:0;box-shadow:0 8px 22px rgba(255,90,10,.45);transition:transform .2s,box-shadow .2s,filter .2s}
.ss-cta:hover{transform:translateY(-2px);filter:brightness(1.08);box-shadow:0 12px 28px rgba(255,90,10,.6)}
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");
  useEffect(() => { try { setPath(window.location.pathname); } catch (e) {} }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "#00163D", fontFamily: "Figtree,'Helvetica Neue',Arial,sans-serif", borderBottom: "3px solid #FF5A0A" }}>
      <style>{CSS}</style>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 md:px-10 md:py-3">
        <a href="/" aria-label="SniffScout home" className="block shrink-0">
          <img src={LOGO} alt="SniffScout" className="h-[56px] w-auto md:h-[72px]" style={{ display: "block" }} />
        </a>
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="ss-nl" data-on={l.match(path) ? "1" : "0"}>{l.label}</a>
          ))}
          <a href={CTA.href} className="ss-cta">{CTA.label}</a>
        </nav>
        <button type="button" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} style={{ background: "transparent", border: "2px solid rgba(255,255,255,.35)", borderRadius: 12, padding: 8, color: "#fff", cursor: "pointer" }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden" style={{ background: "#00163D", padding: "6px 20px 22px", display: "grid", gap: 6 }}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ color: "#fff", fontWeight: 800, fontSize: 19, textDecoration: "none", padding: "12px 4px", borderBottom: "1px solid rgba(255,255,255,.14)" }}>{l.label}</a>
          ))}
          <a href={CTA.href} className="ss-cta" style={{ justifyContent: "center", marginTop: 10 }}>{CTA.label}</a>
        </div>
      )}
    </header>
  );
}
