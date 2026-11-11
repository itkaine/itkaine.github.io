import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";

// Timeline: đường kẻ tự vẽ dần theo tiến độ cuộn. Ẩn nếu SITE.experience rỗng.
export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  if (!SITE.experience.length) return null;
  return (
    <Section id="experience" index="04." title="Experience">
      <div className="timeline" ref={ref}>
        <div className="tl-track"><motion.i style={{ scaleY }} /></div>
        {SITE.experience.map((e, i) => (
          <motion.div className="tl-item" key={i} variants={fadeUp}>
            <span className="tl-dot" />
            <span className="tl-time">{e.time}</span>
            <h3>{e.title}{e.place && <em> @ {e.place}</em>}</h3>
            {e.desc && <p className="muted">{e.desc}</p>}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
