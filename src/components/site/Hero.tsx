import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@/hooks/use-theme";
import portraitCutout from "@/assets/deekshith-flawless.png";
import { openNeuralDossier } from "./NeuralDossierModal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const portraitParallax = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const isLight = theme === "light";

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[620px] sm:min-h-[660px] max-h-[1100px] h-[100svh] w-full bg-[#f5f5f8] dark:bg-[#050507] text-[#16161a] dark:text-[#f2f2f5] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-20 sm:pb-28 px-5 sm:px-12 lg:px-16 select-none transition-colors duration-500"
    >
      {/* 1. Atmospheric Purple / Lavender Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute h-[500px] w-[500px] sm:h-[850px] sm:w-[850px] -top-24 left-1/2 -translate-x-1/2 rounded-full opacity-55 dark:opacity-60 blur-[100px] sm:blur-[130px] transition-all duration-700"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(145, 60, 245, 0.28) 0%, rgba(85, 20, 180, 0.12) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] bottom-10 right-[8%] sm:right-[12%] rounded-full opacity-30 dark:opacity-35 blur-[100px] sm:blur-[120px] transition-all duration-700"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(147, 51, 234, 0.14) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(100, 30, 210, 0.22) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. Film Grain Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 opacity-[0.03] dark:opacity-[0.035] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1720px] flex flex-col justify-between flex-1 h-full"
      >
        {/* Center Editorial Stage: Massive Typography Layer + Info Block + Overlapping Portrait */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[360px] sm:min-h-[440px]">
          
          {/* BACKGROUND TYPOGRAPHY & BIO BLOCK */}
          <motion.div
            style={{ y: textParallax }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-10 w-full"
          >
            {/* Editorial Bio Block */}
            <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pb-2.5 sm:pb-4 border-b border-foreground/10 dark:border-white/10 mb-2 sm:mb-3">
              <div className="max-w-full sm:max-w-lg pointer-events-auto pr-2">
                <div className="flex items-center gap-2 font-mono text-[0.6rem] sm:text-[0.68rem] tracking-[0.24em] uppercase text-signal font-semibold mb-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  <span>AI & MACHINE LEARNING ENGINEER</span>
                </div>
                <p className="font-sans text-[0.72rem] sm:text-[0.84rem] leading-relaxed text-foreground/90 dark:text-white/85 font-normal">
                  Computer Science undergraduate specializing in AI & Data Science. Engineering Grounded RAG, autonomous agent architectures & scalable production systems.
                </p>

                {/* Creative Dossier Action Button */}
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openNeuralDossier}
                    className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 dark:bg-purple-500/25 border border-purple-500/35 hover:border-purple-400 font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] text-purple-700 dark:text-purple-300 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.2)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span>ACCESS NEURAL DOSSIER // CV</span>
                    <span className="text-purple-400 transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center font-mono text-[0.54rem] sm:text-[0.64rem] tracking-[0.2em] sm:tracking-[0.26em] text-muted-foreground uppercase pt-1 sm:pt-0">
                <span className="font-semibold text-foreground/75 dark:text-white/65">OPENAI × NXTWAVE FINALIST</span>
                <span className="text-[0.52rem] sm:text-[0.54rem] text-muted-foreground/80 mt-0.5">BENGALURU, INDIA • 2026</span>
              </div>
            </div>

            {/* Line 1: DEEKSHITH (Responsive Clamped Font) */}
            <h1 className="font-poster text-[clamp(2.85rem,14.5vw,22rem)] font-black uppercase tracking-[-0.015em] text-foreground dark:text-white leading-[0.76] w-full">
              DEEKSHITH
            </h1>

            {/* Line 2: PORTFOLIO */}
            <div className="w-full">
              <span className="font-poster text-[clamp(2.55rem,13vw,19.5rem)] font-black uppercase tracking-[0.01em] text-foreground/70 dark:text-white/70 leading-[0.80] block">
                PORTFOLIO
              </span>
            </div>
          </motion.div>

          {/* FOREGROUND PORTRAIT */}
          <motion.div
            style={{ y: portraitParallax }}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[180px] xs:w-[220px] sm:w-[360px] md:w-[440px] lg:w-[500px] xl:w-[560px] aspect-[4/5] max-h-[50vh] sm:max-h-[68vh] flex items-end justify-center ml-auto mr-[2%] sm:mr-[8%] lg:mr-[12%]"
          >
            <img
              src={portraitCutout}
              alt="Deekshith J"
              loading="eager"
              fetchPriority="high"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
              }}
              className="h-full w-full object-contain object-bottom filter contrast-[1.08] brightness-[0.98] drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] pointer-events-none opacity-85 sm:opacity-100"
            />
          </motion.div>

        </div>

        {/* Bottom: Subtle editorial coordinates & link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-t border-foreground/10 dark:border-white/10 pt-3 mb-10 sm:mb-16"
        >
          <div className="font-mono text-[0.54rem] sm:text-[0.62rem] tracking-[0.24em] sm:tracking-[0.3em] text-muted-foreground uppercase">
            EST. 2026 // AUTONOMOUS SYSTEMS
          </div>

          <a
            href="#work"
            className="group font-mono text-[0.58rem] sm:text-[0.72rem] tracking-[0.2em] sm:tracking-[0.24em] text-foreground/75 dark:text-white/70 hover:text-foreground dark:hover:text-white uppercase transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <span className="hidden xs:inline">BUILDING INTELLIGENT SYSTEMS FOR THE REAL WORLD</span>
            <span className="xs:hidden">SELECTED WORK</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
