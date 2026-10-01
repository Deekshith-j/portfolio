import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageCircle, X } from "lucide-react";
import GlassSurface from "@/components/ui/GlassSurface";

const spring = { type: "spring", stiffness: 260, damping: 26 } as const;

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 350);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-18 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
    >
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              key="mail"
              href="mailto:deekshithj188@gmail.com"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ ...spring, delay: 0.05 }}
              className="flex items-center gap-3 rounded-full bg-card/95 border border-border/80 py-2.5 pl-4 pr-5 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-200 hover:scale-105 hover:border-signal/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                <Mail size={14} className="stroke-[2.2]" />
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-foreground font-bold">
                Email
              </span>
            </motion.a>
            <motion.a
              key="wa"
              href="https://wa.me/919535892361"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={spring}
              className="flex items-center gap-3 rounded-full bg-card/95 border border-border/80 py-2.5 pl-4 pr-5 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-200 hover:scale-105 hover:border-[#25D366]/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
                <MessageCircle size={14} className="stroke-[2.2]" />
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-foreground font-bold">
                WhatsApp
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={open ? "Close contact menu" : "Contact Deekshith"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={spring}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black dark:bg-white dark:text-black shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)] border-2 border-white/40 hover:bg-signal hover:text-black transition-all duration-300"
      >
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-background" />
          </span>
        )}
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={spring} className="flex">
          {open ? (
            <X size={22} className="stroke-[2.5]" />
          ) : (
            <MessageCircle size={22} className="stroke-[2.5]" />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}
