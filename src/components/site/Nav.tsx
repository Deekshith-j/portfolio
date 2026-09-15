import { Moon, Sun, FileDown } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import GlassSurface from "@/components/ui/GlassSurface";
import { openNeuralDossier } from "./NeuralDossierModal";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "AI Systems", href: "#ai-systems" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <>
      {/* Top Editorial Wordmark & Quick Dossier Access */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-12 sm:py-6 pointer-events-none">
        <a
          href="#top"
          className="pointer-events-auto font-mono text-xs sm:text-[0.82rem] uppercase tracking-[0.28em] text-foreground font-semibold transition-opacity hover:opacity-70"
          aria-label="Deekshith J — home"
        >
          DEEKSHITH J
        </a>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={openNeuralDossier}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/15 dark:border-white/15 bg-card/60 backdrop-blur-md font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-foreground/80 hover:text-foreground uppercase transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
            <span className="font-semibold">RESUME // CV</span>
            <FileDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </header>

      {/* Floating Bottom Liquid Glass Navbar */}
      <nav
        aria-label="Primary Navigation"
        className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 mx-auto w-fit max-w-[96vw] flex items-center justify-center pointer-events-auto select-none"
      >
        <GlassSurface
          borderRadius={999}
          borderWidth={0.08}
          distortionScale={-150}
          blur={16}
          brightness={isLight ? 60 : 45}
          opacity={0.94}
          className="shadow-[0_16px_40px_-10px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] border border-neutral-300/60 dark:border-white/10"
          contentClassName="px-3.5 py-1.5 sm:px-6 sm:py-2.5 flex items-center gap-2.5 sm:gap-5"
        >
          <ul className="flex items-center gap-2 sm:gap-5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-[0.62rem] sm:text-[0.72rem] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white transition-colors duration-200 font-semibold py-1 px-1 sm:px-1.5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-3.5 w-px bg-neutral-300 dark:bg-white/20" aria-hidden />

          {/* Holographic Resume Trigger Chip in Floating Dock */}
          <button
            type="button"
            onClick={openNeuralDossier}
            aria-label="Open Neural Dossier and download resume"
            className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-purple-500/15 dark:bg-purple-500/25 border border-purple-500/30 hover:border-purple-400 font-mono text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.16em] text-purple-700 dark:text-purple-300 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>CV</span>
          </button>

          <div className="h-3.5 w-px bg-neutral-300 dark:bg-white/20" aria-hidden />

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white transition-colors duration-200 p-1.5 rounded-full hover:bg-neutral-200/50 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </GlassSurface>
      </nav>
    </>
  );
}
