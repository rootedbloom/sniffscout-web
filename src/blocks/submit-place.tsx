"use client";
// Submit a Place form (copied from the Softr "Suggest a Dog-Friendly Place" block).
// Page title and description are set on the server (app/submit-a-place/page.tsx).
import React,{useState,useEffect,useRef} from "react";
import { SSFooter } from "./softr-footer";
import { ssTypoInit } from "@/lib/ss-typo";
import {datasource,q,useRecordCreate,useUpload} from "@/lib/datasource";
import {useImageSetting} from "@/lib/editable-settings";
import {PawPrint,MapPin,Camera,Bone,CheckCircle2,ChevronDown,Mail} from "lucide-react";
const ds=datasource.define({places:"places"});
const fields=q.select({business:"Business Name",category:"Business Type",address:"Street Address",city:"City",state:"State",zip:"ZIP Code",website:"Website",phone:"Phone Number",areas:"Dog-Friendly Area",notes:"Dog-Friendly Notes",water:"Water Bowls Available",treats:"Dog Treats Available",menu:"Dog Menu Available",cups:"Pup Cups Available",cover:"Outdoor Area Coverage",heat:"Outdoor Area Heating",cool:"Outdoor Area Cooling",seating:"Outdoor Seating",access:"Dog Access",accessNote:"Dog Access Notes",status:"Listing Status",claimStatus:"Claim Status",confidence:"Information Confidence",source:"Submission Source",submitter:"Submitted By Name",email:"Submitter Email",relationship:"Submitter Relationship",lastVisit:"Submitter Last Visit",sid:"Submission ID",photos:"Additional Photos",permission:"Photo Usage Permission",pack:"Submitter Join the Pack"});
const categories=["Restaurant/Bar","Coffee Shop","Brewery"];
const visits=["Within the last month","Within the last year","More than a year ago","Haven't visited"];
const SEAT_OPTS=["Patio / Outdoor Area","No Dog-Friendly Outdoor Area"];
const ACCESS_OPTS=["Dogs Allowed Inside","Dogs Outside Only"];
const COVER_OF:Record<string,string>={"Patio / Outdoor Area":"Unknown","No Dog-Friendly Outdoor Area":"Not Applicable"};
const PERKS=["Water bowls","Dog treats","Pup cups","Dog menu","Fenced outdoor area","Outdoor heaters","Fans / cooling for summer"];
const NOT_SURE="Not sure yet";
const CSS2=`
.sp{font-family:Figtree,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#00163D;width:100%;overflow-x:hidden}
.sp *{box-sizing:border-box}
.sp h1,.sp h2,.sp h3{font-family:'Bricolage Grotesque',Figtree,sans-serif;font-weight:800;letter-spacing:-.02em;color:#00163D;margin:0}
.sp-hero{position:relative;overflow:hidden;background:#00163D;color:#fff;padding:26px 18px 54px}
.sp-hero-in{position:relative;z-index:1;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center}
.sp-eyebrow{display:inline-flex;align-items:center;gap:7px;color:#FF7A3D;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px}
.sp-hero h1{color:#fff;font-size:clamp(28px,6.4vw,50px);line-height:1.05;margin:0 0 10px}
.sp-hero p{margin:0;max-width:540px;font-size:15.5px;line-height:1.55;color:rgba(255,255,255,.9)}
.sp-hero-dog{display:block;width:96px;height:auto;filter:drop-shadow(0 10px 16px rgba(0,0,0,.35))}
.sp-hero-paw{position:absolute;color:#fff;opacity:.06;pointer-events:none}
.sp-wave{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:34px;display:block}
.sp-main{max-width:760px;margin:0 auto;padding:22px 14px 48px}
.sp-intro{text-align:center;margin:0 0 16px}
.sp-intro h2{font-size:clamp(22px,4.6vw,28px);line-height:1.2}
.sp-intro p{margin:6px 0 0;font-size:15px;color:#46556A;font-weight:600}
.sp-card{background:#fff;border:1px solid #E3E8EF;border-radius:22px;box-shadow:0 10px 28px rgba(0,22,61,.07);padding:20px 16px;display:grid;gap:18px}
.sp-sec{display:grid;gap:14px}
.sp-sec+.sp-sec{border-top:1px solid #EDF0F4;padding-top:18px}
.sp-sh{display:flex;align-items:center;gap:10px;font-size:20px;line-height:1.2}
.sp-ic{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#FFF1E8;color:#FF5A0A}
.sp-sub{margin:-6px 0 0;font-size:14px;line-height:1.5;color:#52627B}
.sp-row{display:grid;gap:14px;grid-template-columns:1fr}
.sp-lab{display:block;font-size:14.5px;font-weight:800;margin-bottom:6px;color:#00163D}
.sp-opt{font-weight:600;color:#6A7890}
.sp-in{width:100%;min-width:0;padding:12px 14px;border:1.5px solid #CBD4E1;border-radius:12px;font:600 16px Figtree,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#00163D}
.sp-in::placeholder{color:#8A96A8;font-weight:500}
.sp-in:focus{outline:none;border-color:#FF5A0A;box-shadow:0 0 0 3px rgba(255,90,10,.2)}
.sp-help{font-size:13px;line-height:1.5;color:#52627B;margin:6px 0 0}
.sp-more{display:flex;align-items:center;justify-content:space-between;width:100%;gap:10px;background:#fff;border:1.5px solid #E3E8EF;border-radius:12px;padding:12px 14px;font:800 15px Figtree,sans-serif;color:#00163D;cursor:pointer;text-align:left}
.sp-more svg{flex:none;transition:transform .2s;color:#FF5A0A}
.sp-more[aria-expanded=true]{border-radius:12px 12px 0 0}
.sp-more[aria-expanded=true] svg{transform:rotate(180deg)}
.sp-panel{display:grid;gap:14px;padding:14px;border:1.5px solid #E3E8EF;border-top:0;border-radius:0 0 12px 12px;background:#fff}
.sp-perks{display:grid;gap:8px;grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-perk{display:flex;align-items:center;gap:8px;border:1.5px solid #E3E8EF;border-radius:12px;padding:10px 11px;font-size:14px;font-weight:700;line-height:1.25;cursor:pointer;background:#fff;transition:border-color .15s,background .15s;min-height:46px}
.sp-perk:hover{border-color:#FFB48A}
.sp-perk.on{border-color:#FF5A0A;background:#FFF1E8}
.sp-perk input{width:17px;height:17px;accent-color:#FF5A0A;flex:none;margin:0}
.sp-photo{display:inline-flex;gap:8px;align-items:center;color:#00163D;border:1.5px dashed #CBD4E1;border-radius:12px;padding:11px 14px;font-weight:700;cursor:pointer;font-size:14.5px;background:#fff}
.sp-photo:hover{border-color:#FF5A0A}
.sp-who{background:#FFF1E8;border-radius:16px;padding:16px;display:grid;gap:14px}
.sp-btn{display:flex;width:100%;align-items:center;justify-content:center;gap:8px;border:0;border-radius:99px;background:#FF5A0A;color:#fff;font:800 18px Figtree,sans-serif;padding:16px 22px;cursor:pointer;text-decoration:none;transition:background .15s,transform .15s,box-shadow .15s;box-shadow:0 8px 18px rgba(255,90,10,.28)}
.sp-btn:hover{background:#E64E05;transform:translateY(-1px)}
.sp-btn:disabled{opacity:.7;cursor:wait;transform:none}
.sp-err{color:#B42318;background:#FEF3F2;border:1px solid #FECDCA;border-radius:10px;padding:10px 12px;font-size:14px;font-weight:700;margin:0}
.sp-fine{font-size:12.5px;color:#52627B;text-align:center;line-height:1.5;margin:-6px 0 0}
.sp-in:focus-visible,.sp-btn:focus-visible,.sp-more:focus-visible,.sp-perk:focus-within,.sp-photo:focus-within,.sp-claim-btn:focus-visible{outline:3px solid #00163D;outline-offset:2px}
.sp-claim{position:relative;margin:28px 0 0;background:#fff;border:2px solid #FF5A0A;border-radius:20px;padding:22px 18px 20px;display:grid;gap:12px;justify-items:center;text-align:center;box-shadow:0 10px 26px rgba(0,22,61,.1)}
.sp-claim-dog{display:block;width:86px;height:86px;border-radius:50%;object-fit:cover;object-position:50% 22%;border:3px solid #FF5A0A;background:#FFF1E8;box-shadow:0 6px 14px rgba(0,22,61,.12)}
.sp-claim h3{font-size:22px;line-height:1.15}
.sp-claim p{margin:4px 0 0;font-size:15px;font-weight:600;color:#3A4A66;line-height:1.4}
.sp-claim-btn{display:inline-flex;align-items:center;gap:8px;background:#FF5A0A;color:#fff!important;font:800 15.5px Figtree,'Helvetica Neue',Arial,sans-serif;padding:12px 22px;border-radius:999px;text-decoration:none!important;white-space:nowrap;transition:background .18s,transform .18s}
.sp-claim-btn:hover{background:#E64E05;transform:translateY(-2px)}
@media(min-width:700px){
 .sp-hero{padding:34px 28px 66px}
 .sp-hero-in{gap:28px}
 .sp-hero p{font-size:17.5px}
 .sp-hero-dog{width:190px}
 .sp-wave{height:46px}
 .sp-main{padding:30px 20px 64px}
 .sp-card{padding:30px 30px}
 .sp-row.two{grid-template-columns:1fr 1fr}
 .sp-row.cs{grid-template-columns:2fr 1fr}
 .sp-perks{grid-template-columns:repeat(3,minmax(0,1fr))}
 .sp-claim{grid-template-columns:auto 1fr auto;align-items:center;justify-items:start;text-align:left;gap:20px;padding:22px 26px;margin-top:32px}
 .sp-claim-dog{width:96px;height:96px}
}
@media(prefers-reduced-motion:reduce){.sp-btn,.sp-perk,.sp-more svg,.sp-claim-btn{transition:none}.sp-btn:hover,.sp-claim-btn:hover{transform:none}}
.sp-hero .sp-eyebrow{color:#FF9868;font-size:12.5px;white-space:nowrap;margin:0 0 8px}
.sp-hero .sp-eyebrow svg{color:#FF9868}
.sp-claim{border-width:1.5px}
@media(max-width:699px){.sp-claim{padding:16px 16px 16px;gap:9px;margin-top:22px}.sp-claim-dog{width:76px;height:76px}.sp-claim p{margin-top:2px}}
.sp{background:#EDF4FC}
.sp-intro{margin:4px 0 20px}
.sp-card{box-shadow:0 12px 32px -16px rgba(0,22,61,.25);border-color:#DCE6F2}
.sp-sec{gap:15px}
.sp-sec+.sp-sec{border-top:1px solid #D6E4F5;padding-top:24px;margin-top:4px}
.sp-sh{margin:2px 0 4px}
.sp-perk{min-height:48px;background:#fff}
.sp-perk input{width:20px;height:20px}
.sp-perk.on{border-color:#FF5A0A;background:#FFF1E8;box-shadow:inset 0 0 0 1px #FF5A0A;color:#00163D}
.sp-cheer{margin:2px 0 -6px;text-align:center;font-size:14px;line-height:1.45;font-weight:600;color:#46556A}
.sp-claim{margin-top:30px}
@media(max-width:699px){.sp-intro{margin:2px 0 16px}.sp-sec+.sp-sec{padding-top:20px}.sp-perk{min-height:50px}}
`;
function normUrl(v:string):{ok:boolean;url?:string}{const t=v.trim();if(!t)return {ok:true};if(/\s/.test(t))return {ok:false};const full=/^https?:\/\//i.test(t)?t:/^[a-z][a-z0-9+.-]*:/i.test(t)?"":"https://"+t;if(!full)return {ok:false};try{const u=new URL(full);if(!/^https?:$/.test(u.protocol)||!u.hostname.includes(".")||u.hostname.endsWith("."))return {ok:false};return {ok:true,url:u.toString()};}catch(e){return {ok:false};}}
const digits=(v:string)=>v.replace(/\D/g,"").replace(/^1(?=\d{10}$)/,"");
ssTypoInit();


export default function Block(){
 const heroDog=useImageSetting({name:"hero-dog",label:"Hero dog graphic",initialValue:{src:"https://cdn.jsdelivr.net/gh/rootedbloom/sniffscout-sitemap@main/dog-golden-retriever.webp",alt:"Golden retriever wearing a SniffScout bandana and carrying an orange ball"}});
 const claimDog=useImageSetting({name:"claim-dog",label:"Claim card dog face",initialValue:{src:"https://assets.softr-files.com/applications/e2f1db9b-6197-4ad9-883f-a53fcec1da0a/assets/8086b3aa-0d79-452d-b93d-07ddc12fa622.png",alt:"Smiling Goldendoodle in a SniffScout bandana"}});
 const [business,setBusiness]=useState(""),[category,setCategory]=useState(""),[address,setAddress]=useState(""),[city,setCity]=useState(""),[state,setState]=useState(""),[zip,setZip]=useState(""),[website,setWebsite]=useState(""),[phone,setPhone]=useState(""),[name,setName]=useState(""),[email,setEmail]=useState(""),[relationship,setRelationship]=useState(""),[lastVisit,setLastVisit]=useState(""),[selected,setSelected]=useState<string[]>([]),[notSure,setNotSure]=useState(false),[notes,setNotes]=useState(""),[seat,setSeat]=useState(""),[access,setAccess]=useState(""),[accessNote,setAccessNote]=useState(""),[photos,setPhotos]=useState<File[]>([]),[permission,setPermission]=useState(false),[pack,setPack]=useState(false),[more,setMore]=useState(false),[aboutYou,setAboutYou]=useState(false),[busy,setBusy]=useState(false),[done,setDone]=useState(false),[error,setError]=useState("");
 const [subId]=useState(()=>{try{return (crypto as any).randomUUID();}catch(e){return "s-"+Date.now()+"-"+Math.random().toString(36).slice(2);}});
 const attempted=useRef(false);
 const create=useRecordCreate({from:ds.places,fields});
 const started=useRef(false);
 const {uploadAsync}=useUpload();
 useEffect(()=>{const add=(id:string,href:string)=>{if(document.getElementById(id))return;const l=document.createElement("link");l.id=id;l.rel="stylesheet";l.href=href;document.head.appendChild(l);};add("ss-fonts-bg","https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Figtree:wght@500;600;700;800&display=swap");},[]);
 const togglePerk=(x:string,on:boolean)=>{setNotSure(false);setSelected(v=>on?[...v,x]:v.filter(y=>y!==x));};
 async function submit(e:React.FormEvent){
  e.preventDefault();setError("");
  if(busy)return;
  if(!create.enabled){setError("Submissions are temporarily unavailable.");return;}
  if(!category){setError("Please choose a category.");return;}
  const site=normUrl(website);
  if(!site.ok){setError("That doesn't look like a valid website or map link. Try something like www.example.com or a Google Maps link.");return;}
  const ph=digits(phone);
  if(phone.trim()&&ph.length!==10){setMore(true);setError("Please enter a 10-digit phone number, or leave it blank.");return;}
  if(photos.length&&!permission){setError("Please confirm you have permission to share your photos.");return;}
  setBusy(true);
  try{
   attempted.current=true;
   let attachments:any=undefined;
   if(photos.length){const uploads=await uploadAsync(photos);const ok=uploads.filter(x=>x.status==="completed");if(ok.length!==photos.length)throw new Error("One or more photos failed to upload. Please try again.");attachments=ok.map(x=>({filename:x.file.name,url:x.url}));}
   const has=(x:string)=>selected.includes(x);
   const areas:string[]=[];if(access==="Dogs Allowed Inside")areas.push("Indoor");if(seat&&seat!=="No Dog-Friendly Outdoor Area")areas.push("Patio");
   const cat=category==="Restaurant/Bar"?["Restaurant","Bar"]:[category];
   const notesText=[notes.trim(),has("Fenced outdoor area")?"Suggested: fenced outdoor area":"",has("Covered patio")?"Suggested: covered patio (unconfirmed)":"",notSure?"Submitter was not sure about perks.":"","Community-submitted; dog policies and perks are unverified until reviewed."].filter(Boolean).join("\n");
   const data:any={business:business.trim(),category:cat,city:city.trim(),state:state.trim(),email:email.trim(),pack,areas,notes:notesText,water:has("Water bowls")?"Yes":"Unknown",treats:has("Dog treats")?"Yes":"Unknown",menu:has("Dog menu")?"Yes":"Unknown",cups:has("Pup cups")?"Yes":"Unknown",cover:COVER_OF[seat]||"Unknown",seating:seat||"Not Yet Verified",access:access||"Access Not Yet Verified",heat:has("Outdoor heaters")?"Yes":"Unknown",cool:has("Fans / cooling for summer")?"Yes":"Unknown",status:"Pending Review",claimStatus:"Unclaimed",confidence:"Needs Research",source:"User Suggestion",sid:subId,permission:photos.length?permission:false};
   if(accessNote.trim())data.accessNote=accessNote.trim();
   if(address.trim())data.address=address.trim();if(zip.trim())data.zip=zip.trim();if(site.url)data.website=site.url;if(phone.trim())data.phone="+1"+ph;if(name.trim())data.submitter=name.trim();if(relationship)data.relationship=relationship;if(lastVisit)data.lastVisit=lastVisit;if(attachments)data.photos=attachments;
   started.current=true;await create.mutateAsync(data);
   setDone(true);
   try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){}
  }catch(err:any){setError(err&&err.message&&!/failed to fetch|network|load failed/i.test(err.message)?err.message:started.current?"We couldn't confirm that your suggestion was sent. Your answers are still here. Try again, and if you see the thank-you message you're all set. We'll remove any duplicate.":"We couldn't send that just now. Your answers are still here, so please try again.");}
  setBusy(false);
 }
 return <><div className="sp"><style>{CSS2}</style>
 <section className="sp-hero">
  <div className="sp-hero-in">
   <div><p className="sp-eyebrow"><PawPrint size={14} strokeWidth={2.6} aria-hidden="true"/>Help the pack grow</p><h1>Know a Dog-Friendly Spot?</h1><p>Found a restaurant, brewery, or coffee shop that welcomes pups? Share it with the pack and help more dog lovers discover it!</p></div>
   {heroDog.src&&<img className="sp-hero-dog" src={heroDog.src} alt={heroDog.alt||""} width={680} height={691}/>}
  </div>
  <svg className="sp-wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 C360 0 1080 0 1440 46 Z" fill="#EDF4FC"/><path d="M0 40 C360 -4 1080 -4 1440 40" stroke="#FF5A0A" strokeWidth="4" fill="none"/></svg>
 </section>
 <div className="sp-main">
 {done?<section className="sp-card" style={{textAlign:"center",justifyItems:"center",padding:"34px 22px"}}><CheckCircle2 color="#15946B" size={56}/><h2 style={{fontSize:"clamp(24px,5vw,32px)"}}>Thanks for sharing this spot! 🐾</h2><p style={{fontSize:16.5,lineHeight:1.5,margin:0,maxWidth:480,color:"#2B3B55"}}>It's been submitted for review. We'll verify the details before adding it to SniffScout.</p><a href="/" className="sp-btn" style={{width:"auto"}}>Back to SniffScout</a></section>:<>
 <div className="sp-intro"><h2>Tell Us About Your Favorite Spot! 🐾</h2><p>Just a few quick details and you're done!</p></div>
 <form className="sp-card" onSubmit={submit} noValidate={false}>
  <div className="sp-sec">
   <h3 className="sp-sh"><span className="sp-ic"><MapPin size={18} strokeWidth={2.5}/></span>About the place</h3>
   <div><label className="sp-lab" htmlFor="ss-biz">Business name *</label><input id="ss-biz" className="sp-in" required value={business} onChange={e=>setBusiness(e.target.value)} placeholder="What's the place called?" autoComplete="off"/></div>
   <div className="sp-row two"><div><label className="sp-lab" htmlFor="ss-cat">Category *</label><select id="ss-cat" className="sp-in" required value={category} onChange={e=>setCategory(e.target.value)}><option value="">Choose a category</option>{categories.map(x=><option key={x}>{x}</option>)}</select></div>
   <div><label className="sp-lab" htmlFor="ss-visit">When did you last visit? <span className="sp-opt">(optional)</span></label><select id="ss-visit" className="sp-in" value={lastVisit} onChange={e=>setLastVisit(e.target.value)}><option value="">Choose one</option>{visits.map(x=><option key={x}>{x}</option>)}</select></div></div>
   <div className="sp-row cs"><div><label className="sp-lab" htmlFor="ss-city">City *</label><input id="ss-city" className="sp-in" required value={city} onChange={e=>setCity(e.target.value)} autoComplete="address-level2"/></div><div><label className="sp-lab" htmlFor="ss-state">State *</label><input id="ss-state" className="sp-in" required value={state} onChange={e=>setState(e.target.value)} autoComplete="address-level1"/></div></div>
   <div><label className="sp-lab" htmlFor="ss-web">Website or Google Maps link <span className="sp-opt">(optional)</span></label><input id="ss-web" className="sp-in" value={website} onChange={e=>setWebsite(e.target.value)} inputMode="url" placeholder="Paste a website or Google Maps link if you have one." autoComplete="off"/></div>
   <div><button type="button" className="sp-more" aria-expanded={more} aria-controls="ss-more-panel" onClick={()=>setMore(v=>!v)}><span>Add address or phone <span className="sp-opt">(optional)</span></span><ChevronDown size={20}/></button>
   {more&&<div id="ss-more-panel" className="sp-panel">
    <div><label className="sp-lab" htmlFor="ss-addr">Street address</label><input id="ss-addr" className="sp-in" value={address} onChange={e=>setAddress(e.target.value)} autoComplete="street-address"/></div>
    <div className="sp-row two"><div><label className="sp-lab" htmlFor="ss-zip">ZIP code</label><input id="ss-zip" className="sp-in" value={zip} onChange={e=>setZip(e.target.value)} inputMode="numeric" autoComplete="postal-code"/></div><div><label className="sp-lab" htmlFor="ss-phone">Business phone</label><input id="ss-phone" className="sp-in" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="off"/></div></div>
   </div>}</div>
  </div>
  <div className="sp-sec">
   <h3 className="sp-sh"><span className="sp-ic"><MapPin size={18} strokeWidth={2.5}/></span>Where Are Dogs Welcome?</h3>
   <p className="sp-sub">Only choose what you know for sure. “Not sure” is totally fine. We'll verify before publishing.</p>
   <div className="sp-row two"><div><label className="sp-lab" htmlFor="ss-seat">Outdoor seating for dogs</label><select id="ss-seat" className="sp-in" value={seat} onChange={e=>setSeat(e.target.value)}><option value="">Not sure</option>{SEAT_OPTS.map(x=><option key={x}>{x}</option>)}</select></div><div><label className="sp-lab" htmlFor="ss-access">Where are dogs allowed?</label><select id="ss-access" className="sp-in" value={access} onChange={e=>setAccess(e.target.value)}><option value="">Not sure</option>{ACCESS_OPTS.map(x=><option key={x}>{x}</option>)}</select></div></div>
   <div><label className="sp-lab" htmlFor="ss-access-note">Restrictions or designated dog areas <span className="sp-opt">(optional)</span></label><input id="ss-access-note" className="sp-in" value={accessNote} onChange={e=>setAccessNote(e.target.value)} placeholder="e.g. Patio only, or after 4 PM"/></div>
  </div>
  <div className="sp-sec">
   <h3 className="sp-sh"><span className="sp-ic"><Bone size={18} strokeWidth={2.5}/></span>What Pup Perks Have You Spotted?</h3>
   <p className="sp-sub">Only select perks you've personally seen. We'll confirm the details before publishing!</p>
   <div className="sp-perks">{PERKS.map(x=><label key={x} className={"sp-perk"+(selected.includes(x)?" on":"")}><input type="checkbox" checked={selected.includes(x)} onChange={e=>togglePerk(x,e.target.checked)}/>{x==="Fans / cooling for summer"?"Fans/cooling for summer":x}</label>)}<label className={"sp-perk"+(notSure?" on":"")}><input type="checkbox" checked={notSure} onChange={e=>{setNotSure(e.target.checked);if(e.target.checked)setSelected([]);}}/>{NOT_SURE}</label></div>
   <div><label className="sp-lab" htmlFor="ss-notes">Anything Else Dog Lovers Should Know? <span className="sp-opt">(optional)</span></label><textarea id="ss-notes" className="sp-in" style={{minHeight:84}} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Fun details, friendly staff, pup events, best times to visit..."/></div>
   <div><span className="sp-lab">Photos <span className="sp-opt">(optional)</span></span><label className="sp-photo"><Camera size={18} color="#FF5A0A"/>{photos.length?photos.length+" photo"+(photos.length===1?"":"s")+" selected · change":"Choose photos to upload"}<input type="file" multiple accept="image/*" onChange={e=>setPhotos(Array.from(e.target.files??[]).slice(0,5))} style={{position:"absolute",width:1,height:1,opacity:0}}/></label><p className="sp-help">Up to 5 photos you took or have permission to share.</p>{photos.length>0&&<label style={{display:"flex",gap:8,fontSize:14,marginTop:6,alignItems:"flex-start"}}><input type="checkbox" checked={permission} onChange={e=>setPermission(e.target.checked)} style={{accentColor:"#FF5A0A",marginTop:2}}/> I give SniffScout permission to display these photos.</label>}</div>
  </div>
  <div className="sp-sec">
   <div className="sp-who">
    <h3 className="sp-sh" style={{fontSize:19}}><span className="sp-ic" style={{background:"#fff"}}><Mail size={17} strokeWidth={2.5}/></span>Who's sharing this spot?</h3>
    <div><label className="sp-lab" htmlFor="ss-email">Your email *</label><input id="ss-email" className="sp-in" type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/><p className="sp-help">We'll only use your email if we need to follow up about your suggestion.</p><label style={{display:"flex",gap:9,alignItems:"flex-start",marginTop:10,fontSize:14,lineHeight:1.45,fontWeight:600,cursor:"pointer"}}><input type="checkbox" checked={pack} onChange={e=>setPack(e.target.checked)} style={{width:18,height:18,accentColor:"#FF5A0A",flex:"none",marginTop:1}}/><span>🐾 <b>Join the Pack!</b> Email me new dog-friendly spots and local pup news. <span className="sp-opt">(optional, unsubscribe anytime)</span></span></label></div>
    <div><button type="button" className="sp-more" aria-expanded={aboutYou} aria-controls="ss-you-panel" onClick={()=>setAboutYou(v=>!v)}><span>A Little About You <span className="sp-opt">(optional)</span></span><ChevronDown size={20}/></button>
    {aboutYou&&<div id="ss-you-panel" className="sp-panel"><div className="sp-row two"><div><label className="sp-lab" htmlFor="ss-name">Your name</label><input id="ss-name" className="sp-in" value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></div><div><label className="sp-lab" htmlFor="ss-rel">Your connection to this place</label><select id="ss-rel" className="sp-in" value={relationship} onChange={e=>setRelationship(e.target.value)}><option value="">Choose one</option>{["Customer / Visitor","Business Owner / Manager","Employee","Other"].map(x=><option key={x}>{x}</option>)}</select></div></div></div>}</div>
   </div>
  </div>
  {error&&<p role="alert" className="sp-err">{error}</p>}
  <p className="sp-cheer">You're helping more pups and their people find their next favorite hangout! 🧡</p>
  <button type="submit" className="sp-btn" disabled={busy||!create.enabled}>{busy?"Submitting…":"Submit This Spot 🐾"}</button>
  <p className="sp-fine">Every suggestion is reviewed before appearing in the directory.</p>
 </form></>}
 <div className="sp-claim">{claimDog.src&&<img className="sp-claim-dog" src={claimDog.src} alt={claimDog.alt||""} width={96} height={96} loading="lazy"/>}<div><h3>Already on SniffScout?</h3><p>Own a dog-friendly business? Claim your listing for free.</p></div><a href="/claim-your-business" className="sp-claim-btn">Claim Your Free Listing →</a></div>
 </div></div><SSFooter noGo/></>;
}
