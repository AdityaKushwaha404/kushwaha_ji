// src/components/Header.jsx
import React from "react";

/**
 * Header.jsx
 * Simplified header that includes:
 * - Brand
 * - Theme toggle (cycles built-in themes)
 * - Open menu button (dispatches swrr:openNav)
 *
 * Note: Theme toggles apply classes to document.documentElement (root).
 * Ensure your CSS supports .theme-emerald, .theme-night, .theme-dark if you use them.
 */

const THEMES = ["", "theme-emerald", "theme-night", "theme-dark"];

export default function Header({ current = "home", onNavigate = () => {} }) {
  const openMenu = () => window.dispatchEvent(new CustomEvent("swrr:openNav"));

  const [themeIndex, setThemeIndex] = React.useState(0);

  React.useEffect(() => {
    // initialize theme from html class if present
    const root = document.documentElement;
    const found = THEMES.indexOf(
      THEMES.find((t) => t && root.classList.contains(t)) || ""
    );
    if (found >= 0) setThemeIndex(found);
  }, []);

  const cycleTheme = () => {
    const next = (themeIndex + 1) % THEMES.length;
    setThemeIndex(next);
    const root = document.documentElement;
    // remove all known theme classes
    THEMES.forEach((t) => t && root.classList.remove(t));
    // apply new if not empty
    if (THEMES[next]) root.classList.add(THEMES[next]);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[50] header-glass">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="rounded-full p-2 shadow"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--primary))" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" fill="#fff" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-lg">SWRR</div>
            <div className="text-xs text-muted">Smart Water Recovery &amp; Reuse</div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
            title="Change theme"
            aria-label="Change theme"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5 5l1.4 1.4M17.6 17.6L19 19M17.6 6.4L19 5M5 19l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm hidden sm:inline">Theme</span>
          </button>

          {/* Quick open app / navigate */}
          <button onClick={() => onNavigate("dashboard")} className="btn-primary hidden sm:inline-flex">
            Open App
          </button>

          {/* Menu (mobile & desktop trigger for side nav) */}
          <button
            onClick={openMenu}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Open menu"
            title="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
