"use client";
// "SniffScout on the Go!" (add to home screen) section shown directly above the footer
// on every page. One shared copy so the styling is the same everywhere.
import { useEffect, useState, type ReactNode } from "react";

const CSS = ".otg{background:#fff;font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D}.otg *{box-sizing:border-box}.otg-in{max-width:1180px;margin:0 auto;padding:26px 20px 28px;display:grid;gap:14px;align-items:center}.otg-hrow{display:flex;align-items:center;gap:10px}.otg-ic{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:#FF5A0A;color:#fff}.otg h2{margin:0;font-size:22px;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:#00163D}.otg-intro p{margin:8px 0 0;font-size:15px;line-height:1.45;font-weight:600;color:#00163D;max-width:430px}.otg-box{background:#FFF3EB;border:1px solid #FF5A0A;border-radius:16px;padding:14px}.otg-tabs{display:inline-flex;gap:2px;background:#fff;border:1px solid rgba(0,22,61,.18);border-radius:999px;padding:3px}.otg-tabs button{border:0;background:transparent;color:#00163D;font:inherit;font-size:13.5px;font-weight:800;padding:0 16px;min-height:34px;border-radius:999px;cursor:pointer;transition:background-color .15s,color .15s}.otg-tabs button[aria-selected=true]{background:#00163D;color:#fff}.otg-tabs button:focus-visible{outline:2px solid #FF5A0A;outline-offset:2px}.otg-steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:8px}.otg-steps li{display:flex;align-items:center;gap:9px;font-size:14.5px;line-height:1.35;font-weight:700;color:#00163D}.otg-n{flex:none;width:22px;height:22px;border-radius:50%;background:#FF5A0A;color:#fff;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center}.otg-steps svg{flex:none}@media(min-width:768px){.otg-in{padding:34px 40px}.otg h2{font-size:26px}.otg-box{padding:16px 18px}}@media(min-width:900px){.otg-in{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:40px}}@media(min-width:1024px){.otg-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px}}@media(prefers-reduced-motion:reduce){.otg-tabs button{transition:none}}";

const icon = (c: ReactNode) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c}</svg>;
const ICONS: Record<string, ReactNode> = {
  globe: icon(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  share: icon(<><path d="M12 15V3M7 8l5-5 5 5" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></>),
  plus: icon(<path d="M12 5v14M5 12h14" />),
  check: icon(<path d="M5 12l5 5 9-10" />),
  dots: icon(<><circle cx="12" cy="5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="19" r="1.4" /></>),
};
const STEPS: Record<string, [string, string][]> = {
  ios: [["globe", "Open getsniffscout.com in Safari"], ["share", "Tap the Share button"], ["plus", "Select “Add to Home Screen”"], ["check", "Tap Add"]],
  android: [["globe", "Open getsniffscout.com in Chrome"], ["dots", "Open the browser menu"], ["plus", "Select “Add to Home Screen” or “Install app”"]],
};
const TABS: [string, string][] = [["ios", "iPhone"], ["android", "Android"]];

export function OnTheGo() {
  const [os, setOs] = useState("ios");
  // Android visitors see the Android steps first.
  useEffect(() => { try { if (/android/i.test(navigator.userAgent)) setOs("android"); } catch (e) {} }, []);
  // Left and right arrow keys switch tabs.
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = os === "ios" ? "android" : "ios";
    setOs(n);
    const el = e.currentTarget.parentElement?.querySelector<HTMLButtonElement>('[data-k="' + n + '"]');
    if (el) el.focus();
  };
  return (
    <section className="otg" aria-labelledby="otg-h">
      <style>{CSS}</style>
      <div className="otg-in">
        <div className="otg-intro">
          <div className="otg-hrow">
            <span className="otg-ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg></span>
            <h2 id="otg-h">SniffScout on the Go!</h2>
          </div>
          <p>Keep your favorite dog-friendly spots just one tap away. Add SniffScout to your phone’s home screen!</p>
        </div>
        <div className="otg-box">
          <div className="otg-tabs" role="tablist" aria-label="Choose your phone">
            {TABS.map(([k, t]) => <button key={k} data-k={k} id={"otg-t-" + k} type="button" role="tab" aria-selected={os === k} aria-controls="otg-p" tabIndex={os === k ? 0 : -1} onClick={() => setOs(k)} onKeyDown={onKey}>{t}</button>)}
          </div>
          <ol className="otg-steps" id="otg-p" role="tabpanel" aria-labelledby={"otg-t-" + os}>
            {STEPS[os].map(([i, t], n) => <li key={t}><span className="otg-n">{n + 1}</span>{ICONS[i]}<span>{t}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
export default OnTheGo;
