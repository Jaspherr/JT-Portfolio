import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import {
  getTheme,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "@/lib/theme";

const getServerTheme = (): Theme => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="theme-toggle">
      <button
        type="button"
        className="theme-toggle-trigger"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={label}
        title={label}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {isDark ? <Moon /> : <Sun />}
        </span>

        <span className="sr-only">{isDark ? "Dark mode" : "Light mode"}</span>
      </button>
    </div>
  );
}