// Dog illustrations for the For Businesses page (copied from the Softr page).
const NAVY = "#00163D", OR = "#FF5A0A";
type HeadP = { fur: string; ear?: "floppy" | "pointy" | "bat" | "fluffy"; earC?: string; muzzle?: string; patch?: string; blaze?: string; dark?: boolean; tongue?: boolean; outline?: string; spots?: boolean; brows?: boolean };
const EARS: any = {
  floppy: "M-24 -22 C-44 -22 -50 4 -40 22 C-32 28 -24 16 -20 -4 Z",
  pointy: "M-28 -10 L-32 -46 L-6 -28 Z",
  bat: "M-22 -16 C-40 -30 -38 -56 -24 -54 C-12 -48 -6 -34 -8 -24 Z",
};
export function Head({ fur, ear = "floppy", earC, muzzle = "#FFFFFF", patch, blaze, dark, tongue = true, outline, spots, brows }: HeadP) {
  const ec = earC || fur;
  const st: any = outline ? { stroke: outline, strokeWidth: 1.8 } : {};
  const ink = dark ? "#0A0F24" : NAVY;
  const fluff = [[-30, -18], [-36, 0], [-32, 18], [-18, -30], [0, -36], [18, -30], [30, -18], [36, 0], [32, 18]];
  return (
    <g>
      {ear === "fluffy" && <>{fluff.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill={fur} {...st} />)}<circle cx={-38} cy={8} r={15} fill={fur} {...st} /><circle cx={38} cy={8} r={15} fill={fur} {...st} /></>}
      {(ear === "pointy" || ear === "bat") && <>
        <path d={EARS[ear]} fill={ec} {...st} /><path d={EARS[ear]} fill={ec} transform="scale(-1,1)" {...st} />
        <path d={ear === "bat" ? "M-20 -20 C-32 -32 -31 -48 -24 -47 C-16 -42 -12 -34 -13 -26 Z" : "M-25 -15 L-28 -37 L-12 -27 Z"} fill="#FFB3A1" opacity={0.85} />
        <path d={ear === "bat" ? "M-20 -20 C-32 -32 -31 -48 -24 -47 C-16 -42 -12 -34 -13 -26 Z" : "M-25 -15 L-28 -37 L-12 -27 Z"} fill="#FFB3A1" opacity={0.85} transform="scale(-1,1)" />
      </>}
      <ellipse rx={34} ry={31} fill={fur} {...(ear === "fluffy" ? {} : st)} />
      {spots && <><circle cx={-20} cy={-16} r={4} fill={NAVY} /><circle cx={17} cy={-21} r={3} fill={NAVY} /><circle cx={25} cy={4} r={3.5} fill={NAVY} /><circle cx={-26} cy={6} r={2.6} fill={NAVY} /></>}
      {blaze && <path d="M-6 -31 Q0 -34 6 -31 L6 6 L-6 6 Z" fill={blaze} />}
      {patch && <ellipse cx={13} cy={-4} rx={10} ry={9} fill={patch} />}
      {ear === "floppy" && <><path d={EARS.floppy} fill={ec} {...st} /><path d={EARS.floppy} fill={ec} transform="scale(-1,1)" {...st} /></>}
      <ellipse cy={14} rx={18} ry={13} fill={muzzle} />
      {dark && <><circle cx={-13} cy={-3} r={6.8} fill="#fff" /><circle cx={13} cy={-3} r={6.8} fill="#fff" /></>}
      <circle cx={-13} cy={-3} r={4.8} fill={ink} /><circle cx={13} cy={-3} r={4.8} fill={ink} />
      <circle cx={-11.4} cy={-4.7} r={1.7} fill="#fff" /><circle cx={14.6} cy={-4.7} r={1.7} fill="#fff" />
      {brows && <><path d="M-20 -12 q7 -5 13 0" stroke="#F4F5F8" strokeWidth={3.4} fill="none" strokeLinecap="round" /><path d="M7 -12 q6 -5 13 0" stroke="#F4F5F8" strokeWidth={3.4} fill="none" strokeLinecap="round" /></>}
      <ellipse cx={-23} cy={10} rx={5} ry={3} fill={OR} opacity={0.2} /><ellipse cx={23} cy={10} rx={5} ry={3} fill={OR} opacity={0.2} />
      <ellipse cy={7} rx={6.2} ry={4.4} fill={ink} /><ellipse cx={-1.6} cy={5.6} rx={1.9} ry={1} fill="#fff" opacity={0.7} />
      {tongue && <path d="M-4 17 q4 11 8 0 z" fill="#FF7A9B" />}
      <path d="M0 11 v4 M0 15 q-5 5 -10 1 M0 15 q5 5 10 1" stroke={ink} strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </g>
  );
}
export function Body({ fur, chest, outline, tail }: { fur: string; chest?: string; outline?: string; tail?: string }) {
  const st: any = outline ? { stroke: outline, strokeWidth: 1.8 } : {};
  return (
    <g>
      <path d="M24 64 C46 62 50 40 42 30" stroke={tail || fur} strokeWidth={9} fill="none" strokeLinecap="round" />
      <ellipse cy={54} rx={30} ry={30} fill={fur} {...st} />
      {chest && <ellipse cy={48} rx={14} ry={18} fill={chest} />}
      <rect x={-17} y={60} width={12} height={26} rx={6} fill={fur} {...st} /><rect x={5} y={60} width={12} height={26} rx={6} fill={fur} {...st} />
      <ellipse cx={-11} cy={86} rx={9} ry={5.5} fill={chest || fur} {...st} /><ellipse cx={11} cy={86} rx={9} ry={5.5} fill={chest || fur} {...st} />
    </g>
  );
}
const Bandana = ({ c }: { c: string }) => <path d="M-23 25 Q0 32 23 25 L0 47 Z" fill={c} />;
export const starPath = (cx: number, cy: number, r: number) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1) + " "; } return d + "Z"; };

export function GoldenPeek() { return (<svg viewBox="0 0 120 88" width="112" height="82" aria-hidden="true"><g transform="translate(60,44)"><Head fur="#F2B45C" earC="#D9913A" muzzle="#FFE1B3" /></g><ellipse cx={33} cy={82} rx={14} ry={8} fill="#F2B45C" /><ellipse cx={87} cy={82} rx={14} ry={8} fill="#F2B45C" /><path d="M28 80 v5 M34 80 v5 M82 80 v5 M88 80 v5" stroke="#D9913A" strokeWidth={2} strokeLinecap="round" /></svg>); }
export function CrownPeek() { return (<svg viewBox="0 0 120 104" width="112" height="98" aria-hidden="true"><g transform="translate(60,60)"><Bandana c={OR} /><Head fur="#E3B98C" ear="bat" earC="#C9935C" muzzle="#F7DDBF" /><path d="M-18 -30 L-21 -50 L-9 -39 L0 -55 L9 -39 L21 -50 L18 -30 Z" fill="#FFC23D" stroke={OR} strokeWidth={2.2} strokeLinejoin="round" /><circle cx={0} cy={-36} r={3} fill={OR} /><circle cx={-12} cy={-34} r={2.2} fill="#fff" /><circle cx={12} cy={-34} r={2.2} fill="#fff" /></g><ellipse cx={33} cy={98} rx={14} ry={8} fill="#E3B98C" /><ellipse cx={87} cy={98} rx={14} ry={8} fill="#E3B98C" /></svg>); }
export function LabBall() { return (<svg viewBox="0 0 120 140" width="120" height="140" aria-hidden="true"><g transform="translate(58,46)"><Body fur="#2E3242" /><rect x={-22} y={24} width={44} height={7} rx={3.5} fill={OR} /><Head fur="#2E3242" earC="#1E2130" muzzle="#4A5068" dark tongue={false} /><circle cy={23} r={11} fill={OR} /><path d="M-9 18 q9 8 18 0" stroke="#fff" strokeWidth={2.2} fill="none" /></g></svg>); }
export function FluffyWhite() { return (<svg viewBox="0 0 130 140" width="120" height="130" aria-hidden="true"><g transform="translate(62,48)"><Body fur="#FFFFFF" outline="#EBC2AC" /><Bandana c={OR} /><Head fur="#FFFFFF" ear="fluffy" outline="#EBC2AC" /></g></svg>); }
export function CoffeeDog() { return (<svg viewBox="0 0 170 140" width="150" height="124" aria-hidden="true"><g transform="translate(58,46)"><Body fur="#A8582F" chest="#D08A55" /><Bandana c={NAVY} /><Head fur="#A8582F" earC="#6E3519" muzzle="#D08A55" /></g><path d="M126 60 q-6 -8 0 -16 M138 60 q-6 -8 0 -16" stroke="#FF9B68" strokeWidth={3} fill="none" strokeLinecap="round" /><rect x={110} y={66} width={46} height={11} rx={5} fill="#fff" stroke={NAVY} strokeWidth={2} /><path d="M114 77 L152 77 L146 132 L120 132 Z" fill={NAVY} /><path d="M116 92 L150 92 L148 112 L118 112 Z" fill={OR} /><path d="M126 102 l4 4 l8 -8" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
export function HuskyPup() { return (<svg viewBox="0 0 190 150" width="170" height="134" aria-hidden="true"><g transform="translate(66,48)"><Body fur="#5E6B85" chest="#FFFFFF" /><Bandana c={OR} /><Head fur="#5E6B85" ear="pointy" earC="#46516A" muzzle="#FFFFFF" blaze="#FFFFFF" dark /></g><g transform="translate(150,96) scale(0.62)"><Body fur="#E9B97A" chest="#FFF6EC" /><rect x={-22} y={24} width={44} height={7} rx={3.5} fill={NAVY} /><Head fur="#E9B97A" earC="#C98F4E" muzzle="#FFF6EC" /></g><path d={starPath(118, 22, 7)} fill="#FFC23D" /><path d={starPath(178, 52, 5)} fill={OR} /></svg>); }
export function BeagleLeash() { return (<svg viewBox="0 0 160 150" width="150" height="140" aria-hidden="true"><path d="M70 66 C104 70 126 100 112 124 C104 138 128 146 146 132" stroke={NAVY} strokeWidth={5} fill="none" strokeLinecap="round" /><circle cx={146} cy={128} r={9} fill="none" stroke={NAVY} strokeWidth={5} /><g transform="translate(60,46)"><Body fur="#C47A3B" chest="#FFFFFF" tail="#FFFFFF" /><Head fur="#C47A3B" earC="#6B3A1A" muzzle="#FFFFFF" blaze="#FFFFFF" tongue={false} /><rect x={2} y={16} width={14} height={6} rx={3} fill={NAVY} /></g></svg>); }
export function CorgiWave() { return (<svg viewBox="0 0 160 160" width="100%" height="100%" aria-hidden="true"><g transform="translate(80,58)"><Body fur="#E8913A" chest="#FFFFFF" /><Bandana c={NAVY} /><g className="fb-wave-paw"><ellipse cx={-44} cy={12} rx={10} ry={12} fill="#E8913A" /><ellipse cx={-44} cy={6} rx={6} ry={5} fill="#FFFFFF" /></g><Head fur="#E8913A" ear="pointy" earC="#D07521" muzzle="#FFFFFF" blaze="#FFFFFF" /></g><path d="M18 40 q-6 6 0 12 M10 34 q-10 12 0 24" stroke={OR} strokeWidth={3} fill="none" strokeLinecap="round" /><path d={starPath(136, 30, 8)} fill="#FFC23D" /><path d={starPath(146, 70, 5)} fill={OR} /></svg>); }
export function PugLook() { return (<svg viewBox="0 0 110 100" width="96" height="88" aria-hidden="true"><g transform="translate(42,54) scale(0.82)"><Head fur="#E8CFA6" earC="#3E322C" muzzle="#5A4A42" dark /></g><circle cx={78} cy={58} r={15} fill="#FFFFFF" fillOpacity={0.75} stroke={NAVY} strokeWidth={5} /><path d="M88 69 L101 84" stroke={OR} strokeWidth={8} strokeLinecap="round" /><path d="M71 52 q4 -5 10 -4" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" /></svg>); }
export function SchnauzerClip() { return (<svg viewBox="0 0 110 100" width="96" height="88" aria-hidden="true"><g transform="translate(38,54) scale(0.82)"><Head fur="#8A8F9E" ear="pointy" earC="#6E7383" muzzle="#EEF0F4" brows dark /></g><rect x={68} y={30} width={34} height={48} rx={5} fill={OR} /><rect x={73} y={37} width={24} height={36} rx={2} fill="#fff" /><rect x={77} y={25} width={16} height={9} rx={3} fill={NAVY} /><path d="M77 46 l3 3 l5 -6 M77 58 l3 3 l5 -6" stroke={NAVY} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M88 47 h6 M88 59 h6" stroke="#C9CCD6" strokeWidth={2.2} strokeLinecap="round" /></svg>); }
export function DalmatianStars() { return (<svg viewBox="0 0 110 100" width="96" height="88" aria-hidden="true"><path d={starPath(16, 20, 8)} fill="#FFC23D" /><path d={starPath(92, 18, 6)} fill={OR} /><path d={starPath(100, 46, 4)} fill="#FFC23D" /><g transform="translate(50,56) scale(0.82)"><Head fur="#FFFFFF" earC={NAVY} outline="#E9CDBF" spots /></g><circle cx={86} cy={80} r={12} fill={OR} /><path d="M80 80 l4 4 l8 -8" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

export function CafeScene() {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" role="img" aria-label="Illustrated dog-friendly café patio (sample image)">
      <rect width="400" height="220" fill="#FFE2CF" />
      <circle cx="350" cy="36" r="20" fill="#FFC23D" opacity="0.8" />
      <rect x="34" y="34" width="332" height="150" rx="8" fill={NAVY} />
      <rect x="150" y="44" width="100" height="22" rx="11" fill={OR} />
      <text x="200" y="60" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Manrope,Arial,sans-serif" letterSpacing="2">CAFÉ</text>
      <rect x="50" y="76" width="300" height="22" fill={OR} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={50 + i * 37.5} y="76" width="18.75" height="22" fill="#fff" />)}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => <circle key={"s" + i} cx={59.4 + i * 18.75} cy="98" r="9.4" fill={i % 2 ? "#fff" : OR} />)}
      <rect x="64" y="114" width="104" height="58" rx="5" fill="#FFD7A3" /><path d="M116 114 v58 M64 143 h104" stroke={NAVY} strokeWidth="4" />
      <rect x="196" y="112" width="44" height="72" rx="5" fill="#FF7A3D" /><circle cx="232" cy="150" r="3" fill="#fff" />
      <rect x="258" y="114" width="80" height="58" rx="5" fill="#FFD7A3" /><path d="M298 114 v58" stroke={NAVY} strokeWidth="4" />
      <rect y="184" width="400" height="36" fill="#F6C3A4" />
      <rect x="20" y="160" width="20" height="26" rx="3" fill={OR} /><circle cx="30" cy="152" r="13" fill="#3BA676" /><circle cx="22" cy="158" r="8" fill="#2E8F63" />
      <rect x="362" y="160" width="20" height="26" rx="3" fill={OR} /><circle cx="372" cy="152" r="13" fill="#3BA676" /><circle cx="380" cy="158" r="8" fill="#2E8F63" />
      <rect x="104" y="190" width="6" height="22" fill={NAVY} /><ellipse cx="107" cy="190" rx="34" ry="6" fill="#fff" />
      <rect x="92" y="180" width="9" height="10" rx="2" fill={OR} /><rect x="114" y="180" width="9" height="10" rx="2" fill={NAVY} />
      <path d="M58 210 v-26 h16 v26 M140 210 v-26 h16 v26" stroke={NAVY} strokeWidth="4" fill="none" strokeLinejoin="round" />
      <ellipse cx="300" cy="208" rx="20" ry="6" fill={NAVY} /><ellipse cx="300" cy="205" rx="13" ry="3" fill="#8FD0F2" />
      <path d="M286 200 c0 -8 8 -8 8 0 M306 200 c0 -8 8 -8 8 0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.0" />
    </svg>
  );
}

