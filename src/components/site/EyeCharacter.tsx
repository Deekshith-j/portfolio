import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/scroll-store";

/** Minimal graphite "assistant" character whose eyes track the cursor. */
export function EyeCharacter() {
  const ref = useRef<HTMLDivElement>(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const clamp = Math.min(1, d / 320);
      setGaze({ x: (dx / d) * clamp, y: (dy / d) * clamp });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    const blinkTimer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 4200);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(blinkTimer);
    };
  }, []);

  const px = gaze.x * 7;
  const py = gaze.y * 5;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[280px] select-none" aria-hidden>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <svg viewBox="0 0 220 220" className="w-full">
          <defs>
            <radialGradient id="shellGrad" cx="35%" cy="28%" r="80%">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--mist) 85%, transparent)" />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--graphite) 92%, transparent)"
              />
            </radialGradient>
          </defs>

          {/* halo */}
          <circle cx="110" cy="110" r="98" fill="none" stroke="currentColor" opacity="0.12" />
          <circle cx="110" cy="110" r="82" fill="none" stroke="currentColor" opacity="0.07" />

          {/* head */}
          <rect x="34" y="42" width="152" height="136" rx="46" fill="url(#shellGrad)" />
          <rect
            x="34"
            y="42"
            width="152"
            height="136"
            rx="46"
            fill="none"
            stroke="currentColor"
            opacity="0.25"
          />

          {/* antenna */}
          <line x1="110" y1="42" x2="110" y2="22" stroke="currentColor" opacity="0.35" />
          <circle cx="110" cy="18" r="5" className="fill-signal" />

          {/* eyes */}
          <g transform={`translate(${px} ${py})`}>
            <ellipse cx="84" cy="106" rx="15" ry={blink ? 1.6 : 15} className="fill-background" />
            <ellipse cx="136" cy="106" rx="15" ry={blink ? 1.6 : 15} className="fill-background" />
            {!blink && (
              <>
                <circle cx={84 + px} cy={106 + py} r="6" className="fill-signal" />
                <circle cx={136 + px} cy={106 + py} r="6" className="fill-signal" />
              </>
            )}
          </g>

          {/* mouth */}
          <path
            d="M92 146 Q110 156 128 146"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </motion.div>
      <p className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
        Always watching the problem
      </p>
    </div>
  );
}
