import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { SITE } from "../config.js";

const links = ["about", "stack", "projects", ...(SITE.experience.length ? ["experience"] : []), "contact"];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  // Ẩn khi cuộn xuống, hiện khi cuộn lên
  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > 120 && y > (scrollY.getPrevious() ?? 0));
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <motion.header className="nav" animate={{ y: hidden ? "-110%" : 0 }} transition={{ duration: 0.3 }}>
      <a className="brand" href="#top">kai<span>.dev</span></a>
      <nav>
        {links.map((l) => (
          <a key={l} href={`#${l}`} className={active === l ? "on" : ""}>
            {active === l && <motion.span layoutId="pill" className="pill" transition={{ type: "spring", damping: 22, stiffness: 300 }} />}
            <span className="label">{l}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
