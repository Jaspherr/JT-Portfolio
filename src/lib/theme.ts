export type Theme = "light" | "dark";

const STORAGE_KEY = "jaspher-theme";
const THEME_EVENT = "jaspher-theme-change";

const THEME_COLORS: Record<Theme, string> = {
  light: "#fdfdfb",
  dark: "#11100e",
};

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function getTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isTheme(stored)) return stored;
  } catch {
    // Storage unavailable: fall back to what the DOM says.
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.dataset.themePreference = theme;
  root.style.colorScheme = theme;

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = THEME_COLORS[theme];
}

export function setTheme(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme still works for the current session.
  }

  applyTheme(theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

export function subscribeToTheme(notify: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;

    applyTheme(getTheme());
    notify();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_EVENT, notify);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_EVENT, notify);
  };
}