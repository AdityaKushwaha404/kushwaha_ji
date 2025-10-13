import React, { useEffect, useState } from "react";
const stageInfo = {
  Primary: {
    overview:"Primary treatment removes settleable solids and grit.",
    technologies:["Screens & Grit","Primary Clarifier","Chemically Enhanced Primary (optional)"],
    performance:"50–70% TSS; 20–35% BOD",
  },
  Secondary: {
    overview:"Biological treatment for dissolved/colloidal organics.",
    technologies:["Activated Sludge","SBR","MBR"],
    performance:"70–95% BOD; nitrification possible",
  },
  Tertiary: {
    overview:"Nutrients + advanced contaminants; filtration + disinfection.",
    technologies:["Sand/Cartridge","BNR/Denitrification","UF/RO","AOP","UV/Chlorine"],
    performance:"Low turbidity; 80–95% nutrients (tech-dependent)",
  },
};

export default function StageDetailCard({ stage="Primary" }){
  const [selected, setSelected] = useState(stage);
  useEffect(()=>{
    const h = (e)=> setSelected(e.detail);
    window.addEventListener("swrr:stageClick", h);
    return ()=> window.removeEventListener("swrr:stageClick", h);
  },[]);
  const info = stageInfo[selected];
  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">{selected} Treatment</div>
          <div className="text-lg font-semibold">{selected}</div>
        </div>
        <div className="text-sm text-gray-500">Performance: <span className="font-medium">{info.performance}</span></div>
      </div>
      <div className="mt-3 text-gray-600 text-sm">{info.overview}</div>
      <div className="mt-3">
        <div className="text-sm font-semibold">Technologies</div>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
          {info.technologies.map(t => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
}
