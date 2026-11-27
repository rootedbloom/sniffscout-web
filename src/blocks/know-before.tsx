"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const VERIFIED_BADGE = "https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b76/sniffscout-verified-dog-friendly-badge.png";
const TOPDOG_BADGE = "https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b70/sniffscout-top-dog-partner-badge.png";

const CSS = `
.ss-kb{position:relative;overflow:hidden;background:#00163D;border-radius:50% 50% 0 0 / 22px 22px 0 0;padding:36px 16px 44px;margin-top:16px;margin-bottom:-56px}
.ss-kb-wrap{position:relative;z-index:1;max-width:940px;margin:0 auto}
.ss-kb-h{color:#fff;text-align:center;font-weight:800;font-size:clamp(26px,3.4vw,36px);line-height:1.1;letter-spacing:-.02em;margin:0}
.ss-kb-intro{color:#C9D4EA;text-align:center;font-size:15px;font-weight:600;line-height:1.45;margin:8px auto 0;max-width:42ch}
.ss-kb-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;margin:22px auto 0;align-items:stretch}
.ss-kb-card{display:grid;grid-template-columns:minmax(0,1fr);justify-items:center;align-content:start;text-align:center;row-gap:10px;height:100%;box-sizing:border-box;background:#fff;border:0;border-radius:18px;padding:18px 15px 16px;box-shadow:0 1px 2px rgba(0,0,0,.10),0 12px 28px -14px rgba(0,0,0,.55);transition:transform .2s ease,box-shadow .2s ease}
.ss-kb-badge{display:block;width:168px;max-width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;transition:transform .25s ease}
.ss-kb-text{min-width:0;text-align:center}
.ss-kb-ch{color:#00163D;font-weight:800;font-size:19px;line-height:1.2;letter-spacing:-.015em;margin:0}
.ss-kb-cp{color:#3A4A63;font-size:14.5px;line-height:1.45;font-weight:600;margin:5px 0 0}
.ss-kb-btnrow{grid-column:1/-1;width:100%;margin-top:2px;display:flex;justify-content:center}
.ss-kb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:72%;height:46px;box-sizing:border-box;padding:0 24px;border-radius:999px;background:#FF5A0A;color:#fff!important;font-weight:800;font-size:14.5px;white-space:nowrap;line-height:1;text-decoration:none!important;transition:background-color .15s ease,transform .15s ease,box-shadow .15s ease}
.ss-kb-btn:hover{background:#FF6F2B;transform:translateY(-1px);box-shadow:0 6px 14px rgba(255,90,10,.35)}
.ss-kb-btn:focus-visible{outline:3px solid #fff;outline-offset:3px}
.ss-kb-arrow{flex:none;transition:transform .18s ease}.ss-kb-btn:hover .ss-kb-arrow{transform:translateX(3px)}
@keyframes ss-kb-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.ss-pre .ss-kb-card{opacity:0}
.ss-kbin .ss-kb-card{animation:ss-kb-rise .55s ease backwards}
.ss-kbin .ss-kb-card:nth-child(2){animation-delay:.1s}
@media (min-width:768px){
.ss-kb{border-radius:50% 50% 0 0 / 48px 48px 0 0;padding:56px 40px 52px;margin-top:24px}
.ss-kb-intro{font-size:16px}
.ss-kb-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:30px}
.ss-kb-card{row-gap:12px;padding:26px 24px 24px;border-radius:20px}
.ss-kb-badge{width:200px}.ss-kb-ch{font-size:21px}.ss-kb-cp{font-size:15px}
.ss-kb-btn{min-width:0;height:44px;font-size:14px}
}
@media (hover:hover) and (min-width:768px){.ss-kb-card:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(0,0,0,.12),0 18px 34px -14px rgba(0,0,0,.6)}.ss-kb-card:hover .ss-kb-badge{transform:scale(1.03)}}
@media(min-width:1024px){.ss-kb-wrap{max-width:1000px}.ss-kb-card{grid-template-columns:200px minmax(0,1fr);justify-items:stretch;align-content:center;align-items:center;text-align:left;column-gap:22px;row-gap:0;padding:24px 26px}.ss-kb-text{text-align:left}.ss-kb-btnrow{grid-column:2;margin-top:14px;justify-content:flex-start}}
@media (prefers-reduced-motion:reduce){.ss-pre .ss-kb-card{opacity:1}.ss-kbin .ss-kb-card{animation:none}.ss-kb-card,.ss-kb-badge,.ss-kb-btn{transition:none}}
`;

export default function KnowBeforeYouGo() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ss-kb" style={{ fontFamily: "Manrope,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{CSS}</style>
      <div className="ss-kb-wrap">
        <h2 className="ss-kb-h">Know <span style={{ color: "#FF5A0A" }}>Before You Go</span></h2>
        <p className="ss-kb-intro">Look for these badges when sniffing out your next dog-friendly adventure!</p>
        <div ref={gridRef} className={"ss-kb-grid" + (seen ? " ss-kbin" : " ss-pre")}>
          <div className="ss-kb-card">
            <img src={VERIFIED_BADGE} alt="SniffScout Verified Dog-Friendly Business badge" width={1536} height={1024} className="ss-kb-badge" loading="lazy" decoding="async" />
            <div className="ss-kb-text">
              <h3 className="ss-kb-ch">SniffScout Verified</h3>
              <p className="ss-kb-cp">These businesses have confirmed their dog-friendly policies and pup perks, so you know what to expect before you and your pup head out.</p>
            </div>
          </div>
          <div className="ss-kb-card">
            <img src={TOPDOG_BADGE} alt="SniffScout Top Dog Partner Dog-Friendly Business badge with crown" width={1536} height={1024} className="ss-kb-badge" loading="lazy" decoding="async" />
            <div className="ss-kb-text">
              <h3 className="ss-kb-ch">Top Dog Partners</h3>
              <p className="ss-kb-cp">Our featured dog-friendly businesses that proudly welcome pups and help support the growth of SniffScout. Show them some extra love on your next adventure!</p>
            </div>
            <div className="ss-kb-btnrow"><a href="/for-businesses" className="ss-kb-btn">Explore Top Dog Partners<ArrowRight aria-hidden="true" className="ss-kb-arrow" size={17} strokeWidth={2.8} color="#fff" /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
