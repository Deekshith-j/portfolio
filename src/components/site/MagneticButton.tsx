import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import GlassSurface from "@/components/ui/GlassSurface";

type Props = {
  children: ReactNode;
  href?: string;
  strength?: number;
  className?: string;
  size?: "sm" | "lg";
};

export function MagneticButton({ children, href, strength = 0.4, className = "", size = "sm" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const rotateY = useTransform(x, [-80, 80], [-9, 9]);
  const rotateX = useTransform(y, [-60, 60], [7, -7]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
  };

  const pad = size === "lg" ? "px-14 py-8 text-2xl sm:px-20 sm:py-10 sm:text-4xl" : "px-6 py-3 text-sm";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{ x, y, rotateX, rotateY, transformPerspective: 700 }}
      animate={{ scale: hover ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full cursor-pointer ${className}`}
    >
      <GlassSurface
        borderRadius={999}
        borderWidth={size === "lg" ? 0.05 : 0.08}
        distortionScale={size === "lg" ? -200 : -140}
        redOffset={0}
        greenOffset={8}
        blueOffset={16}
        className="h-full w-full !bg-foreground !text-background dark:!bg-white dark:!text-black shadow-xl transition-colors duration-300"
        contentClassName={`relative inline-flex items-center justify-center ${pad} font-semibold tracking-tight !text-background dark:!text-black`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120px circle at 50% 50%, color-mix(in oklab, var(--signal) 55%, transparent), transparent 70%)",
          }}
          animate={{ opacity: hover ? 1 : 0, scale: hover ? 1.6 : 0.6 }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
        <span className="relative z-10">{children}</span>
      </GlassSurface>
    </motion.a>
  );
}
