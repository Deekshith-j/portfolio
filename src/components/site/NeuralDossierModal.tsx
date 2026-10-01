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

const RESUME_MARKDOWN = `# DEEKSHITH J
**Aspiring AI/ML Engineer | Python & Web Development**
**Contact:** +91 9535892361 | **Email:** deekshithj188@gmail.com
**Profiles:** [LinkedIn](https://www.linkedin.com/in/deekshith-j-5773b336b/) | [GitHub](https://github.com/Deekshith-j)

---

## PROFESSIONAL SUMMARY
B.Tech student in Artificial Intelligence and Data Science who builds and ships practical projects, from an IoT water-quality monitor with a live cloud dashboard to a multilingual voice-based RAG assistant. National-level participant in the OpenAI x NxtWave Buildathon. Seeking an AI/ML or full-stack internship.

---

## TECHNICAL SKILLS
- **Languages:** Python, JavaScript, C++, HTML, CSS, SQLite
- **Backend & Web:** Node.js, Express.js, REST APIs, React, Next.js, Tailwind CSS, Supabase, Firebase
- **AI / ML:** LLM applications, Basic RAG, Prompt Engineering
- **Tools:** Git, GitHub, Vercel, Arduino, ESP32
- **Others:** Basic DSA (C++)

---

## FEATURED PROJECTS

### 1. Crystal-Agent – Voice Question-Answering Assistant (Personal Project)
- **Tech Stack:** Python, FAISS, Next.js, Docker
- Voice assistant that answers questions in English, Hindi, Kannada, and Marathi using a large document collection.
- Searches in two ways (by keywords and by meaning) so answers come from real data, and says "no answer" when it has none.
- Fast: finds the best answer in about 157 ms.

### 2. HydroVision AI – Water Quality Monitor (Group Project • Team Lead)
- **Tech Stack:** Arduino, ESP32, Firebase, React, TypeScript
- Sensors measure water pH, dissolved solids, cloudiness, and temperature.
- An ESP32 sends the readings to the cloud, and a web dashboard shows live data, a map, and alerts when water is unsafe.
- **Role:** Team Lead — Hardware, backend telemetry, and database.

### 3. AI Scholarship Agent (Personal Project)
- **Tech Stack:** JavaScript, Node.js, Express.js, Google Gemini API
- Finds scholarships for a student and ranks them by how well they match the student profile.
- Uses specialized AI agents for each task: search, eligibility, essay assistance, and deadline tracking.

### 4. JanSeva – Government Service Booking (Group Project • Team Lead)
- **Tech Stack:** TypeScript, Supabase, Vercel, React
- Website where citizens book government services and join queues online, cutting down physical waiting times.
- **Role:** Team Lead — Backend infrastructure, queue algorithms, and database.

---

## ACHIEVEMENTS
- **National-Level Participant, OpenAI × NxtWave Buildathon** — Built an AI-driven solution with a team under time constraints.

---

## EDUCATION
- **B.Tech in Artificial Intelligence and Data Science** (Aug 2025 – Jun 2029)
  Sanjay Ghodawat University
  **1st Year CGPA: 8.55**

---

## CORE COMPETENCIES
Communication • Leadership • Teamwork • Analytical Thinking • Adaptability
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
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
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
                      <span className="text-xl sm:text-2xl font-black text-foreground">8.55</span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        1st Year CGPA
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-foreground">
                        4 SHIPPED
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        Practical Projects
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/60 border border-border/70 text-center">
                      <span className="text-xl sm:text-2xl font-black text-foreground">
                        2025–29
                      </span>
                      <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-muted-foreground">
                        Sanjay Ghodawat Univ
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
                        "JavaScript",
                        "C++",
                        "React",
                        "Next.js",
                        "Node.js",
                        "Express.js",
                        "Supabase",
                        "Firebase",
                        "Arduino",
                        "ESP32",
                        "Docker",
                        "FAISS",
                        "LLM Applications",
                        "Basic RAG",
                        "Prompt Engineering",
                        "Git & GitHub",
                        "REST APIs",
                        "SQLite",
                        "Basic DSA",
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
                      Featured Practical Projects
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          01 • VOICE RAG & FAISS
                        </span>
                        <h5 className="font-bold text-sm mt-1">Crystal-Agent</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Multilingual voice QA assistant (EN, HI, KN, MR) with dual hybrid search
                          and ~157ms answer retrieval.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          02 • IOT & TELEMETRY (LEAD)
                        </span>
                        <h5 className="font-bold text-sm mt-1">HydroVision AI</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          IoT water quality telemetry system with ESP32 sensor transmission,
                          Firebase cloud, and live alert dashboard.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          03 • MULTI-AGENT GEMINI
                        </span>
                        <h5 className="font-bold text-sm mt-1">AI Scholarship Agent</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Multi-agent system handling discovery, eligibility reasoning, essay
                          drafting, and deadline tracking for students.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-card/60 border border-border">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                          04 • PUBLIC SERVICES (LEAD)
                        </span>
                        <h5 className="font-bold text-sm mt-1">JanSeva Service Booking</h5>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          Digital government service reservation and virtual queue management system
                          cutting down in-person waiting times.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ATS Terminal View */
                <div className="relative rounded-2xl bg-neutral-900 text-neutral-200 p-5 sm:p-6 font-mono text-xs leading-relaxed overflow-x-auto border border-neutral-700 shadow-inner">
                  <pre className="whitespace-pre-wrap select-text font-mono">{RESUME_MARKDOWN}</pre>
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
