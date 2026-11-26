import { ArrowRight, Crown, PawPrint } from "lucide-react";
import type { Place } from "@/lib/places";
import { firstPhoto, isTopDog, perks, types } from "@/lib/place-view";

export default function PlaceCard({ p }: { p: Place }) {
  const f = p.fields;
  const photo = firstPhoto(f);
  const list = perks(f);
  return (
    <a href={`/place/${p.slug}`} className="lp-card">
      <div className="lp-img">
        {photo ? <img src={photo} alt={`${f["Business Name"]} in ${p.city}, ${p.state}`} loading="lazy" /> : <span className="lp-ph"><PawPrint size={24} color="#fff" strokeWidth={2.4} aria-hidden="true" /></span>}
        {isTopDog(f) && <span className="lp-td"><Crown size={14} strokeWidth={2.6} aria-hidden="true" /> Top Dog</span>}
      </div>
      <div className="lp-cb">
        <h3 className="lp-name">{f["Business Name"]}</h3>
        <div className="lp-meta">{[types(f).join(" · "), f["Street Address"]].filter(Boolean).join(" · ")}</div>
        {f["Short Description"] && <p className="lp-desc">{f["Short Description"]}</p>}
        {list.length > 0 && <div className="lp-perks">{list.map((x) => <span key={x} className="lp-perk">{x}</span>)}</div>}
        <span className="lp-btn">View Details <ArrowRight size={16} strokeWidth={2.8} aria-hidden="true" /></span>
      </div>
    </a>
  );
}
