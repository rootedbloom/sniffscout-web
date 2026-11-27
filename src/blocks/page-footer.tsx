"use client";
// Footer used at the bottom of the About and Contact pages (copied from the Softr pages).
import { PawPrint, Mail } from "lucide-react";
import { LOGO } from "@/lib/logo";
import { SSGo, SSSocial } from "./softr-footer";

// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const FOOT_CSS = `
.ss-f2{display:inline-block;color:rgba(255,255,255,.82);font-size:13px;line-height:1.3;text-decoration:none;transition:color .2s}
.ss-f2:hover{color:#FF9B68}
`;

export default function PageFooter() {
  const col = (h: string, links: string[][]) => (
    <div>
      <h4 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#FF7A3D", fontFamily: "'Bricolage Grotesque',Figtree,sans-serif" }}>{h}</h4>
      <ul className="space-y-1.5">{links.map(([t, u]) => <li key={t}><a href={u} className="ss-f2">{t}</a></li>)}</ul>
    </div>
  );
  return (
    <><SSGo /><footer className="relative w-full" style={{ background: "#00163D", fontFamily: "Figtree,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{FOOT_CSS}</style>
      <div className="h-[2px] w-full" style={{ background: "#FF5A0A" }} />
      <div className="mx-auto max-w-[1400px] px-5 pb-4 pt-6 md:px-10 md:pb-5 md:pt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="space-y-2 md:space-y-3">
            <img src={LOGO} alt="SniffScout" className="h-[40px] w-auto md:h-[52px]" style={{ display: "block" }} />
            {CONTACT_EMAIL && <a href={"mailto:" + CONTACT_EMAIL} className="inline-flex items-center gap-2 text-sm font-bold text-white no-underline hover:opacity-80"><Mail className="h-4 w-4" color="#FF7A3D" strokeWidth={2.4} /> {CONTACT_EMAIL}</a>}
            <SSSocial />
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:gap-x-16">
            {col("Explore", [["Home", "/"], ["Submit a Spot", "/submit-a-place"], ["Claim Your Free Listing", "/claim-your-business"], ["Top Dog Partners", "/for-businesses"]])}
            {col("Company", [["About", "/about"], ["Contact", "/contact"]])}
            {col("Legal", [["Privacy Policy", "/privacy-policy"], ["Terms of Use", "/terms"]])}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-start justify-between gap-1 pt-3 text-xs sm:flex-row sm:items-center md:mt-6 md:gap-2 md:pt-4" style={{ borderColor: "rgba(255,255,255,.14)", color: "rgba(255,255,255,.55)" }}>
          <p>© {new Date().getFullYear()} SniffScout. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">Made with <PawPrint className="h-3.5 w-3.5" color="#FF7A3D" strokeWidth={2.6} /> for dog lovers</p>
        </div>
      </div>
    </footer></>
  );
}
