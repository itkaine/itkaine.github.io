import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Quầng sáng đi theo chuột + chấm nhỏ. Tắt trên màn hình cảm ứng.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 18 });
  const sy = useSpring(y, { stiffness: 140, damping: 18 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!e.target.closest("a, button, .card"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="glow" style={{ x: sx, y: sy }} aria-hidden />
      <motion.div className="ring" style={{ x: sx, y: sy }} animate={{ scale: hover ? 2.2 : 1 }} aria-hidden />
      <motion.div className="dot" style={{ x, y }} aria-hidden />
    </>
  );
}
