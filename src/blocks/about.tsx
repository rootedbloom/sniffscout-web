"use client";
// About page content (copied from the Softr "About content" block).
// Page title and description are set on the server (app/about/page.tsx).
import { PawPrint } from "lucide-react";
import { useImageSetting } from "@/lib/editable-settings";
import { ssTypoInit } from "@/lib/ss-typo";
import PageFooter from "./page-footer";

// The public contact address is set in the hosting settings (NEXT_PUBLIC_CONTACT_EMAIL).
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const NAVY = "#00163D";
const ORANGE = "#FF5A0A";
const PEACH = "#FFF0E6";
const PALE = "#EEF4FC";
const TEXT = "#1B2647";

const PAGE_CSS = `
.ab{font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:${NAVY};background:#fff;width:100%;overflow-x:hidden}
.ab *{box-sizing:border-box}
.ab h1,.ab h2,.ab h3{font-family:'Bricolage Grotesque',Manrope,sans-serif;letter-spacing:-.02em;margin:0;color:inherit}
.ab-w{max-width:1120px;margin:0 auto;padding:0 20px;position:relative}
.ab-sec{padding:48px 0;position:relative}
.ab-eye{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:${ORANGE}}
.ab-h2{font-size:clamp(28px,3.6vw,38px);line-height:1.1;margin:8px 0 14px}
.ab-p{margin:0 0 14px;font-size:17.5px;line-height:1.68;color:${TEXT};font-weight:500}
.ab-p:last-child{margin-bottom:0}
.ab-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;border-radius:999px;font-weight:800;font-size:16px;text-decoration:none;padding:14px 24px;border:2px solid transparent;transition:transform .2s,box-shadow .2s,background .2s,color .2s;text-align:center}
.ab-btn:hover{transform:translateY(-2px)}
.ab-btn:focus-visible{outline:3px solid #FF9B68;outline-offset:3px}
.ab-or{background:linear-gradient(135deg,#FF7A3D,${ORANGE});color:#fff;box-shadow:0 10px 24px rgba(255,90,10,.35)}
.ab-or:hover{box-shadow:0 14px 30px rgba(255,90,10,.5)}
.ab-ghw{background:transparent;color:#fff;border-color:rgba(255,255,255,.75)}
.ab-ghw:hover{border-color:#fff;background:rgba(255,255,255,.08)}
@keyframes ab-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(12deg)}}
.ab-deco{position:absolute;pointer-events:none;animation:ab-float 6s ease-in-out infinite}
.ab-paw{position:absolute;pointer-events:none;opacity:.13;z-index:0}

.ab-hero{background:${NAVY};color:#fff;position:relative;overflow:hidden;padding:34px 0 64px}
.ab-hg{display:grid;gap:18px;align-items:center;position:relative;z-index:1}
.ab-hero h1{font-size:clamp(38px,5.6vw,60px);line-height:1.03;margin:10px 0 16px;color:#fff}
.ab-hero h1 em{font-style:normal;color:#FF7A3D}
.ab-hero p{font-size:18.5px;line-height:1.6;color:rgba(255,255,255,.92);margin:0 0 12px;max-width:540px}
.ab-hero p.strong{color:#fff;font-weight:800;margin:0}
.ab-ill{position:relative;width:min(300px,78vw);justify-self:center}
.ab-ill::before{content:"";position:absolute;left:6%;right:6%;top:10%;bottom:2%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,90,10,.45),rgba(255,90,10,.12) 62%,rgba(255,90,10,0));filter:blur(8px)}
.ab-ill img{position:relative;width:100%;height:auto;object-fit:contain;display:block}
.ab-wavebot{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:46px;display:block}

.ab-founder{display:grid;gap:26px;align-items:center}
.ab-fphoto{width:100%;max-width:340px;justify-self:center;position:relative}
.ab-fphoto img{width:100%;height:auto;display:block;border-radius:22px;border:2px solid ${ORANGE};box-shadow:0 18px 40px rgba(0,22,61,.16)}
.ab-fphoto .pawtag{position:absolute;right:-12px;bottom:-12px;width:48px;height:48px;border-radius:50%;background:${ORANGE};color:#fff;display:flex;align-items:center;justify-content:center;border:4px solid #fff;box-shadow:0 8px 18px rgba(255,90,10,.35)}

.ab-peach{background:${PEACH}}
.ab-cards{display:grid;gap:22px;margin-top:26px}
.ab-card{background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 14px 34px rgba(0,22,61,.1);border:2px solid #FFD9C2;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
.ab-card:hover{transform:translateY(-4px) rotate(-.3deg);box-shadow:0 22px 44px rgba(255,90,10,.2)}
.ab-card.b:hover{transform:translateY(-4px) rotate(.3deg)}
.ab-cimg{position:relative;aspect-ratio:5/4;background:#F3E6DD;overflow:hidden}
.ab-cimg img{width:100%;height:100%;object-fit:cover;display:block}
.ab-name{position:absolute;left:14px;top:14px;display:inline-flex;align-items:center;gap:6px;background:${NAVY};color:#fff;font-weight:800;font-size:14px;padding:7px 13px;border-radius:999px;box-shadow:0 6px 14px rgba(0,0,0,.25)}
.ab-card.b .ab-name{background:${ORANGE}}
.ab-cbody{padding:22px 22px 24px;border-top:5px solid ${NAVY}}
.ab-card.b .ab-cbody{border-top-color:${ORANGE}}
.ab-cbody h3{font-size:clamp(22px,2.6vw,26px);line-height:1.15;margin:0 0 12px;color:${NAVY}}
.ab-cbody .ab-p{font-size:16.5px}

.ab-origin{display:grid;gap:26px;align-items:center}
.ab-sub2{background:${PALE};border-radius:24px;padding:24px 22px;margin-top:26px;border-left:6px solid ${NAVY}}
.ab-sub2 h2 em{font-style:normal;color:${ORANGE}}
.ab-ophoto{position:relative;justify-self:center;align-self:center;width:100%;max-width:420px}
.ab-ophoto .frame{background:${PALE};border-radius:28px;padding:14px;box-shadow:0 16px 36px rgba(0,22,61,.1)}
.ab-ophoto img{width:100%;height:auto;display:block;border-radius:18px;border:2px solid ${NAVY}}

.ab-cta{background:${NAVY};color:#fff;border-radius:28px;padding:34px 22px;text-align:center;position:relative;overflow:hidden;max-width:880px;margin:0 auto;box-shadow:0 22px 46px rgba(0,22,61,.25)}
.ab-cta h2{font-size:clamp(28px,4vw,38px);line-height:1.1;margin:10px 0 12px;color:#fff;position:relative;z-index:1}
.ab-cta h2 em{font-style:normal;color:#FF7A3D}
.ab-cta p{position:relative;z-index:1;font-size:17px;line-height:1.65;color:rgba(255,255,255,.92);margin:0 auto;max-width:620px}
.ab-cta .btns{position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:22px 0 18px}
.ab-cta .mail{font-size:15px;color:rgba(255,255,255,.9)}
.ab-cta .mail a{color:#FF9B68;font-weight:800}
.ab-cpaw{position:relative;z-index:1;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#FF7A3D,${ORANGE});display:inline-flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(255,90,10,.4)}

@media(min-width:760px){
.ab-sec{padding:60px 0}
.ab-hero{padding:38px 0 72px}
.ab-hg{grid-template-columns:1.15fr .85fr;gap:36px}
.ab-ill{width:380px;justify-self:end}
.ab-founder{grid-template-columns:340px minmax(0,720px);gap:48px;justify-content:center}
.ab-cards{grid-template-columns:1fr 1fr;gap:26px}
.ab-cbody{padding:24px 28px 28px}
.ab-origin{grid-template-columns:1fr 450px;gap:44px}
.ab-ophoto{max-width:450px}
.ab-sub2{padding:28px 30px}
.ab-cta{padding:40px 48px}
}
.ab-fphoto.m{display:none}
@media(max-width:759px){.ab-fphoto.d{display:none}.ab-fphoto.m{display:block;margin:8px auto 26px!important}.ab-hero .txt{text-align:center}.ab-hero p{margin-left:auto;margin-right:auto}}
.ab-blue{background:#EDF4FC;border-top:1px solid #DCE7F5;border-bottom:1px solid #DCE7F5}
.ab-blue .ab-sub2{background:#fff;box-shadow:0 10px 26px rgba(0,22,61,.07)}
.ab-blue .ab-ophoto .frame{background:#fff}
.ab-founder .ab-p{margin-bottom:20px}
.ab-founder .ab-p:last-child{margin-bottom:0}
.ab-ctasec{padding-top:28px!important}
.ab-g{position:relative;overflow:hidden;max-width:960px;margin:0 auto;background:${NAVY};color:#fff;border:1.5px solid ${ORANGE};border-radius:28px;padding:28px 20px 0;display:grid;gap:4px;text-align:center;box-shadow:0 18px 40px -16px rgba(0,22,61,.45)}
.ab-g.nodog{padding-bottom:28px}
.ab-gtx{position:relative;z-index:1}
.ab-g h2{font-size:clamp(28px,4vw,38px);line-height:1.1;margin:0 0 10px;color:#fff}
.ab-g h2 em{font-style:normal;color:${ORANGE}}
.ab-g p{font-size:16px;line-height:1.6;color:rgba(255,255,255,.9);margin:0 auto;max-width:560px}
.ab-gbtns{display:flex;flex-direction:column;align-items:stretch;gap:10px;max-width:340px;margin:18px auto 14px}
.ab-gb{display:inline-flex;align-items:center;justify-content:center;min-height:50px;border-radius:999px;font-weight:800;font-size:16px;text-decoration:none;padding:12px 22px;box-shadow:none;transition:transform .2s,background-color .2s}
.ab-gb:hover{transform:translateY(-2px)}
.ab-gb:focus-visible{outline:3px solid #FF9B68;outline-offset:3px}
.ab-gb-or{background:${ORANGE};color:#fff}
.ab-gb-or:hover{background:#FF6F2B}
.ab-gb-wh{background:#fff;color:${NAVY}}
.ab-gb-wh:hover{background:#FFF3EB}
.ab-g .ab-gmail{font-size:14.5px;color:rgba(255,255,255,.88)}
.ab-g .ab-gmail a{color:#FF9B68;font-weight:800}
.ab-gdog{position:relative;display:flex;justify-content:center;align-items:flex-end;margin-top:6px}
.ab-gdog img{display:block;width:auto;max-width:64%;max-height:190px;margin-left:auto;margin-right:8%;height:auto;position:relative;z-index:1}
.ab-gtrail{position:absolute;left:2%;bottom:14px;display:flex;align-items:flex-end;gap:10px;color:${ORANGE};opacity:.7}
.ab-gtrail svg{transform:rotate(-135deg)}
.ab-gtrail svg:nth-child(even){margin-bottom:12px}
@media(min-width:760px){.ab-g{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:end;gap:20px;padding:40px 0 0 48px;text-align:left}.ab-g.nodog{grid-template-columns:1fr;padding:40px 48px;text-align:center}.ab-gtx{padding-bottom:36px}.ab-g.nodog .ab-gtx{padding-bottom:0}.ab-g p{margin:0;max-width:none}.ab-g.nodog p{margin:0 auto;max-width:600px}.ab-gbtns{flex-direction:row;flex-wrap:wrap;max-width:none;margin:22px 0 16px}.ab-g.nodog .ab-gbtns{justify-content:center}.ab-gdog{justify-content:flex-end;margin:0}.ab-gdog img{max-width:80%;max-height:330px;margin-right:0}.ab-gtrail{left:-60px;bottom:24px;gap:14px}}
@media(prefers-reduced-motion:reduce){.ab-gb{transition:none}.ab-gb:hover{transform:none}}
@media(max-width:759px){.ab-cta{padding:30px 18px}.ab-cta .btns{flex-direction:column;align-items:stretch;gap:12px;max-width:340px;margin-left:auto;margin-right:auto}.ab-cta .ab-btn{min-height:52px;width:100%}}
@media(prefers-reduced-motion:reduce){.ab-deco{animation:none!important}.ab-card,.ab-btn{transition:none}}
`;

ssTypoInit();

function FounderPhoto({ img, cls }: { img: { src: string; alt: string }; cls: string }) {
  return (
    <figure className={"ab-fphoto " + cls} style={cls === "d" ? { margin: 0 } : undefined}>
      {img.src ? <img src={img.src} alt={img.alt} loading="lazy" /> : <div style={{ aspectRatio: "3 / 4", borderRadius: 22, border: "2px solid " + ORANGE, background: PEACH }} />}
      <span className="pawtag" aria-hidden="true"><PawPrint size={22} strokeWidth={2.6} /></span>
    </figure>
  );
}

export default function About() {
  const illus = useImageSetting({ name: "photo-hero-illustration", initialValue: { src: "", alt: "" } });
  const marley = useImageSetting({ name: "photo-marley", initialValue: { src: "", alt: "" } });
  const jamieBella = useImageSetting({ name: "photo-jamie-bella", initialValue: { src: "", alt: "" } });
  const bella = useImageSetting({ name: "photo-bella", initialValue: { src: "", alt: "" } });
  const couch = useImageSetting({ name: "photo-couch", initialValue: { src: "", alt: "" } });
  const beagle = useImageSetting({ name: "photo-cta-beagle", initialValue: { src: "", alt: "Beagle in an orange SniffScout bandana sniffing the ground" } });

  return (
    <div className="ab">
      <style>{PAGE_CSS}</style>

      <section className="ab-hero">
        <PawPrint aria-hidden="true" className="ab-paw" size={34} color="#fff" strokeWidth={1.6} style={{ left: "2.5%", top: 26, transform: "rotate(-18deg)" }} />
        <PawPrint aria-hidden="true" className="ab-paw" size={24} color="#fff" strokeWidth={1.6} style={{ left: "5%", bottom: 70, transform: "rotate(12deg)" }} />
        <PawPrint aria-hidden="true" className="ab-paw" size={40} color="#fff" strokeWidth={1.5} style={{ right: "2.5%", top: 30, transform: "rotate(22deg)" }} />
        <PawPrint aria-hidden="true" className="ab-paw" size={20} color="#fff" strokeWidth={1.7} style={{ left: "44%", bottom: 62, transform: "rotate(-8deg)" }} />
        <div className="ab-w ab-hg">
          <div className="txt">
            <span className="ab-eye" style={{ color: "#FF9B68" }}><PawPrint size={14} /> About SniffScout</span>
            <h1>Can the dog <em>come too?</em></h1>
            <p>Patio dinner? Coffee run? A stop at the local brewery? My next question is usually the same. Can we bring the dog?</p>
            <p className="strong">I started SniffScout to make finding that answer a whole lot easier.</p>
          </div>
          {illus.src && <div className="ab-ill"><img src={illus.src} alt={illus.alt} /></div>}
        </div>
        <svg className="ab-wavebot" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 C360 0 1080 0 1440 46 Z" fill="#fff" /><path d="M0 40 C360 -4 1080 -4 1440 40" stroke={ORANGE} strokeWidth="4" fill="none" /></svg>
      </section>

      <section className="ab-sec" style={{ paddingTop: 36 }}>
        <div className="ab-w ab-founder">
          <FounderPhoto img={jamieBella} cls="d" />
          <div>
            <span className="ab-eye"><PawPrint size={14} /> Meet the founder</span>
            <h2 className="ab-h2">Hi, I’m Jamie! 👋</h2>
            <p className="ab-p">I live in Union, Kentucky, with my two dogs, Marley and Bella. I’m a huge dog lover, and I love discovering local places, supporting small businesses, and bringing my dogs along whenever I can!</p>
            <FounderPhoto img={jamieBella} cls="m" />
            <p className="ab-p">I’ve spent several years helping local businesses get noticed through marketing, advertising, and building stronger connections in their communities. And while I still love doing that work, I wanted to create something that combined my passion for helping small businesses with my love for dogs. That’s how SniffScout came to life!</p>
            <p className="ab-p">I wanted SniffScout to be more than just another list of places that might allow dogs. My goal is to build a directory where businesses can claim their listings, confirm their dog-friendly policies, and share the little details that matter to dog owners. Things like water bowls, dog treats, pup cups, heated patios, and whether your pup is welcome inside or only outdoors.</p>
            <p className="ab-p">Because every dog is different! Marley is ready to go just about anywhere, while Bella prefers to know what she’s getting into. And I know plenty of other dog owners can relate!</p>
            <p className="ab-p">SniffScout is starting right here in Northern Kentucky and Cincinnati, but I’ve got big plans to help dog lovers and dog-friendly businesses connect all across the country. 🐾</p>
          </div>
        </div>
      </section>

      <section className="ab-sec ab-peach">
        <div className="ab-w">
          <div style={{ textAlign: "center" }}>
            <h2 className="ab-h2" style={{ margin: 0 }}>Meet My Two Favorite Sidekicks 🐾</h2>
          </div>
          <div className="ab-cards">
            <article className="ab-card">
              <div className="ab-cimg">
                {marley.src && <img src={marley.src} alt={marley.alt} loading="lazy" style={{ objectPosition: "center 66%" }} />}
                <span className="ab-name"><PawPrint size={14} color="#FF7A3D" /> Marley</span>
              </div>
              <div className="ab-cbody">
                <h3>Marley is already at the door</h3>
                <p className="ab-p">Marley is my Goldendoodle and my enthusiastic adventure buddy. If I’m going somewhere, she’d love an invitation. A patio lunch, a brewery visit, a quick coffee stop. She’s in.</p>
                <p className="ab-p">Finding out whether she could join us often took more effort than planning the outing itself. I’d check websites, scroll through photos and reviews, and sometimes call just to find out where dogs were welcome.</p>
                <p className="ab-p">And “dog-friendly” still left me with questions. Could she come inside? Was the patio shaded? Would there be water available? Those little details could make a big difference in our plans.</p>
              </div>
            </article>
            <article className="ab-card b">
              <div className="ab-cimg">
                {bella.src && <img src={bella.src} alt={bella.alt} loading="lazy" style={{ objectPosition: "center 92%" }} />}
                <span className="ab-name"><PawPrint size={14} color="#fff" /> Bella</span>
              </div>
              <div className="ab-cbody">
                <h3>Bella likes a little more reassurance</h3>
                <p className="ab-p">Bella is my Cavapoo, and she has anxiety. She’s often happiest at home, where things are familiar and she can settle into her favorite spot.</p>
                <p className="ab-p">Having Bella has made me think more about what a place actually feels like for a dog. A busy patio might be Marley’s idea of a great afternoon, while Bella would be much more comfortable somewhere quieter.</p>
                <p className="ab-p">Every dog is different. Knowing a little more before you leave helps you decide what works for yours, including when a cozy afternoon at home is the better plan.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="ab-sec ab-blue">
        <div className="ab-w ab-origin">
          <div style={{ maxWidth: 680 }}>
            <span className="ab-eye"><PawPrint size={14} /> How SniffScout started</span>
            <h2 className="ab-h2">So I built the directory I kept looking for</h2>
            <p className="ab-p">I wanted one place to find restaurants, bars, coffee shops, and breweries that welcome dogs, with useful details right there in the listing.</p>
            <p className="ab-p">Where are dogs allowed? Is there shade? Water bowls? Treats? A dog menu? And yes, I absolutely want to know about the pup cups.</p>
            <p className="ab-p">That’s the idea behind SniffScout. Make it easier to find a place you’ll both enjoy and have a better sense of what to expect when you get there.</p>
            <div className="ab-sub2">
              <h2 className="ab-h2" style={{ marginTop: 0, fontSize: "clamp(24px,3vw,32px)" }}>Starting close to home. <em>Plenty more to sniff out.</em></h2>
              <p className="ab-p">I’m building SniffScout here in Northern Kentucky and Cincinnati, one local spot at a time. SniffScout is officially live and still growing, and we’re gathering places, reviewing details, and inviting dog lovers and business owners to help the directory grow.</p>
              <p className="ab-p">My goal is to take SniffScout nationwide. For now, every suggestion and every business owner who helps confirm their listing brings us a little closer.</p>
              <p className="ab-p">If you have a favorite coffee shop that knows your dog’s name, a brewery with a great patio, or a restaurant that always brings out a water bowl, I’d love to hear about it.</p>
            </div>
          </div>
          <figure className="ab-ophoto" style={{ margin: 0 }}>
            <div className="frame">
              {couch.src ? <img src={couch.src} alt={couch.alt} loading="lazy" /> : <div style={{ aspectRatio: "3 / 4", borderRadius: 18, background: "#fff" }} />}
            </div>
          </figure>
        </div>
      </section>

      <section className="ab-sec ab-ctasec" style={{ paddingTop: 28 }}>
        <div className="ab-w">
          <div className={"ab-g" + (beagle.src ? "" : " nodog")}>
            <div className="ab-gtx">
              <h2>Help Us Grow the <em>Pack!</em></h2>
              <p>Know a great dog-friendly spot? Own a business that welcomes pups? Help us grow SniffScout and make it easier for dog lovers to discover their next favorite spot.</p>
              <div className="ab-gbtns">
                <a href="/submit-a-place" className="ab-gb ab-gb-or">Submit a Dog-Friendly Spot</a>
                <a href="/claim-your-business" className="ab-gb ab-gb-wh">Claim Your Free Listing</a>
              </div>
              {CONTACT_EMAIL && <p className="ab-gmail">Have a question or an idea? Email me at <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>. I read every message.</p>}
            </div>
            {beagle.src && <div className="ab-gdog">
              <span className="ab-gtrail" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((i) => <PawPrint key={i} size={16} fill="currentColor" strokeWidth={1.5} />)}</span>
              <img src={beagle.src} alt={beagle.alt} loading="lazy" decoding="async" />
            </div>}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
