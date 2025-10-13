// src/components/Header.jsx
import React from "react";
import ThemeMenu from "./ThemeMenu";

export default function Header({ current = "home", onNavigate = () => {} }) {
  const openMenu = () => window.dispatchEvent(new CustomEvent("swrr:openNav"));

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
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" fill="#fff"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-lg">SWRR</div>
            <div className="text-xs text-muted">Smart Water Recovery &amp; Reuse</div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeMenu />
          <button onClick={() => onNavigate("dashboard")} className="btn-primary hidden sm:inline-flex">
            Open App
          </button>
          <button
            onClick={openMenu}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Open menu"
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
