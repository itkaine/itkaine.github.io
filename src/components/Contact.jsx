import { motion } from "motion/react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";
import Magnetic from "./Magnetic.jsx";

export default function Contact() {
  return (
    <>
      <Section id="contact" index={SITE.experience.length ? "05." : "04."} title="Contact">
        <motion.p className="big" variants={fadeUp}>
          Let's build something <em>beautiful</em> together.
        </motion.p>
        <motion.p className="muted" variants={fadeUp}>Open to collaboration and freelance UI work.</motion.p>
        <motion.div className="socials" variants={fadeUp}>
          {SITE.socials.map((s) => (
            <Magnetic key={s.label}>
              <a className="btn" href={s.url} target="_blank" rel="noopener">{s.label} ↗</a>
            </Magnetic>
          ))}
        </motion.div>
      </Section>
      <footer className="footer">
        © {new Date().getFullYear()} {SITE.name} · Built with React, Motion &amp; Three.js · Hosted on GitHub Pages
      </footer>
    </>
  );
}
