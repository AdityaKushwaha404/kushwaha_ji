import React from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

import waterCycle from "../assets/water-cycle.jpeg";
import recycledWater from "../assets/recycled-water.jpeg";
import treatmentPlant from "../assets/treatment-plant.jpeg";
import waterScarcity from "../assets/water-scarcity.jpeg";
import waterPoster from "../assets/water.jpg";
import waterVideo from "../assets/water-video.mp4";

export default function HomePage({ onNavigate }) {

  // sample chart data
  const weeklyFlow = [
    { day: "Mon", intake: 1000, reuse: 700 },
    { day: "Tue", intake: 1200, reuse: 850 },
    { day: "Wed", intake: 1400, reuse: 900 },
    { day: "Thu", intake: 1300, reuse: 950 },
    { day: "Fri", intake: 1600, reuse: 1100 },
  ];

  const reuseBySector = [
    { sector: "Agriculture", value: 45 },
    { sector: "Industry", value: 25 },
    { sector: "Household", value: 20 },
    { sector: "Other", value: 10 },
  ];

  const COLORS = ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* ---------------- HERO ---------------- */}
      <header className="relative isolate h-[420px] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover blur-md md:blur-lg scale-105"
          src={waterVideo}
          poster={waterPoster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-50" />

        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-white text-5xl font-extrabold leading-tight mb-3">
              AquaRevive: <span className="text-cyan-300">Freshwater Recovery and Reuse System</span>
            </h1>
            <p className="text-slate-200 text-lg italic">
              A smart and sustainable solution for recovering, treating, and reusing freshwater to combat water scarcity.
            </p>
          </div>
        </div>
      </header>

      {/* ---------------- MISSION ---------------- */}
      <section className="container mx-auto max-w-6xl px-6 py-12 text-center">
        <div className="glass-card p-10 rounded-2xl">
          <h2 className="text-4xl font-semibold text-slate-800 mb-3">
            Mission of the Project
          </h2>
          <p className="text-lg italic text-slate-700">
            To promote sustainable recovery and reuse of freshwater resources through innovative,
            eco-friendly, and efficient water management solutions.
          </p>
        </div>
      </section>

      {/* ---------------- 4 COLUMNS ---------------- */}
      <section className="container mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-5 rounded-2xl flex flex-col hover:shadow-lg transition">
            <img
              src={waterCycle}
              alt="Water Cycle"
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="mt-4 text-xl font-semibold text-cyan-700">Water Cycle</h3>
            <p className="mt-2 text-slate-700 text-sm">
              The water cycle continuously circulates water through evaporation, condensation, precipitation,
              and infiltration — maintaining hydrologic balance across the planet.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col hover:shadow-lg transition">
            <img
              src={recycledWater}
              alt="Recycled Water"
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="mt-4 text-xl font-semibold text-cyan-700">Recycled Water</h3>
            <p className="mt-2 text-slate-700 text-sm">
              Treated wastewater purified for reuse in irrigation, industry, and cleaning — reducing demand
              on freshwater sources and supporting circular resource use.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col hover:shadow-lg transition">
            <img
              src={treatmentPlant}
              alt="Treatment Plants"
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="mt-4 text-xl font-semibold text-cyan-700">Treatment Plants</h3>
            <p className="mt-2 text-slate-700 text-sm">
              Facilities that purify wastewater or raw water using physical, chemical, and biological processes
              to make it safe for reuse or discharge.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col hover:shadow-lg transition">
            <img
              src={waterScarcity}
              alt="Water Scarcity"
              className="w-full h-40 object-cover rounded-xl"
            />
            <h3 className="mt-4 text-xl font-semibold text-cyan-700">Water Scarcity</h3>
            <p className="mt-2 text-slate-700 text-sm">
              Scarcity arises when available freshwater can't meet demand — conservation, leakage control,
              and recycling are key strategies for resilience.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CHARTS SECTION ---------------- */}
      <section className="container mx-auto max-w-6xl px-6 pb-20 space-y-10">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Analytics Snapshot
        </h2>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Line Chart */}
          <div className="glass-card p-6 rounded-2xl min-w-0">
            <h3 className="text-lg font-semibold text-cyan-700 mb-4">Weekly Flow (kL)</h3>
            <div className="h-64" style={{ minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyFlow}>
                  <XAxis dataKey="day" tick={{ fill: "#475569" }} />
                  <YAxis tick={{ fill: "#475569" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="intake" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="reuse" stroke="#06B6D4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-card p-6 rounded-2xl min-w-0">
            <h3 className="text-lg font-semibold text-cyan-700 mb-4">Reuse by Sector (%)</h3>
            <div className="h-64" style={{ minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reuseBySector}
                    dataKey="value"
                    nameKey="sector"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {reuseBySector.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ color: "#334155" }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate?.("analytics")}
            className="btn-primary btn-animated"
          >
            View Detailed Analytics
          </button>
        </div>
      </section>
    </div>
  );
}
