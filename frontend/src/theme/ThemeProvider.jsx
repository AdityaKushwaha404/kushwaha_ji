// src/theme/ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext({ theme: "ocean", setTheme: () => {}, dark: false, setDark: () => {} });
export const useTheme = () => useContext(ThemeCtx);

const THEMES = ["ocean", "emerald", "night"];

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("swrr_theme") || "ocean");
  const [dark, setDark] = useState(() => localStorage.getItem("swrr_dark") === "true");

  useEffect(() => {
    localStorage.setItem("swrr_theme", theme);
    localStorage.setItem("swrr_dark", String(dark));
    const cls = document.documentElement.classList;
    // remove old classes
    THEMES.forEach(t => cls.remove(`theme-${t}`));
    cls.add(`theme-${theme}`);
    if (dark) cls.add("theme-dark"); else cls.remove("theme-dark");
  }, [theme, dark]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, dark, setDark }}>
      {children}
    </ThemeCtx.Provider>
  );
}
