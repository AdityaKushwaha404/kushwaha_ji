import React from "react";
import PageSection from "../components/PageSection";
import ProcessFlow from "../components/ProcessFlow";
import TreatmentSimulator from "../components/TreatmentSimulator";
import StageDetailCard from "../components/StageDetailCard";

export default function ProcessDesignPage(){
  return (
    <div className="space-y-8">
      <PageSection
        kicker={<span className="tracking-widest text-xs text-muted">DESIGNER</span>}

        title="Smart Process System — Primary • Secondary • Tertiary"
        subtitle="Configure stages and simulate effluent vs reuse targets."
        actions={<button className="btn-primary">Save Design</button>}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-xl">Process Flow</h3>
              <div className="mt-4"><ProcessFlow /></div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-xl">Simulation</h3>
              <TreatmentSimulator />
            </div>
          </div>
          <aside className="space-y-6">
            <StageDetailCard stage="Primary" />
            <StageDetailCard stage="Secondary" />
            <StageDetailCard stage="Tertiary" />
          </aside>
        </div>
      </PageSection>
    </div>
  );
}
