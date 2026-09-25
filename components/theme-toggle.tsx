"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const order: Theme[] = ["system", "light", "dark"];
const EVENT = "themechange";

function read(): Theme {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function apply(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(EVENT));
}

const labels: Record<Theme, string> = { system: "System", light: "Light", dark: "Dark" };

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => "system" as Theme);
  const next = order[(order.indexOf(theme) + 1) % order.length]!;

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      className="text-muted hover:text-ink inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
      title={`Theme: ${labels[theme]} (switch to ${labels[next]})`}
    >
      <span className="sr-only">
        Theme: {labels[theme]}. Switch to {labels[next]}
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {theme === "system" && <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />}
        {theme === "dark" && <circle cx="12" cy="12" r="8.25" fill="currentColor" />}
      </svg>
    </button>
  );
}
