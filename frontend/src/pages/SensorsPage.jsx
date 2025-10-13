// src/pages/SensorsPage.jsx
import React from "react";
import { getMockSensors } from "../services/mockApi";

export default function SensorsPage() {
  const [sensors, setSensors] = React.useState([]);

  React.useEffect(() => {
    setSensors(getMockSensors());
  }, []);

  const badge = (s) =>
    s === "ok"
      ? "bg-green-100 text-green-700"
      : s === "warn"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-2xl font-semibold">Sensors</h2>
        <p className="text-sm text-gray-500">Live inventory of field sensors and current readings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map((s) => (
          <div key={s.id} className="glass-tile p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{s.name}</div>
              <span className={`text-xs px-2 py-1 rounded ${badge(s.status)}`}>{s.status.toUpperCase()}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">{s.location}</div>
            <div className="kpi-number mt-2">
              {s.value} <span className="text-sm text-gray-500">{s.unit}</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">Updated: {new Date(s.updatedAt).toLocaleTimeString()}</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 border rounded text-xs">Calibrate</button>
              <button className="px-3 py-1 border rounded text-xs">History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
