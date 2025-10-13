import React from "react";
import PageSection from "../components/PageSection";
import AquaSensePanel from "../components/AquaSensePanel";
import LiveMonitoringGrid from "../components/LiveMonitoringGrid";
import ControlPanel from "../components/ControlPanel";
import { getMockTimeseries, getMockAlerts } from "../services/mockApi";

export default function DashboardPage(){
  const [series, setSeries] = React.useState([]);
  const [alerts, setAlerts] = React.useState([]);
  React.useEffect(()=>{ setSeries(getMockTimeseries()); setAlerts(getMockAlerts()); },[]);

  return (
    <div className="space-y-8">
      <PageSection
        kicker="Dashboard"
        title="Operations & Quality Overview"
        subtitle="Live metrics, alerts and quick controls for plant operators."
        actions={<button className="btn-outline">Export</button>}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><AquaSensePanel alerts={alerts} /></div>
          <div><LiveMonitoringGrid series={series} /></div>
        </div>
      </PageSection>

      <PageSection title="Quick Controls" subtitle="Pump start/stop, aeration mode, dosing levels.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><ControlPanel /></div>
          <div className="glass-card p-6 rounded-xl">
            <div className="text-sm text-muted">Notes</div>
            <textarea className="mt-2 w-full h-40 border rounded p-3" placeholder="Shift handover notes..." />
          </div>
        </div>
      </PageSection>
    </div>
  );
}
