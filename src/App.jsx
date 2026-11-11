import { lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import Intro from "./components/Intro.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import BigMarquee from "./components/BigMarquee.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Cursor from "./components/Cursor.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

// Three.js nặng → tách riêng, tải sau
const Scene = lazy(() => import("./components/Scene.jsx"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <div className="noise" aria-hidden />
      <Nav />
      <main>
        <Hero>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Hero>
        <About />
        <Stack />
        <BigMarquee />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </MotionConfig>
  );
}
