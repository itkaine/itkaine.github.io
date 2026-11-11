import { motion } from "motion/react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";

export default function About() {
  const key = SITE.name.toLowerCase();
  return (
    <Section id="about" index="01." title="About">
      <div className="about">
        <motion.div variants={fadeUp}>
          {SITE.about.map((p, i) => <p key={i}>{p}</p>)}
        </motion.div>
        <motion.pre className="code" variants={fadeUp} whileHover={{ rotate: -1, scale: 1.02 }}>
          <div className="dots"><i /><i /><i /></div>
          <code>
            <span className="k">const</span> {key} = {"{"}{"\n"}
            {"  "}role: <span className="s">"{SITE.role}"</span>,{"\n"}
            {"  "}location: <span className="s">"{SITE.location}"</span>,{"\n"}
            {"  "}stack: [{SITE.mainStack.map((s, i) => (
              <span key={s}><span className="s">"{s}"</span>{i < SITE.mainStack.length - 1 ? ", " : ""}</span>
            ))}],{"\n"}
            {"  "}coffee: <span className="p">true</span>,{"\n"}
            {"}"};
          </code>
        </motion.pre>
      </div>
    </Section>
  );
}
