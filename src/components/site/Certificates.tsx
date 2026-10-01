import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import GlassSurface from "@/components/ui/GlassSurface";
import certGenai from "@/assets/certificates/cert-genai.png";
import certPython from "@/assets/certificates/cert-python.png";
import certLangchain from "@/assets/certificates/cert-langchain.png";
import certHackathon from "@/assets/certificates/cert-hackathon.png";
import certBuildathon from "@/assets/certificates/cert-buildathon.png";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  src: string;
};

const CERTS: Cert[] = [
  {
    title: "Generative AI & LLMs",
    issuer: "DeepLearning Academy",
    year: "2025",
    src: certGenai,
  },
  {
    title: "Python for Data Science",
    issuer: "DataScience Institute",
    year: "2025",
    src: certPython,
  },
  {
    title: "LangChain & LangSmith",
    issuer: "LLM Engineering Academy",
    year: "2025",
    src: certLangchain,
  },
  {
    title: "National AI Hackathon — Finalist",
    issuer: "AI Product Track",
    year: "2025",
    src: certHackathon,
  },
  {
    title: "OpenAI × NxtWave Buildathon",
    issuer: "National Level — AI Build Challenge",
    year: "2025",
    src: certBuildathon,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Fan layout (desktop / tablet)                                       */
/* ------------------------------------------------------------------ */

function FanCard({
  cert,
  i,
  total,
  spread,
  onOpen,
}: {
  cert: Cert;
  i: number;
  total: number;
  spread: boolean;
  onOpen: () => void;
}) {
  const mid = (total - 1) / 2;
  const offset = i - mid;

  const idleRotate = offset * 7;
  const idleX = offset * 34;
  const idleY = Math.abs(offset) * 14;

  const openRotate = offset * 5;
  const openX = offset * 210;
  const openY = Math.abs(offset) * 4;

  const rotate = spread ? openRotate : idleRotate;
  const x = spread ? openX : idleX;
  const y = spread ? openY : idleY;

  return (
    <motion.button
      type="button"
      aria-label={`View certificate: ${cert.title}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 40, rotate: idleRotate }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
      className="group relative block w-[210px] cursor-pointer sm:w-[260px] lg:w-[300px]"
      style={{ zIndex: 10 - Math.abs(offset), perspective: 1200 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div
        animate={{ rotate, x, y }}
        transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.9 }}
        className="origin-bottom"
      >
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] transition-shadow duration-700 group-hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]">
          <img
            src={cert.src}
            alt={`Certificate — ${cert.title}`}
            loading="lazy"
            width={1600}
            height={1131}
            className="aspect-[1600/1131] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-3 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
            {cert.issuer}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const cert = CERTS[index]!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <motion.figure
        key={index}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative max-h-full w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-xl border border-border shadow-[0_60px_140px_-60px_rgba(0,0,0,1)]">
          <img
            src={cert.src}
            alt={`Certificate — ${cert.title}`}
            width={1600}
            height={1131}
            className="max-h-[72svh] w-full object-contain bg-background"
          />
        </div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <span className="display text-lg leading-tight sm:text-xl">{cert.title}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
            {cert.issuer} — {cert.year}
          </span>
        </figcaption>

        <button
          type="button"
          aria-label="Previous certificate"
          onClick={() => onNav(-1)}
          className="absolute -left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full overflow-hidden text-muted-foreground transition-transform duration-200 hover:scale-110 sm:flex"
        >
          <GlassSurface
            width={40}
            height={40}
            borderRadius={999}
            borderWidth={0.06}
            distortionScale={-80}
            contentClassName="w-full h-full flex items-center justify-center hover:text-foreground"
          >
            ←
          </GlassSurface>
        </button>
        <button
          type="button"
          aria-label="Next certificate"
          onClick={() => onNav(1)}
          className="absolute -right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full overflow-hidden text-muted-foreground transition-transform duration-200 hover:scale-110 sm:flex"
        >
          <GlassSurface
            width={40}
            height={40}
            borderRadius={999}
            borderWidth={0.06}
            distortionScale={-80}
            contentClassName="w-full h-full flex items-center justify-center hover:text-foreground"
          >
            →
          </GlassSurface>
        </button>
      </motion.figure>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full overflow-hidden text-muted-foreground transition-transform duration-200 hover:scale-110"
      >
        <GlassSurface
          width={40}
          height={40}
          borderRadius={999}
          borderWidth={0.06}
          distortionScale={-80}
          contentClassName="w-full h-full flex items-center justify-center hover:text-foreground"
        >
          ✕
        </GlassSurface>
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Certificates() {
  const [spread, setSpread] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const nav = useCallback((dir: 1 | -1) => {
    setOpenIndex((cur) => (cur === null ? cur : (cur + dir + CERTS.length) % CERTS.length));
  }, []);

  const total = CERTS.length;

  return (
    <div className="mt-24 sm:mt-32">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-signal">The Paper Trail</p>
          <h3 className="display mt-3 text-[clamp(1.5rem,4vw,2.6rem)] leading-[0.95]">
            CERTIFICATES.
          </h3>
        </div>
        <p className="hidden max-w-[220px] text-right text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
          {spread ? "Pick one to view" : "Hover to spread the deck"}
        </p>
      </div>

      {/* Mobile: swipe row */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:hidden">
        {CERTS.map((c) => (
          <button
            key={c.title}
            type="button"
            aria-label={`View certificate: ${c.title}`}
            onClick={() => setOpenIndex(CERTS.indexOf(c))}
            className="w-[240px] shrink-0 snap-center"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <img
                src={c.src}
                alt={`Certificate — ${c.title}`}
                loading="lazy"
                width={1600}
                height={1131}
                className="aspect-[1600/1131] w-full object-cover"
              />
            </div>
            <p className="mt-2 text-left text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
              {c.issuer}
            </p>
          </button>
        ))}
      </div>

      {/* Desktop: interactive fan */}
      <div
        className="relative hidden h-[440px] items-end justify-center sm:flex lg:h-[500px]"
        onMouseEnter={() => !reduce && setSpread(true)}
        onMouseLeave={() => setSpread(false)}
        onFocus={() => !reduce && setSpread(true)}
        onBlur={() => setSpread(false)}
      >
        <div className="relative flex items-end justify-center">
          {CERTS.map((c, i) => (
            <div
              key={c.title}
              className={i === 0 ? "relative" : "absolute bottom-0 left-1/2"}
              style={i === 0 ? undefined : { transform: "translateX(-50%)" }}
            >
              <FanCard
                cert={c}
                i={i}
                total={total}
                spread={spread}
                onOpen={() => setOpenIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox index={openIndex} onClose={() => setOpenIndex(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </div>
  );
}
