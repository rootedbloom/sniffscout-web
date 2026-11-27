// Styles for the For Businesses page (copied from the Softr page).
export const FB_CSS = `
.fb{font-family:Manrope,'Helvetica Neue',Arial,sans-serif;color:#00163D;background:#fff;width:100%;overflow-x:hidden}
.fb *{box-sizing:border-box}
.fb h1,.fb h2,.fb h3{font-family:'Bricolage Grotesque',Manrope,sans-serif;letter-spacing:-.02em;margin:0;color:inherit}
.fb-w{max-width:1120px;margin:0 auto;padding:0 20px;position:relative}
.fb-sec{padding:52px 0;position:relative}
.fb-peach{background:#FFF0E6}
.fb-navy{background:#00163D;color:#fff}
.fb-eye{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#FF5A0A}
.fb-navy .fb-eye{color:#FF9B68}
.fb-h2{font-size:clamp(26px,3.6vw,38px);line-height:1.1;margin:16px 0 10px}
.fb-lead{font-size:17px;line-height:1.6;color:#2C3550;margin:0;max-width:640px}
.fb-navy .fb-lead{color:rgba(255,255,255,.85)}
.fb-c{text-align:center}.fb-c .fb-lead{margin:0 auto}
.fb-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;border-radius:999px;font-weight:800;font-size:16px;text-decoration:none;padding:14px 24px;border:2px solid transparent;transition:transform .2s,box-shadow .2s,background .2s,color .2s;cursor:pointer;text-align:center}
.fb-btn:hover{transform:translateY(-2px)}
.fb-btn:active{transform:translateY(0) scale(.98)}
.fb-btn:focus-visible,.fb-q:focus-visible,.fb-in:focus-visible,.fb-res:focus-visible{outline:3px solid #FF9B68;outline-offset:3px}
.fb-or{background:linear-gradient(135deg,#FF7A3D,#FF5A0A);color:#fff;box-shadow:0 10px 24px rgba(255,90,10,.35)}
.fb-or:hover{box-shadow:0 14px 30px rgba(255,90,10,.5)}
.fb-nv{background:#00163D;color:#fff;box-shadow:0 10px 22px rgba(0,22,61,.25)}
.fb-nv:hover{background:#00163D}
.fb-gh{background:#fff;color:#00163D;border-color:#00163D}
.fb-gh:hover{background:#00163D;color:#fff}
.fb-ghw{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
.fb-ghw:hover{border-color:#fff;background:rgba(255,255,255,.08)}
.fb-dog{display:block;transition:transform .3s}
.fb-dog:hover{animation:fb-wig .6s ease-in-out}
@keyframes fb-wig{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}
@keyframes fb-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes fb-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(12deg)}}
@keyframes fb-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-18deg)}}
.fb-wave-paw{transform-origin:-36px 24px;transform-box:view-box;animation:fb-wave 1.4s ease-in-out infinite}
.fb-hero{background:#00163D;color:#fff;position:relative;overflow:hidden;padding:44px 0 70px}
.fb-hero h1{font-size:clamp(32px,5vw,52px);line-height:1.04;margin:12px 0 14px;color:#fff}
.fb-hero h1 em{font-style:normal;color:#FF7A3D}
.fb-hero p{font-size:18px;line-height:1.55;color:rgba(255,255,255,.88);margin:0;max-width:560px}
.fb-hg{display:grid;gap:26px;align-items:center;position:relative;z-index:1}
.fb-chips{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 22px}
.fb-chip{display:inline-flex;align-items:center;gap:6px;background:#1E3F8A;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:6px 12px;font-size:13px;font-weight:700}
.fb-btns{display:flex;flex-wrap:wrap;gap:12px}
.fb-heroimg{width:100%;max-width:620px;justify-self:center;border-radius:24px;overflow:hidden;border:4px solid #FF5A0A;box-shadow:0 24px 50px rgba(0,0,0,.35),0 0 0 8px rgba(255,90,10,.14);background:#14204a;aspect-ratio:3/2;transform:rotate(1deg);transition:transform .35s}
.fb-heroimg:hover{transform:rotate(0) scale(1.01)}
.fb-heroimg img{width:100%;height:100%;object-fit:cover;display:block}
.fb-play{width:210px;height:auto;display:block;filter:drop-shadow(0 10px 14px rgba(0,22,61,.15))}
.pkc{display:block;overflow:hidden;width:var(--w)}
.fb-peek .pkc img{max-width:none;display:block;filter:none}
.pk-dd{--w:100px;top:calc(var(--w) * -0.886 + 8px)}
.pk-dd .pkc{height:calc(var(--w) * 0.9535)}
.pk-dd .pkc img{width:calc(var(--w) * 1.5152);margin-left:calc(var(--w) * -0.2379)}
.pk-cg{--w:92px;top:calc(var(--w) * -1.1137 + 8px)}
.pk-cg .pkc{height:calc(var(--w) * 1.195)}
.pk-cg .pkc img{width:calc(var(--w) * 1.6556);margin-left:calc(var(--w) * -0.303);margin-top:calc(var(--w) * -0.0063)}
.pk-lab{--w:84px;display:block;width:var(--w);height:calc(var(--w) * 1.951);overflow:hidden;filter:drop-shadow(0 8px 12px rgba(0,22,61,.2))}
.pk-lab img{width:calc(var(--w) * 1.3245);max-width:none;margin-left:calc(var(--w) * -0.1351);display:block}
.fb-jport{position:relative;width:min(290px,80vw);justify-self:center}
.fb-jport::before{content:"";position:absolute;left:8%;right:8%;top:12%;bottom:4%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,90,10,.42),rgba(255,90,10,.12) 60%,rgba(255,90,10,0));filter:blur(8px)}
.fb-jport img{position:relative;width:100%;height:auto;object-fit:contain;display:block}
.fb-blob{position:absolute;inset:0;border-radius:46% 54% 50% 50%/55% 45% 55% 45%;background:#fff;border:6px solid #FF5A0A;box-shadow:0 20px 50px rgba(255,90,10,.3)}
.fb-art .fb-pup{position:absolute;inset:14px;animation:fb-bob 3.6s ease-in-out infinite}
.fb-deco{position:absolute;pointer-events:none;animation:fb-float 6s ease-in-out infinite}
.fb-wavebot{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:46px;display:block}
.fb-pack{display:grid;gap:20px;align-items:center;background:#fff;border:2px solid #FFD3B8;border-radius:26px;padding:26px;box-shadow:0 16px 40px rgba(255,90,10,.12);position:relative;overflow:hidden}
.fb-pack::after{content:"";position:absolute;right:-70px;top:-70px;width:190px;height:190px;border-radius:50%;background:#FF5A0A;opacity:.08}
.fb-pack .fb-dog{justify-self:center}
.fb-sublink{font-size:14px;color:#2C3550;margin:12px 0 0}
.fb-sublink a{color:#FF5A0A;font-weight:800}
.fb-plans{display:grid;gap:124px 26px;margin-top:124px}
.fb-plan{border-radius:26px;padding:34px 26px 28px;display:flex;flex-direction:column;gap:18px;position:relative;transition:transform .25s,box-shadow .25s}
.fb-plan:hover{transform:translateY(-4px)}
.fb-plan.fr{background:#fff;border:2.5px solid #00163D;box-shadow:0 18px 40px rgba(0,22,61,.14)}
.fb-plan.td{background:#00163D;color:#fff;border:2.5px solid #FF5A0A;box-shadow:0 22px 46px rgba(255,90,10,.28)}
.fb-peek{position:absolute;top:-76px;right:24px;z-index:2;line-height:0}
.fb-peek img{width:96px;height:auto;display:block;filter:drop-shadow(0 6px 10px rgba(0,0,0,.18))}
.fb-peek.dd{top:-80px}
.fb-peek.cg{top:-101px}
.fb-ribbon{position:absolute;top:-15px;left:24px;color:#fff;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:6px 13px;border-radius:999px;display:inline-flex;gap:6px;align-items:center;z-index:3}
.fr .fb-ribbon{background:#00163D}
.td .fb-ribbon{background:#FF5A0A}
.fb-plan h3{font-size:24px}
.fb-pr{display:flex;align-items:baseline;gap:10px;margin-top:6px}
.fb-price{font-family:'Bricolage Grotesque',Manrope,sans-serif;font-size:58px;font-weight:800;line-height:1}
.fr .fb-price{color:#00163D}
.td .fb-price{color:#FF7A3D}
.fb-per{font-size:14px;font-weight:800;border-radius:999px;padding:5px 12px}
.fr .fb-per{background:#FFF0E6;color:#FF5A0A}
.td .fb-per{background:rgba(255,255,255,.12);color:#fff}
.fb-list{list-style:none;margin:0;padding:0;display:grid;gap:0;flex:1;align-content:start}
.fb-list li{display:flex;gap:12px;align-items:flex-start;font-size:15.5px;line-height:1.45;font-weight:700;padding:10px 0;border-bottom:1px solid #EFE6E0}
.td .fb-list li{border-bottom-color:rgba(255,255,255,.1)}
.fb-list li:last-child{border-bottom:0}
.fb-ck{flex:none;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-top:0}
.fr .fb-ck{background:#00163D;color:#FF7A3D}
.td .fb-ck{background:linear-gradient(135deg,#FF7A3D,#FF5A0A);color:#fff}
.fb-plan .fb-btn{font-size:17px;padding:16px 24px}
.fb-note{font-size:13px;line-height:1.5;opacity:.85;margin:0}
.fb-cmp{display:grid;gap:22px;margin-top:28px;align-items:start}
.fb-lbl{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#00163D;margin-bottom:10px;background:#fff;border-radius:999px;padding:5px 11px}
.fb-lbl.o{background:#FF5A0A;color:#fff}
.fb-card{background:#fff;border:1.5px solid #EAD9CF;border-radius:20px;overflow:hidden;box-shadow:0 8px 22px rgba(0,22,61,.07);transition:transform .25s,box-shadow .25s}
.fb-card:hover{transform:translateY(-3px)}
.fb-card.big{border:3px solid #FF5A0A;box-shadow:0 18px 40px rgba(255,90,10,.22)}
.fb-img{position:relative;height:140px;background:linear-gradient(135deg,#FFE2CF,#FFF0E6);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#FF5A0A;font-size:13px;font-weight:800;gap:6px;overflow:hidden}
.big .fb-img{height:220px}
.fb-img img{width:100%;height:100%;object-fit:cover;display:block}
.fb-img svg{display:block}
.fb-tdb{position:absolute;top:12px;left:12px;background:#FF5A0A;color:#fff;font-size:12.5px;font-weight:800;padding:7px 12px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;box-shadow:0 6px 14px rgba(0,0,0,.25)}
.fb-cb{padding:16px 18px 18px;display:grid;gap:9px}
.fb-cb h3{font-size:18px;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.big .fb-cb h3{font-size:23px}
.fb-meta{font-size:14px;color:#4A5370;font-weight:700;display:flex;align-items:center;gap:5px}
.big .fb-meta{color:#00163D}
.fb-ver{display:inline-flex;align-items:center;gap:4px;font-family:Manrope,sans-serif;font-size:12px;font-weight:800;color:#fff;background:#00163D;padding:4px 9px;border-radius:999px;letter-spacing:0}
.fb-perks{display:flex;flex-wrap:wrap;gap:6px}
.fb-perk{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;padding:5px 10px;border-radius:999px;background:#fff;border:1px solid #E6DCD5;color:#2C3550}
.big .fb-perk{border:0;font-weight:800}
.big .fb-perk.c0{background:#FF5A0A;color:#fff}
.big .fb-perk.c1{background:#00163D;color:#fff}
.big .fb-perk.c2{background:#FFE2CF;color:#B23C00}
.big .fb-perk.c3{background:#FFC23D;color:#00163D}
.fb-deal{display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#00163D,#00163D);color:#fff;border-radius:14px;padding:13px 14px;font-size:14px;font-weight:700;border-left:5px solid #FF5A0A}
.fb-deal b{color:#C2490B;display:block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:900}
.fb-card .fb-deal{background:#FFF6F0;color:#00163D;border:1.5px solid #FFC9AD;border-radius:12px;padding:10px 12px;font-size:14px;align-items:flex-start}
.fb-card .fb-perk{background:#FFF0E7;color:#923709;border:0;font-size:12px;padding:4px 10px}
.fb-card .fb-perk.more{background:#fff;border:1px solid #FFD2BA;color:#B5470D}
.fb-pkl{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:800;color:#00163D;margin:0 0 6px}
.fb-vd{display:flex;align-items:center;justify-content:center;min-height:42px;background:#00163D;color:#fff;font-weight:800;font-size:14.5px;border-radius:11px;margin-top:4px}
.fb-clm{justify-self:center;display:inline-flex;align-items:center;gap:6px;background:#FFF0E7;color:#00163D;font-size:12.5px;font-weight:700;padding:7px 14px;border-radius:99px;white-space:nowrap}
.fb-nop{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#F1F3F6,#FFF2EA);color:#7A8597;font-size:11px;font-weight:600}
.fb-npi{width:42px;height:42px;border-radius:50%;background:#fff;border:1.5px solid #FFD9C4;display:flex;align-items:center;justify-content:center;color:#FF5A0A}
.fb-card .fb-tdb{background:#FF5A0A}
.fb-sic{flex:none;width:42px;height:42px;border-radius:50%;background:#fff;color:#FF5A0A;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,22,61,.2)}
.fb-tdbadge{width:184px;max-width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;display:block;filter:none}
@media(max-width:767px){.fb-deco{display:none!important}.fb-play{margin:0 auto}.fb-dog:has(.fb-play){align-self:center;margin:0 auto}}
.fb-card.big{border:2px solid #FF5A0A}
.fb-card .fb-meta{font-weight:600}
.fdog img{width:100%;height:100%;object-fit:cover;object-position:center 25%;display:block}
.fb-search{max-width:560px;margin:30px auto 0;background:linear-gradient(135deg,#FF7A3D,#FF5A0A);color:#fff;border:3px solid #00163D;border-radius:22px;padding:20px 22px;box-shadow:0 12px 30px rgba(255,90,10,.25)}
.fb-search.wide{max-width:none}
.fb-search>h3{color:#fff}
.fb-search>p{color:rgba(255,255,255,.95)!important}
.fb-in{width:100%;padding:14px 16px 14px 44px;border:1.5px solid #E6CDBF;border-radius:14px;font:600 16px Manrope,sans-serif;color:#00163D;background:#fff}
.fb-in:focus{border-color:#FF5A0A;outline:none;box-shadow:0 0 0 3px rgba(255,90,10,.2)}
.fb-res{display:block;width:100%;text-align:left;background:#fff;border:0;border-bottom:1px solid #F1E4DC;padding:11px 14px;cursor:pointer;font:inherit;color:#00163D}
.fb-res:hover{background:#FFF0E6}
.fb-head-row{display:flex;flex-direction:column;align-items:center;gap:6px}
.fb-steps{display:grid;gap:18px;margin-top:28px}
.fb-step{background:#fff;color:#00163D;border-radius:22px;padding:22px 20px 20px;position:relative;transition:transform .25s,box-shadow .25s;box-shadow:0 10px 26px rgba(0,0,0,.25)}
.fb-step:hover{transform:translateY(-6px) rotate(-.6deg);box-shadow:0 18px 36px rgba(255,90,10,.35)}
.fb-step:hover .fb-sico svg{animation:fb-wig .6s ease-in-out}
.fb-sico{width:104px;height:96px;border-radius:24px;background:#FFF0E6;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.fb-num{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#FF7A3D,#FF5A0A);color:#fff;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(255,90,10,.4)}
.fb-step h3{font-size:18px;margin-bottom:6px;color:#00163D}
.fb-step p{margin:0;font-size:15px;line-height:1.55;color:#2C3550}
.fb-reas{margin-top:20px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.fb-rp{background:#FF5A0A;border:1.5px solid #FF5A0A;color:#fff;border-radius:999px;padding:9px 16px;font-weight:800;font-size:14px;display:inline-flex;align-items:center;gap:7px}
.fb-loc{display:grid;gap:26px;align-items:start;margin-top:24px}
.fb-pts{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.fb-pts li{display:flex;gap:14px;font-size:15px;line-height:1.55;color:#2C3550;background:#fff;border:1.5px solid #F1E2D8;border-radius:16px;padding:12px 14px;transition:transform .2s,border-color .2s}
.fb-pts li:hover{transform:translateX(4px);border-color:#FF5A0A}
.fb-pts li b{color:#00163D}
.fb-ico{flex:none;width:40px;height:40px;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center}
.fb-ico.o{background:linear-gradient(135deg,#FF7A3D,#FF5A0A)}
.fb-ico.n{background:#00163D}
.fb-mock{background:#fff;border:2px solid #00163D;border-radius:24px;padding:16px;box-shadow:0 18px 40px rgba(0,22,61,.15);display:grid;gap:10px;position:relative}
.fb-mbar{display:flex;gap:8px;align-items:center;background:#00163D;color:#fff;border-radius:999px;padding:10px 14px;font-size:13px;font-weight:700}
.fb-mbar span{margin-left:auto;background:#FF5A0A;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:800}
.fb-mrow{display:flex;gap:12px;align-items:center;border:1.5px solid #EDE2DA;border-radius:16px;padding:10px;background:#fff}
.fb-mrow.top{border:2.5px solid #FF5A0A;background:#FFF5EE;box-shadow:0 10px 22px rgba(255,90,10,.18);padding:12px}
.fb-mth{width:48px;height:48px;border-radius:12px;flex:none;overflow:hidden;background:#FFE2CF}
.fb-mrow.top .fb-mth{width:74px;height:62px}
.fb-mt{font-size:14px;font-weight:800;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.fb-ms{font-size:12px;color:#4A5370;font-weight:700}
.fb-mtag{display:inline-flex;align-items:center;gap:4px;background:#FF5A0A;color:#fff;border-radius:999px;padding:2px 8px;font-size:10.5px;font-weight:800}
.fb-soon{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:#00163D;background:#FFC23D;border-radius:999px;padding:5px 11px;justify-self:start}
.fb-spot{background:#00163D;color:#fff;border-radius:18px;padding:14px;display:grid;gap:10px}
.fb-spot-g{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fb-spot-c{background:#fff;color:#00163D;border-radius:14px;padding:8px 8px 10px;font-size:12px;font-weight:800;border:2px solid #FF5A0A}
.fb-spot-c i{display:block;height:58px;border-radius:9px;overflow:hidden;margin-bottom:7px}
.fb-spot-c span{color:#FF5A0A}
.fb-founder{display:grid;gap:26px;align-items:center;position:relative}
.fb-founder p{font-size:16px;line-height:1.65;color:rgba(255,255,255,.9);margin:0 0 12px}
.fb-jpic{position:relative;width:230px;height:230px;justify-self:center}
.fb-jpic .ring{position:absolute;inset:0;border-radius:50%;background:#fff;border:7px solid #FF5A0A;box-shadow:0 0 0 10px rgba(255,90,10,.18)}
.fb-jpic img{position:absolute;inset:14px;width:calc(100% - 28px);height:calc(100% - 28px);object-fit:contain;border-radius:50%}
.fb-blobs::before,.fb-blobs::after{content:"";position:absolute;border-radius:50%;pointer-events:none}
.fb-blobs::before{width:260px;height:260px;right:-90px;top:-90px;background:#FF5A0A;opacity:.12}
.fb-blobs::after{width:180px;height:180px;left:-70px;bottom:-80px;border:16px solid #FF5A0A;opacity:.22}
.fb-faqwrap{position:relative;max-width:820px;margin:26px auto 0}
.fb-faqdog{display:flex;justify-content:center;margin-bottom:-8px}
.fb-faq{display:grid;gap:10px;position:relative;z-index:1}
.fb-qi{border:1.5px solid #F3D9CA;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 6px 16px rgba(255,90,10,.07);transition:border-color .2s}
.fb-qi:hover{border-color:#FF5A0A}
.fb-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:0;padding:16px 18px;text-align:left;font:800 16px Manrope,sans-serif;color:#00163D;cursor:pointer}
.fb-q .ic{flex:none;width:30px;height:30px;border-radius:50%;background:#FFF0E6;color:#FF5A0A;display:flex;align-items:center;justify-content:center;transition:transform .2s,background .2s}
.fb-q[aria-expanded=true] .ic{transform:rotate(180deg);background:#FF5A0A;color:#fff}
.fb-a{padding:0 18px 16px;font-size:15px;line-height:1.6;color:#2C3550}
.fb-final{background:linear-gradient(135deg,#FF7A3D,#FF5A0A);color:#fff;border-radius:28px;padding:28px 24px;position:relative;overflow:hidden;display:grid;gap:10px;justify-items:center;text-align:center}
.fb-final::after{content:"";position:absolute;right:-60px;top:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.12)}
.fb-final h2{font-size:clamp(26px,4vw,38px);line-height:1.1;margin:0 0 14px;color:#fff}
.fb-final small{display:block;margin-top:14px;font-size:14px;font-weight:700;color:#00163D}
.fb-final small a{color:#00163D}
.fb-final .fdog{background:#fff;border-radius:50%;width:150px;height:150px;overflow:hidden;border:4px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px rgba(0,22,61,.2);position:relative;z-index:1}
.fb-f2{display:inline-block;color:rgba(255,255,255,.82);font-size:13px;line-height:1.3;text-decoration:none}
.fb-f2:hover{color:#FF9B68}
@media(min-width:760px){
.fb-sec{padding:64px 0}
.fb-hg{grid-template-columns:1.05fr .95fr;gap:40px}
.fb-plans{margin-top:146px}
.fb-peek img{width:118px}
.fb-peek.dd{top:-98px}
.fb-peek.cg{top:-124px}
.pk-lab{--w:100px}
.fb-play{width:270px}
.pk-dd{--w:128px}
.pk-cg{--w:118px}
.fb-jport{width:360px}
.fb-pack{grid-template-columns:auto 1fr auto;padding:30px 36px}
.fb-plans,.fb-cmp{grid-template-columns:1fr 1fr}
.fb-plan{padding:38px 32px 30px}
.fb-head-row{flex-direction:row;justify-content:center;gap:18px}
.fb-head-row>div{text-align:left}
.fb-steps{grid-template-columns:repeat(3,1fr)}
.fb-loc{grid-template-columns:1fr 1fr}
.fb-founder{grid-template-columns:auto 1fr;gap:44px}
.fb-faqdog{position:absolute;left:-128px;bottom:10px;margin:0}
.fb-final{grid-template-columns:auto 1fr;text-align:left;justify-items:start;padding:30px 40px;gap:30px;align-items:center}
.fb-final .fb-btns{justify-content:flex-start!important}
}
@media(max-width:1100px){.fb-faqdog{position:static;margin-bottom:-8px}}
@media(prefers-reduced-motion:reduce){.fb-art .fb-pup,.fb-deco,.fb-wave-paw,.fb-dog:hover,.fb-step:hover .fb-sico svg{animation:none!important}.fb-btn,.fb-plan,.fb-card,.fb-step,.fb-pts li{transition:none}}
/* 2026-11 premium refresh overrides */
.fb-sec{padding:36px 0}
.fb-peach{background:#F4F6F9}
.fb-h2{font-size:clamp(25px,3.3vw,34px);margin:10px 0 8px}
.fb-lead{font-size:16px;line-height:1.55}
.fb-eye{font-size:11.5px}
.fb-btn{font-size:15px;padding:0 22px;min-height:48px;line-height:1.2}
.fb-or{background:#FF5A0A;color:#00163D;box-shadow:0 6px 16px rgba(255,90,10,.28)}
.fb-or:hover{background:#FF6F2B;box-shadow:0 10px 22px rgba(255,90,10,.36)}
.fb-or svg{color:#00163D}
.fb-hero{padding:34px 0 46px}
.fb-hero h1{font-size:clamp(30px,4.6vw,48px);margin:10px 0 12px}
.fb-hero p{font-size:16.5px}
.fb-hchk{display:flex;flex-wrap:wrap;gap:8px 18px;margin:16px 0 20px;padding:0;list-style:none}
.fb-hchk li{display:inline-flex;align-items:center;gap:7px;font-size:14.5px;font-weight:700;color:#fff}
.fb-hchk svg{flex:none;color:#FF7A3D}
.fb-hcta{display:grid;gap:10px;max-width:460px}
.fb-hcta .fb-btn{width:100%}
.fb-hcta small{display:block;text-align:center;font-size:13px;font-weight:700;color:rgba(255,255,255,.78);margin-top:-2px}
.fb-heroimg{border:3px solid #FF5A0A;box-shadow:0 18px 40px rgba(0,0,0,.3);transform:none;max-width:540px}
.fb-heroimg:hover{transform:none}
.fb-pack{border:1px solid #E3E8EF;box-shadow:0 10px 26px -14px rgba(0,22,61,.25);padding:22px;gap:16px}
.fb-pack::after{display:none}
.fb-plans{gap:112px 22px;margin-top:104px}
.fb-plan{padding:26px 22px 22px;gap:14px;transition:none}
.fb-plan:hover{transform:none}
.fb-plan.fr{border:1.5px solid #D9DFE8;box-shadow:0 12px 28px -14px rgba(0,22,61,.3)}
.fb-plan.td{border:2px solid #FF5A0A;box-shadow:0 14px 32px -14px rgba(0,22,61,.45)}
.fb-price{font-size:46px}
.fb-plan h3{font-size:22px}
.fb-list li{padding:7px 0;font-size:14.5px;gap:10px}
.fb-ck{width:21px;height:21px}
.td .fb-ck{background:#FF5A0A;color:#00163D}
.fb-plan .fb-btn{font-size:15.5px;min-height:50px;padding:0 20px}
#plans{isolation:isolate}
.fb-rest{position:absolute;right:24px;line-height:0;pointer-events:none}
.fb-rest .pkc img{max-width:none;display:block;filter:none}
.fb-hcta .fb-btn{white-space:nowrap}
.fb-hcta small{order:1}
.fb-hcta .fb-ghw{order:2}
@media(max-width:759px){
.fb-hcta{gap:8px}
.fb-hcta small{margin:-2px 0 4px}
.fb-rp{font-size:12.5px;padding:6px 11px}
.fb-reas{gap:6px}
.fb-play{width:150px}
.fb-mbar{font-size:13px;white-space:nowrap;overflow:hidden}
.fb-xr.top .fb-xth{width:76px;height:64px}
.fb-xth{width:48px;height:48px}
.fb-xspot-c{grid-template-columns:84px 1fr;gap:10px}
.fb-xspot-c img{width:84px;height:68px}
.fb-xn{font-size:14px}
.fb-xspot-h>span:first-child{font-size:12px}
.fb-plan .fb-btn{font-size:14.5px;padding:0 14px}
}
@media(min-width:760px){.fb-hcta{grid-template-columns:1fr 1fr;max-width:540px}.fb-hcta .fb-btn{width:100%}.fb-hcta .fb-or{grid-column:1;grid-row:1}.fb-hcta .fb-ghw{grid-column:2;grid-row:1}.fb-hcta small{grid-column:1;grid-row:2}}
.fb-rest.back{z-index:-1}
.fb-rest.front{z-index:3;clip-path:inset(80% 0 0 0)}
.fb-cmp{gap:18px;margin-top:22px}
.fb-card{border:1px solid #E3E8EF;box-shadow:0 8px 22px -12px rgba(0,22,61,.25)}
.fb-card:hover{transform:none}
.fb-card.big{border:2px solid #FF5A0A;box-shadow:0 12px 28px -14px rgba(255,90,10,.45)}
.fb-img{height:auto;aspect-ratio:16/10}
.big .fb-img{height:auto;aspect-ratio:16/10}
.fb-cb{padding:14px 16px 16px;gap:8px}
.big .fb-cb h3{font-size:21px}
.fb-cb h3{font-size:17px}
.fb-tdbadge{width:172px;height:auto}
.fb-head-row{gap:14px}
@media(min-width:760px){.fb-head-row{gap:26px}}
.fb-search{max-width:640px;margin:26px auto 0;background:#fff;color:#00163D;border:1.5px solid rgba(255,90,10,.5);border-radius:18px;padding:18px 18px 16px;box-shadow:0 10px 26px -16px rgba(0,22,61,.35)}
.fb-search>h3{color:#00163D!important}
.fb-search>p{color:#3A4A63!important}
.fb-sic{width:36px;height:36px;background:#FF5A0A;color:#fff;box-shadow:none}
.fb-in{padding:12px 14px 12px 42px;border:1.5px solid #D9DFE8}
.fb-pnote{display:flex;align-items:center;gap:6px;margin:10px 0 0;font-size:12.5px;font-weight:700;color:#4A5370}
.fb-steps{gap:12px;margin-top:20px}
.fb-step{display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:start;border-radius:16px;padding:16px;box-shadow:0 8px 20px rgba(0,0,0,.2);transition:none}
.fb-step:hover{transform:none;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.fb-sico{width:46px;height:46px;border-radius:12px;background:#FFF0E6;color:#FF5A0A;margin:0;grid-row:span 2}
.fb-num{position:static;width:auto;height:auto;background:none;box-shadow:none;color:#FF5A0A;font-family:Manrope,sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:2px}
.fb-step h3{font-size:16.5px;margin-bottom:4px;line-height:1.25}
.fb-step p{font-size:14.5px;line-height:1.5}
.fb-reas{margin-top:16px;gap:8px}
.fb-rp{background:transparent;border:1.5px solid rgba(255,255,255,.35);color:#fff;padding:7px 14px;font-size:13.5px}
.fb-loc{gap:20px;margin-top:18px}
.fb-pts{gap:10px}
.fb-pts li{padding:12px 14px;font-size:14.5px;line-height:1.5;border:1px solid #E3E8EF;transition:none}
.fb-pts li:hover{transform:none;border-color:#E3E8EF}
.fb-ico{width:36px;height:36px;border-radius:10px}
.fb-ico.o{background:#FF5A0A;color:#00163D}
.fb-play{width:190px}
.fb-mock{border:1px solid #D9DFE8;border-radius:20px;padding:14px;gap:9px;box-shadow:0 14px 32px -16px rgba(0,22,61,.35)}
.fb-xlbl{display:inline-flex;align-items:center;gap:6px;justify-self:start;font-size:11.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#4A5370;background:#F4F6F9;border-radius:999px;padding:4px 10px}
.fb-mbar{background:#F4F6F9;color:#00163D;border:1px solid #E3E8EF}
.fb-mbar span{color:#00163D}
.fb-xr{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;border:1px solid #E3E8EF;border-radius:14px;padding:10px;background:#fff}
.fb-xr.top{border:2px solid #FF5A0A;padding:10px}
.fb-xth{width:56px;height:56px;border-radius:10px;overflow:hidden;background:#F4F6F9;display:flex;align-items:center;justify-content:center;color:#9AA4B5}
.fb-xr.top .fb-xth{width:96px;height:72px}
.fb-xth img{width:100%;height:100%;object-fit:cover;display:block}
.fb-xn{font-size:14.5px;font-weight:800;color:#00163D;display:flex;align-items:center;gap:6px;flex-wrap:wrap;line-height:1.25}
.fb-xc{font-size:12.5px;color:#4A5370;font-weight:700;margin-top:2px}
.fb-xp{display:inline-flex;align-items:center;gap:5px;margin-top:6px;font-size:12px;font-weight:800;color:#00163D;background:#FFF0E6;border-radius:8px;padding:4px 8px}
.fb-xtag{display:inline-flex;align-items:center;gap:4px;background:#FF5A0A;color:#00163D;border-radius:999px;padding:2px 8px;font-size:10.5px;font-weight:800}
.fb-xbar{height:9px;border-radius:5px;background:#EEF1F5}
.fb-xspot{background:#00163D;color:#fff;border-radius:16px;padding:12px;display:grid;gap:10px}
.fb-xspot-h{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:800}
.fb-xdots{display:inline-flex;gap:4px}.fb-xdots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.35);display:block}.fb-xdots i.on{background:#FF5A0A}
.fb-xspot-c{display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:center;background:#fff;color:#00163D;border-radius:12px;padding:8px}
.fb-xspot-c img{width:110px;height:72px;object-fit:cover;border-radius:8px;display:block}
.fb-final{background:#FF5A0A;padding:24px 22px}
.fb-faqwrap{margin-top:18px}
.fb-qi{border:1px solid #E3E8EF;box-shadow:none}
.fb-q{padding:14px 16px;font-size:15.5px}
@media(min-width:760px){
.fb-sec{padding:48px 0}
.fb-hero{padding:46px 0 56px}
.fb-hcta{grid-template-columns:auto auto;justify-content:start;max-width:none}
.fb-hcta .fb-btn{width:auto}
.fb-hcta small{grid-column:1;text-align:center}
.fb-plans{margin-top:122px}
.fb-plan{padding:30px 28px 26px}
.fb-cmp{grid-template-columns:1.12fr .88fr;align-items:end}
.fb-steps{grid-template-columns:repeat(3,1fr);gap:16px}
.fb-step{grid-template-columns:1fr;row-gap:10px;padding:18px}
.fb-sico{grid-row:auto}
.fb-play{width:220px}
.fb-pack{padding:24px 30px}
}
@media(prefers-reduced-motion:reduce){.fb-btn{transition:none}}
/* 2026-11 button + pill polish */
.fb-btn{border-width:1px;border-style:solid}
.fb-or{background:#FF5A0A;color:#fff;border:1px solid #fff;box-shadow:0 6px 18px -4px rgba(255,90,10,.5),0 2px 6px rgba(0,22,61,.12);transition:transform .18s,box-shadow .18s,background-color .18s}
.fb-or svg{color:#fff;flex:none}
.fb-or:hover{background:#FF6418;transform:translateY(-2px);box-shadow:0 10px 24px -6px rgba(255,90,10,.6),0 3px 8px rgba(0,22,61,.14)}
.fb-ghw{background:#fff;color:#00163D;border:1px solid #fff;box-shadow:0 6px 16px -6px rgba(0,0,0,.35);transition:transform .18s,box-shadow .18s}
.fb-ghw svg{color:#00163D;flex:none}
.fb-ghw .fb-arr{color:#FF5A0A}
.fb-ghw:hover{background:#fff;border-color:#fff;transform:translateY(-2px);box-shadow:0 10px 22px -8px rgba(0,0,0,.45)}
.fb-btn{line-height:1.2;text-align:center}
.fb-hcta .fb-btn{min-height:48px;padding:0 22px}
.td .fb-list li{border-bottom-color:rgba(255,255,255,.06)}
.fb-reas{gap:8px}
.fb-rp{background:#fff;color:#00163D;border:0;box-shadow:0 3px 10px -3px rgba(0,0,0,.35);padding:7px 14px;font-size:13.5px;line-height:1.2;white-space:nowrap}
.fb-rp svg{stroke:#FF5A0A;flex:none}
div.sss{gap:12px}
div.sss a{width:36px;height:36px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.22);transition:transform .18s,box-shadow .18s}
div.sss a:hover{background:#fff;transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.3)}
@media(max-width:759px){
.fb-rp{font-size:12.5px;padding:6px 10px;gap:5px}
.fb-reas{gap:6px}
.fb-jbtns{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fb-jbtns .fb-btn{width:100%;padding:0 10px;font-size:15px}
}
@media(prefers-reduced-motion:reduce){.fb-or,.fb-ghw,.sss a{transition:none}}
.fb-jbtns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:380px}
.fb-jbtns .fb-btn{width:100%;min-height:48px;padding:0 14px}
@media(min-width:760px){.fb-hcta{grid-template-columns:repeat(2,minmax(0,1fr));max-width:540px}.fb-hcta .fb-btn{width:100%;padding:0 16px}}
@media(min-width:760px) and (max-width:1023px){.fb-hcta{grid-template-columns:1fr;max-width:380px}.fb-hcta .fb-or{grid-column:1;grid-row:1}.fb-hcta small{grid-column:1;grid-row:2}.fb-hcta .fb-ghw{grid-column:1;grid-row:3}}
@media(max-width:759px){.fb-reas{display:grid;grid-template-columns:minmax(0,250px);justify-content:center;gap:7px}.fb-rp{justify-content:center;font-size:13px;padding:7px 12px;gap:6px}.fb-rp svg{width:14px;height:14px}}
.fb-hero p{margin-bottom:22px}
.fb-pack{background:#fff;border:1px solid #E3E8EF;box-shadow:0 10px 26px -14px rgba(0,22,61,.25)}
.fb-pack::before{content:'';position:absolute;left:0;top:0;bottom:0;width:5px;background:#FF5A0A}
.fb-pack::after{display:none}
.fb-pack .fb-eye svg{color:#FF5A0A}
@media(min-width:760px){.fb-pack{grid-template-columns:1fr auto;gap:32px;padding:30px 36px 30px 40px}}
@media(max-width:759px){.fb-hero{padding:24px 0 32px}.fb-hero h1{margin:8px 0 10px}.fb-hero p{font-size:15.5px;line-height:1.5;margin-bottom:18px}.fb-hg{gap:22px}.fb-hcta{gap:8px}.fb-hcta .fb-btn{min-height:46px;font-size:15px}.fb-hcta small{font-size:12.5px;font-weight:600;letter-spacing:.02em;margin:0 0 2px}.fb-heroimg{aspect-ratio:16/10}.fb-pack{padding:22px 20px 22px 25px;gap:14px}.fb-pack .fb-btn{width:100%}}
.fb-key{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.fb-key li{display:flex;gap:12px;align-items:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.45;color:rgba(255,255,255,.85);font-weight:600}
.fb-key b{display:block;color:#fff;font-size:15.5px;font-weight:800;margin-bottom:2px}
.fb-kico{flex:none;width:36px;height:36px;border-radius:10px;background:#FF5A0A;color:#fff;display:flex;align-items:center;justify-content:center}
.fb-also{font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#FF9B68;margin:2px 0 2px}
.fb-list.sm li{font-size:14px;padding:5px 0;border-bottom:0}
.fb-list.sm .fb-ck{width:19px;height:19px}
.td .fb-price{font-size:64px}
.fr .fb-price{font-size:42px}
.fb-plan.td{box-shadow:0 22px 44px -16px rgba(255,90,10,.5)}
.fb-diff{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:18px}
.fb-diff span{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E3E8EF;border-radius:999px;padding:7px 13px;font-size:13.5px;font-weight:800;color:#00163D}
.fb-diff svg{color:#FF5A0A}
.fb-vhead .fb-lead{max-width:600px}
.fb .fb-search{background:#FF5A14;border:0;box-shadow:0 18px 40px -18px rgba(0,22,61,.55),0 6px 16px -8px rgba(255,90,20,.45)}
.fb .fb-search>h3{color:#fff!important}
.fb .fb-search>p{color:#fff!important;font-weight:700!important}
.fb .fb-sic{background:#D94706;color:#fff}
.fb .fb-search .fb-in{border-color:#fff;color:#00163D}
.fb .fb-search .fb-in:focus{border-color:#00163D;box-shadow:0 0 0 3px rgba(0,22,61,.25)}
.fb .fb-search .fb-pnote{color:#fff}
.fb .fb-search .fb-pnote svg{color:#fff;stroke:#fff}
.fb .fb-search .fb-lbl:not(.o){background:#fff!important}
.fb .fb-search .fb-lbl.o{background:#00163D}
.fr .fb-list{flex:none}
.fr>.fb-btn{margin-top:auto}
.fb-nope{background:#FFF0E7;border-left:3px solid #FF5A0A;border-radius:14px;padding:14px 16px}
.fb-nope ul{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:6px}
.fb-nope li{display:flex;gap:10px;align-items:center;font-size:14px;font-weight:700;color:#00163D}
.fb-nx{flex:none;width:19px;height:19px;border-radius:50%;background:#fff;color:#8A93A8;display:inline-flex;align-items:center;justify-content:center;font-weight:800;line-height:1}
.fb-vis{display:grid;gap:16px;margin-top:30px}
.fb-vi{background:#fff;border:1px solid #E3E8EF;border-radius:20px;padding:26px 24px;box-shadow:0 10px 26px -18px rgba(0,22,61,.35)}
.fb-vi h3{font-size:19px;margin:16px 0 8px;color:#00163D}
.fb-vi p{margin:0;font-size:15px;line-height:1.6;color:#2C3550}
.fb-vico{width:48px;height:48px;border-radius:14px;background:#FFF0E6;color:#FF5A0A;display:flex;align-items:center;justify-content:center}
.fb-rc{background:#fff;color:#00163D;border:1px solid #D3DCE9;border-radius:16px;box-shadow:0 4px 14px rgba(0,22,61,.12);padding:14px;display:flex;flex-direction:column;gap:10px;text-align:left;min-width:0}
.fb-rc.td{border:2px solid #FF5A0A;box-shadow:0 12px 30px rgba(255,90,10,.24),0 1px 3px rgba(0,22,61,.06)}
.fb-rh{display:flex;gap:12px;align-items:flex-start;min-width:0}
.fb-rc.td .fb-rh{flex-direction:column;align-items:stretch}
.fb-rt{flex:none;width:72px;height:72px;border-radius:14px;overflow:hidden;background:#EEF3FA;border:1.5px solid #D3DCEA;display:flex;align-items:center;justify-content:center;color:#FF7A3D}
.fb-rt img,.fb-rt>svg{width:100%;height:100%;object-fit:cover;display:block}
.fb-rc.td .fb-rt{width:100%;height:116px;border:2px solid #FF5A0A}
.fb-rn{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
.fb-rb{align-self:flex-start;display:inline-flex;align-items:center;gap:5px;background:#00163D;color:#fff;font-size:12.5px;font-weight:800;padding:5px 12px 5px 9px;border-radius:99px}
.fb-rb svg{color:#FF7A3D}
.fb-rhd{position:relative;padding-left:12px;display:flex;flex-direction:column;gap:4px}
.fb-rhd::before{content:'';position:absolute;left:0;top:3px;bottom:3px;width:4px;border-radius:4px;background:#FF5A0A}
.fb-rhd h3{margin:0;font-size:19px;line-height:1.22;font-weight:800;color:#00163D}
.fb-rc.td .fb-rhd h3{font-size:21px}
.fb-rm{display:flex;gap:4px;align-items:center;font-size:12.5px;font-weight:600;color:#6B7689}
.fb-rm svg{color:#FF5A0A;flex:none}
.fb-rn .fb-ver{align-self:flex-start;margin-left:12px}
.fb-rd{margin:0;font-size:13.5px;line-height:1.55;color:#4A5568}
.fb-rpromo{display:flex;gap:9px;align-items:flex-start;background:#FFF1E6;border:1.5px solid #FF8A4C;border-left:5px solid #FF5A0A;border-radius:12px;padding:11px 13px}
.fb-rpromo b{display:block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:#C2490B;font-weight:900}
.fb-rpromo strong{display:block;font-size:15px;line-height:1.3;font-weight:800;margin-top:1px;color:#00163D}
.fb-rpk{background:#F2F5FA;border-radius:12px;padding:10px 11px 11px;display:flex;flex-direction:column;gap:7px}
.fb-rpkh{display:flex;align-items:center;gap:7px;font-size:17px;font-weight:800;color:#00163D}
.fb-rpkh svg{color:#FF5A0A}
.fb-rps{display:flex;flex-wrap:wrap;gap:6px}
.fb-rps span{background:#FFF5EE;border:1.5px solid #FF8A4C;color:#00163D;font-weight:800;font-size:12px;line-height:1.3;padding:4px 10px;border-radius:99px}
.fb-rv{display:flex;align-items:center;justify-content:center;gap:6px;min-height:42px;background:#00163D;color:#fff;font-weight:800;font-size:14px;border-radius:11px}
.fb-rcl{display:flex;flex-wrap:wrap;justify-content:center;gap:2px 6px;align-items:center;font-size:13px;color:#00163D;font-weight:600;text-align:center}
.fb-rcl svg{color:#FF5A0A}
.fb-rg{display:flex;align-items:center;gap:10px;min-height:40px}
.fb-rg>svg{color:#FF5A0A;flex:none}
.fb-rg>span{flex:1;display:flex;flex-direction:column;line-height:1.25}
.fb-rg b{font-size:13.5px;font-weight:800;color:#00163D}
.fb-rg small{font-size:12px;color:#6B7689}
.fb-rg em{font-style:normal;font-size:13px;font-weight:800;color:#E5530A}
.fb-rcl b{color:#E5530A;font-weight:800}
.fb-sec .fb-cmp{max-width:700px;margin-left:auto;margin-right:auto;align-items:start}
.fb-search .fb-cmp{max-width:none}
@media(min-width:760px){.fb-sec .fb-cmp{grid-template-columns:1fr 1fr;gap:22px}}
@media(max-width:759px){.fb-rt{width:64px;height:64px}.fb-rc.td .fb-rt{height:120px}}
.fb-navy+.fb-navy{border-top:1px solid rgba(255,255,255,.12)}
.fb-vnote{text-align:center;font-size:13px;color:#4A5370;font-weight:700;margin:18px auto 0;max-width:560px}
@media(min-width:760px){.fb-vis{grid-template-columns:repeat(3,1fr);gap:22px;margin-top:38px}.fb-vi{padding:30px 28px}}
@media(max-width:759px){.td .fb-price{font-size:54px}.fb-diff{gap:6px}.fb-diff span{font-size:12.5px;padding:6px 11px}.fb-cmp>div{min-width:0}}
`;
