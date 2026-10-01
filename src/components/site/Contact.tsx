import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { LaserFlow } from "@/components/ui/LaserFlow";
import { ClientOnly } from "@/components/ClientOnly";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { useTheme } from "@/hooks/use-theme";
import { openNeuralDossier } from "./NeuralDossierModal";

/* ─── Glass Icon Components with Crystal Gradient and Specular Edge ─── */

function MailGlassIcon({ isLight }: { isLight: boolean }) {
  const gradId = `mail-glass-${isLight ? "light" : "dark"}`;
  return (
    <svg
      className="h-7 w-7 sm:h-[1.85rem] sm:w-[1.85rem] relative z-10 transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#3B0764" : "#FFFFFF"} stopOpacity={1} />
          <stop offset="45%" stopColor={isLight ? "#6B21A8" : "#E9D5FF"} stopOpacity={0.95} />
          <stop offset="100%" stopColor={isLight ? "#9333EA" : "#A855F7"} stopOpacity={1} />
        </linearGradient>
      </defs>
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="3.5"
        fill={isLight ? "rgba(147, 51, 234, 0.08)" : "rgba(255, 255, 255, 0.16)"}
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
      />
      <path
        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneGlassIcon({ isLight }: { isLight: boolean }) {
  const gradId = `phone-glass-${isLight ? "light" : "dark"}`;
  return (
    <svg
      className="h-7 w-7 sm:h-[1.85rem] sm:w-[1.85rem] relative z-10 transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#3B0764" : "#FFFFFF"} stopOpacity={1} />
          <stop offset="45%" stopColor={isLight ? "#6B21A8" : "#E9D5FF"} stopOpacity={0.95} />
          <stop offset="100%" stopColor={isLight ? "#9333EA" : "#A855F7"} stopOpacity={1} />
        </linearGradient>
      </defs>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill={isLight ? "rgba(147, 51, 234, 0.08)" : "rgba(255, 255, 255, 0.16)"}
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
      />
    </svg>
  );
}

function LinkedinGlassIcon({ isLight }: { isLight: boolean }) {
  const gradId = `linkedin-glass-${isLight ? "light" : "dark"}`;
  return (
    <svg
      className="h-7 w-7 sm:h-[1.85rem] sm:w-[1.85rem] relative z-10 transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#3B0764" : "#FFFFFF"} stopOpacity={1} />
          <stop offset="45%" stopColor={isLight ? "#6B21A8" : "#E9D5FF"} stopOpacity={0.95} />
          <stop offset="100%" stopColor={isLight ? "#9333EA" : "#A855F7"} stopOpacity={1} />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4.5"
        fill={isLight ? "rgba(147, 51, 234, 0.08)" : "rgba(255, 255, 255, 0.16)"}
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
      />
      <path
        d="M8.5 10.5v6M8.5 7.5v.01M12.5 16.5v-3.8c0-1.2.9-2.2 2.1-2.2s2.1 1 2.1 2.2v3.8M12.5 13v-2.5"
        stroke={`url(#${gradId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubGlassIcon({ isLight }: { isLight: boolean }) {
  const gradId = `github-glass-${isLight ? "light" : "dark"}`;
  return (
    <svg
      className="h-7 w-7 sm:h-[1.85rem] sm:w-[1.85rem] relative z-10 transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#3B0764" : "#FFFFFF"} stopOpacity={1} />
          <stop offset="45%" stopColor={isLight ? "#6B21A8" : "#E9D5FF"} stopOpacity={0.95} />
          <stop offset="100%" stopColor={isLight ? "#9333EA" : "#A855F7"} stopOpacity={1} />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill={isLight ? "rgba(147, 51, 234, 0.08)" : "rgba(255, 255, 255, 0.16)"}
        stroke={`url(#${gradId})`}
        strokeWidth="1.4"
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
      />
    </svg>
  );
}

function GlassIconBadge({ children, isLight }: { children: React.ReactNode; isLight: boolean }) {
  return (
    <div className="relative mb-4 flex items-center justify-center pointer-events-none">
      <GlassSurface
        width={64}
        height={64}
        borderRadius={20}
        borderWidth={0.08}
        distortionScale={-90}
        blur={12}
        brightness={isLight ? 85 : 52}
        opacity={isLight ? 0.95 : 0.9}
        className="relative overflow-hidden border border-white/60 dark:border-white/25 shadow-[inset_0_2px_1.5px_0_rgba(255,255,255,0.9),inset_0_-1.5px_2px_0_rgba(0,0,0,0.15),0_10px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_1.5px_0_rgba(255,255,255,0.55),inset_0_-2px_3px_0_rgba(0,0,0,0.55),0_12px_28px_-6px_rgba(0,0,0,0.65)] group-hover:border-[#A855F7] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.7),inset_0_2px_2px_rgba(255,255,255,0.95)] transition-all duration-300"
        contentClassName="flex items-center justify-center relative overflow-hidden"
      >
        {/* Specular glass reflection on top curved half */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[48%] rounded-t-[19px] bg-gradient-to-b from-white/60 dark:from-white/30 via-white/15 to-transparent"
        />
        {/* Prismatic glass light flare sweep on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-full rotate-45 bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-700 ease-out"
        />
        {children}
      </GlassSurface>
    </div>
  );
}

const LINKS = [
  {
    label: "Email",
    href: "mailto:deekshithj188@gmail.com",
    value: "deekshithj188@gmail.com",
    icon: MailGlassIcon,
  },
  {
    label: "Phone",
    href: "tel:+919535892361",
    value: "+91 95358 92361",
    icon: PhoneGlassIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deekshith-j-5773b336b/",
    value: "in/deekshith-j-5773b336b",
    icon: LinkedinGlassIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Deekshith-j",
    value: "@Deekshith-j",
    icon: GithubGlassIcon,
  },
];

export function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-[14vh] sm:py-[20vh] transition-colors duration-500"
    >
      {/* Volumetric LaserFlow Shader at Full Bottom Below Contact Button in Royal Indigo-Violet */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] sm:h-[58%] z-0 overflow-hidden opacity-95 dark:opacity-90">
        <ClientOnly>
          <LaserFlow
            color={isLight ? "#4C1D95" : "#5B18D6"}
            backgroundColor={isLight ? "#f5f5f8" : "#050507"}
            horizontalBeamOffset={0.0}
            verticalBeamOffset={-0.1}
            horizontalSizing={0.7}
            verticalSizing={2.0}
            wispDensity={1.2}
            wispSpeed={15}
            wispIntensity={5.5}
            flowSpeed={0.35}
            flowStrength={0.25}
            fogIntensity={isLight ? 0.35 : 0.55}
            fogScale={0.3}
            fogFallSpeed={0.6}
            decay={1.1}
            falloffStart={1.2}
            mouseTiltStrength={0.02}
          />
        </ClientOnly>

        {/* Top Fade Blend from Section Background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"
        />

        {/* Bottom Baseline Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[clamp(2.1rem,9vw,11rem)] leading-[0.88] break-words"
        >
          LET&rsquo;S BUILD
          <br />
          SOMETHING INTELLIGENT.
        </motion.h2>

        <p className="mt-6 sm:mt-10 max-w-lg text-base sm:text-lg text-muted-foreground">
          Have an idea, opportunity, or problem worth solving?
        </p>

        <div className="mt-14 sm:mt-24 flex flex-col items-center gap-4">
          <MagneticButton href="mailto:deekshithj188@gmail.com" size="lg" strength={0.5}>
            CONTACT DEEKSHITH →
          </MagneticButton>

          {/* Creative Resume Access Option */}
          <button
            type="button"
            onClick={openNeuralDossier}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 dark:bg-purple-500/20 hover:bg-purple-500/25 text-purple-700 dark:text-purple-300 font-mono text-[0.66rem] sm:text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(147,51,234,0.25)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACCESS NEURAL DOSSIER // DOWNLOAD RESUME</span>
            <span className="text-purple-400 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Contact Links with Official Brand Glass Icons */}
        <ul className="mt-16 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col items-center justify-center text-center p-4 sm:p-7 rounded-2xl bg-card/65 dark:bg-card/45 backdrop-blur-xl border border-border/80 hover:border-[#5B18D6]/60 hover:shadow-[0_12px_35px_-8px_rgba(72,20,161,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                <GlassIconBadge isLight={isLight}>
                  <l.icon isLight={isLight} />
                </GlassIconBadge>
                <span className="text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-foreground font-mono font-semibold">
                  {l.label}
                </span>
                <span className="mt-1 font-mono text-[0.68rem] sm:text-xs text-foreground/80 group-hover:text-foreground transition-colors truncate max-w-full">
                  {l.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-16 sm:mt-24 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          &copy; 2026 Deekshith J — AI/ML Engineer
        </p>
      </div>
    </section>
  );
}
