// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import SensorsPage from "./pages/SensorsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import ProcessDesignPage from "./pages/ProcessDesignPage";
import MarketplacePage from "./pages/MarketplacePage";
import EDNAMonitorPage from "./pages/EDNAMonitorPage";

import ThemeProvider from "./theme/ThemeProvider";
import BackgroundFX from "./components/BackgroundFX";
import SidePanelNav from "./components/SidePanelNav";

export default function App(){
  const [route, setRoute] = React.useState("home");

  const pages = {
    home: <HomePage onNavigate={setRoute} />,
    dashboard: <DashboardPage />,
    sensors: <SensorsPage />,
    analytics: <AnalyticsPage />,
    reports: <ReportsPage />,
    process: <ProcessDesignPage />,
    marketplace: <MarketplacePage />,
    edna: <EDNAMonitorPage />
  };

  return (
    <ThemeProvider>
      <BackgroundFX />
      <div style={{position:"relative", zIndex:1}} className="min-h-screen flex flex-col">
        <Header current={route} onNavigate={setRoute} />
        {/* Side Panel lives at root level */}
        <SidePanelNav current={route} onNavigate={setRoute} />

        <main className="flex-1 container mx-auto px-6 pt-20 pb-10">
          {pages[route]}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
