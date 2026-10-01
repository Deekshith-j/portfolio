import { motion } from "motion/react";
import { EngineeringPillars } from "./EngineeringPillars";

const LINES = ["ENGINEER", "BUILDER", "PROBLEM SOLVER"];

const STACK = [
  "Python",
  "RAG",
  "LangChain",
  "LangSmith",
  "LLMs",
  "Prompt Engineering",
  "Backend Logic",
];

export function About() {
  return (
    <section id="about" className="relative bg-background/80 backdrop-blur-md py-[16vh]">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-12">About</p>
        <h2 className="display max-w-3xl text-[clamp(2.2rem,7vw,6rem)] leading-[0.9]">
          ENGINEERING INTELLIGENCE.
        </h2>

        <div className="mt-24 display text-[clamp(2.4rem,9vw,8rem)]">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-12 border-t border-border pt-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground md:col-span-4 md:sticky md:top-32 md:self-start"
          >
            <EngineeringPillars />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:col-start-6"
          >
            <p className="text-xl leading-relaxed sm:text-2xl">
              Computer Science undergraduate specializing in Artificial Intelligence and Data
              Science. I build AI applications end to end — retrieval pipelines, agents and the
              backend logic that keeps them grounded and reliable.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {STACK.map((s) => (
                <li key={s} className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-12 border-l border-signal/60 pl-6">
              <p className="eyebrow mb-2">National Level Achievement</p>
              <p className="display text-2xl sm:text-3xl">OpenAI × NxtWave Buildathon</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Competed among top student teams nationwide to build an AI-driven solution under
                time constraints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
