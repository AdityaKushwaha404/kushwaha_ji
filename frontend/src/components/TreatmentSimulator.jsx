import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { saveSimulation, exportCsv } from "../services/mockApi";

const reuseTargets = {
  "Irrigation (non-food)": { turbidity: 30, BOD: 30, TN: 15 },
  "Industrial Cooling":    { turbidity: 10, BOD: 10, TN: 10 },
  "Process Water":         { turbidity: 5,  BOD: 5,  TN: 5  },
  "Recharge (strict)":     { turbidity: 1,  BOD: 2,  TN: 1  },
};

const defaults = {
  primary: { turbidity: 60, BOD: 30, TN: 5 },
  secondary:{ turbidity: 20, BOD: 70, TN: 40 },
  tertiary:{ turbidity: 90, BOD: 90, TN: 80 },
};

const apply = (v,p)=> +(v*(1-p/100)).toFixed(2);

export default function TreatmentSimulator(){
  const [influent, setInfluent] = useState({ turbidity:120, BOD:200, TN:45 });
  const [eff, setEff] = useState(defaults);
  const [reuse, setReuse] = useState("Irrigation (non-food)");
  const [res, setRes] = useState(null);

  const run = ()=>{
    const p = { turbidity:apply(influent.turbidity, eff.primary.turbidity), BOD:apply(influent.BOD, eff.primary.BOD), TN:apply(influent.TN, eff.primary.TN) };
    const s = { turbidity:apply(p.turbidity, eff.secondary.turbidity), BOD:apply(p.BOD, eff.secondary.BOD), TN:apply(p.TN, eff.secondary.TN) };
    const t = { turbidity:apply(s.turbidity, eff.tertiary.turbidity), BOD:apply(s.BOD, eff.tertiary.BOD), TN:apply(s.TN, eff.tertiary.TN) };
    setRes({ influent, primary:p, secondary:s, tertiary:t });
  };

  const chartData = res ? [
    { name:"Influent", ...res.influent },
    { name:"Primary",  ...res.primary  },
    { name:"Secondary",...res.secondary},
    { name:"Tertiary", ...res.tertiary },
  ] : [];

  const meets = ()=>{
    if(!res) return null;
    const t = reuseTargets[reuse], e = res.tertiary;
    return { turbidity: e.turbidity<=t.turbidity, BOD:e.BOD<=t.BOD, TN:e.TN<=t.TN };
  };

  const save = ()=>{
    if(!res) return;
    saveSimulation({ reuse, ...res });
    alert("Simulation saved to ledger (mock).");
  };

  const download = ()=>{
    if(!res) return;
    const rows = [
      { stage:"Influent", ...res.influent },
      { stage:"Primary",  ...res.primary  },
      { stage:"Secondary",...res.secondary},
      { stage:"Tertiary", ...res.tertiary },
      { target_for: reuse, turbidity_target: reuseTargets[reuse].turbidity, BOD_target: reuseTargets[reuse].BOD, TN_target: reuseTargets[reuse].TN },
    ];
    exportCsv(rows, "treatment_simulation_report.csv");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Influent */}
        <div className="glass-card p-4 rounded">
          <div className="text-sm text-gray-500">Influent Quality</div>
          <label className="block text-xs text-gray-500 mt-2">Turbidity (NTU)</label>
          <input type="number" value={influent.turbidity} onChange={e=>setInfluent({...influent, turbidity:+e.target.value||0})} className="w-full mt-1 px-3 py-2 rounded border" />
          <label className="block text-xs text-gray-500 mt-2">BOD (mg/L)</label>
          <input type="number" value={influent.BOD} onChange={e=>setInfluent({...influent, BOD:+e.target.value||0})} className="w-full mt-1 px-3 py-2 rounded border" />
          <label className="block text-xs text-gray-500 mt-2">Total Nitrogen (mg/L)</label>
          <input type="number" value={influent.TN} onChange={e=>setInfluent({...influent, TN:+e.target.value||0})} className="w-full mt-1 px-3 py-2 rounded border" />
        </div>

        {/* Efficiencies */}
        <div className="glass-card p-4 rounded">
          <div className="text-sm text-gray-500">Stage Efficiencies (%)</div>
          {["primary","secondary","tertiary"].map(st=>(
            <div key={st} className="mt-3">
              <div className="text-xs font-semibold capitalize">{st}</div>
              {["turbidity","BOD","TN"].map(k=>(
                <div key={k} className="flex items-center gap-2 mt-1">
                  <input type="number" value={eff[st][k]} onChange={e=> setEff(prev=> ({...prev, [st]:{...prev[st],[k]: +e.target.value||0}}))} className="w-20 px-2 py-1 border rounded" />
                  <span className="text-xs text-gray-500">{k}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Reuse + actions */}
        <div className="glass-card p-4 rounded">
          <div className="text-sm text-gray-500">Reuse Purpose</div>
          <select value={reuse} onChange={e=>setReuse(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded">
            {Object.keys(reuseTargets).map(k=> <option key={k} value={k}>{k}</option>)}
          </select>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded" onClick={run}>Run</button>
            <button className="px-4 py-2 border rounded" onClick={save} disabled={!res}>Save</button>
            <button className="px-4 py-2 border rounded" onClick={download} disabled={!res}>CSV</button>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Targets — Turbidity: {reuseTargets[reuse].turbidity} • BOD: {reuseTargets[reuse].BOD} • TN: {reuseTargets[reuse].TN}
          </div>
        </div>
      </div>

      {res && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-4 rounded">
            <div style={{width:"100%", height:300}}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="turbidity" />
                  <Bar dataKey="BOD" />
                  <Bar dataKey="TN" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-card p-4 rounded">
            <div className="text-sm text-gray-500">Numeric summary</div>
            <table className="w-full mt-2 text-sm">
              <thead className="text-left text-gray-500">
                <tr><th>Stage</th><th>Turbidity</th><th>BOD</th><th>TN</th></tr>
              </thead>
              <tbody>
                {["influent","primary","secondary","tertiary"].map(s=>(
                  <tr key={s} className="border-t">
                    <td className="py-2 capitalize">{s}</td>
                    <td>{res[s].turbidity}</td>
                    <td>{res[s].BOD}</td>
                    <td>{res[s].TN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <div className="text-sm font-semibold">Meets target?</div>
              {(()=>{ const ok = meets(); if(!ok) return null;
                return (
                  <div className="mt-2 space-y-1">
                    <div>Turbidity: <span className={ok.turbidity?'text-green-600':'text-red-600'}>{ok.turbidity?'OK':'FAIL'}</span></div>
                    <div>BOD: <span className={ok.BOD?'text-green-600':'text-red-600'}>{ok.BOD?'OK':'FAIL'}</span></div>
                    <div>TN: <span className={ok.TN?'text-green-600':'text-red-600'}>{ok.TN?'OK':'FAIL'}</span></div>
                  </div>
                );})()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
