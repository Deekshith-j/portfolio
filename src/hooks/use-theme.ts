import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function setThemeState(next: Theme) {
  currentTheme = next;
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("theme", next);
  }
  notify();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => {
      if (typeof window !== "undefined") {
        const stored = (window.localStorage.getItem("theme") as Theme | null) ?? "dark";
        if (stored !== currentTheme) {
          currentTheme = stored;
        }
      }
      return currentTheme;
    },
    () => "dark",
  );

  useEffect(() => {
    const stored = (window.localStorage.getItem("theme") as Theme | null) ?? "dark";
    currentTheme = stored;
    document.documentElement.classList.toggle("light", stored === "light");
    document.documentElement.classList.toggle("dark", stored === "dark");
    document.documentElement.style.colorScheme = stored;
    notify();
  }, []);

  const toggle = useCallback(() => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setThemeState(next);
  }, []);

  return { theme, toggle };
}
