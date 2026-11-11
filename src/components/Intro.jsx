import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import { SITE } from "../config.js";

// Màn intro: đếm 0 → 100 rồi kéo rèm lên. Chỉ hiện lần đầu trong phiên.
export default function Intro() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem("intro"); } catch { return true; }
  });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";
    const ctrl = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        try { sessionStorage.setItem("intro", "1"); } catch {}
        setTimeout(() => setShow(false), 250);
      },
    });
    return () => ctrl.stop();
  }, [show]);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span className="intro-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {SITE.name}<i>.</i>
          </motion.span>
          <span className="intro-count">{String(n).padStart(3, "0")}</span>
          <div className="intro-bar"><motion.i style={{ scaleX: n / 100 }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
