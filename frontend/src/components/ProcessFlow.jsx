import React from "react";
export default function ProcessFlow(){
  const clickNode = (stage) => {
    window.dispatchEvent(new CustomEvent("swrr:stageClick", { detail: stage }));
  };
  return (
    <div className="rounded-xl border p-4 bg-white/60">
      <svg viewBox="0 0 1000 360" className="w-full h-64">
        <rect x="40" y="40" width="200" height="80" rx="10" fill="#e6fffb" stroke="#bff0e8"
              onClick={()=>clickNode('Primary')} style={{cursor:"pointer"}}/>
        <text x="140" y="86" fontSize="16" textAnchor="middle" fill="#065f46" style={{fontWeight:700}}>Primary</text>
        <line x1="240" y1="80" x2="340" y2="80" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow)"/>
        <rect x="340" y="20" width="260" height="120" rx="12" fill="#f0f9ff" stroke="#cfeefc"
              onClick={()=>clickNode('Secondary')} style={{cursor:"pointer"}}/>
        <text x="470" y="78" fontSize="16" textAnchor="middle" fill="#0c4a6e" style={{fontWeight:700}}>Secondary</text>
        <line x1="600" y1="80" x2="700" y2="80" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow)"/>
        <rect x="700" y="40" width="220" height="80" rx="12" fill="#fff7ed" stroke="#ffe9d5"
              onClick={()=>clickNode('Tertiary')} style={{cursor:"pointer"}}/>
        <text x="810" y="86" fontSize="16" textAnchor="middle" fill="#7c3f00" style={{fontWeight:700}}>Tertiary</text>
        <circle cx="500" cy="260" r="44" fill="#eef9f6" stroke="#d9f3ee" />
        <text x="500" y="265" fontSize="14" textAnchor="middle" fill="#065f46">Storage</text>
        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#06b6d4" /></marker></defs>
      </svg>
      <div className="text-xs text-gray-400 mt-2">Tip: click any stage.</div>
    </div>
  );
}
