"use client";

import { useEffect, useState } from "react";
import styles from "./IntroOverlay.module.css";

export const INTRO_SEEN_KEY = "portfolio-intro-seen";
const DURATION_MS = 2600; // matches the CSS timeline end
const SKIP_MS = 450;

// A request path through a small system: client -> gateway -> queue/cache -> data.
const EDGES = [
  { d: "M20 50 L80 50", delay: "0s" },
  { d: "M80 50 L140 20", delay: "0.25s" },
  { d: "M80 50 L140 80", delay: "0.3s" },
  { d: "M140 20 L220 50", delay: "0.5s" },
  { d: "M140 80 L220 50", delay: "0.55s" },
];
const NODES = [
  { cx: 20, cy: 50, delay: "0s" },
  { cx: 80, cy: 50, delay: "0.2s" },
  { cx: 140, cy: 20, delay: "0.45s" },
  { cx: 140, cy: 80, delay: "0.5s" },
];
const ROUTES = [
  { path: "M20 50 L80 50 L140 20 L220 50", begin: "0.7s" },
  { path: "M20 50 L80 50 L140 80 L220 50", begin: "1.05s" },
];

// Plays over the already-rendered page (so the content is in the HTML for crawlers),
// once per session. Any key or click skips it. `onDone` must be stable (e.g. from useCallback).
export default function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [skipping, setSkipping] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    // Set by the inline script in layout.tsx before first paint; CSS already hides the overlay.
    const seen = root.dataset.introSeen === "1";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {}
    if (seen || reducedMotion) {
      onDone();
      return;
    }

    root.style.overflow = "hidden";
    const finish = () => {
      root.style.overflow = "";
      onDone();
    };
    let timer = window.setTimeout(finish, DURATION_MS);
    const skip = () => {
      window.clearTimeout(timer);
      setSkipping(true);
      timer = window.setTimeout(finish, SKIP_MS);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      root.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div className={`${styles.overlay} ${skipping ? styles.skip : ""}`} aria-hidden="true">
      <div className={styles.stage}>
        <svg className={styles.graph} viewBox="0 0 240 100">
          {EDGES.map((e) => (
            <path
              key={e.d}
              d={e.d}
              pathLength={1}
              className={styles.edge}
              style={{ "--delay": e.delay } as React.CSSProperties}
            />
          ))}
          {ROUTES.map((r) => (
            <circle key={r.path} r={2.6} className={styles.packet} opacity={0}>
              <set attributeName="opacity" to="1" begin={r.begin} fill="freeze" />
              <animateMotion dur="1.1s" begin={r.begin} repeatCount="indefinite" path={r.path} />
            </circle>
          ))}
          {NODES.map((n) => (
            <circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r={6}
              className={styles.node}
              style={{ "--delay": n.delay } as React.CSSProperties}
            />
          ))}
          <circle
            cx={220}
            cy={50}
            r={8}
            className={`${styles.node} ${styles.nodeActive}`}
            style={{ "--delay": "0.75s" } as React.CSSProperties}
          />
        </svg>

        <p className={styles.name}>
          <span className={styles.word}>
            <span style={{ "--delay": "0.45s" } as React.CSSProperties}>Sheikh</span>
          </span>{" "}
          <span className={styles.word}>
            <span style={{ "--delay": "0.55s" } as React.CSSProperties}>Aman</span>
          </span>
        </p>
        <p className={styles.role}>Full-stack engineer · AI &amp; product</p>
        <div className={styles.progress}>
          <span />
        </div>
      </div>
      <span className={styles.hint}>Press any key to skip</span>
    </div>
  );
}
