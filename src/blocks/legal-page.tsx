"use client";
// Privacy Policy and Terms of Use layout (copied from the Softr legal pages).
import { PawPrint } from "lucide-react";
import { ssTypoInit } from "@/lib/ss-typo";
import PageFooter from "./page-footer";

// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const mail = CONTACT_EMAIL ? '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a>" : "our contact page";

const CSS = `
@keyframes ss-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes ss-float{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-14px) rotate(var(--r,0deg))}}
.ss-art a{color:#FF5A0A;font-weight:700}
@media (prefers-reduced-motion:reduce){.ss-anim{animation:none!important}}
`;

ssTypoInit();

export type LegalSection = { h: string; p: string[] };

// Section text may contain {EMAIL}, which becomes a link to the contact address.
export default function LegalPage({ title, sub, updated, sections }: { title: string; sub: string; updated?: string; sections: LegalSection[] }) {
  return (
    <div style={{ background: "#FFFFFF", fontFamily: "Figtree,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{CSS}</style>
      <section className="relative overflow-hidden" style={{ background: "#00163D" }}>
        <PawPrint className="ss-anim pointer-events-none absolute hidden md:block" aria-hidden="true" size={140} color="#FF5A0A" strokeWidth={1.5} style={{ right: "8%", top: "14%", opacity: 0.16, "--r": "14deg", animation: "ss-float 8s ease-in-out infinite" } as any} />
        <div className="relative mx-auto max-w-[860px] px-5 pb-24 pt-14 text-center md:pb-28 md:pt-20">
          <h1 className="ss-anim text-4xl font-extrabold text-white md:text-6xl" style={{ fontFamily: "'Bricolage Grotesque',Figtree,sans-serif", animation: "ss-up .7s ease both" }}>{title}</h1>
          <p className="ss-anim mt-4 text-lg font-semibold" style={{ color: "#FF7A3D", animation: "ss-up .7s ease .12s both" }}>{sub}</p>
          {updated && <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,.6)" }}>Last updated {updated}</p>}
        </div>
        <svg className="absolute bottom-[-1px] left-0 h-[44px] w-full md:h-[64px]" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55 C260 5 520 100 800 52 C1060 8 1260 80 1440 40 L1440 100 L0 100 Z" fill="#FFFFFF" /></svg>
      </section>
      <article className="ss-art mx-auto max-w-[780px] px-5 pb-20 pt-6">
        {sections.map((s) => (
          <div key={s.h} className="mb-9">
            <h2 className="mb-3 text-2xl font-extrabold" style={{ color: "#00163D", fontFamily: "'Bricolage Grotesque',Figtree,sans-serif" }}><span style={{ color: "#FF5A0A" }}>•</span> {s.h}</h2>
            {s.p.map((t, i) => <p key={i} className="mb-3 text-[17px] leading-[1.75]" style={{ color: "#33425A" }} dangerouslySetInnerHTML={{ __html: t.split("{EMAIL}").join(mail) }} />)}
          </div>
        ))}
      </article>
      <PageFooter />
    </div>
  );
}
