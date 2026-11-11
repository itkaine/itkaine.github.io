import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";

function TiltCard({ repo, featured }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.16), transparent 55%)`;

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.article
      className="card"
      variants={fadeUp}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <motion.div className="glare" style={{ background: glare }} />
      {featured && <span className="badge">★ Featured</span>}
      <h3>{repo.name}</h3>
      <p>{repo.description || "No description yet."}</p>
      {repo.topics?.length > 0 && (
        <div className="topics">{repo.topics.slice(0, 4).map((t) => <span key={t}>#{t}</span>)}</div>
      )}
      <div className="meta">
        {repo.language && <span>● {repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
        <span className="links">
          <a href={repo.html_url} target="_blank" rel="noopener">Code ↗</a>
          {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener">Live ↗</a>}
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    fetch(`https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=updated`)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((all) => {
        const list = all.filter((r) => !r.fork && !SITE.hidden.includes(r.name));
        const feat = SITE.featured.map((n) => list.find((r) => r.name === n)).filter(Boolean);
        const rest = list.filter((r) => !SITE.featured.includes(r.name));
        setState({ status: "ok", repos: [...feat, ...rest] });
      })
      .catch(() => setState({ status: "error", repos: [] }));
  }, []);

  return (
    <Section id="projects" index="03." title="Projects">
      {state.status === "loading" && <div className="grid">{[0, 1].map((i) => <div key={i} className="card skeleton" />)}</div>}
      {state.status === "error" && (
        <p className="muted">Couldn't load projects right now. See them on{" "}
          <a className="link" href={`https://github.com/${SITE.githubUser}?tab=repositories`}>GitHub ↗</a>.</p>
      )}
      {state.status === "ok" && (
        <motion.div className="grid" initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
          {state.repos.map((r) => <TiltCard key={r.id} repo={r} featured={SITE.featured.includes(r.name)} />)}
        </motion.div>
      )}
    </Section>
  );
}
