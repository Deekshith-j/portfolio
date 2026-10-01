import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const POINTS = [
    {
      year: "2025",
      label: "Programme begins",
      detail: "B.Tech — Artificial Intelligence and Data Science",
    },
    {
      year: "Now",
      label: "In progress",
      detail: "Building AI applications with Python, RAG and LLMs",
    },
    { year: "2029", label: "Graduation", detail: "Sanjay Ghodawat University" },
  ];

  return (
    <section
      ref={ref}
      id="education"
      className="relative bg-background/80 backdrop-blur-md py-[14vh]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-12">Education</p>

        <div className="relative pl-10 sm:pl-16">
          <div className="absolute left-0 top-0 h-full w-px bg-border sm:left-3" />
          <motion.div
            style={{ height }}
            className="absolute left-0 top-0 w-px bg-signal sm:left-3"
          />

          {POINTS.map((p, i) => (
            <motion.div
              key={p.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-b border-border py-14 last:border-b-0"
            >
              <span className="absolute -left-10 top-[4.6rem] h-1.5 w-1.5 rounded-full bg-signal sm:-left-[3.42rem]" />
              <p className="display text-[clamp(2.4rem,8vw,7rem)] leading-none">{p.year}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {p.label}
              </p>
              <p className="mt-3 text-lg sm:text-xl">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
