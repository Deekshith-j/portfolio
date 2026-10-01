import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Project = {
  index: string;
  title: string;
  label: string;
  tech: string;
  description: string;
  flow: string[];
  note?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "CRYSTAL-AGENT",
    label: "Multilingual Voice QA Assistant • Personal Project",
    tech: "Python • FAISS • Next.js • Docker • RAG",
    description:
      "Voice assistant that answers questions in English, Hindi, Kannada, and Marathi using a large document collection. Combines keyword and semantic meaning search so answers come from real data with strict no-hallucination fallback.",
    flow: [
      "VOICE INPUT (4 LANGUAGES)",
      "HYBRID SEARCH (FAISS)",
      "SEMANTIC CONTEXT MATCH",
      "SUB-160ms ANSWER DISPATCH",
    ],
    note: "Ultra-fast: retrieves grounded answers in ~157 ms.",
    github: "https://github.com/Deekshith-j",
  },
  {
    index: "02",
    title: "HYDROVISION AI",
    label: "IoT Water Quality Monitor • Team Lead",
    tech: "Arduino • ESP32 • Firebase • React • TypeScript",
    description:
      "IoT water quality monitoring system. Sensors measure water pH, dissolved solids, cloudiness, and temperature. An ESP32 streams telemetry to Firebase, and a web dashboard displays real-time data, maps, and safety alerts.",
    flow: [
      "IOT SENSORS (pH / TDS / TEMP)",
      "ESP32 CLOUD TELEMETRY",
      "FIREBASE REALTIME DB",
      "LIVE MAP & HAZARD ALERTS",
    ],
    note: "Role: Team Lead — Hardware, backend telemetry & database architecture.",
    github: "https://github.com/Deekshith-j",
  },
  {
    index: "03",
    title: "AI SCHOLARSHIP AGENT",
    label: "Autonomous Multi-Agent System • Personal Project",
    tech: "JavaScript • Node.js • Express.js • Google Gemini API",
    description:
      "An intelligent platform that finds scholarships for students and ranks them based on profile match. Deploys specialized sub-agents for search, eligibility checks, essay assistance, and deadline tracking.",
    flow: [
      "STUDENT ACADEMIC PROFILE",
      "MULTI-AGENT DISCOVERY",
      "GEMINI ELIGIBILITY REASONING",
      "RANKED MATCHES & ESSAY HELP",
    ],
    note: "Modular agents dedicated to search, qualification, essay drafting, and deadlines.",
    github: "https://github.com/Deekshith-j",
  },
  {
    index: "04",
    title: "JANSEVA",
    label: "Government Service Booking • Team Lead",
    tech: "TypeScript • Supabase • Vercel • React",
    description:
      "Public digital service platform where citizens book municipal and government appointments and join virtual queues online, drastically minimizing in-person physical waiting times.",
    flow: [
      "CITIZEN SERVICE SELECTION",
      "SUPABASE REALTIME QUEUE",
      "VIRTUAL TOKEN ALLOCATION",
      "DESK DISPATCH NOTIFICATION",
    ],
    note: "Role: Team Lead — Backend APIs, queue algorithms & Supabase database design.",
    github: "https://github.com/Deekshith-j",
  },
];

function FlowNode({
  label,
  i,
  total,
  progress,
}: {
  label: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.1 + (i / total) * 0.5;
  const opacity = useTransform(progress, [start, start + 0.12], [0.2, 1]);
  const x = useTransform(progress, [start, start + 0.16], [24, 0]);
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-center justify-between border-b border-border py-5"
    >
      <span className="display text-base tracking-tight sm:text-xl">{label}</span>
      <span className="text-[0.6rem] uppercase tracking-[0.24em] text-signal">
        {String(i + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

function ProjectPanel({ p, idx, total }: { p: Project; idx: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: stackProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const isLast = idx === total - 1;
  const scale = useTransform(stackProgress, [0, 1], [1, isLast ? 1 : 0.9]);
  const opacity = useTransform(stackProgress, [0, 1], [1, isLast ? 1 : 0.35]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={ref}
      className="sticky h-[92svh]"
      style={{ top: `${4 + idx * 2.5}rem`, zIndex: idx + 1 }}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: "top center" }}
        className="mx-auto h-full w-[calc(100%-1.5rem)] max-w-[1500px] overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-xl sm:w-[calc(100%-3rem)]"
      >
        <div className="grid h-full grid-cols-1 gap-8 overflow-y-auto p-6 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:overflow-hidden">
          <motion.div style={{ y }} className="lg:col-span-6 lg:self-center">
            <p className="eyebrow mb-4 sm:mb-6">
              Project {p.index} — {p.label}
            </p>
            <h3 className="display text-[clamp(1.7rem,4.6vw,4rem)] leading-[0.92]">{p.title}</h3>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
              {p.description}
            </p>
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.22em] text-foreground sm:mt-8 sm:text-xs">
              {p.tech}
            </p>
            {p.note && (
              <p className="display mt-6 max-w-sm text-lg leading-tight text-signal sm:mt-10 sm:text-xl">
                {p.note}
              </p>
            )}
            {p.github && (
              <div className="mt-6 sm:mt-8">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 dark:border-white/20 bg-background/50 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-purple-500 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105"
                >
                  <span>VIEW ON GITHUB</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-6 lg:self-center">
            <div className="glass rounded-2xl p-5 sm:p-10">
              <p className="eyebrow mb-5 sm:mb-8">System Flow</p>
              <ul>
                {p.flow.map((f, i) => (
                  <FlowNode
                    key={f}
                    label={f}
                    i={i}
                    total={p.flow.length}
                    progress={scrollYProgress}
                  />
                ))}
              </ul>
              {p.index === "03" && (
                <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                  {["TRACE", "RETRIEVE", "GENERATE", "EVALUATE"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground sm:px-4 sm:text-[0.6rem]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative bg-background/80 backdrop-blur-md pb-[18vh]">
      <div className="mx-auto w-full max-w-[1500px] px-6 pb-[6vh] pt-[12vh] sm:px-10">
        <p className="eyebrow">Selected Work</p>
      </div>
      {PROJECTS.map((p, i) => (
        <ProjectPanel key={p.index} p={p} idx={i} total={PROJECTS.length} />
      ))}
    </section>
  );
}
