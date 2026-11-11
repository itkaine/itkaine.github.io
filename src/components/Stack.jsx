import { motion } from "motion/react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";

const icon = (id) => `https://skillicons.dev/icons?i=${encodeURIComponent(id)}`;

export default function Stack() {
  const all = Object.values(SITE.stack).flat();
  return (
    <Section id="stack" index="02." title="Tech stack">
      {/* Băng chạy vô tận */}
      <motion.div className="marquee" variants={fadeUp}>
        <div className="track">
          {[...all, ...all].map((id, i) => <img key={i} src={icon(id)} alt="" loading="lazy" />)}
        </div>
      </motion.div>

      <div className="stack">
        {Object.entries(SITE.stack).map(([group, ids]) => (
          <motion.div key={group} variants={fadeUp}>
            <h3>{group}</h3>
            <div className="icons">
              {ids.map((id, i) => (
                <motion.img
                  key={id}
                  src={icon(id)}
                  alt={id}
                  title={id}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.4, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 12, delay: i * 0.04 }}
                  whileHover={{ y: -8, rotate: -8, scale: 1.15 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
