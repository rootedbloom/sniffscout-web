"use client";
import { useEffect, useRef, useState } from "react";
import { Check, PawPrint } from "lucide-react";

const VERIFIED_BADGE = "https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b76/sniffscout-verified-dog-friendly-badge.png";
const CHECKS = ["Confirmed dog access", "Business-confirmed pup perks"];

const CSS = `
.ss-kb{position:relative;overflow:hidden;background:#00163D;border-radius:50% 50% 0 0 / 22px 22px 0 0;padding:34px 16px 44px;margin-top:16px;margin-bottom:-56px}
.ss-kb-wrap{position:relative;z-index:1;max-width:760px;margin:0 auto}
.ss-kb-h{color:#fff;text-align:center;font-weight:800;font-size:clamp(26px,3.4vw,36px);line-height:1.1;letter-spacing:-.02em;margin:0}
.ss-kb-intro{color:#C9D4EA;text-align:center;font-size:15px;font-weight:600;line-height:1.45;margin:8px auto 0;max-width:42ch}
.ss-kb-card{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;margin:20px auto 0;box-sizing:border-box;background:#fff;border:2px solid #FF5A0A;border-radius:20px;padding:16px 18px 20px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 16px 34px -14px rgba(255,90,10,.45)}
.ss-kb-paw{position:absolute;color:#FF5A0A;opacity:.1;pointer-events:none}
.ss-kb-paw1{top:-8px;right:-6px;transform:rotate(18deg)}
.ss-kb-paw2{bottom:-10px;left:-8px;transform:rotate(-20deg)}
.ss-kb-bw{position:relative;z-index:1;flex:none}
.ss-kb-badge{display:block;width:210px;max-width:80vw;height:auto;aspect-ratio:3/2;object-fit:contain}
.ss-kb-body{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.ss-kb-ch{color:#00163D;font-weight:800;font-size:20px;line-height:1.2;letter-spacing:-.015em;margin:4px 0 0}
.ss-kb-ch em{font-style:normal;color:#FF5A0A}
.ss-kb-cp{color:#3A4A63;font-size:14.5px;line-height:1.5;font-weight:600;margin:6px 0 0;max-width:46ch}
.ss-kb-checks{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.ss-kb-checks li{display:inline-flex;align-items:center;gap:7px;background:#FFF3EB;border:1px solid #FFD9C4;border-radius:999px;padding:6px 12px 6px 7px;color:#00163D;font-size:13.5px;font-weight:800;line-height:1.25}
@media(max-width:374px){.ss-kb-checks li{font-size:12.5px;padding-right:10px;white-space:nowrap}}
.ss-kb-ck{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#FF5A0A;color:#fff}
@keyframes ss-kb-rise{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}
@keyframes ss-kb-pop{0%{transform:scale(.85) rotate(-4deg)}60%{transform:scale(1.04) rotate(1deg)}100%{transform:none}}
.ss-pre .ss-kb-card{opacity:0}
.ss-kbin .ss-kb-card{animation:ss-kb-rise .6s cubic-bezier(.2,.7,.3,1) backwards}
.ss-kbin .ss-kb-badge{animation:ss-kb-pop .7s .2s ease backwards}
@media (min-width:768px){
.ss-kb{border-radius:50% 50% 0 0 / 48px 48px 0 0;padding:52px 40px 50px;margin-top:24px}
.ss-kb-intro{font-size:16px}
.ss-kb-card{flex-direction:row;align-items:center;text-align:left;gap:26px;margin-top:26px;padding:20px 32px 20px 22px;border-radius:22px}
.ss-kb-badge{width:238px;max-width:none}
.ss-kb-body{align-items:flex-start}
.ss-kb-ch{font-size:23px;margin:0}.ss-kb-cp{font-size:15px}
.ss-kb-checks{justify-content:flex-start}
.ss-kb-checks li{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.ss-pre .ss-kb-card{opacity:1}.ss-kbin .ss-kb-card,.ss-kbin .ss-kb-badge{animation:none}}
`;

export default function KnowBeforeYouGo() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ss-kb" style={{ fontFamily: "Manrope,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{CSS}</style>
      <div ref={ref} className={"ss-kb-wrap" + (seen ? " ss-kbin" : " ss-pre")}>
        <h2 className="ss-kb-h">Know <span style={{ color: "#FF5A0A" }}>Before You Go</span></h2>
        <p className="ss-kb-intro">Less guessing. More tail wagging!</p>
        <div className="ss-kb-card">
          <PawPrint aria-hidden="true" className="ss-kb-paw ss-kb-paw1" size={54} fill="currentColor" strokeWidth={1.5} />
          <PawPrint aria-hidden="true" className="ss-kb-paw ss-kb-paw2" size={46} fill="currentColor" strokeWidth={1.5} />
          <div className="ss-kb-bw">
            <img src={VERIFIED_BADGE} alt="SniffScout Verified Dog-Friendly Business badge" width={1536} height={1024} className="ss-kb-badge" loading="lazy" decoding="async" />
          </div>
          <div className="ss-kb-body">
            <h3 className="ss-kb-ch">Look for the <em>Verified</em> Badge!</h3>
            <p className="ss-kb-cp">No more wondering if your pup is welcome! SniffScout Verified businesses have personally confirmed their dog‑friendly policies and pup perks.</p>
            <ul className="ss-kb-checks">
              {CHECKS.map((c) => <li key={c}><span className="ss-kb-ck" aria-hidden="true"><Check size={13} strokeWidth={3.4} /></span>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
