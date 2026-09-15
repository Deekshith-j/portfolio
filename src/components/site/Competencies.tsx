import { motion } from "motion/react";

const WORDS = ["COMMUNICATION", "LEADERSHIP", "TEAMWORK", "ANALYTICAL THINKING", "ADAPTABILITY"];

export function Competencies() {
  return (
    <section className="relative bg-secondary/30 py-[14vh]">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-12">Core Competencies</p>
        <div className="display">
          {WORDS.map((w, i) => (
            <div key={w} className="overflow-hidden border-b border-border py-4">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.6rem,5.5vw,4.4rem)] leading-none transition-colors duration-500 hover:text-signal"
              >
                {w}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
