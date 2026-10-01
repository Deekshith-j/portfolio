import { lazy, Suspense } from "react";
import { ClientOnly } from "@/components/ClientOnly";

const SkillsUniverse = lazy(() => import("@/components/three/SkillsUniverse"));

export function TechStack() {
  return (
    <section id="stack" className="relative bg-secondary/30 py-[12vh]">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        <p className="eyebrow mb-6">Tech Stack</p>
        <h2 className="display max-w-2xl text-[clamp(2.2rem,6vw,5rem)]">
          A technology constellation.
        </h2>
        <p className="mt-5 text-sm text-muted-foreground">
          Drag or orbit to explore the technology constellation.
        </p>
      </div>
      <div className="mt-6 h-[70svh] w-full">
        <ClientOnly>
          <Suspense fallback={null}>
            <SkillsUniverse />
          </Suspense>
        </ClientOnly>
      </div>
    </section>
  );
}
