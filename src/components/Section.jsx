import { motion } from "motion/react";
import Scramble from "./Scramble.jsx";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Section({ id, index, title, children }) {
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="idx">{index}</span>
        <Scramble text={title} />
        <motion.i className="rule" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.2 } } }} />
      </motion.h2>
      {children}
    </motion.section>
  );
}
