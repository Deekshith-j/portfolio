import { motion } from "motion/react";
import { Certificates } from "@/components/site/Certificates";

type Item = {
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
  className: string;
  big?: boolean;
};

const ITEMS: Item[] = [
  {
    eyebrow: "National Level",
    title: "OpenAI × NxtWave Buildathon",
    body: "Competed among top student teams nationwide to build an AI-driven solution under time constraints.",
    meta: "Achievement",
    className: "sm:col-span-2 sm:row-span-2",
    big: true,
  },
  {
    eyebrow: "Certification",
    title: "Generative AI & LLMs",
    meta: "Prompt engineering • RAG",
    className: "sm:col-span-2",
  },
  {
    eyebrow: "Certification",
    title: "Python for Data Science",
    meta: "Pandas • NumPy",
    className: "",
  },
  {
    eyebrow: "Certification",
    title: "LangChain & LangSmith",
    meta: "Agents • Observability",
    className: "",
  },
  {
    eyebrow: "Recognition",
    title: "Hackathon Finalist Team",
    meta: "AI product track",
    className: "sm:col-span-2",
  },
  {
    eyebrow: "Practice",
    title: "DSA & OOP Foundations",
    meta: "Ongoing",
    className: "sm:col-span-2",
  },
];

export function Achievement() {
  return (
    <section id="achievement" className="relative bg-secondary/30 py-[16vh]">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-10">Certifications & Achievements</p>
        <h2 className="display max-w-3xl text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.9]">
          PROOF OF WORK.
        </h2>

        <div className="mt-16 grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-3 sm:grid-cols-4">
          {ITEMS.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1.2, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                scale: 1.012,
                transition: { type: "spring", stiffness: 90, damping: 20, mass: 0.8 },
              }}
              whileTap={{
                scale: 0.994,
                transition: { type: "spring", stiffness: 140, damping: 22 },
              }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background/60 p-6 transition-[border-color,box-shadow,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal/50 hover:bg-background/80 hover:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:p-8 ${it.className}`}
            >
              {it.big && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_20%,transparent),transparent_70%)] blur-2xl transition-opacity duration-1000 group-hover:opacity-80" />
              )}

              {/* slow sheen sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,color-mix(in_oklab,var(--foreground)_7%,transparent)_50%,transparent_65%)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
              />

              <p className="eyebrow relative text-signal">{it.eyebrow}</p>
              <div className="relative mt-8">
                <h3
                  className={`display leading-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 ${
                    it.big ? "text-[clamp(1.8rem,4vw,3.4rem)]" : "text-xl sm:text-2xl"
                  }`}
                >
                  {it.title}
                </h3>
                {it.body && (
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {it.body}
                  </p>
                )}
                {it.meta && (
                  <p className="mt-4 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-700 group-hover:text-foreground/70">
                    {it.meta}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <Certificates />
      </div>
    </section>
  );
}
