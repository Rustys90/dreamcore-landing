import { useEffect, useRef, useState, type CSSProperties } from "react";

const PORTAL_BG = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779707217/image_1_vdzwae.png";
const CURTAIN_LEFT = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706559/curtain_left_znkmva.png";
const CURTAIN_RIGHT = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706564/curtain_right_paeyym.png";
const WORLD_BG = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706392/image_2_gkcdlx.png";
const BOTTOM_CLOUDS = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706555/bottom_clouds_xskut6.png";

function clamp(v: number, a: number, b: number) { return Math.min(b, Math.max(a, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      setP(clamp(max > 0 ? window.scrollY / max : 0, 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const t = setTimeout(() => setOpen(true), 100);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);
  const ep = easeInOut(p);
  const scene1 = clamp(1 - p / 0.22, 0, 1);
  const scene2 = clamp((p - 0.68) / 0.16, 0, 1);
  return (
    <div ref={ref} style={{ height: "480vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#0a0608" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${lerp(1, 1.18, ep)})` }}>
          <img src={WORLD_BG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, transform: `scale(${lerp(1, 1.4, ep)})`, transformOrigin: "50% 100%" }}>
          <img src={BOTTOM_CLOUDS} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 15, transform: `scale(${lerp(1, 7.5, ep)})`, transformOrigin: "52% 38%", opacity: p < 0.65 ? 1 : clamp(1 - (p - 0.65) / 0.2, 0, 1) }}>
          <img src={PORTAL_BG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 16, transform: `translateX(${open ? -62 : 0}%)`, transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)", transformOrigin: "left center" }}>
          <img src={CURTAIN_LEFT} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 16, transform: `translateX(${open ? 62 : 0}%)`, transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)", transformOrigin: "right center" }}>
          <img src={CURTAIN_RIGHT} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 20, opacity: scene1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
          <h1 style={{ fontFamily: ""Viaoda Libre", serif", fontSize: "clamp(40px, 10vw, 88px)", color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.7)", margin: 0 }}>FALL › INTO REVERIE</h1>
          <p style={{ fontFamily: ""Imprima", sans-serif", fontSize: 18, color: "rgba(255,245,235,0.88)", maxWidth: 360, marginTop: 16 }}>Crafting boundless digital worlds where the edge between AI, vision, and living myth dissolves.</p>
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 46, opacity: scene2, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "12vh", pointerEvents: "none" }}>
          <h2 style={{ fontFamily: ""Viaoda Libre", serif", fontSize: "clamp(28px, 6vw, 64px)", color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.4)", margin: 0 }}>FORGE BEYOND THE REAL</h2>
          <p style={{ fontFamily: ""Imprima", sans-serif", fontSize: 18, color: "rgba(255,255,255,0.82)", maxWidth: 480, marginTop: 16, textAlign: "center" }}>Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary and the known.</p>
        </div>
      </div>
    </div>
  );
}
