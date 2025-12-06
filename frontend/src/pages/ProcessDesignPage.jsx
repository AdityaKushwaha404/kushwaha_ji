// src/pages/ProcessDesignPage.jsx (snippet)
import React from "react";
import ProcessFlow from "../components/ProcessFlow";
import StageDetailCard from "../components/StageDetailCard";
import TreatmentSimulator from "../components/TreatmentSimulator";

export default function ProcessDesignPage(){
  const [selected, setSelected] = React.useState(null);
  const [simResults, setSimResults] = React.useState(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-3">Process Flow</h2>
          <ProcessFlow selected={selected} onSelect={(k) => setSelected(k)} />
        </div>

        <aside className="space-y-6">
          <StageDetailCard stageKey={selected} />
          <div className="glass-card p-4 rounded-xl">
            <div className="text-sm text-muted">Quick Controls</div>
            <div className="mt-3 space-y-2">
              <button className="btn-outline w-full">Start Pilot</button>
              <button className="btn-primary w-full">Export Design</button>
            </div>
          </div>
        </aside>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Simulation</h2>
        <TreatmentSimulator onSimulate={(r) => setSimResults(r)} />
      </div>
    </div>
  );
}
