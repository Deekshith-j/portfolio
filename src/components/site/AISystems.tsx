import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const COMPONENTS = ["PYTHON", "DATA", "RETRIEVAL", "PROMPTS", "LLM", "EVALUATION"];

function Piece({
  label,
  i,
  progress,
}: {
  label: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const angle = (i / COMPONENTS.length) * Math.PI * 2;
  const fromX = Math.cos(angle) * 320;
  const fromY = Math.sin(angle) * 200;
  const x = useTransform(progress, [0.1, 0.75], [fromX, 0]);
  const y = useTransform(progress, [0.1, 0.75], [fromY, 0]);
  const opacity = useTransform(progress, [0.1, 0.35, 0.8], [0, 1, 0.15]);
  const scale = useTransform(progress, [0.1, 0.8], [1, 0.6]);

  return (
    <motion.span
      style={{ x, y, opacity, scale }}
      className="absolute display text-sm uppercase tracking-[0.2em] sm:text-lg"
    >
      {label}
    </motion.span>
  );
}

export function AISystems() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const coreScale = useTransform(scrollYProgress, [0.4, 0.85], [0.4, 1]);
  const coreOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.4, 0.9], [0, 0.5]);

  return (
    <section
      ref={ref}
      id="ai-systems"
      className="relative bg-background/80 backdrop-blur-md py-[14vh]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-10">AI Systems</p>
        <h2 className="display text-[clamp(2.6rem,10vw,9rem)] leading-[0.86]">
          FROM PROMPT
          <br />
          TO INTELLIGENCE.
        </h2>
      </div>

      <div className="relative mt-[10vh] flex h-[70svh] items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute h-[42vmin] w-[42vmin] rounded-full"
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_45%,transparent),transparent_70%)] blur-2xl" />
        </motion.div>

        <div className="relative flex items-center justify-center">
          {COMPONENTS.map((c, i) => (
            <Piece key={c} label={c} i={i} progress={scrollYProgress} />
          ))}
          <motion.div
            style={{ scale: coreScale, opacity: coreOpacity }}
            className="display text-center text-[clamp(1.6rem,5vw,4rem)] leading-none"
          >
            INTELLIGENT
            <br />
            SYSTEM
          </motion.div>
        </div>
      </div>
    </section>
  );
}
