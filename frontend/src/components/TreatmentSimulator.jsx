// src/components/TreatmentSimulator.jsx
import React, { useState, useMemo, useCallback } from "react";

/**
 * TreatmentSimulator
 * - interactive simulator UI with sliders and number inputs
 * - single `simulate` function defined with useCallback to avoid duplication
 */
export default function TreatmentSimulator({ onSimulate }) {
  // influent
  const [influent, setInfluent] = useState({
    turbidity: 120,
    BOD: 200,
    TN: 45,
    flow: 1000, // m3/day
    reusePurpose: "Irrigation (non-food)",
  });

  // stage efficiencies (percent removals)
  const [eff, setEff] = useState({
    primary: { turbidity: 60, bod: 30, tn: 5 },
    secondary: { turbidity: 20, bod: 70, tn: 40 },
    tertiary: { turbidity: 90, bod: 90, tn: 80 },
  });

  // single simulate function (useCallback so refs stable)
  const simulate = useCallback(() => {
    const seq = ["primary", "secondary", "tertiary"];
    let out = { turbidity: influent.turbidity, BOD: influent.BOD, TN: influent.TN };
    const results = [{ label: "Influent", turbidity: Math.round(out.turbidity), BOD: Math.round(out.BOD), TN: Math.round(out.TN) }];

    seq.forEach((stage) => {
      const e = eff[stage];
      out = {
        turbidity: out.turbidity * (1 - e.turbidity / 100),
        BOD: out.BOD * (1 - e.bod / 100),
        TN: out.TN * (1 - e.tn / 100),
      };
      results.push({
        label: stage.charAt(0).toUpperCase() + stage.slice(1),
        turbidity: Math.round(out.turbidity),
        BOD: Math.round(out.BOD),
        TN: Math.round(out.TN),
      });
    });

    return results;
  }, [influent, eff]);

  // precompute last result for initial display and reactive preview
  const preview = useMemo(() => {
    const r = simulate();
    return r[r.length - 1];
  }, [simulate]);

  // small number input component
  const NumberInput = ({ label, value, onChange, suffix }) => (
    <div>
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="p-2 rounded border w-40"
        />
        {suffix && <div className="text-sm text-muted">{suffix}</div>}
      </div>
    </div>
  );

  const handleSimulateClick = () => {
    const results = simulate();
    if (onSimulate) onSimulate(results);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <h4 className="font-semibold text-lg">Influent Quality</h4>
          <div className="mt-4 space-y-4">
            <NumberInput
              label="Turbidity (NTU)"
              value={influent.turbidity}
              onChange={(v) => setInfluent((s) => ({ ...s, turbidity: v }))}
            />
            <NumberInput
              label="BOD (mg/L)"
              value={influent.BOD}
              onChange={(v) => setInfluent((s) => ({ ...s, BOD: v }))}
            />
            <NumberInput
              label="Total Nitrogen (mg/L)"
              value={influent.TN}
              onChange={(v) => setInfluent((s) => ({ ...s, TN: v }))}
            />
            <NumberInput
              label="Flow (m³/day)"
              value={influent.flow}
              onChange={(v) => setInfluent((s) => ({ ...s, flow: v }))}
            />
            <div>
              <div className="text-sm text-muted">Reuse Purpose</div>
              <select
                value={influent.reusePurpose}
                onChange={(e) => setInfluent((s) => ({ ...s, reusePurpose: e.target.value }))}
                className="p-2 rounded border w-full mt-1"
              >
                <option>Irrigation (non-food)</option>
                <option>Industrial cooling</option>
                <option>Toilet flushing</option>
                <option>Food-processing (restricted)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h4 className="font-semibold text-lg">Stage Efficiencies (%)</h4>
          <div className="mt-4 space-y-4">
            {["primary", "secondary", "tertiary"].map((stage) => (
              <div key={stage}>
                <div className="text-sm font-medium capitalize">{stage}</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <div>
                    <div className="text-xs text-muted">Turbidity</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={eff[stage].turbidity}
                      onChange={(e) =>
                        setEff((s) => ({ ...s, [stage]: { ...s[stage], turbidity: Number(e.target.value) } }))
                      }
                    />
                    <div className="text-sm font-semibold">{eff[stage].turbidity}%</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted">BOD</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={eff[stage].bod}
                      onChange={(e) =>
                        setEff((s) => ({ ...s, [stage]: { ...s[stage], bod: Number(e.target.value) } }))
                      }
                    />
                    <div className="text-sm font-semibold">{eff[stage].bod}%</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted">TN</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={eff[stage].tn}
                      onChange={(e) =>
                        setEff((s) => ({ ...s, [stage]: { ...s[stage], tn: Number(e.target.value) } }))
                      }
                    />
                    <div className="text-sm font-semibold">{eff[stage].tn}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulate button + results */}
      <div className="flex items-start gap-6">
        <button
          className="btn-primary"
          onClick={handleSimulateClick}
          title="Run simulation with current inputs"
        >
          Simulate
        </button>

        <div className="glass-card p-4 rounded-xl flex-1">
          <div className="text-sm text-muted">Predicted Final Effluent (after all stages)</div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-muted">Turbidity</div>
              <div className="font-bold text-lg">{preview ? preview.turbidity : "—"} NTU</div>
            </div>
            <div>
              <div className="text-xs text-muted">BOD</div>
              <div className="font-bold text-lg">{preview ? preview.BOD : "—"} mg/L</div>
            </div>
            <div>
              <div className="text-xs text-muted">Total N</div>
              <div className="font-bold text-lg">{preview ? preview.TN : "—"} mg/L</div>
            </div>
          </div>
          <div className="text-xs text-muted mt-3">Preview auto-calculated from current inputs. Click Simulate to push results to the parent.</div>
        </div>
      </div>
    </div>
  );
}
