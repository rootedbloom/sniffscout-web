"use client";
import { ArrowRight, Crown, PawPrint, Check } from "lucide-react";

const TD_BENEFITS = ["Priority placement in relevant local searches", "Exclusive Top Dog Partner badge", "Enhanced business listing", "Showcase your specials and promotions", "Top Dog Partner window decal"];
// Turn off once all 20 founding spots are filled.
const FOUNDING_OPEN = true;
const SUBMIT_IMG = { src: "https://cdn.jsdelivr.net/gh/rootedbloom/sniffscout-sitemap@main/dog-golden-retriever.webp", alt: "Golden retriever wearing a SniffScout bandana and carrying an orange ball" };
const CLAIM_IMG = { src: "https://cdn.jsdelivr.net/gh/rootedbloom/sniffscout-sitemap@main/dog-german-shepherd.webp", alt: "German shepherd in an orange SniffScout bandana holding a Dogs Welcome sign" };

const CSS = `
.ss-cards{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;max-width:1180px;margin:0 auto;font-family:Manrope,'Helvetica Neue',Arial,sans-serif}
.ss-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 108px;align-items:center;column-gap:12px;height:100%;box-sizing:border-box;background:#fff;border:1px solid #E5E9F0;border-radius:20px;padding:18px 16px 18px 18px;text-align:left;overflow:hidden;box-shadow:0 1px 2px rgba(0,22,61,.05),0 12px 28px -14px rgba(0,22,61,.22);transition:transform .2s ease,box-shadow .2s ease}
.ss-card:hover{transform:translateY(-2px);box-shadow:0 2px 4px rgba(0,22,61,.06),0 18px 34px -14px rgba(0,22,61,.28)}
.ss-text{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-width:0;position:relative;z-index:1}
.ss-hrow{display:flex;align-items:flex-start;gap:7px}
.ss-hpaw{flex:none;margin-top:3px;transform:rotate(-14deg)}
.ss-h{font-family:'Bricolage Grotesque',Manrope,sans-serif;font-weight:800;color:#00163D;font-size:20px;line-height:1.15;letter-spacing:-.02em;margin:0}
.ss-p{color:#3A4A63;font-size:14px;line-height:1.45;font-weight:600;margin:6px 0 12px}
.ss-btn{display:inline-flex;align-items:center;gap:7px;height:42px;box-sizing:border-box;padding:0 16px;border-radius:999px;background:#FF5A0A;color:#fff!important;font-weight:800;font-size:14px;line-height:1;white-space:nowrap;text-decoration:none!important;border:0;box-shadow:none;transition:background-color .15s ease,transform .15s ease,box-shadow .15s ease}
.ss-btn:hover{background:#FF6F2B;transform:translateY(-2px);box-shadow:0 8px 16px -6px rgba(255,90,10,.55)}
.ss-btn:focus-visible{outline:3px solid #00163D;outline-offset:3px}
.ss-arrow{flex:none;transition:transform .18s ease}
.ss-btn:hover .ss-arrow,.ss-btn:focus-visible .ss-arrow{transform:translateX(3px)}
.ss-dogwrap{display:flex;justify-content:center;align-items:center;align-self:center;height:118px}
.ss-dog{display:block;width:auto;height:auto;max-width:100%}
.ss-dogwrap--gr .ss-dog{max-height:108px}
.ss-dogwrap--gsd .ss-dog{max-height:130px}
.ss-dogwrap--gsd{height:130px}
@media (max-width:359px){.ss-card{grid-template-columns:minmax(0,1fr) 88px;padding:16px 12px 16px 14px}.ss-dogwrap{height:100px}.ss-dogwrap--gr .ss-dog{max-height:90px}.ss-dogwrap--gsd .ss-dog{max-height:100px}.ss-btn{font-size:13px;padding:0 13px}}
@media (min-width:640px){
.ss-card{grid-template-columns:minmax(0,1fr) 38%;column-gap:16px;padding:26px 24px 26px 28px;min-height:232px;border-radius:24px}
.ss-h{font-size:clamp(23px,2.2vw,27px)}
.ss-hpaw{margin-top:5px}
.ss-p{font-size:15px;margin:8px 0 16px;max-width:330px}
.ss-btn{height:44px;padding:0 20px;font-size:14.5px}
.ss-dogwrap{height:196px;justify-content:center}
.ss-dogwrap--gr .ss-dog{max-height:184px}
.ss-dogwrap--gsd .ss-dog{max-height:200px}
}
@media (min-width:1024px){.ss-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}}
.ss-promo{position:relative;overflow:hidden;max-width:880px;margin:44px auto 0;box-sizing:border-box;background:#00163D;color:#fff;border:1.5px solid #FF5A0A;border-radius:26px;padding:24px 20px 22px;font-family:Manrope,'Helvetica Neue',Arial,sans-serif;box-shadow:0 22px 44px -18px rgba(0,22,61,.55);display:grid;gap:18px;text-align:center}
.ss-paw{position:absolute;color:#fff;opacity:.08;pointer-events:none}
.ss-pl{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.ss-pbadge{display:inline-block;background:#FF5A0A;color:#fff;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:999px}
.ss-promo h3{font-family:'Bricolage Grotesque',Manrope,sans-serif;font-weight:800;font-size:clamp(23px,3vw,30px);line-height:1.1;letter-spacing:-.02em;margin:12px 0 0;color:#fff}
.ss-promo .desc{margin:9px 0 0;font-size:15px;line-height:1.5;color:rgba(255,255,255,.88);font-weight:600;max-width:380px}
.ss-pr{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.ss-plabel{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:800;color:#FF9B68;letter-spacing:.04em}
.ss-price{position:relative;margin-top:2px;font-family:'Bricolage Grotesque',Manrope,sans-serif;font-weight:800;color:#FF7A3D;line-height:1}
.ss-price::before{content:"";position:absolute;left:50%;top:50%;width:210px;height:130px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(255,90,10,.38),rgba(255,90,10,0));z-index:-1}
.ss-price b{font-size:58px;font-weight:800}
.ss-price span{font-size:18px;font-weight:800;color:#fff;margin-left:3px}
.ss-reg{margin-top:4px;font-size:14px;font-weight:700;color:rgba(255,255,255,.72)}
.ss-reg s{text-decoration-thickness:2px}
.ss-pcta{display:flex;width:100%;justify-content:center;align-items:center;gap:8px;min-height:50px;box-sizing:border-box;margin-top:16px;padding:13px 16px;border-radius:999px;background:#FF5A0A;color:#fff!important;font-weight:800;font-size:15px;white-space:nowrap;text-decoration:none!important;box-shadow:0 10px 24px rgba(255,90,10,.35);transition:transform .2s ease,box-shadow .2s ease}
.ss-pcta:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,90,10,.5)}
.ss-pcta:focus-visible{outline:3px solid #FF9B68;outline-offset:3px}
.ss-pcta:hover .ss-arrow{transform:translateX(4px)}
.ss-fine{margin-top:9px;font-size:12.5px;font-weight:700;color:rgba(255,255,255,.75)}
.ss-pben{margin:16px auto 0;width:100%;max-width:340px;text-align:left}
.ss-pbt{margin:0 0 8px;font-size:14px;line-height:1.3;font-weight:800;color:#FF9B68}
.ss-pben ul{list-style:none;margin:0;padding:0;display:grid;gap:7px}
.ss-pben li{display:flex;align-items:flex-start;gap:9px;font-size:14px;line-height:1.35;font-weight:700;color:#fff}
.ss-pck{flex:none;margin-top:1px;color:#FF7A3D}
.ss-pfound{margin-top:10px;display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center}
.ss-pfound b{font-size:14px;line-height:1.3;font-weight:800;color:#FF9B68}
.ss-pfound span{font-size:12.5px;line-height:1.4;font-weight:600;color:rgba(255,255,255,.8);max-width:290px}
@media (min-width:768px){.ss-pben{margin:16px 0 0;max-width:none}
.ss-promo{grid-template-columns:1fr 1fr;align-items:center;gap:26px;padding:28px 32px;text-align:left}
.ss-pl{align-items:flex-start}
.ss-pr{padding-left:28px;border-left:1px solid rgba(255,255,255,.14)}
.ss-pcta{width:auto;white-space:nowrap}}
@media (prefers-reduced-motion:reduce){.ss-card,.ss-btn,.ss-arrow,.ss-pcta{transition:none}.ss-card:hover,.ss-btn:hover,.ss-pcta:hover{transform:none}}
`;

export default function CtaCards() {
  const nb = (s: string) => s.replace(/-/g, "‑");
  return (
    <section className="w-full px-4 pb-3 pt-5 md:px-10 md:pb-6 md:pt-8" style={{ background: "#fff" }}>
      <style>{CSS}</style>
      <div className="ss-cards">
        <div className="ss-card">
          <div className="ss-text">
            <div className="ss-hrow"><PawPrint aria-hidden="true" className="ss-hpaw" size={18} color="#FF5A0A" fill="#FF5A0A" strokeWidth={1.5} /><h2 className="ss-h">Know a Great Spot?</h2></div>
            <p className="ss-p">Found a pup-friendly favorite? Help other dog lovers discover it!</p>
            <a href="/submit-a-place" className="ss-btn">Submit a Spot<ArrowRight aria-hidden="true" className="ss-arrow" size={17} strokeWidth={2.8} color="#fff" /></a>
          </div>
          <div className="ss-dogwrap ss-dogwrap--gr"><img className="ss-dog" src={SUBMIT_IMG.src} alt={SUBMIT_IMG.alt} width={680} height={691} loading="lazy" decoding="async" /></div>
        </div>
        <div className="ss-card">
          <div className="ss-text">
            <div className="ss-hrow"><PawPrint aria-hidden="true" className="ss-hpaw" size={18} color="#00163D" fill="#00163D" strokeWidth={1.5} /><h2 className="ss-h">{nb("Own a Dog-Friendly Business?")}</h2></div>
            <p className="ss-p">Let dog lovers know they’re welcome! Claim your free listing and show off your pup perks.</p>
            <a href="/claim-your-business" className="ss-btn">Claim Your Listing<ArrowRight aria-hidden="true" className="ss-arrow" size={17} strokeWidth={2.8} color="#fff" /></a>
          </div>
          <div className="ss-dogwrap ss-dogwrap--gsd"><img className="ss-dog" src={CLAIM_IMG.src} alt={CLAIM_IMG.alt} width={560} height={829} loading="lazy" decoding="async" /></div>
        </div>
      </div>
      <div className="ss-promo">
        <PawPrint aria-hidden="true" className="ss-paw" size={64} strokeWidth={1.5} style={{ left: -10, bottom: -14, transform: "rotate(-18deg)" }} />
        <PawPrint aria-hidden="true" className="ss-paw" size={40} strokeWidth={1.6} style={{ right: 18, top: 12, transform: "rotate(16deg)" }} />
        <PawPrint aria-hidden="true" className="ss-paw" size={28} strokeWidth={1.7} style={{ left: "48%", top: 14, transform: "rotate(-8deg)" }} />
        <div className="ss-pl">
          {FOUNDING_OPEN && <span className="ss-pbadge">Limited Founding Offer</span>}
          <h3>Calling All Dog-Friendly Businesses!</h3>
          <p className="desc">Stand out from the pack and turn more local dog lovers into loyal customers.</p>
          <div className="ss-pben">
            <p className="ss-pbt">Your Top Dog Partner Benefits</p>
            <ul>{TD_BENEFITS.map((b) => <li key={b}><Check className="ss-pck" size={17} strokeWidth={3.2} aria-hidden="true" />{b}</li>)}</ul>
          </div>
        </div>
        <div className="ss-pr">
          <span className="ss-plabel"><Crown size={15} strokeWidth={2.6} aria-hidden="true" /> {FOUNDING_OPEN ? "Founding Top Dog Partner" : "Top Dog Partner"}</span>
          <div className="ss-price"><b>{FOUNDING_OPEN ? "$37" : "$47"}</b><span>/month</span></div>
          {FOUNDING_OPEN && <div className="ss-reg">Regularly <s>$47/month</s></div>}
          {FOUNDING_OPEN && <div className="ss-pfound"><b>Exclusive founding rate for the first 20 partners!</b><span>Keep your $37 monthly rate for as long as your membership stays active.</span></div>}
          <a href="/for-businesses" className="ss-pcta">{FOUNDING_OPEN ? "Become a Founding Top Dog" : "Become a Top Dog Partner"}<ArrowRight aria-hidden="true" className="ss-arrow" size={18} strokeWidth={2.6} /></a>
          <div className="ss-fine">No setup fee. No contracts. Cancel anytime.</div>
        </div>
      </div>
    </section>
  );
}
