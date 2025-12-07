// src/pages/ProcessDesignPage.jsx (snippet)
import React from "react";
import ProcessFlow from "../components/ProcessFlow";
import StageDetailCard from "../components/StageDetailCard";
import TreatmentSimulator from "../components/TreatmentSimulator";

export default function ProcessDesignPage(){
  const [selected, setSelected] = React.useState(null);
  const [simResults, setSimResults] = React.useState(null);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5 mb-3">
            <h2 className="text-2xl font-bold">Process Flow</h2>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5">
            <ProcessFlow selected={selected} onSelect={(k) => setSelected(k)} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5">
            <StageDetailCard stageKey={selected} />
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5">
            <div className="text-sm text-slate-600">Quick Controls</div>
            <div className="mt-3 space-y-2">
              <button className="px-4 py-2 border border-slate-200 rounded-full text-sm hover:bg-slate-50 w-full">Start Pilot</button>
              <button className="px-4 py-2 rounded-full text-sm text-white w-full" style={{background:"linear-gradient(135deg, var(--accent), var(--primary))"}}>Export Design</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5">
          <h2 className="text-2xl font-bold">Simulation</h2>
          <p className="text-sm text-slate-600">Run quick what-if analyses and export results.</p>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-5">
          <TreatmentSimulator onSimulate={(r) => setSimResults(r)} />
        </div>
      </div>

      {/* Extra section to extend page height */}
      <div className="rounded-2xl border border-slate-200/70 bg-white shadow-md p-6">
        <div className="text-lg font-semibold">Design Notes</div>
        <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
          <li>Balance energy use with recovery targets for optimal OPEX.</li>
          <li>Prefer modular units to scale capacity and maintenance windows.</li>
          <li>Include bypass lines for resilience and easy isolation.</li>
        </ul>
      </div>
    </div>
  );
}
