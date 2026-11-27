"use client";
// Claim Your Business form (copied from the Softr "Business Claim Form" block).
// Page title and description are set on the server (app/claim-your-business/page.tsx).
import React,{useState,useEffect,useRef} from "react";
import { SSFooter } from "./softr-footer";
import { ssTypoInit } from "@/lib/ss-typo";
import {datasource,q,useRecords,useRecordCreate,useUpload} from "@/lib/datasource";
import {useImageSetting} from "@/lib/editable-settings";
import {ImagePlus,ArrowRight,Check,PawPrint,CheckCircle2,Camera,ChevronDown,BadgeCheck,Crown,Droplets,Bone,IceCreamCone,UtensilsCrossed,Fence,Flame,Fan,Tag} from "lucide-react";
const PI:any={water:Droplets,treats:Bone,cups:IceCreamCone,menu:UtensilsCrossed,fenced:Fence,heat:Flame,cool:Fan};
const ds=datasource.define({claims:"claims",places:"places"});
const fields=q.select({name:"Claimant Name",business:"Business",email:"Claimant Email",phone:"Claimant Phone",role:"Claimant Role",status:"Claim Status",details:"Claim Verification Details",photos:"Claim Photos",permission:"Claim Photo Permission",authorized:"Authorized to Manage",sid:"Submission ID",seat:"Outdoor Seating",access:"Dog Access",accessNote:"Dog Access Notes",pkWater:"Water Bowls",pkTreats:"Dog Treats",pkCups:"Pup Cups",pkMenu:"Dog Menu",pkHeat:"Outdoor Heaters",newsOpt:"Partner News Opt-In"});
const dupSel=q.select({sid:"Submission ID"});
const placeSel=q.select({name:"Business Name",address:"Street Address",city:"City",state:"State",zip:"ZIP Code",website:"Website",phone:"Phone Number",category:"Business Type",area:"Dog-Friendly Area",water:"Water Bowls Available",treats:"Dog Treats Available",menu:"Dog Menu Available",cups:"Pup Cups Available",cover:"Outdoor Area Coverage",heat:"Outdoor Area Heating",cool:"Outdoor Area Cooling",claimed:"Claimed by Business"});
const categories=["Restaurant/Bar","Coffee Shop","Brewery"];
const ROLES=["Owner","Manager","Employee","Marketing/Agency Rep","Other"];
const readable=(v:any):string=>Array.isArray(v)?v.map(readable).filter(Boolean).join(", "):v&&typeof v==="object"?String(v.name??v.label??v.value??""):String(v??"");
const yn=(v:string)=>/^yes$/i.test(v)?"Yes":/^no$/i.test(v)?"No":"Unknown";
type Perk={key:string;label:string;cur:(f:any)=>string};
const SEAT_OPTS=["Patio / Outdoor Area","No Dog-Friendly Outdoor Area"];
const ACCESS_OPTS=["Dogs Allowed Inside","Dogs Outside Only"];
const PERKS:Perk[]=[
 {key:"water",label:"Water bowls",cur:f=>yn(readable(f.water))},
 {key:"treats",label:"Dog treats",cur:f=>yn(readable(f.treats))},
 {key:"cups",label:"Pup cups",cur:f=>yn(readable(f.cups))},
 {key:"menu",label:"Dog menu",cur:f=>yn(readable(f.menu))},
 {key:"fenced",label:"Fenced outdoor area",cur:_=>"Unknown"},
 {key:"heat",label:"Outdoor heaters",cur:f=>{const h=readable(f.heat);return /seasonal/i.test(h)?"Seasonal":yn(h);}},
 {key:"cool",label:"Fans / cooling for summer",cur:f=>yn(readable(f.cool))}
];
const mapCat=(v:string)=>{const c=v.toLowerCase();return c.includes("coffee")?"Coffee Shop":c.includes("brewery")?"Brewery":c.includes("restaurant")||c.includes("bar")?"Restaurant/Bar":"";};
const CSS2=`
.cp{font-family:Figtree,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#00163D;width:100%;overflow-x:hidden}
.cp *{box-sizing:border-box}
.cp h1,.cp h2,.cp h3{font-family:'Bricolage Grotesque',Figtree,sans-serif;font-weight:800;letter-spacing:-.02em;color:#00163D;margin:0}
.cp-hero{position:relative;overflow:hidden;background:#00163D;color:#fff;padding:26px 18px 54px}
.cp-hero-in{position:relative;z-index:1;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center}
.cp-eyebrow{display:inline-flex;align-items:center;gap:7px;color:#FF7A3D;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px}
.cp-hero h1{color:#fff;font-size:clamp(27px,6.2vw,48px);line-height:1.06;margin:0 0 10px}
.cp-hero p{margin:0;max-width:540px;font-size:15.5px;line-height:1.55;color:rgba(255,255,255,.9)}
.cp-hero-dog{display:block;width:82px;height:auto;filter:drop-shadow(0 10px 16px rgba(0,0,0,.35))}
.cp-hero-paw{position:absolute;color:#fff;opacity:.06;pointer-events:none}
.cp-wave{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:34px;display:block}
.cp-main{max-width:820px;margin:0 auto;padding:22px 14px 48px}
.cp-strip{display:flex;gap:12px;align-items:flex-start;background:#FFF1E8;border-radius:16px;padding:14px 16px;margin:0 0 16px}
.cp-strip b{display:block;font-family:'Bricolage Grotesque',Figtree,sans-serif;font-size:17px;line-height:1.25}
.cp-strip span{display:block;font-size:14px;line-height:1.5;color:#3A4A66;margin-top:3px}
.cp-strip .ic{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#FF5A0A;color:#fff;margin:0}
.ss-card{background:#fff;border:1px solid #E3E8EF;border-radius:22px;box-shadow:0 10px 28px rgba(0,22,61,.07);padding:20px 16px;display:grid;gap:18px}
.cp-step{display:grid;gap:14px}
.cp-step+.cp-step{border-top:1px solid #EDF0F4;padding-top:20px}
.cp-sh{display:flex;align-items:center;gap:10px;font-size:20px;line-height:1.2}
.cp-num{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#FF5A0A;color:#fff;font:800 16px Figtree,sans-serif}
.cp-sub{margin:-6px 0 0;font-size:14px;line-height:1.5;color:#52627B}
.ss-row{display:grid;gap:14px;grid-template-columns:1fr}
.ss-lab{display:block;font-size:14.5px;font-weight:800;margin-bottom:6px;color:#00163D}
.ss-opt{font-weight:600;color:#6A7890}
.ss-in{width:100%;min-width:0;padding:12px 14px;border:1.5px solid #CBD4E1;border-radius:12px;font:600 16px Figtree,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#00163D}
.ss-in::placeholder{color:#8A96A8;font-weight:500}
.ss-in:focus{outline:none;border-color:#FF5A0A;box-shadow:0 0 0 3px rgba(255,90,10,.2)}
.ss-in:focus-visible,.ss-btn:focus-visible,.ss-more:focus-visible,.ss-sug:focus-visible,.cp-tdbtn:focus-visible,.ss-seg label:focus-within,.cp-photo:focus-within{outline:3px solid #00163D;outline-offset:2px}
.ss-help{font-size:13px;line-height:1.5;color:#52627B;margin:6px 0 0}
.ss-more{display:flex;align-items:center;justify-content:space-between;width:100%;gap:10px;background:#fff;border:1.5px solid #E3E8EF;border-radius:12px;padding:12px 14px;font:800 15px Figtree,sans-serif;color:#00163D;cursor:pointer;text-align:left}
.ss-more svg{transition:transform .2s;flex:none;color:#FF5A0A}
.ss-more[aria-expanded=true]{border-radius:12px 12px 0 0}
.ss-more[aria-expanded=true] svg{transform:rotate(180deg)}
.ss-panel{display:grid;gap:14px;padding:14px;border:1.5px solid #E3E8EF;border-top:0;border-radius:0 0 12px 12px;background:#fff}
.ss-sugs{border:1.5px solid #CBD4E1;border-radius:12px;overflow:hidden;margin-top:8px;background:#fff}
.ss-sug{display:block;width:100%;text-align:left;background:#fff;border:0;border-bottom:1px solid #EDF0F4;padding:11px 14px;cursor:pointer;font-family:inherit;color:#00163D}
.ss-sug:last-child{border-bottom:0}
.ss-sug:hover{background:#FFF1E8}
.ss-sug b{display:block;font-size:15.5px}
.ss-sug span{display:block;font-size:13.5px;color:#52627B;margin-top:2px}
.ss-tag{display:inline-block;background:#EEF1F5;color:#2B3B55;border-radius:99px;font-size:11px;font-weight:800;padding:2px 8px;margin-left:6px;text-transform:uppercase;letter-spacing:.04em}
.ss-sel{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;background:#FFF1E8;border:1.5px solid #FF5A0A;border-radius:14px;padding:12px 14px}
.ss-sel b{display:block;font-size:17px}
.ss-sel span{display:block;font-size:14px;color:#2B3B55;margin-top:2px}
.ss-lnk{background:none;border:0;color:#00163D;text-decoration:underline;font:800 14px Figtree,sans-serif;cursor:pointer;padding:4px;flex:none}
.cp-chk{display:flex;gap:9px;align-items:center;font-size:14.5px;font-weight:700;cursor:pointer}
.cp-chk input{width:18px;height:18px;accent-color:#FF5A0A;flex:none;margin:0}
.cp-nb{display:grid;gap:14px;padding:14px;background:#FFF1E8;border-radius:14px}
.cp-perks{display:grid;gap:8px;grid-template-columns:1fr}
.ss-perk{display:grid;gap:7px;border:1px solid #E3E8EF;background:#FAFBFC;border-radius:12px;padding:10px 12px}
.ss-perk-top{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}
.ss-perk strong{font-size:14.5px;line-height:1.25}
.ss-perk small{color:#6A7890;font-size:11.5px;font-weight:600}
.ss-seg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.ss-seg label{position:relative;display:flex;align-items:center;justify-content:center;border:1.5px solid #CBD4E1;border-radius:99px;padding:7px 6px;min-height:38px;font-size:13.5px;font-weight:800;cursor:pointer;background:#fff;color:#2B3B55;transition:background .12s,border-color .12s,color .12s}
.ss-seg label:hover{border-color:#FFB48A}
.ss-seg label.on{background:#FF5A0A;border-color:#FF5A0A;color:#fff}
.ss-seg label.on.no{background:#00163D;border-color:#00163D}
.ss-seg label.on.ns{background:#fff;border-color:#FF5A0A;color:#B83B00}
.ss-seg input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
.cp-photo{display:inline-flex;gap:8px;align-items:center;color:#00163D;border:1.5px dashed #CBD4E1;border-radius:12px;padding:11px 14px;font-weight:700;cursor:pointer;font-size:14.5px;background:#fff}
.cp-photo:hover{border-color:#FF5A0A}
.ss-auth{display:flex;gap:10px;align-items:flex-start;background:#FFF1E8;border:1.5px solid #FFD6BF;border-radius:12px;padding:12px 14px;font-size:14.5px;font-weight:700;line-height:1.4;cursor:pointer}
.ss-auth small{display:block;font-weight:600;color:#52627B;font-size:12.5px;margin-top:2px}
.ss-auth input{width:19px;height:19px;accent-color:#FF5A0A;flex:none;margin-top:1px}
.ss-btn{display:flex;width:100%;align-items:center;justify-content:center;gap:8px;border:0;border-radius:99px;background:#FF5A0A;color:#fff;font:800 18px Figtree,sans-serif;padding:16px 22px;cursor:pointer;text-decoration:none;transition:background .15s,transform .15s;box-shadow:0 8px 18px rgba(255,90,10,.28)}
.ss-btn:hover{background:#E64E05;transform:translateY(-1px)}
.ss-btn:disabled{opacity:.7;cursor:wait;transform:none}
.ss-err{color:#B42318;background:#FEF3F2;border:1px solid #FECDCA;border-radius:10px;padding:10px 12px;font-size:14px;font-weight:700;margin:0}
.ss-fine{font-size:12.5px;color:#52627B;text-align:center;line-height:1.5;margin:-6px 0 0}
.cp-td{margin:22px 0 0;background:#FFF1E8;border-radius:20px;padding:20px 18px;display:grid;gap:12px;justify-items:center;text-align:center}
.cp-crown{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#FF5A0A;color:#fff}
.cp-td h3{font-size:21px;line-height:1.2}
.cp-td p{margin:0;font-size:14.5px;line-height:1.55;color:#3A4A66;max-width:520px}
.cp-tdbtn{display:inline-flex;align-items:center;gap:8px;background:#00163D;color:#fff!important;font:800 15px Figtree,'Helvetica Neue',Arial,sans-serif;padding:12px 20px;border-radius:999px;text-decoration:none!important;transition:background .15s;white-space:nowrap}
.cp-tdbtn:hover{background:#1E3F8A}
@media(min-width:700px){
 .cp-hero{padding:34px 28px 66px}
 .cp-hero-in{gap:28px}
 .cp-hero p{font-size:17.5px}
 .cp-hero-dog{width:150px}
 .cp-wave{height:46px}
 .cp-main{padding:30px 20px 64px}
 .ss-card{padding:30px 30px}
 .ss-row.two{grid-template-columns:1fr 1fr}
 .ss-row.cs{grid-template-columns:2fr 1fr}
 .cp-perks{grid-template-columns:1fr 1fr;gap:10px}
 .cp-td{grid-template-columns:auto 1fr auto;text-align:left;justify-items:start;align-items:center;gap:18px;padding:22px 24px}
}
@media(prefers-reduced-motion:reduce){.ss-btn,.ss-more svg,.ss-seg label,.cp-tdbtn{transition:none}.ss-btn:hover{transform:none}}
.cp-hero{padding:24px 18px 50px}
.cp-hero-in{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"h h" "p d";gap:0 12px;align-items:end}
.cp-hero h1{grid-area:h;font-size:clamp(28px,7.4vw,48px);margin:0 0 12px;text-wrap:balance}
.cp-hero p{grid-area:p;align-self:center;font-size:15px}
.cp-hero-dog{grid-area:d;width:92px;margin-bottom:-6px}
.cp-main{padding:18px 14px 44px}
.cp-bens{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:#fff;border:1px solid #E3E8EF;border-radius:14px;box-shadow:0 6px 18px -12px rgba(0,22,61,.25);margin:0 0 14px}
.cp-bens>div{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;gap:6px;padding:12px 6px;min-width:0}
.cp-bens>div+div{border-left:1px solid #EDF0F4}
.cp-bens .bi{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#FFF1E8;color:#FF5A0A}
.cp-bens b{font-size:13.5px;line-height:1.2;font-weight:800;color:#00163D}
.cp-bens small{font-size:11.5px;line-height:1.2;font-weight:600;color:#6A7890;margin-top:-3px}
.cp form.ss-card{background:transparent;border:0;box-shadow:none;padding:0;gap:14px}
.cp-step{background:#fff;border:1px solid #E3E8EF;border-radius:16px;padding:18px 14px;gap:12px;box-shadow:0 6px 18px -14px rgba(0,22,61,.25)}
.cp-step+.cp-step{border-top:1px solid #E3E8EF;padding-top:18px}
.cp-sh{font-size:19px;gap:10px}
.cp-num{width:28px;height:28px;font-size:14.5px}
.cp-sub{margin:-4px 0 0;font-size:14px}
.ss-row{gap:12px}
.ss-lab{font-size:14px;margin-bottom:5px}
.ss-in{padding:11px 13px;min-height:46px}
.ss-sel{background:#fff}
.cp-nb{background:#fff;border:1px solid #E3E8EF;gap:12px}
.cp-perks,.cp-perks{display:block;border-top:1px solid #EDF0F4}
.ss-perk{display:flex;align-items:center;gap:10px;border:0;border-bottom:1px solid #EDF0F4;border-radius:0;background:transparent;padding:10px 0}
.pk-ic{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#FFF1E8;color:#FF5A0A}
.pk-t{flex:1 1 0;min-width:0}
.pk-t strong{display:block;font-size:14.5px;line-height:1.25;font-weight:800}
.pk-t small{display:block;color:#6A7890;font-size:11.5px;font-weight:600;margin-top:2px}
.ss-seg{display:inline-flex;flex:none;gap:0;border:1.5px solid #CBD4E1;border-radius:10px;overflow:hidden;background:#fff}
.ss-seg label{border:0;border-left:1px solid #E3E8EF;border-radius:0;min-height:36px;padding:0 10px;font-size:13px;color:#2B3B55;background:#fff}
.ss-seg label:first-child{border-left:0}
.ss-seg label:hover{background:#FFF6F0}
.ss-seg label.on{background:#FF5A0A;color:#fff}
.ss-seg label.on.no{background:#00163D;color:#fff}
.ss-seg label.on.ns{background:#FFF1E8;color:#B83B00}
.cp-ph{display:grid;gap:10px;border-top:1px solid #EDF0F4;padding-top:14px}
.cp-ph-h{display:flex;gap:12px;align-items:flex-start}
.cp-ph-ic{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#00163D;color:#fff;box-shadow:inset 0 -3px 0 #FF5A0A}
.cp-ph h3{font-size:17px;line-height:1.25}
.cp-ph p{margin:3px 0 0;font-size:14px;line-height:1.5;color:#52627B}
.cp-ph .ss-help{margin:0}
.cp-photo{justify-content:center;width:100%;min-height:48px}
.ss-auth{background:#fff;border:1px solid #E3E8EF;border-left:4px solid #FF5A0A}
.ss-btn{font-size:16.5px;padding:13px 20px;box-shadow:0 6px 14px rgba(255,90,10,.25)}
.ss-fine{margin:-4px 0 0;font-size:13px;color:#3A4A66;font-weight:600}
.ss-fine span{display:block;font-size:12px;font-weight:500;color:#6A7890;margin-top:3px}
.cp-td{background:#00163D;border-radius:16px;padding:18px 16px;gap:10px;margin-top:18px;box-shadow:0 10px 24px -14px rgba(0,22,61,.5)}
.cp-td h3{color:#fff;font-size:19px}
.cp-td p{color:rgba(255,255,255,.85);font-size:14.5px}
.cp-crown{width:38px;height:38px}
.cp-tdbtn{background:#FF5A0A;font-size:14.5px;padding:10px 18px}
.cp-tdbtn:hover{background:#E64E05}
.cp-td .cp-tdbtn:focus-visible{outline-color:#fff}
@media(max-width:380px){.cp-step{padding:16px 12px}.ss-seg label{padding:0 8px;font-size:12.5px}.pk-t strong{font-size:14px}.cp-bens b{font-size:12.5px}}
@media(min-width:700px){
 .cp-hero{padding:34px 28px 62px}
 .cp-hero-in{grid-template-areas:"h d" "p d";gap:0 32px;align-items:center}
 .cp-hero h1{align-self:end}
 .cp-hero p{align-self:start;font-size:17.5px}
 .cp-hero-dog{width:150px;margin-bottom:0}
 .cp-main{padding:28px 20px 60px}
 .cp-bens>div{flex-direction:row;justify-content:center;gap:10px;padding:14px 10px;flex-wrap:wrap}
 .cp-bens small{flex-basis:100%;margin-top:-6px}
 .cp-bens b{font-size:15px}
 .cp form.ss-card{gap:16px}
 .cp-step{padding:24px 26px}
 .cp-sh{font-size:21px}
 .cp-perks{display:block}
 .ss-seg label{padding:0 14px;font-size:13.5px}
 .ss-btn{max-width:420px;margin:0 auto}
 .cp-td{padding:20px 26px;gap:22px;grid-template-columns:1fr auto}
}
.cp{background:#EDF4FC}
.cp-step{background:#fff;border:1px solid #DCE6F2;border-left:4px solid #FF5A0A;border-radius:16px;box-shadow:0 8px 22px -14px rgba(0,22,61,.28)}
.cp-step+.cp-step{border-top:1px solid #DCE6F2}
.cp-bens{background:transparent;border:0;box-shadow:none;gap:10px;margin:0 0 18px}
.cp-bens>div{background:#fff;border:1px solid #D6E4F5;border-radius:14px;box-shadow:0 6px 16px -12px rgba(0,22,61,.3);padding:14px 8px}
.cp-bens>div+div{border-left:1px solid #D6E4F5}
.cp-bens .bi{width:40px;height:40px;background:#EDF4FC;color:#FF5A0A;box-shadow:inset 0 0 0 1.5px #D6E4F5}
@media(min-width:700px){.cp-bens{gap:14px;margin:0 0 22px}.cp-bens>div{padding:18px 12px}}
.cp-fo{margin:26px 0 0;display:grid;gap:8px}
.cp-fo-opt{margin:0;text-align:center;font-size:13px;line-height:1.45;font-weight:600;color:#3A4A66}
.cp-fo-card{position:relative;overflow:hidden;isolation:isolate;background:#00163D;border:1.5px solid #FF5A0A;border-radius:18px;box-shadow:0 16px 34px -18px rgba(0,22,61,.6),0 2px 6px rgba(0,22,61,.12);padding:20px 18px;display:grid;gap:16px;color:#fff}
.cp-fo-paw{position:absolute;color:#fff;opacity:.06;pointer-events:none;z-index:-1}
.cp-fo-paw.p1{width:96px;height:96px;right:-16px;top:-14px;transform:rotate(18deg)}
.cp-fo-paw.p2{width:52px;height:52px;left:46%;bottom:-16px;transform:rotate(-24deg)}
.cp-fo-eye{display:flex;align-items:center;gap:7px;margin:0 0 8px;color:#FF5A0A;font-size:11.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.cp .cp-fo h3{color:#fff;font-size:20px;line-height:1.2;margin:0}
.cp-fo-sub{margin:6px 0 0;font-size:14.5px;line-height:1.5;color:rgba(255,255,255,.84)}
.cp-fo-bens{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}
.cp-fo-bens li{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;line-height:1.3;font-weight:700;color:#fff}
.cp-fo-ck{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#FF5A0A;color:#fff;margin-top:-1px}
.cp-fo-r{display:grid;gap:10px;justify-items:center;text-align:center;padding-top:16px;border-top:1px solid rgba(255,255,255,.14)}
.cp-fo-price{display:grid;gap:2px;justify-items:center}
.cp-fo-price s{font-size:14px;font-weight:700;color:rgba(255,255,255,.62);text-decoration-color:#FF5A0A;text-decoration-thickness:2px}
.cp-fo-now b{font-family:'Bricolage Grotesque',Figtree,sans-serif;font-size:46px;line-height:1;font-weight:800;color:#FF5A0A;letter-spacing:-.03em}
.cp-fo-now span{font-size:15px;font-weight:700;color:rgba(255,255,255,.86);margin-left:3px}
.cp-fo-lock{margin:0;font-size:13px;line-height:1.45;color:rgba(255,255,255,.84);max-width:300px}
.cp-fo-lock b{color:#fff;font-weight:800}
.cp-fo-btn{display:flex;width:100%;max-width:320px;align-items:center;justify-content:center;gap:8px;background:#FF5A0A;color:#00163D!important;font:800 16px Figtree,'Helvetica Neue',Arial,sans-serif;padding:13px 20px;border-radius:999px;text-decoration:none!important;box-shadow:0 10px 20px -8px rgba(255,90,10,.6);transition:transform .15s,box-shadow .15s}
.cp-fo-btn:hover{transform:translateY(-1px);box-shadow:0 14px 24px -8px rgba(255,90,10,.7)}
.cp-fo-btn:focus-visible{outline:3px solid #fff;outline-offset:3px}
.cp-fo-fine{margin:0;font-size:12px;font-weight:600;color:rgba(255,255,255,.72)}
.cp-fo-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media(max-width:360px){.cp-fo-bens{grid-template-columns:1fr}}
@media(min-width:700px){.cp-fo{margin-top:30px}.cp-fo-card{grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:26px;padding:24px 26px;align-items:center}.cp-fo-r{padding:0 0 0 24px;border-top:0;border-left:1px solid rgba(255,255,255,.14)}.cp .cp-fo h3{font-size:22px}}
@media(prefers-reduced-motion:reduce){.cp-fo-btn{transition:none}.cp-fo-btn:hover{transform:none}}
.cp .cp-free{font-weight:800;color:#fff}
.cp .cp-hero-dog{width:106px;margin-bottom:0;align-self:center}
.cp .cp-hero-paw{color:#FF5A0A;opacity:.16;z-index:0}
.cp .cp-hp1{width:28px;height:28px;top:10px;right:10px;transform:rotate(22deg)}
.cp .cp-hp2{width:26px;height:26px;left:4%;bottom:12px;transform:rotate(-24deg)}
.cp .cp-bens{align-items:stretch}
.cp .cp-bens .bi{width:44px;height:44px;background:#FF5A0A;color:#fff;box-shadow:0 6px 14px -6px rgba(255,90,10,.6)}
.cp .cp-up{position:relative;display:flex;align-items:center;justify-content:center;gap:12px;width:100%;min-height:64px;padding:12px 16px;background:rgba(255,90,10,.07);border:2px dashed #FF5A0A;border-radius:14px;cursor:pointer;text-align:left;-webkit-tap-highlight-color:transparent;transition:background-color .15s,box-shadow .15s,transform .1s}
.cp .cp-up:hover{background:rgba(255,90,10,.12);border-color:#FF5A0A;box-shadow:0 6px 16px -10px rgba(255,90,10,.55)}
.cp .cp-up:active{background:rgba(255,90,10,.16);transform:scale(.99)}
.cp-up-ic{flex:none;display:grid;place-items:center;color:#FF5A0A}
.cp-up-t{display:grid;gap:2px;min-width:0}
.cp-up-t b{font-size:15px;line-height:1.25;font-weight:800;color:#00163D}
.cp-up-t small{font-size:12.5px;line-height:1.35;font-weight:600;color:#52627B}
.cp .cp-up-fine{font-size:12px;margin-top:-6px}
@media(prefers-reduced-motion:reduce){.cp .cp-up{transition:none}.cp .cp-up:active{transform:none}}
@media(min-width:700px){.cp .cp-hero-dog{width:172px}.cp .cp-hp1{width:44px;height:44px;top:16px;right:4%}.cp .cp-hp2{width:38px;height:38px;left:3%;bottom:14px}.cp .cp-bens .bi{width:48px;height:48px}}
.cp .cp-main{max-width:920px}
.cp .cp-hero-in{grid-template-areas:"h h" "p d" "a a"}
.cp .cp-hero p{font-size:16px;line-height:1.55;color:rgba(255,255,255,.95);font-weight:500;max-width:560px}
.cp .cp-assure{grid-area:a;justify-self:start;display:inline-flex;align-items:center;gap:7px;margin:12px 0 0;padding:7px 13px;border-radius:999px;background:#FF5A0A;border:1px solid #FF5A0A;color:#fff;font-size:13.5px;line-height:1.3;font-weight:800;max-width:100%}
.cp .cp-assure svg{flex:none;color:#fff}
.cp .cp-bens{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;background:transparent;border:0;box-shadow:none;border-radius:0;margin:0 0 16px}
.cp .cp-bens>div{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:7px;min-width:0;background:#00163D;border:0;border-radius:14px;padding:12px 4px;box-shadow:0 8px 18px -12px rgba(0,22,61,.6)}
.cp .cp-bens>div+div{border-left:0}
.cp .cp-bens .bi{width:38px;height:38px;border-radius:50%;background:#FF5A0A;color:#fff;box-shadow:none}
.cp .cp-bens b{color:#fff;font-size:clamp(12.5px,3.7vw,15px);line-height:1.2;font-weight:800;text-wrap:balance}
.cp .cp-bens small{display:none;color:rgba(255,255,255,.75);font-size:12.5px;font-weight:600;margin:0}
.cp .cp-bens .bl-l{display:none}
.cp .cp-step{gap:16px}
.cp .cp-sh{font-size:20px;line-height:1.2}
.cp .ss-lab{font-size:15px;line-height:1.3;color:#00163D;margin-bottom:6px}
.cp .ss-in{min-height:48px;font-size:16px;padding:12px 14px}
.cp textarea.ss-in{min-height:96px}
.cp .cp-sub,.cp .ss-help{color:#46556A}
.cp .ss-help{font-size:13.5px}
.cp .cp-chk{min-height:44px;font-size:15px}
.cp .ss-lnk{min-height:44px;padding:4px 8px}
.cp .ss-more{min-height:48px}
.cp .ss-sug{min-height:52px}
.cp .ss-seg label{min-height:44px}
.cp .pk-t strong{font-size:15px}
.cp .ss-auth{font-size:15px;padding:14px}
.cp .ss-btn{width:100%;max-width:none;margin:0;min-height:56px;font-size:17.5px}
.cp .ss-fine{font-size:13.5px}
.cp-decal{display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:"i" "h" "p";gap:6px;align-items:center;text-align:center;background:#FFF4EC;border:1px solid #FFD6BF;border-radius:14px;padding:14px 16px 16px}
.cp-decal img{grid-area:i;display:block;width:200px;max-width:72%;height:auto;justify-self:center;margin-bottom:2px}
.cp .cp-decal h4{grid-area:h}
.cp .cp-decal p{grid-area:p}
.cp .cp-bens>div{flex-wrap:nowrap}
.cp .cp-bens small{flex-basis:auto}
.cp .cp-decal h4{margin:0;font-family:'Bricolage Grotesque',Figtree,sans-serif;font-size:16px;line-height:1.25;font-weight:800;color:#00163D;letter-spacing:-.01em}
.cp .cp-decal p{margin:0;font-size:13.5px;line-height:1.45;color:#3A4A66}
@media(max-width:360px){.cp .cp-assure{font-size:12.5px;padding:6px 11px;gap:6px}.cp .cp-fo-btn{font-size:15px;padding:12px 14px}.cp-up-t b{font-size:14px}.cp .cp-decal h4{font-size:15px}.cp-decal img{width:180px}}
.cp .cp-fo{margin:28px 0 0;gap:10px}
.cp .cp-fo-opt{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 8px;font-size:13.5px;color:#3A4A66}
.cp .cp-fo-opt em{font-style:normal;display:inline-block;background:#fff;border:1px solid #D6E4F5;color:#00163D;font-size:11.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:999px}
.cp .cp-fo-card{grid-template-columns:minmax(0,1fr);grid-template-areas:"b" "t" "p";gap:16px;padding:22px 18px;border:1.5px solid #FF5A0A;background:radial-gradient(120% 80% at 100% 0%,rgba(255,90,10,.22) 0%,rgba(255,90,10,0) 55%),linear-gradient(160deg,#0A2558 0%,#00163D 60%);box-shadow:0 22px 40px -22px rgba(0,22,61,.75),0 0 0 4px rgba(255,90,10,.08)}
.cp .cp-fo-b{grid-area:b;display:flex;justify-content:center}
.cp .cp-fo-badge{display:block;width:230px;max-width:78%;height:auto;filter:drop-shadow(0 10px 18px rgba(0,0,0,.35))}
.cp .cp-fo-t{grid-area:t;text-align:center}
.cp .cp-fo-eye{justify-content:center}
.cp .cp-fo-bens{grid-template-columns:1fr;gap:10px;text-align:left;max-width:340px;margin:14px auto 0}
.cp .cp-fo-bens li{font-size:14.5px;align-items:center}
.cp .cp-fo-r{grid-area:p;padding-top:16px;border-top:1px solid rgba(255,255,255,.16);border-left:0}
.cp .cp-fo-btn{max-width:none;width:100%;min-height:52px;font-size:16.5px}
@media(min-width:700px){
 .cp .cp-hero-in{grid-template-areas:"h d" "p d" "a d";grid-template-rows:1fr auto 1fr}
 .cp .cp-hero h1{align-self:end}
 .cp .cp-hero p{align-self:start}
 .cp .cp-assure{align-self:start;margin-top:14px}
 .cp .cp-hero p{font-size:18px}
 .cp .cp-assure{font-size:14.5px;padding:8px 15px}
 .cp .cp-bens{gap:14px;margin:0 0 22px}
 .cp .cp-bens>div{padding:18px 12px 16px;gap:8px}
 .cp .cp-bens .bi{width:48px;height:48px}
 .cp .cp-bens small{display:block}
 .cp .cp-bens .bl-s{display:none}
 .cp .cp-bens .bl-l{display:inline}
 .cp .cp-sh{font-size:23px}
 .cp .ss-lab{font-size:15.5px}
 .cp-decal{grid-template-columns:170px minmax(0,1fr);grid-template-areas:"i h" "i p";gap:4px 20px;padding:16px 20px;text-align:left}
 .cp .cp-decal h4{align-self:end}
 .cp .cp-decal p{align-self:start}
 .cp-decal img{width:170px;max-width:100%;justify-self:start;margin:0}
 .cp .cp-decal h4{font-size:17.5px}
 .cp .cp-decal p{font-size:14.5px}
 .cp .cp-fo-card{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);grid-template-areas:"t b" "t p";column-gap:30px;row-gap:12px;padding:28px 30px;align-items:center}
 .cp .cp-fo-t{text-align:left;align-self:center}
 .cp .cp-fo-eye{justify-content:flex-start}
 .cp .cp-fo-bens{grid-template-columns:1fr 1fr;max-width:none;margin:16px 0 0}
 .cp .cp-fo-b{align-self:end}
 .cp .cp-fo-badge{width:220px;max-width:100%}
 .cp .cp-fo-r{align-self:start;padding:0;border-top:0}
 .cp .cp-fo-btn{max-width:320px}
 .cp .cp-fo h3{font-size:24px}
}
@media(min-width:1000px){.cp .cp-hero-dog{width:180px}}
@media(hover:hover) and (min-width:700px){
 .cp .cp-bens>div{transition:transform .18s ease,box-shadow .18s ease}
 .cp .cp-bens>div:hover{transform:translateY(-3px);box-shadow:0 14px 26px -12px rgba(0,22,61,.65)}
}
@media(prefers-reduced-motion:reduce){.cp .cp-bens>div{transition:none}.cp .cp-bens>div:hover{transform:none}}
`;
const FO_BENS=["Priority Search Placement","Exclusive Top Dog Badge","Showcase Your Specials","Top Dog Window Decal"];
const VERIFIED_BADGE="https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b76/sniffscout-verified-dog-friendly-badge.png";
const TOPDOG_BADGE="https://files.leadconnectorhq.com/file/6b071c26522e78e8db172b70/sniffscout-top-dog-partner-badge.png";
function normUrl(v:string):{ok:boolean;url?:string}{const t=v.trim();if(!t)return {ok:true};if(/\s/.test(t))return {ok:false};const full=/^https?:\/\//i.test(t)?t:/^[a-z][a-z0-9+.-]*:/i.test(t)?"":"https://"+t;if(!full)return {ok:false};try{const u=new URL(full);if(!/^https?:$/.test(u.protocol)||!u.hostname.includes(".")||u.hostname.endsWith("."))return {ok:false};return {ok:true,url:u.toString()};}catch(e){return {ok:false};}}
const digits=(v:string)=>v.replace(/\D/g,"").replace(/^1(?=\d{10}$)/,"");
const addrLine=(a:any)=>[a.address,[a.city,a.state].filter(Boolean).join(", "),a.zip].filter(Boolean).join(a.address?", ":" ").replace(/, (\d{5})$/," $1");
ssTypoInit();

export default function Block(){
 const heroDog=useImageSetting({name:"hero-dog",label:"Hero dog graphic",initialValue:{src:"https://cdn.jsdelivr.net/gh/rootedbloom/sniffscout-sitemap@main/dog-german-shepherd.webp",alt:"German shepherd in an orange SniffScout bandana holding a Dogs Welcome sign"}});
 const [search,setSearch]=useState(""),[debounced,setDebounced]=useState(""),[picked,setPicked]=useState<any>(null),[missing,setMissing]=useState(false);
 const [nb,setNb]=useState({name:"",category:"",address:"",city:"",state:"",zip:"",phone:"",website:""});
 const [fix,setFix]=useState({name:"",category:"",address:"",city:"",state:"",zip:"",phone:"",website:""}),[showFix,setShowFix]=useState(false);
 const [cName,setCName]=useState(""),[cEmail,setCEmail]=useState(""),[cPhone,setCPhone]=useState(""),[role,setRole]=useState("");
 const [answers,setAnswers]=useState<Record<string,string>>({}),[notes,setNotes]=useState(""),[seat,setSeat]=useState(""),[access,setAccess]=useState(""),[accessNote,setAccessNote]=useState(""),[files,setFiles]=useState<File[]>([]),[permission,setPermission]=useState(false),[authorized,setAuthorized]=useState(false),[newsOpt,setNewsOpt]=useState(false);
 const [busy,setBusy]=useState(false),[sent,setSent]=useState(false),[err,setErr]=useState("");
 const [subId]=useState(()=>{try{return (crypto as any).randomUUID();}catch(e){return "c-"+Date.now()+"-"+Math.random().toString(36).slice(2);}});
 const attempted=useRef(false);
 useEffect(()=>{const add=(id:string,href:string)=>{if(document.getElementById(id))return;const l=document.createElement("link");l.id=id;l.rel="stylesheet";l.href=href;document.head.appendChild(l);};add("ss-fonts-bg","https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Figtree:wght@500;600;700;800&display=swap");},[]);
 useEffect(()=>{const t=setTimeout(()=>setDebounced(search.trim()),250);return ()=>clearTimeout(t);},[search]);
 // Every place is already on the page, so the name search and the ?recordId= lookup happen here.
 const allPlaces=useRecords({from:ds.places,select:placeSel});
 const allRows:any[]=(allPlaces.data as any)?.pages?.flatMap((p:any)=>p.items??[])??[];
 const results={status:allPlaces.status,data:{pages:[{items:debounced.length>=2&&!picked&&!missing?allRows.filter((r:any)=>readable(r.fields?.name).toLowerCase().includes(debounced.toLowerCase())).slice(0,8):[]}]}};
 const rdata:any=results.data;
 const rows:any[]=rdata?.pages?rdata.pages.flatMap((p:any)=>p.items??p.records??[]):Array.isArray(rdata)?rdata:rdata?.items??[];
 const create=useRecordCreate({from:ds.claims,fields});
 const started=useRef(false);
 const {uploadAsync}=useUpload();
 const flat=(r:any)=>{const f=r.fields??r;return {id:r.id,name:String(f.name||""),address:String(f.address||""),city:String(f.city||""),state:String(f.state||""),zip:String(f.zip||""),website:String(f.website||""),phone:String(f.phone||""),category:mapCat(readable(f.category)),claimed:!!f.claimed,raw:f};};
 function choose(r:any){const p=flat(r);setPicked(p);setSearch("");setDebounced("");setFix({name:p.name,category:p.category,address:p.address,city:p.city,state:p.state,zip:p.zip,phone:p.phone,website:p.website});setAnswers({});setShowFix(false);}
 function unpick(){setPicked(null);setAnswers({});setShowFix(false);}
 const [preId]=useState(()=>{try{const v=new URLSearchParams(window.location.search).get("recordId")||"";return /^rec[A-Za-z0-9]{14}$/.test(v)?v:"";}catch(e){return "";}});
 const pre={data:preId?allRows.find((r:any)=>r.id===preId):undefined};
 const preDone=useRef(false);
 useEffect(()=>{const d:any=pre.data;if(preDone.current||!preId||!d||!d.id)return;preDone.current=true;choose(d);},[pre.data]);
 const curOf=(p:Perk)=>picked?p.cur(picked.raw):"Unknown";
 async function submit(e:React.FormEvent){
  e.preventDefault();setErr("");
  if(busy)return;
  if(!create.enabled){setErr("Submission is not enabled. Please contact SniffScout.");return;}
  if(!missing&&!picked){setErr("Please search for and select your business, or check “My business isn't listed.”");return;}
  if(missing&&(!nb.name.trim()||!nb.category||!nb.address.trim()||!nb.city.trim()||!nb.state.trim())){setErr("Please add the business name, category, street address, city and state so we can find your location.");return;}
  if(!role){setErr("Please choose your role.");return;}
  const cp=digits(cPhone);if(cPhone.trim()&&cp.length!==10){setErr("Please enter a 10-digit contact phone number, or leave it blank.");return;}
  const src=missing?nb:fix;const site=normUrl(src.website);if(!site.ok){setErr("That doesn't look like a valid website. Try something like www.example.com.");return;}
  if(files.length&&!permission){setErr("Please give permission to use your uploaded photos.");return;}
  if(!authorized){setErr("Please confirm you're authorized to manage this business's listing.");return;}
  setBusy(true);
  try{
   attempted.current=true;
   let photos:any=undefined;
   if(files.length){const up=await uploadAsync(files);const ok=up.filter(x=>x.status==="completed");if(ok.length!==files.length)throw new Error("Some photos could not upload. Your answers are still here, so please try again.");photos=ok.map(x=>({filename:x.file.name,url:x.url}));}
   const L:string[]=[];
   if(missing){L.push("CLAIM TYPE: NEW BUSINESS / LOCATION NOT LISTED (needs review before adding)");L.push("Business: "+nb.name.trim()+" | Category: "+nb.category+" | Address: "+[nb.address.trim(),nb.city.trim(),nb.state.trim(),nb.zip.trim()].filter(Boolean).join(", ")+" | Phone: "+(nb.phone.trim()||"—")+" | Website: "+(site.url||"—"));}
   else{L.push("CLAIM TYPE: EXISTING LISTING");L.push("Listing: "+picked.name+" — "+addrLine(picked)+" (record "+picked.id+")");
    const ch:string[]=[];const cmp=(lab:string,a:string,b:string)=>{if(a.trim()!==b.trim())ch.push(lab+": "+(a.trim()||"(blank)")+" → "+(b.trim()||"(blank)"));};
    cmp("Business name",picked.name,fix.name);cmp("Street address",picked.address,fix.address);cmp("City",picked.city,fix.city);cmp("State",picked.state,fix.state);cmp("ZIP",picked.zip,fix.zip);
    if(digits(picked.phone)!==digits(fix.phone))ch.push("Phone: "+(picked.phone||"(blank)")+" → "+(fix.phone.trim()||"(blank)"));
    if(normUrl(picked.website).url!==site.url&&picked.website.trim()!==fix.website.trim())ch.push("Website: "+(picked.website||"(blank)")+" → "+(site.url||"(blank)"));
    if(picked.category!==fix.category)ch.push("Category: "+(picked.category||"(blank)")+" → "+(fix.category||"(blank)"));
    L.push("PROPOSED CORRECTIONS (pending review): "+(ch.length?"\n- "+ch.join("\n- "):"None"));}
   const pk:string[]=[];PERKS.forEach(p=>{const a=answers[p.key];if(!a)return;const c=curOf(p);const lab=a==="Unknown"?"Not sure":a;if(missing)pk.push(p.label+": "+lab);else if(c!==a)pk.push(p.label+": "+c+" → "+lab);});
   L.push("PERK UPDATES REQUESTED (pending review; unchanged perks keep their current values): "+(pk.length?"\n- "+pk.join("\n- "):"None"));
   L.push("Authorized to manage: Yes (claimant confirmed)");L.push("Owner notes: "+(notes.trim()||"None"));
   const data:any={name:cName.trim(),email:cEmail.trim(),role,status:"Pending Review",details:L.join("\n"),permission:files.length?permission:false,authorized:true,sid:subId,newsOpt};
   if(seat)data.seat=seat;if(access)data.access=access;if(accessNote.trim())data.accessNote=accessNote.trim();{const PKF:any={water:"pkWater",treats:"pkTreats",cups:"pkCups",menu:"pkMenu",heat:"pkHeat"};Object.keys(PKF).forEach(k=>{const a=answers[k];if(a==="Yes"||a==="No")data[PKF[k]]=a;});}if(cp)data.phone="+1"+cp;if(!missing)data.business=[picked.id];if(photos)data.photos=photos;
   started.current=true;await create.mutateAsync(data);
   setSent(true);
   try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){}
  }catch(x:any){setErr(x&&x.message&&!/failed to fetch|network|load failed/i.test(x.message)?x.message:started.current?"We couldn't confirm that your claim was sent. Your answers are still here. Try again, and if you see the confirmation you're all set. We'll remove any duplicate.":"We couldn't send that just now. Your answers are still here, so please try again.");}
  setBusy(false);
 }
 const upd=(setter:any,k:string)=>(e:any)=>setter((o:any)=>({...o,[k]:e.target.value}));
 return <><div className="cp"><style>{CSS2}</style>
 <section className="cp-hero"><PawPrint className="cp-hero-paw cp-hp1" aria-hidden="true"/><PawPrint className="cp-hero-paw cp-hp2" aria-hidden="true"/>
  <div className="cp-hero-in">
   <h1>Claim Your Spot <span style={{color:"#FF5A0A"}}>in the Pack!</span></h1><p>Let dog lovers know they're welcome! Claim your <b className="cp-free">FREE</b> listing, showcase your pup perks and help more customers discover your business.</p><div className="cp-assure"><BadgeCheck size={17} strokeWidth={2.6} aria-hidden="true"/><span>Free to claim. Free to get verified. Always.</span></div>
   {heroDog.src&&<img className="cp-hero-dog" src={heroDog.src} alt={heroDog.alt||""} width={560} height={829}/>}
  </div>
  <svg className="cp-wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 C360 0 1080 0 1440 46 Z" fill="#EDF4FC"/><path d="M0 40 C360 -4 1080 -4 1440 40" stroke="#FF5A0A" strokeWidth="4" fill="none"/></svg>
 </section>
 <div className="cp-main">
 {sent?<section className="ss-card" style={{textAlign:"center",justifyItems:"center",padding:"34px 22px"}}><CheckCircle2 color="#15946B" size={56}/><h2 style={{fontSize:"clamp(24px,5vw,32px)"}}>Your claim is in! 🐾</h2><p style={{fontSize:16.5,lineHeight:1.5,margin:0,maxWidth:480,color:"#2B3B55"}}>We'll review your details and email you about the next step.</p><a href="/" className="ss-btn" style={{width:"auto"}}>Back to SniffScout</a></section>:<>
 <div className="cp-bens"><div><span className="bi" aria-hidden="true"><Tag size={21} strokeWidth={2.4}/></span><b>100% Free</b><small>Always</small></div><div><span className="bi" aria-hidden="true"><Bone size={21} strokeWidth={2.4}/></span><b><span className="bl-s">Pup Perks</span><span className="bl-l">Showcase Pup Perks</span></b><small>Show what you offer</small></div><div><span className="bi" aria-hidden="true"><BadgeCheck size={21} strokeWidth={2.4}/></span><b>Get Verified</b><small>Once approved</small></div></div>
 <form className="ss-card" onSubmit={submit}>
 <div className="cp-step">
  <h2 className="cp-sh"><span className="cp-num">1</span>Find Your Business</h2>
  {!missing&&!picked&&<div><label className="ss-lab" htmlFor="cl-search">Business name *</label><input id="cl-search" className="ss-in" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Start typing your business name…" autoComplete="off" role="combobox" aria-expanded={rows.length>0} aria-controls="cl-list"/>
   {debounced.length>=2&&<div className="ss-sugs" id="cl-list" role="listbox">{results.status==="pending"&&<p className="ss-help" style={{padding:"12px 14px",margin:0}}>Searching…</p>}{rows.map((r:any)=>{const p=flat(r);return <button type="button" role="option" aria-selected={false} className="ss-sug" key={p.id} onClick={()=>choose(r)}><b>{p.name}{p.claimed&&<em className="ss-tag" style={{fontStyle:"normal"}}>Already claimed</em>}</b><span>{addrLine(p)||"No address on file"}</span></button>;})}{results.status==="success"&&rows.length===0&&<p className="ss-help" style={{padding:"12px 14px",margin:0}}>No matches. Try another spelling, or check “My business isn't listed” below.</p>}{results.status==="error"&&<p className="ss-err" style={{margin:12}}>Business search is unavailable. Please try again shortly.</p>}</div>}
  </div>}
  {picked&&!missing&&<div className="ss-sel"><div><b>{picked.name}</b><span>{addrLine(picked)||"No address on file"}</span>{picked.claimed&&<span style={{fontSize:13,marginTop:6}}>This listing already has a claim on file. You can still submit yours and we'll review it.</span>}</div><button type="button" className="ss-lnk" onClick={unpick}>Change</button></div>}
  <label className="cp-chk"><input type="checkbox" checked={missing} onChange={e=>{setMissing(e.target.checked);setPicked(null);setSearch("");setDebounced("");setAnswers({});}}/> My business isn't listed (or my location isn't).</label>
  {missing&&<div className="cp-nb">
   <p className="ss-help" style={{margin:0}}>Several locations? Add the one you're claiming. Include the street address so we can tell locations apart.</p>
   <div className="ss-row two"><div><label className="ss-lab" htmlFor="nb-name">Business name *</label><input id="nb-name" className="ss-in" value={nb.name} onChange={upd(setNb,"name")} autoComplete="off"/></div>
   <div><label className="ss-lab" htmlFor="nb-cat">Category *</label><select id="nb-cat" className="ss-in" value={nb.category} onChange={upd(setNb,"category")}><option value="">Choose a category</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div></div>
   <div><label className="ss-lab" htmlFor="nb-addr">Street address *</label><input id="nb-addr" className="ss-in" value={nb.address} onChange={upd(setNb,"address")} autoComplete="off"/></div>
   <div className="ss-row cs"><div><label className="ss-lab" htmlFor="nb-city">City *</label><input id="nb-city" className="ss-in" value={nb.city} onChange={upd(setNb,"city")} autoComplete="off"/></div><div><label className="ss-lab" htmlFor="nb-state">State *</label><input id="nb-state" className="ss-in" value={nb.state} onChange={upd(setNb,"state")} autoComplete="off"/></div></div>
   <div className="ss-row two"><div><label className="ss-lab" htmlFor="nb-zip">ZIP code <span className="ss-opt">(optional)</span></label><input id="nb-zip" className="ss-in" value={nb.zip} onChange={upd(setNb,"zip")} inputMode="numeric" autoComplete="off"/></div><div><label className="ss-lab" htmlFor="nb-phone">Business phone <span className="ss-opt">(optional)</span></label><input id="nb-phone" className="ss-in" type="tel" value={nb.phone} onChange={upd(setNb,"phone")} autoComplete="off"/></div></div>
   <div><label className="ss-lab" htmlFor="nb-web">Business website <span className="ss-opt">(optional)</span></label><input id="nb-web" className="ss-in" value={nb.website} onChange={upd(setNb,"website")} inputMode="url" placeholder="www.yourbusiness.com" autoComplete="off"/></div>
  </div>}
  {picked&&!missing&&<div><button type="button" className="ss-more" aria-expanded={showFix} aria-controls="cl-fix" onClick={()=>setShowFix(v=>!v)}><span>Something look wrong? Suggest corrections <span className="ss-opt">(optional)</span></span><ChevronDown size={20}/></button>
   {showFix&&<div id="cl-fix" className="ss-panel"><p className="ss-help" style={{margin:0}}>Your changes are only suggestions. Nothing on the live listing changes until we've reviewed them.</p>
    <div className="ss-row two"><div><label className="ss-lab" htmlFor="fx-name">Business name</label><input id="fx-name" className="ss-in" value={fix.name} onChange={upd(setFix,"name")}/></div>
    <div><label className="ss-lab" htmlFor="fx-cat">Category</label><select id="fx-cat" className="ss-in" value={fix.category} onChange={upd(setFix,"category")}><option value="">{picked.category?"Choose a category":"Keep current"}</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div></div>
    <div><label className="ss-lab" htmlFor="fx-addr">Street address</label><input id="fx-addr" className="ss-in" value={fix.address} onChange={upd(setFix,"address")}/></div>
    <div className="ss-row cs"><div><label className="ss-lab" htmlFor="fx-city">City</label><input id="fx-city" className="ss-in" value={fix.city} onChange={upd(setFix,"city")}/></div><div><label className="ss-lab" htmlFor="fx-state">State</label><input id="fx-state" className="ss-in" value={fix.state} onChange={upd(setFix,"state")}/></div></div>
    <div className="ss-row two"><div><label className="ss-lab" htmlFor="fx-zip">ZIP code</label><input id="fx-zip" className="ss-in" value={fix.zip} onChange={upd(setFix,"zip")} inputMode="numeric"/></div><div><label className="ss-lab" htmlFor="fx-phone">Business phone</label><input id="fx-phone" className="ss-in" type="tel" value={fix.phone} onChange={upd(setFix,"phone")}/></div></div>
    <div><label className="ss-lab" htmlFor="fx-web">Business website</label><input id="fx-web" className="ss-in" value={fix.website} onChange={upd(setFix,"website")} inputMode="url" placeholder="www.example.com"/></div>
   </div>}</div>}
 </div>
 <div className="cp-step">
  <h2 className="cp-sh"><span className="cp-num">2</span>Tell Us About Yourself</h2>
  <div className="ss-row two"><div><label className="ss-lab" htmlFor="cl-name">Your name *</label><input id="cl-name" className="ss-in" required value={cName} onChange={e=>setCName(e.target.value)} autoComplete="name"/></div><div><label className="ss-lab" htmlFor="cl-role">Your role *</label><select id="cl-role" className="ss-in" required value={role} onChange={e=>setRole(e.target.value)}><option value="">Choose your role</option>{ROLES.map(x=><option key={x}>{x}</option>)}</select></div></div>
  <div className="ss-row two"><div><label className="ss-lab" htmlFor="cl-email">Email *</label><input id="cl-email" className="ss-in" type="email" required value={cEmail} onChange={e=>setCEmail(e.target.value)} autoComplete="email"/></div><div><label className="ss-lab" htmlFor="cl-phone">Contact phone <span className="ss-opt">(optional)</span></label><input id="cl-phone" className="ss-in" type="tel" value={cPhone} onChange={e=>setCPhone(e.target.value)} autoComplete="tel"/></div></div>
  <p className="ss-help" style={{margin:"-4px 0 0"}}>We'll use your details to review your claim and may contact you to confirm your connection to the business.</p>
 </div>
 <div className="cp-step">
  <h2 className="cp-sh"><span className="cp-num">3</span>Share Your Pup Perks</h2>
  <p className="cp-sub">Only share what you know! Not sure about something? No worries. We'll leave that detail as is.</p>
  <div className="ss-row two"><div><label className="ss-lab" htmlFor="cl-seat">Outdoor seating for dogs</label><select id="cl-seat" className="ss-in" value={seat} onChange={e=>setSeat(e.target.value)}><option value="">Not sure / skip</option>{SEAT_OPTS.map(x=><option key={x}>{x}</option>)}</select></div><div><label className="ss-lab" htmlFor="cl-access">Where are dogs allowed?</label><select id="cl-access" className="ss-in" value={access} onChange={e=>setAccess(e.target.value)}><option value="">Not sure / skip</option>{ACCESS_OPTS.map(x=><option key={x}>{x}</option>)}</select></div></div>
  <div><label className="ss-lab" htmlFor="cl-access-note">Restrictions or designated dog areas <span className="ss-opt">(optional)</span></label><input id="cl-access-note" className="ss-in" value={accessNote} onChange={e=>setAccessNote(e.target.value)} placeholder="e.g. Patio only, or after 4 PM"/></div>
  <div className="cp-perks">{PERKS.map(p=>{const c=curOf(p);const a=answers[p.key];const I=PI[p.key]||PawPrint;return <div className="ss-perk" key={p.key}><span className="pk-ic" aria-hidden="true"><I size={17} strokeWidth={2.3}/></span><div className="pk-t"><strong>{p.label==="Fans / cooling for summer"?"Fans/cooling for summer":p.label}</strong>{!missing&&picked&&<small>Listed as: {c==="Unknown"?"Not sure":c}</small>}</div><div className="ss-seg" role="radiogroup" aria-label={p.label}>{["Yes","No","Unknown"].map(v=><label key={v} className={(a===v?"on ":"")+(v==="No"?"no":v==="Unknown"?"ns":"")}><input type="radio" name={"pk-"+p.key} checked={a===v} onChange={()=>setAnswers(o=>({...o,[p.key]:v}))}/>{v==="Unknown"?"Not sure":v}</label>)}</div></div>;})}</div>
  <div><label className="ss-lab" htmlFor="cl-notes">Dog policy or additional details <span className="ss-opt">(optional)</span></label><textarea id="cl-notes" className="ss-in" style={{minHeight:84}} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Pup events, seasonal hours, friendly staff, or anything else dog owners should know"/></div>
  <div className="cp-ph"><div className="cp-ph-h"><span className="cp-ph-ic" aria-hidden="true"><Camera size={20} strokeWidth={2.3}/></span><div><h3>Show Off Your Dog-Friendly Spot!</h3><p>Show dog lovers what makes your business special. Add up to 5 photos to bring your listing to life!</p></div></div><label className="cp-photo cp-up"><span className="cp-up-ic" aria-hidden="true"><ImagePlus size={26} strokeWidth={2.2}/></span><span className="cp-up-t"><b>{files.length?files.length+" Photo"+(files.length===1?"":"s")+" Selected":"Choose Photos to Upload"}</b><small>{files.length?"Tap to change your selection. Up to 5 photos.":"Add up to 5 photos."}</small></span><input type="file" multiple accept="image/*" onChange={e=>setFiles(Array.from(e.target.files??[]).slice(0,5))} style={{position:"absolute",width:1,height:1,opacity:0}}/></label><div className="cp-decal"><h4>Get Your FREE Window Decal! 🐾</h4><img src={VERIFIED_BADGE} alt="SniffScout Verified Dog-Friendly Business badge" width={1536} height={1024} loading="lazy" decoding="async"/><p>Claim your listing, upload a couple of photos and receive a complimentary SniffScout Verified window decal once approved and available.</p></div><p className="ss-help">Photos are optional but encouraged! Only upload photos you own or have permission to share. <b>Your first photo will be your suggested main listing photo.</b></p><p className="ss-help cp-up-fine">All photos are reviewed before appearing on your listing.</p>{files.length>0&&<p className="ss-help" style={{marginTop:2}}>⭐ Main photo: {files[0].name}</p>}{files.length>0&&<label style={{display:"flex",gap:8,fontSize:14,marginTop:6,alignItems:"flex-start"}}><input type="checkbox" checked={permission} onChange={e=>setPermission(e.target.checked)} style={{accentColor:"#FF5A0A",marginTop:2}}/> I own these photos or have permission to share them, and I give SniffScout permission to display them on my listing after review.</label>}</div>
 </div>
 <label className="ss-auth"><input type="checkbox" checked={authorized} onChange={e=>setAuthorized(e.target.checked)}/><span>I'm authorized to manage this business's listing. *<small>Required so we know the claim is coming from the owner, a manager or someone they've approved.</small></span></label>
 <label className="cp-chk" style={{fontWeight:600,fontSize:14,alignItems:"flex-start",padding:"0 4px"}}><input type="checkbox" checked={newsOpt} onChange={e=>setNewsOpt(e.target.checked)} style={{marginTop:2}}/><span>🐾 Send me SniffScout partner news and tips. <span className="ss-opt">(optional, unsubscribe anytime)</span></span></label>
 {err&&<p role="alert" className="ss-err">{err}</p>}
 <button type="submit" className="ss-btn" disabled={busy||!create.enabled}>{busy?"Submitting…":"Submit My Claim for Review"}</button>
 <p className="ss-fine">Free to claim. Reviewed by the SniffScout team before updates go live.</p>
 </form></>}
 <section className="cp-fo" aria-labelledby="cp-fo-h"><p className="cp-fo-opt"><em>Optional</em>Claiming your listing is always free. The upgrade below is completely optional.</p><div className="cp-fo-card"><PawPrint className="cp-fo-paw p1" aria-hidden="true"/><PawPrint className="cp-fo-paw p2" aria-hidden="true"/><div className="cp-fo-b"><img className="cp-fo-badge" src={TOPDOG_BADGE} alt="SniffScout Top Dog Partner Dog-Friendly Business badge with crown" width={1536} height={1024} loading="lazy" decoding="async"/></div><div className="cp-fo-t"><p className="cp-fo-eye"><Crown size={15} strokeWidth={2.4} fill="#FF5A0A" aria-hidden="true"/>Exclusive Founding Offer</p><h3 id="cp-fo-h">Don't Just Be Listed. <span style={{color:"#FF5A0A"}}>Stand Out From the Pack!</span></h3><p className="cp-fo-sub">Give your dog-friendly business the extra attention it deserves.</p><ul className="cp-fo-bens">{FO_BENS.map(b=><li key={b}><span className="cp-fo-ck" aria-hidden="true"><Check size={13} strokeWidth={3.4}/></span>{b}</li>)}</ul></div><div className="cp-fo-r"><div className="cp-fo-price"><s><span className="cp-fo-sr">Regular price </span>$47/month</s><div className="cp-fo-now"><span className="cp-fo-sr">Founding price </span><b>$37</b><span>/month</span></div></div><p className="cp-fo-lock"><b>Limited to the first 20 businesses.</b> Lock in your $37/month rate for as long as your membership stays active.</p><a href="/for-businesses#plans" className="cp-fo-btn">Become a Founding Top Dog<ArrowRight size={18} strokeWidth={2.6} aria-hidden="true"/></a><p className="cp-fo-fine">No setup fee. No contracts. Cancel anytime.</p></div></div></section>
 </div></div><SSFooter noGo/></>;
}
