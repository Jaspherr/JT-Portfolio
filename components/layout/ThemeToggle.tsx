"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useSyncExternalStore,
} from "react";

import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "jaspher-theme";
const THEME_EVENT = "jaspher-theme-change";

/* ========================================
   HELPERS
======================================== */

function isTheme(
  value: string | null | undefined,
): value is Theme {
  return (
    value === "light" ||
    value === "dark"
  );
}

function getTheme(): Theme {
  if (
    typeof window === "undefined"
  ) {
    return "light";
  }

  try {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (isTheme(stored)) {
      return stored;
    }
  } catch {
    // Fall through.
  }

  const domTheme =
    document.documentElement.dataset
      .theme;

  return domTheme === "dark"
    ? "dark"
    : "light";
}

function updateThemeColor(
  theme: Theme,
) {
  if (
    typeof document === "undefined"
  ) {
    return;
  }

  let meta =
    document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

  if (!meta) {
    meta =
      document.createElement("meta");

    meta.name = "theme-color";

    document.head.appendChild(meta);
  }

  meta.content =
    theme === "dark"
      ? "#11100e"
      : "#fdfdfb";
}

function applyTheme(
  theme: Theme,
) {
  if (
    typeof document === "undefined"
  ) {
    return;
  }

  const root =
    document.documentElement;

  root.dataset.theme = theme;

  root.dataset.themePreference =
    theme;

  root.style.colorScheme =
    theme;

  updateThemeColor(theme);
}

function saveTheme(
  theme: Theme,
) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      theme,
    );
  } catch {
    // Theme still works for current session.
  }
}

/* ========================================
   EXTERNAL STORE
======================================== */

function getSnapshot(): Theme {
  return getTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(
  notify: () => void,
) {
  if (
    typeof window === "undefined"
  ) {
    return () => {};
  }

  const handleStorage = (
    event: StorageEvent,
  ) => {
    if (
      event.key !== STORAGE_KEY &&
      event.key !== null
    ) {
      return;
    }

    const theme = getTheme();

    applyTheme(theme);
    notify();
  };

  const handleThemeChange = () => {
    notify();
  };

  window.addEventListener(
    "storage",
    handleStorage,
  );

  window.addEventListener(
    THEME_EVENT,
    handleThemeChange,
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage,
    );

    window.removeEventListener(
      THEME_EVENT,
      handleThemeChange,
    );
  };
}

/* ========================================
   COMPONENT
======================================== */

export default function ThemeToggle() {
  const theme =
    useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot,
    );

  const isDark =
    theme === "dark";

  const toggleTheme = () => {
    const nextTheme: Theme =
      isDark
        ? "light"
        : "dark";

    saveTheme(nextTheme);

    applyTheme(nextTheme);

    window.dispatchEvent(
      new CustomEvent(
        THEME_EVENT,
      ),
    );
  };

  return (
    <div className="theme-toggle">
      <button
        type="button"
        className={styles.trigger}
        onClick={toggleTheme}
        aria-label={
          isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        title={
          isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {isDark ? (
            <Moon />
          ) : (
            <Sun />
          )}
        </span>

        <span className="sr-only">
          {isDark
            ? "Dark mode"
            : "Light mode"}
        </span>
      </button>
    </div>
  );
}