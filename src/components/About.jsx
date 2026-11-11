import { useEffect, useState } from "react";
import { motion, animate, useInView } from "motion/react";
import { useRef } from "react";
import { SITE } from "../config.js";
import Section, { fadeUp } from "./Section.jsx";

function Tile({ className = "", children, ...rest }) {
  return (
    <motion.div className={`tile ${className}`} variants={fadeUp} whileHover={{ y: -4 }} {...rest}>
      {children}
    </motion.div>
  );
}

function Clock() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-GB", { timeZone: SITE.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id); }, []);
  const h = Number(t.slice(0, 2));
  return (
    <>
      <span className="tile-label">Local time</span>
      <span className="clock">{t}</span>
      <span className="muted small">{h >= 7 && h < 23 ? "☀️ Probably coding" : "🌙 Probably sleeping"} · GMT+7</span>
    </>
  );
}

function Counter({ to, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || to == null) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <div className="stat" ref={ref}>
      <b>{to == null ? "—" : n}</b>
      <span>{label}</span>
    </div>
  );
}

function GitHubStats() {
  const [d, setD] = useState({});
  useEffect(() => {
    const u = SITE.githubUser;
    Promise.all([
      fetch(`https://api.github.com/users/${u}`).then((r) => (r.ok ? r.json() : {})),
      fetch(`https://api.github.com/users/${u}/repos?per_page=100`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([user, repos]) => {
        const own = Array.isArray(repos) ? repos.filter((r) => !r.fork) : [];
        setD({
          repos: user.public_repos,
          followers: user.followers,
          stars: own.reduce((s, r) => s + r.stargazers_count, 0),
          since: user.created_at ? new Date(user.created_at).getFullYear() : null,
        });
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <span className="tile-label">On GitHub{d.since ? ` since ${d.since}` : ""}</span>
      <div className="stats">
        <Counter to={d.repos} label="Repos" />
        <Counter to={d.stars} label="Stars" />
        <Counter to={d.followers} label="Followers" />
      </div>
    </>
  );
}

export default function About() {
  const key = SITE.name.toLowerCase();
  return (
    <Section id="about" index="01." title="About">
      <div className="bento">
        <Tile className="t-intro">
          <span className="tile-label">Hello 👋</span>
          {SITE.about.map((p, i) => <p key={i}>{p}</p>)}
        </Tile>

        <Tile className="t-code">
          <pre className="code">
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
          </pre>
        </Tile>

        <Tile className="t-clock"><Clock /></Tile>

        <Tile className="t-place">
          <div className="radar"><i /><i /><i /><span className="pin" /></div>
          <span className="tile-label">Based in</span>
          <span className="place">{SITE.location}</span>
        </Tile>

        <Tile className="t-gh"><GitHubStats /></Tile>

        <Tile className="t-figma">
          <img src="https://skillicons.dev/icons?i=figma" alt="" width="44" height="44" />
          <span className="tile-label">Workflow</span>
          <p>Figma first, then code. Every pixel has a reason.</p>
        </Tile>
      </div>
    </Section>
  );
}
