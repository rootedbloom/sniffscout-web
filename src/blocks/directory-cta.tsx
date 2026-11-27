"use client";
// "For dog lovers / For business owners" cards on the Directory page (copied from the Softr block).
import { PawPrint } from "lucide-react";

const CSS = `
.ss-cbtn{transition:background-color .15s;box-shadow:none;border:0}
.ss-cbtn-navy{background:#00163D}
.ss-cbtn-navy:hover{background:#12356B}
.ss-cbtn-orange{background:#FF5A0A}
.ss-cbtn-orange:hover{background:#D94A05}
@media (min-width:768px){.ss-av img{transform:scale(1.4)}}
`;

const SUBMIT = {
  title: "Know a Dog-Friendly Spot?",
  text: "Help fellow dog lovers discover great places to visit with their pups!",
  button: "Submit a Spot",
  img: { src: "https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/2ed8f961-4c11-4d0d-ba61-74d1ffed4a37.jpeg", alt: "A happy dog at a patio table" },
};
const CLAIM = {
  title: "Is Your Spot Dog-Friendly?",
  text: "Claim your free SniffScout listing, showcase your pup perks, and help local dog lovers discover your business.",
  button: "Claim Your Free Listing",
  img: { src: "https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/f55b2418-8f29-4814-98e2-c9eccae14651.jpeg", alt: "A border collie relaxing on a brewery patio" },
};

const navy = "#00163D";
const orange = "#FF5A0A";

function Avatar({ img, border, pos }: { img: { src: string; alt: string }; border: string; pos: string }) {
  return (
    <div className="ss-av col-start-1 row-span-2 row-start-1 h-[68px] w-[68px] flex-none self-center overflow-hidden rounded-full md:h-[140px] md:w-[140px]" style={{ border: "3px solid " + border }}>
      <img src={img.src} alt={img.alt} className="block h-full w-full object-cover" style={{ objectPosition: pos, transformOrigin: pos }} loading="lazy" decoding="async" />
    </div>
  );
}

export default function DirectoryCta() {
  return (
    <section className="w-full px-5 pb-3 pt-5 md:px-10 md:pb-6 md:pt-8" style={{ background: "#fff", fontFamily: "Manrope,'Helvetica Neue',Arial,sans-serif" }}>
      <style>{CSS}</style>
      <div className="mx-auto grid max-w-[1180px] gap-3 md:grid-cols-2 md:gap-5">
        <div className="relative grid h-full grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-3 overflow-hidden rounded-[24px] px-4 py-4 text-left md:flex md:flex-row md:items-stretch md:gap-5 md:rounded-[28px] md:px-6 md:py-6" style={{ background: orange }}>
          <PawPrint aria-hidden="true" className="pointer-events-none absolute hidden md:bottom-5 md:right-5 md:block md:h-16 md:w-16" color="#fff" strokeWidth={1.6} style={{ opacity: 0.22, transform: "rotate(14deg)" }} />
          <Avatar img={SUBMIT.img} border="#fff" pos="60% 40%" />
          <div className="contents md:flex md:min-w-0 md:flex-1 md:flex-col md:self-stretch">
            <span className="col-start-2 row-start-1 self-end text-[11px] font-extrabold uppercase" style={{ color: navy, letterSpacing: ".14em" }}>For dog lovers</span>
            <h2 className="col-start-2 row-start-2 self-start text-[20px] font-extrabold leading-tight text-white md:mt-1 md:text-[28px]" style={{ letterSpacing: "-0.02em" }}>{SUBMIT.title}</h2>
            <p className="col-span-2 text-[15px] font-semibold leading-snug text-white md:mb-4 md:mt-1.5">{SUBMIT.text}</p>
            <a href="/submit-a-place" className="ss-cbtn ss-cbtn-navy col-span-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-6 py-3 text-[15px] font-extrabold !text-white no-underline md:mt-auto md:w-auto md:self-start">{SUBMIT.button}</a>
          </div>
        </div>

        <div className="relative grid h-full grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-3 overflow-hidden rounded-[24px] px-4 py-4 text-left md:flex md:flex-row md:items-stretch md:gap-5 md:rounded-[28px] md:px-6 md:py-6" style={{ background: navy }}>
          <PawPrint aria-hidden="true" className="pointer-events-none absolute hidden md:bottom-5 md:right-5 md:block md:h-16 md:w-16" color={orange} strokeWidth={1.6} style={{ opacity: 0.28, transform: "rotate(14deg)" }} />
          <Avatar img={CLAIM.img} border={orange} pos="45% 40%" />
          <div className="contents md:flex md:min-w-0 md:flex-1 md:flex-col md:self-stretch">
            <span className="col-start-2 row-start-1 self-end text-[11px] font-extrabold uppercase" style={{ color: "#FF7A33", letterSpacing: ".14em" }}>For business owners</span>
            <h2 className="col-start-2 row-start-2 self-start text-[20px] font-extrabold leading-tight text-white md:mt-1 md:text-[28px]" style={{ letterSpacing: "-0.02em" }}>{CLAIM.title}</h2>
            <p className="col-span-2 text-[15px] font-semibold leading-snug md:mb-4 md:mt-1.5" style={{ color: "rgba(255,255,255,.85)" }}>{CLAIM.text}</p>
            <a href="/claim-your-business" className="ss-cbtn ss-cbtn-orange col-span-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-6 py-3 text-[15px] font-extrabold !text-white no-underline md:mt-auto md:w-auto md:self-start">{CLAIM.button}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
