"use client";
// Contact page content (copied from the Softr "Contact content" block).
// Page title and description are set on the server (app/contact/page.tsx).
import { useState } from "react";
import { PawPrint } from "lucide-react";
import { useImageSetting } from "@/lib/editable-settings";
import { ssTypoInit } from "@/lib/ss-typo";
import PageFooter from "./page-footer";

// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
// Same GoHighLevel inbound webhook the Softr contact form posts to.
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/nxl71Pr1Ert2hcD3tCuV/webhook-trigger/109b9a33-a293-45a0-9f05-b4aa0332f56a";
// The form only sends once the new site goes live (FORMS_LIVE=true), so test messages
// from the preview never reach GoHighLevel.
const FORMS_LIVE = process.env.NEXT_PUBLIC_FORMS_LIVE === "true";
const TOPICS = ["General question", "Correction to a listing", "I own a dog-friendly business", "Feedback or an idea"];

const CSS = `
@keyframes ss-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes ss-float{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-14px) rotate(var(--r,0deg))}}
@media (prefers-reduced-motion:reduce){.ss-anim{animation:none!important}}
.ct{font-family:Figtree,'Helvetica Neue',Arial,sans-serif;color:#00163D}
.ct *{box-sizing:border-box}
.ct-h{font-family:'Bricolage Grotesque',Figtree,sans-serif;font-weight:800;letter-spacing:-.02em}
.ct-hero{position:relative;overflow:hidden;background:#00163D}
.ct-hero-in{position:relative;max-width:760px;margin:0 auto;padding:38px 22px 64px;text-align:center}
.ct-hero h1{margin:0;color:#fff;font-size:clamp(34px,8.6vw,56px);line-height:1.05}
.ct-hero h1 span{color:#FF5A0A}
.ct-hero p{margin:12px auto 0;max-width:470px;color:rgba(255,255,255,.88);font-size:17px;line-height:1.5;font-weight:600}
.ct-intro{max-width:1040px;margin:0 auto;padding:14px 22px 44px;display:grid;gap:26px;align-items:center}
.ct-fig{margin:0 auto;width:62%;max-width:250px;text-align:center}
.ct-ph{display:block;width:100%;aspect-ratio:3/2;overflow:hidden;border-radius:18px;border:2px solid #FF5A0A;box-shadow:0 10px 26px rgba(0,22,61,.12);transition:transform .35s ease,box-shadow .35s ease;background:#E9EDF2}
.ct-ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 68%}
.ct-fig:hover .ct-ph{transform:translateY(-3px) rotate(-1deg);box-shadow:0 16px 32px rgba(0,22,61,.16)}
.ct-fig figcaption{margin-top:12px;font-size:14px;line-height:1.4;font-weight:700;color:#3A4A63}
.ct-fig figcaption b{color:#FF5A0A;font-weight:800}
.ct-copy h2{margin:0 0 14px;font-size:clamp(26px,6.4vw,36px);line-height:1.12;color:#00163D}
.ct-copy h2 span{color:#FF5A0A}
.ct-copy p{margin:0 0 14px;max-width:560px;font-size:17px;line-height:1.65;color:#33425A}
.ct-copy p:last-child{margin-bottom:0;font-weight:700;color:#00163D}
.ct-copy a{color:#00163D;font-weight:700;text-decoration:underline;text-decoration-color:#FF5A0A;text-decoration-thickness:2px;text-underline-offset:3px;transition:color .2s}
.ct-copy a:hover{color:#FF5A0A}
.ct-form-wrap{background:#EDF4FC;padding:40px 18px 52px}
.ct-card{max-width:620px;margin:0 auto;background:#fff;border-radius:20px;border-top:4px solid #FF5A0A;box-shadow:0 2px 4px rgba(0,22,61,.04),0 16px 40px -8px rgba(0,22,61,.16);padding:24px 20px 26px}
.ct-paw{display:inline-block;vertical-align:-2px;margin-left:8px;transform:rotate(14deg)}
.ct-card h2{margin:0;font-size:clamp(26px,6vw,32px);line-height:1.15;color:#00163D}
.ct-card h2 span{color:#FF5A0A}
.ct-sub{margin:8px 0 20px;font-size:16px;line-height:1.5;color:#46556A}
.ct-grid{display:grid;gap:14px}
.ct-lab{display:block;font-size:14px;font-weight:800;color:#00163D}
.ct-in{display:block;width:100%;margin-top:6px;border:1.5px solid #D5DEEA;border-radius:12px;background:#fff;padding:12px 14px;font:inherit;font-size:16px;font-weight:500;color:#00163D;outline:none;transition:border-color .2s,box-shadow .2s}
.ct-in:hover{border-color:#B9C6D8}
.ct-in:focus{border-color:#FF5A0A;box-shadow:0 0 0 3px rgba(255,90,10,.15)}
textarea.ct-in{resize:vertical;min-height:120px}
.ct-btn{margin-top:20px;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:999px;background:#FF5A0A;color:#fff;font:inherit;font-size:17px;font-weight:800;padding:14px 26px;cursor:pointer;box-shadow:0 6px 16px rgba(255,90,10,.28);transition:transform .2s ease,box-shadow .2s ease,background-color .2s}
.ct-btn:hover{background:#F04F00;transform:translateY(-2px);box-shadow:0 10px 22px rgba(255,90,10,.34)}
.ct-btn:active{transform:translateY(0)}
.ct-btn:focus-visible{outline:3px solid #00163D;outline-offset:3px}
.ct-btn[disabled]{opacity:.7;cursor:default;transform:none}
.ct-err{margin:12px 0 0;font-size:14px;font-weight:700;color:#B42318}
.ct-mail{margin:18px auto 0;text-align:center;font-size:15px;color:#46556A}
.ct-mail a{color:#00163D;font-weight:800;text-decoration:none;border-bottom:2px solid #FF5A0A;transition:color .2s}
.ct-mail a:hover{color:#FF5A0A}
.ct-done{text-align:center;padding:10px 0 4px}
.ct-done p{margin:10px 0 0;font-size:16px;line-height:1.5;color:#46556A}
@media(min-width:768px){
.ct-hero-in{padding:52px 40px 84px}
.ct-intro{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:56px;padding:26px 40px 64px}
.ct-fig{order:2;width:100%;max-width:340px}
.ct-copy{order:1}
.ct-form-wrap{padding:60px 40px 72px}
.ct-card{padding:34px 36px 34px}
.ct-btn{width:auto}
}
@media(max-width:767px){
.ct-intro{padding:10px 20px 34px;gap:20px}
.ct-fig{width:88%;max-width:360px}
.ct-fig figcaption{margin-top:10px}
.ct-copy h2{font-size:clamp(22px,5.9vw,25px);line-height:1.2;text-align:center;margin:0 auto 12px;max-width:340px}
.ct-copy p{font-size:15.5px;line-height:1.6;margin-bottom:12px}
.ct-form-wrap{padding:32px 16px 44px}
}
@media(prefers-reduced-motion:reduce){.ct-ph,.ct-btn,.ss-anim{transition:none!important;animation:none!important}}
`;

ssTypoInit();

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  async function onSubmit(e: any) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) { setStatus("done"); return; }
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const topic = String(fd.get("topic") || "");
    const message = String(fd.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) { setErr("Please add your name, a valid email and a message."); return; }
    if (!FORMS_LIVE) { setErr("This is a preview of the new site, so messages aren't sent yet." + (CONTACT_EMAIL ? " Please email " + CONTACT_EMAIL + " instead." : "")); return; }
    setErr(""); setStatus("sending");
    try {
      const parts = name.split(" ");
      const body = new URLSearchParams({ first_name: parts[0], last_name: parts.slice(1).join(" "), name, email, topic, message, source: "SniffScout contact page" });
      await fetch(WEBHOOK_URL, { method: "POST", mode: "no-cors", body });
      setStatus("done");
    } catch (x) { setStatus("error"); }
  }
  if (status === "done") {
    return (
      <div className="ct-card" role="status">
        <div className="ct-done">
          <h2 className="ct-h">Thanks, message received! <span aria-hidden="true">🐾</span></h2>
          <p>We read every message and will get back to you soon.</p>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="ct-card" noValidate aria-labelledby="ct-form-h">
      <h2 id="ct-form-h" className="ct-h">Drop Us a <span style={{ whiteSpace: "nowrap" }}><span>Line!</span><PawPrint className="ct-paw" aria-hidden="true" size={24} color="#FF5A0A" strokeWidth={2.4} /></span></h2>
      <p className="ct-sub">Fill out the form below and we’ll get back to you as soon as we can. No barking required!</p>
      <div className="ct-grid">
        <label className="ct-lab">Your name<input name="name" type="text" autoComplete="name" className="ct-in" /></label>
        <label className="ct-lab">Email<input name="email" type="email" autoComplete="email" inputMode="email" className="ct-in" /></label>
        <label className="ct-lab">What's this about?<select name="topic" className="ct-in">{TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
        <label className="ct-lab">Message<textarea name="message" rows={5} className="ct-in" /></label>
        <div aria-hidden="true" style={{ position: "absolute", left: -9999, height: 0, overflow: "hidden" }}><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      </div>
      {err && <p className="ct-err" role="alert">{err}</p>}
      {status === "error" && <p className="ct-err" role="alert">Something went wrong.{CONTACT_EMAIL ? " Please email " + CONTACT_EMAIL + " instead." : " Please try again."}</p>}
      <button type="submit" disabled={status === "sending"} className="ct-btn">{status === "sending" ? "Sending..." : <>Send My Message <span aria-hidden="true">🐾</span></>}</button>
    </form>
  );
}

export default function Contact() {
  const photo = useImageSetting({ name: "contact-photo", initialValue: { src: "", alt: "" } });
  return (
    <div className="ct" style={{ background: "#FFFFFF" }}>
      <style>{CSS}</style>
      <section className="ct-hero">
        <PawPrint className="ss-anim pointer-events-none absolute hidden md:block" aria-hidden="true" size={120} color="#FF5A0A" strokeWidth={1.5} style={{ right: "8%", top: "16%", opacity: 0.16, "--r": "14deg", animation: "ss-float 8s ease-in-out infinite" } as any} />
        <div className="ct-hero-in">
          <h1 className="ct-h ss-anim" style={{ animation: "ss-up .7s ease both" }}>Give Us a <span style={{ whiteSpace: "nowrap" }}><span>Bark!</span> <span aria-hidden="true">🐾</span></span></h1>
          <p className="ss-anim" style={{ animation: "ss-up .7s ease .12s both" }}>Questions, ideas, or just want to say hello? We’re all ears!</p>
        </div>
        <svg className="absolute bottom-[-1px] left-0 h-[36px] w-full md:h-[56px]" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55 C260 5 520 100 800 52 C1060 8 1260 80 1440 40 L1440 100 L0 100 Z" fill="#FFFFFF" /></svg>
      </section>
      <section className="ct-intro" aria-labelledby="ct-intro-h">
        {photo.src ? (
          <figure className="ct-fig">
            <span className="ct-ph"><img src={photo.src} alt={photo.alt || "Marley and Bella side by side on the couch"} width={1536} height={1024} loading="eager" /></span>
            <figcaption>Meet <b>Marley &amp; Bella</b>, our Chief Sniffing <span style={{ whiteSpace: "nowrap" }}>Officers! <span aria-hidden="true">🐾</span></span></figcaption>
          </figure>
        ) : null}
        <div className="ct-copy">
          <h2 id="ct-intro-h" className="ct-h"><span>Two Paws Up</span> for Hearing From You!</h2>
          <p>SniffScout is all about helping dogs and their humans discover amazing places together. And just like our four-legged friends, we love making new connections!</p>
          <p>Have a <a href="/submit-a-place">favorite dog-friendly hangout</a> we should know about? Spotted something that needs updating? Interested in <a href="/claim-your-business">getting your business involved</a>? Or just want to send a little tail-wagging hello?</p>
          <p>Whatever’s on your mind, we’d love to hear it!</p>
        </div>
      </section>
      <section className="ct-form-wrap">
        <ContactForm />
        {CONTACT_EMAIL && <p className="ct-mail">Prefer email? <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a></p>}
      </section>
      <PageFooter />
    </div>
  );
}
