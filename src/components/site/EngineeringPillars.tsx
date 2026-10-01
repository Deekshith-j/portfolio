import { motion } from "motion/react";

const PILLARS = [
  {
    label: "AI Systems",
    value: "End-to-end",
    detail:
      "Designing agents, LLM workflows and intelligent products from prototype to production.",
  },
  {
    label: "RAG & Retrieval",
    value: "Production-ready",
    detail: "Building pipelines that fetch, rank and ground answers in real data sources.",
  },
  {
    label: "Backend Logic",
    value: "Python-first",
    detail: "Writing fast, reliable services and APIs that keep AI features stable and scalable.",
  },
  {
    label: "Prompt Engineering",
    value: "Structured output",
    detail: "Crafting prompts and evaluations that make models predictable and useful.",
  },
];

export function EngineeringPillars() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {PILLARS.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.9,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/30 p-5 backdrop-blur-sm transition-colors duration-500 hover:bg-secondary/60"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-signal/10 via-transparent to-transparent" />
          </div>
          <p className="eyebrow mb-6 text-[0.6rem]">{p.label}</p>
          <p className="display text-xl leading-none sm:text-2xl">{p.value}</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
