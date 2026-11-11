import { useEffect } from "react";
import Lenis from "lenis";

// Cuộn mượt kiểu Apple. Tự tắt khi người dùng bật "Reduce motion".
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -20 } });
    document.documentElement.style.scrollBehavior = "auto";
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}
