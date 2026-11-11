import { useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Chữ xáo trộn rồi hiện lại khi rê chuột (hoặc khi gọi trigger)
export function useScramble(text) {
  const [out, setOut] = useState(text);
  const timer = useRef();
  const run = () => {
    clearInterval(timer.current);
    let frame = 0;
    const total = text.length * 3;
    timer.current = setInterval(() => {
      frame++;
      setOut(
        Array.from(text)
          .map((c, i) => (c === " " || i < frame / 3 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (frame >= total) { clearInterval(timer.current); setOut(text); }
    }, 28);
  };
  return [out, run];
}

export default function Scramble({ text, as: Tag = "span", ...rest }) {
  const [out, run] = useScramble(text);
  return (
    <Tag onPointerEnter={run} aria-label={text} {...rest}>
      <span aria-hidden>{out}</span>
    </Tag>
  );
}
