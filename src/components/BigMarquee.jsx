import { useRef } from "react";
import {
  motion, useScroll, useVelocity, useSpring, useTransform,
  useMotionValue, useAnimationFrame, wrap,
} from "motion/react";
import { SITE } from "../config.js";

// Chữ lớn chạy ngang; cuộn càng nhanh chạy càng nhanh, cuộn ngược thì đổi chiều.
function Row({ base = 3, outline = false }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(v, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    x.set(wrap(-50, 0, x.get() + move));
  });

  const words = [...SITE.marquee, ...SITE.marquee];
  return (
    <div className={`big-row${outline ? " outline" : ""}`}>
      <motion.div className="big-track" style={{ x: useTransform(x, (val) => `${val}%`) }}>
        {words.map((w, i) => <span key={i}>{w}<b>✦</b></span>)}
      </motion.div>
    </div>
  );
}

export default function BigMarquee() {
  return (
    <div className="big-marquee" aria-hidden>
      <Row base={-3} />
      <Row base={3} outline />
    </div>
  );
}
