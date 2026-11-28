"use client";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const VERIFIED_BADGE = "https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b76/sniffscout-verified-dog-friendly-badge.png";
const CHECKS = ["Confirmed dog access", "Business-confirmed pup perks"];

const CSS = `
.ss-kb{position:relative;overflow:hidden;background:#00163D;border-radius:50% 50% 0 0 / 22px 22px 0 0;padding:34px 16px 44px;margin-top:16px;margin-bottom:-56px}
.ss-kb-wrap{position:relative;z-index:1;max-width:620px;margin:0 auto}
.ss-kb-h{color:#fff;text-align:center;font-weight:800;font-size:clamp(26px,3.4vw,36px);line-height:1.1;letter-spacing:-.02em;margin:0}
.ss-kb-intro{color:#C9D4EA;text-align:center;font-size:15px;font-weight:600;line-height:1.45;margin:8px auto 0;max-width:42ch}
.ss-kb-card{display:flex;flex-direction:column;align-items:center;text-align:center;margin:20px auto 0;box-sizing:border-box;background:#fff;border-radius:18px;padding:16px 18px 20px;box-shadow:0 1px 2px rgba(0,0,0,.10),0 12px 28px -14px rgba(0,0,0,.55)}
.ss-kb-badge{display:block;width:168px;max-width:70%;height:auto;aspect-ratio:3/2;object-fit:contain}
.ss-kb-ch{color:#00163D;font-weight:800;font-size:19px;line-height:1.2;letter-spacing:-.015em;margin:6px 0 0}
.ss-kb-cp{color:#3A4A63;font-size:14.5px;line-height:1.5;font-weight:600;margin:6px 0 0;max-width:46ch}
.ss-kb-checks{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px}
.ss-kb-checks li{display:inline-flex;align-items:center;gap:7px;color:#00163D;font-size:14px;font-weight:800;line-height:1.3}
.ss-kb-ck{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#FF5A0A;color:#fff}
@keyframes ss-kb-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.ss-pre .ss-kb-card{opacity:0}
.ss-kbin .ss-kb-card{animation:ss-kb-rise .55s ease backwards}
@media (min-width:768px){
.ss-kb{border-radius:50% 50% 0 0 / 48px 48px 0 0;padding:52px 40px 50px;margin-top:24px}
.ss-kb-intro{font-size:16px}
.ss-kb-card{margin-top:26px;padding:20px 32px 24px;border-radius:20px}
.ss-kb-badge{width:190px}.ss-kb-ch{font-size:21px}.ss-kb-cp{font-size:15px}
.ss-kb-checks li{font-size:14.5px}
}
@media (prefers-reduced-motion:reduce){.ss-pre .ss-kb-card{opacity:1}.ss-kbin .ss-kb-card{animation:none}}
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
        <p className="ss-kb-intro">Sniff out your next adventure with confidence!</p>
        <div className="ss-kb-card">
          <img src={VERIFIED_BADGE} alt="SniffScout Verified Dog-Friendly Business badge" width={1536} height={1024} className="ss-kb-badge" loading="lazy" decoding="async" />
          <h3 className="ss-kb-ch">Look for the Verified Badge</h3>
          <p className="ss-kb-cp">SniffScout Verified businesses have personally confirmed their dog-friendly policies and pup perks, so you and your pup know what to expect before heading out.</p>
          <ul className="ss-kb-checks">
            {CHECKS.map((c) => <li key={c}><span className="ss-kb-ck" aria-hidden="true"><Check size={13} strokeWidth={3.4} /></span>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
