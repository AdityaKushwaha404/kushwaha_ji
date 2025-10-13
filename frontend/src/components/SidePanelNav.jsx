// src/components/SidePanelNav.jsx
import React from "react";

export default function SidePanelNav({ current = "home", onNavigate = () => {} }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("swrr:openNav", openHandler);
    return () => window.removeEventListener("swrr:openNav", openHandler);
  }, []);

  React.useEffect(() => {
    const closeOnEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [current]);

  React.useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  const menuItems = [
    { key: "home", label: "Overview" },
    { key: "dashboard", label: "Dashboard" },
    { key: "process", label: "Process Designer" },
    { key: "marketplace", label: "Marketplace" },
    { key: "edna", label: "eDNA Monitor" },
    { key: "analytics", label: "Analytics" },
    { key: "reports", label: "Reports" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Drawer */}
      <aside className={`drawer ${open ? "show" : ""}`}>
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="rounded-full p-2 shadow-sm bg-gradient-to-r from-sky-500 to-emerald-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                SWRR
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Smart Water Recovery
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="p-5 flex flex-col gap-3">
          {menuItems.map((it) => (
            <button
              key={it.key}
              onClick={() => {
                onNavigate(it.key);
                setOpen(false);
              }}
              className={`text-left w-full px-4 py-3 rounded-xl font-medium tracking-wide transition ${
                current === it.key
                  ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md"
                  : "hover:bg-sky-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 w-full px-5">
          <div className="rounded-xl bg-white/40 dark:bg-slate-800/60 p-4 text-sm text-gray-700 dark:text-gray-300 shadow-inner">
            💡 Try themes: <b>Ocean / Emerald / Night</b> + Dark mode.
          </div>
        </div>
      </aside>
    </>
  );
}
