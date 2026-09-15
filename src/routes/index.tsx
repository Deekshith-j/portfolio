import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { TechStack } from "@/components/site/TechStack";
import { Projects } from "@/components/site/Projects";
import { AISystems } from "@/components/site/AISystems";
import { Achievement } from "@/components/site/Achievement";
import { Education } from "@/components/site/Education";
import { Competencies } from "@/components/site/Competencies";
import { Contact } from "@/components/site/Contact";
import { FloatingContact } from "@/components/site/FloatingContact";
import { NeuralDossierModal } from "@/components/site/NeuralDossierModal";
import { scrollState, pointerState } from "@/lib/scroll-store";
import DarkVeil from "@/components/DarkVeil";
import { ClientOnly } from "@/components/ClientOnly";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deekshith J — AI/ML Engineer" },
      {
        name: "description",
        content:
          "Deekshith J — Computer Science undergraduate in AI and Data Science building intelligent systems with Python, RAG, LangChain and LLMs.",
      },
      { property: "og:title", content: "Deekshith J — AI/ML Engineer" },
      {
        property: "og:description",
        content: "Building intelligent systems that turn ideas into reality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme } = useTheme();

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      scrollState.progress = max > 0 ? y / max : 0;
      scrollState.heroProgress = Math.min(1, y / (window.innerHeight * 1.6));
      scrollState.velocity = y - last;
      last = y;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onPointer = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* DarkVeil full page background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <ClientOnly>
          <DarkVeil
            speed={0.4}
            warpAmount={0.25}
            noiseIntensity={0.02}
            scanlineIntensity={0.08}
            scanlineFrequency={1.5}
            resolutionScale={1}
            lightMode={theme === "light"}
          />
        </ClientOnly>
      </div>


      <Nav />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <AISystems />
      <Achievement />
      <Education />
      <Competencies />
      <Contact />
      <FloatingContact />
      <NeuralDossierModal />
    </main>
  );
}

