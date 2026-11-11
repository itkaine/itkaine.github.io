import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE } from "../config.js";
import Magnetic from "./Magnetic.jsx";

const letter = {
  hidden: { y: "110%", rotate: 12, opacity: 0 },
  show: (i) => ({ y: 0, rotate: 0, opacity: 1, transition: { delay: 0.3 + i * 0.07, type: "spring", damping: 14, stiffness: 160 } }),
};

export default function Hero({ children }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SITE.typing.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      {children}
      <div className="hero-inner">
        <motion.img
          className="avatar"
          src={`https://github.com/${SITE.githubUser}.png?size=240`}
          alt={SITE.name}
          width="112"
          height="112"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, delay: 0.1 }}
        />
        <motion.p className="hello" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          Hi there, I'm
        </motion.p>
        <h1 className="name" aria-label={SITE.name}>
          {Array.from(SITE.name).map((c, idx) => (
            <span className="mask" key={idx}>
              <motion.span custom={idx} variants={letter} initial="hidden" animate="show">{c}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {SITE.role} · {SITE.location}
        </motion.p>

        <div className="rotator">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.45 }}
            >
              {SITE.typing[i]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Magnetic><a className="btn primary" href="#projects">See my work</a></Magnetic>
          <Magnetic><a className="btn" href="#contact">Say hi 👋</a></Magnetic>
        </motion.div>
      </div>

      <motion.a href="#about" className="scroll-hint" aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <span />
      </motion.a>
    </section>
  );
}
