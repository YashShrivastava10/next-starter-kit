// stores/useThemeStore.ts

import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const actual = theme === "system" ? getSystemTheme() : theme;

  root.classList.remove("light", "dark");
  root.classList.add(actual);
};

export const useThemeStore = create<ThemeStore>((set) => {
  let initialTheme: Theme = "system";
  let resolved: "light" | "dark" = "light";

  if (typeof window !== "undefined") {
    initialTheme = (localStorage.getItem("theme") as Theme) || "system";
    resolved = initialTheme === "system" ? getSystemTheme() : initialTheme;

    applyTheme(initialTheme);

    // System change listener
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const saved = localStorage.getItem("theme") as Theme;
        if (saved === "system") {
          const newResolved = e.matches ? "dark" : "light";
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(newResolved);
          set({ resolvedTheme: newResolved });
        }
      });
  }

  return {
    theme: initialTheme,
    resolvedTheme: resolved,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
      set({
        theme,
        resolvedTheme: theme === "system" ? getSystemTheme() : theme,
      });
    },
  };
});
