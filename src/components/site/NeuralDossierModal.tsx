import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Copy, Check, X, FileText, Sparkles, Terminal, Printer } from "lucide-react";
import GlassSurface from "@/components/ui/GlassSurface";
import { useTheme } from "@/hooks/use-theme";

// Global listener for opening the dossier modal from anywhere in the app
const DOSSIER_EVENT = "open-neural-dossier";

export function openNeuralDossier() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(DOSSIER_EVENT));
  }
}

const RESUME_MARKDOWN = `# DEEKSHITH J — AI & MACHINE LEARNING ENGINEER
**Location:** Bengaluru, India | **Email:** deekshithj188@gmail.com | **Phone:** +91 95358 92361
**Profiles:** [GitHub](https://github.com/deekshith) | [LinkedIn](https://linkedin.com/in/deekshith-j)
**National Honor:** Finalist — OpenAI × NxtWave Buildathon (Top Tier)

---

## PROFESSIONAL SUMMARY
Computer Science undergraduate specializing in Artificial Intelligence and Data Science. Engineering end-to-end intelligent systems: Retrieval-Augmented Generation (RAG) architectures, autonomous agent workflows, and scalable backend logic with Python, LangChain, and LangSmith. Passionate about eliminating hallucinations and building grounded, reliable AI products for real-world impact.

---

## HONORS & ACHIEVEMENTS
- **OpenAI × NxtWave Buildathon Finalist (National Level)**
  - Competed among top student engineering teams across India to architect and ship an autonomous AI solution under strict time and evaluation constraints.
- **Hackathon Finalist Team (AI Product Track)**
  - Designed and pitched AI-driven workflow automation tools to industry leaders.

---

## FEATURED PROJECTS
### 1. Smart Queue Management System (Python • Artificial Intelligence)
- Built an intelligent digital queue and token scheduling platform reducing physical waiting times in high-traffic commercial environments.
- Developed dynamic customer prioritization scores and real-time algorithmic queue rebalancing.

### 2. AI Scholarship Recommendation Agent (Python • LLMs • Prompt Engineering)
- Developed an intelligent assistant that processes student academic criteria to match optimal scholarship and financial aid opportunities.
- Crafted structured system prompts, context extractors, and automated eligibility justifications.

### 3. Enterprise HR Agent (Python • RAG • LangChain • LangSmith)
- Designed an end-to-end Retrieval-Augmented Generation chatbot to answer complex enterprise HR and policy queries with zero hallucination.
- Implemented LangSmith tracing and observability pipelines to monitor token usage, latency, and retrieval accuracy.

---

## TECHNICAL SKILLS
- **Languages:** Python, C++, SQL, HTML, CSS
- **AI & LLM Tools:** RAG, LangChain, LangSmith, Prompt Engineering, Vector Stores, OpenAI API
- **Foundations:** Data Structures & Algorithms (DSA), OOP, REST APIs, Git, GitHub

---

## EDUCATION
- **Bachelor of Technology (B.Tech) — AI & Data Science**
  Sanjay Ghodawat University (2025 – 2029 Expected)
  Focus: Autonomous Agent Architectures, Deep Learning, Advanced Data Systems

---

## CERTIFICATIONS
- Generative AI & Large Language Models — DeepLearning Academy
- Python for Data Science — DataScience Institute
- LangChain & LangSmith Agent Frameworks — Advanced LLM Observability
`;

export function NeuralDossierModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "markdown">("visual");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [decryptionStep, setDecryptionStep] = useState(0);

  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setDecryptionStep(0);
      // Run cybernetic decryption sequence
      const t1 = setTimeout(() => setDecryptionStep(1), 160);
      const t2 = setTimeout(() => setDecryptionStep(2), 320);
      const t3 = setTimeout(() => setDecryptionStep(3), 540);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    };

    window.addEventListener(DOSSIER_EVENT, handleOpen);
    return () => window.removeEventListener(DOSSIER_EVENT, handleOpen);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(RESUME_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    // Simulated quantum particle compile animation
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/Deekshith_J_AI_ML_Engineer_Resume.pdf";
      link.download = "Deekshith_J_AI_ML_Engineer_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop with chromatic blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Dossier Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#f8f8fc] dark:bg-[#09090f] text-foreground border border-neutral-300/80 dark:border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] dark:shadow-[0_25px_80px_-15px_rgba(109,40,217,0.35)] overflow-hidden z-10"
          >
            {/* Top Holographic Header Bar */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-border/80 bg-card/60 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-[0.24em] text-muted-foreground uppercase pl-2">
                  NEURAL DOSSIER // DEEKSHITH J
                </span>
                <span className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[0.62rem] font-mono font-semibold tracking-wider border border-purple-500/30">
                  <Sparkles className="h-3 w-3" />
                  ATS 98% MATCH
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close dossier"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Decryption Matrix Banner during load */}
            {decryptionStep < 3 && (
              <div className="bg-purple-950 text-purple-200 px-6 py-2.5 font-mono text-[0.68rem] flex items-center gap-3 border-b border-purple-800/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {decryptionStep === 0 && "INITIALIZING SECURE HANDSHAKE..."}
                  {decryptionStep === 1 && "DECRYPTING VECTOR EMBEDDINGS & AGENT CODE..."}
                  {decryptionStep === 2 && "CREDENTIALS VERIFIED // OPENAI × NXTWAVE FINALIST"}
                </span>
              </div>
            )}

            {/* Sub-Header Actions & Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 bg-background/80 border-b border-border/60">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-foreground/5 dark:bg-white/5 border border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab("visual")}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "visual"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Visual HUD</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("markdown")}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "markdown"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>ATS Terminal</span>
                  </span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="px-3 sm:px-3.5 py-1.5 rounded-xl border border-border bg-card/80 hover:bg-card text-foreground font-mono text-[0.7rem] sm:text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Copy ATS Markdown for AI & Recruiters"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy ATS"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                  className="relative group overflow-hidden px-4 sm:px-5 py-1.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B18D6] hover:to-[#7C3AED] text-white font-mono text-[0.72rem] sm:text-xs font-semibold flex items-center gap-2 shadow-[0_8px_20px_-4px_rgba(109,40,217,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  {downloading ? (
                    <>
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-300" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                      <span>Download PDF</span>
                    </>
                  )}

                  {/* Beam glare across button */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-full rotate-45 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out"
                  />
                </button>
              </div>
            </div>

            {/* Dossier Body Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              {activeTab === "visual" ? (
                <div className="space-y-6">
                  {/* Candidate Identity Card */}
                  <div className="p-6 rounded-2xl bg-card/75 backdrop-blur-xl border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-signal font-semibold mb-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available for Roles & Internships</span>
                      </div>
                      <h3 className="display text-3xl sm:text-4xl text-foreground font-black tracking-tight">
                        DEEKSHITH J
                      </h3>
                      <p className="mt-1 font-mono text-xs sm:text-sm text-muted-foreground">
                        AI & Machine Learning Engineer • B.Tech AI & Data Science
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-muted-foreground">
                      <span className="text-foreground font-semibold">Bengaluru, India</span>
                      <span>deekshithj188@gmail.com</span>
                      <span>+91 95358 92361</span>
                    </div>
                  </div>

                  {/* Quick Metric HUD */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
                        FINALIST
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        OpenAI Buildathon
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-foreground">
                        98%
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        ATS Relevance
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-foreground">
                        3+ PRODUCTION
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        AI Architectures
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-foreground">
                        2025–29
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        B.Tech AI Degree
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="p-6 rounded-2xl bg-card/60 border border-border/80">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-4">
                      Core Technical Arsenal
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Python",
                        "RAG",
                        "LangChain",
                        "LangSmith",
                        "LLMs",
                        "Prompt Engineering",
                        "C++",
                        "Data Structures",
                        "Vector DBs",
                        "API Integration",
                        "NLP",
                        "Git & GitHub",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-foreground/5 dark:bg-white/5 border border-border text-foreground font-mono text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects Highlight */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold">
                      Grounded AI Deployments
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          01 • QUEUE INTELLIGENCE
                        </span>
                        <h5 className="font-bold text-sm mt-1">Smart Queue System</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Dynamic token prioritization and real-time scheduling reducing physical wait times.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          02 • LLM REASONING
                        </span>
                        <h5 className="font-bold text-sm mt-1">Scholarship Agent</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Intelligent matching of students to scholarships with explainable eligibility mapping.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          03 • RAG + OBSERVABILITY
                        </span>
                        <h5 className="font-bold text-sm mt-1">Enterprise HR Agent</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Knowledge base retrieval chatbot with LangSmith evaluation to eliminate hallucination.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ATS Terminal View */
                <div className="relative rounded-2xl bg-neutral-900 text-neutral-200 p-5 sm:p-6 font-mono text-xs leading-relaxed overflow-x-auto border border-neutral-700 shadow-inner">
                  <pre className="whitespace-pre-wrap select-text font-mono">
                    {RESUME_MARKDOWN}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Footer Note */}
            <div className="px-5 sm:px-8 py-3.5 bg-card/60 border-t border-border flex items-center justify-between font-mono text-[0.65rem] sm:text-xs text-muted-foreground">
              <span>FORMAT: ATS COMPLIANT • RECRUITER VERIFIED</span>
              <button
                type="button"
                onClick={handlePrint}
                className="hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
