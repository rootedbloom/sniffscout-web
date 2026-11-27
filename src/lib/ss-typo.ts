// Font weights the Softr pages applied to every section (copied from the Softr blocks).
const SS_TYPO_CSS = "h1,h2{font-weight:800!important}h3,h4,h5,h6{font-weight:700!important}p,li,dd,td,blockquote,figcaption{font-weight:500}button,input[type=submit],a[class*='btn'],a[class*='cta'],[class*='-btn']{font-weight:700!important}label{font-weight:700!important}input,select,textarea{font-weight:500}";

export function ssTypoInit() {
  try {
    if (typeof document === "undefined" || (window as any).__ssTypo) return;
    (window as any).__ssTypo = 1;
    const st = document.createElement("style"); st.id = "ss-font-manrope"; document.head.appendChild(st);
    fetch("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap").then((r) => r.text()).then((css) => { st.textContent = ["Manrope", "Bricolage Grotesque", "Figtree", "Lato"].map((f) => css.split("font-family: 'Manrope';").join("font-family: '" + f + "';")).join("\n") + "\nhtml,body{font-family:Manrope,'Helvetica Neue',Arial,sans-serif}"; }).catch(() => {});
    const apply = (root: any) => { try { if (!root || !root.getElementById || root.getElementById("ss-typo")) return; const s = document.createElement("style"); s.id = "ss-typo"; s.textContent = SS_TYPO_CSS; (root.head || root).appendChild(s); } catch (e) {} };
    const big = (root: any) => { try { root.querySelectorAll("h3").forEach((h: any) => { if (parseFloat(getComputedStyle(h).fontSize) >= 22) h.style.setProperty("font-weight", "800", "important"); }); } catch (e) {} };
    const scan = () => { apply(document); big(document); document.querySelectorAll("*").forEach((el: any) => { if (el.shadowRoot) { apply(el.shadowRoot); big(el.shadowRoot); el.shadowRoot.querySelectorAll("*").forEach((x: any) => { if (x.shadowRoot) { apply(x.shadowRoot); big(x.shadowRoot); } }); } }); };
    scan(); let n = 0; const t = setInterval(() => { scan(); if (++n > 30) clearInterval(t); }, 700);
    let pend = false; try { new MutationObserver(() => { if (pend) return; pend = true; setTimeout(() => { pend = false; scan(); }, 250); }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  } catch (e) {}
}
