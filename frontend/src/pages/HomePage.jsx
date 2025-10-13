import React from "react";
import Reveal from "../components/Reveal";
import WaveDivider from "../components/WaveDivider";
import AnimatedKPI from "../components/AnimatedKPI";

export default function HomePage({ onNavigate }){
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative glass-card rounded-2xl p-10 md:p-14 overflow-hidden">
        {/* subtle gradient halo */}
        <div className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full"
             style={{background:"radial-gradient(closest-side, var(--accent), transparent)" , opacity:.25}} />
        <div className="absolute -bottom-48 -left-48 w-[520px] h-[520px] rounded-full"
             style={{background:"radial-gradient(closest-side, var(--primary), transparent)" , opacity:.22}} />
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Smart Water <span style={{background:"linear-gradient(135deg,var(--accent),var(--primary))", WebkitBackgroundClip:"text", color:"transparent"}}>Recovery & Reuse</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-lg text-muted max-w-3xl">
            Monitor, design and optimize primary, secondary and tertiary treatment for safe reuse — with analytics,
            compliance and a circular water marketplace.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={()=>onNavigate?.("dashboard")} className="btn-primary">Open Dashboard</button>
            <button onClick={()=>onNavigate?.("process")} className="btn-outline">Design Treatment</button>
          </div>
        </Reveal>

        {/* KPI strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Reveal><div className="glass-tile p-6 rounded-xl">
            <div className="text-sm text-muted">Freshwater Saved</div>
            <div className="mt-2 kpi-number"><AnimatedKPI value={1200000} format={(v)=> (v/1000000).toFixed(1)+'M'} /> L</div>
          </div></Reveal>

          <Reveal delay={80}><div className="glass-tile p-6 rounded-xl">
            <div className="text-sm text-muted">Reuse Rate</div>
            <div className="mt-2 kpi-number"><AnimatedKPI value={62} suffix="%" /></div>
          </div></Reveal>

          <Reveal delay={160}><div className="glass-tile p-6 rounded-xl">
            <div className="text-sm text-muted">Active Alerts</div>
            <div className="mt-2 kpi-number" style={{color:"#dc2626"}}><AnimatedKPI value={3} /></div>
          </div></Reveal>
        </div>

        <WaveDivider className="mt-10" />
      </section>

      {/* 3 FEATURE CARDS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal><div className="glass-card p-7 rounded-2xl">
          <div className="text-sm font-semibold" style={{color:"var(--primary)"}}>01</div>
          <h3 className="mt-1 text-xl font-semibold">Real-time Monitoring</h3>
          <p className="mt-2 text-sm text-muted">
            pH, turbidity, DO, flow, TDS and ORP — clean tiles, alerts and trends for safe operations.
          </p>
          <a href="#" className="mt-3 inline-block link-underline text-sm">View Dashboard</a>
        </div></Reveal>

        <Reveal delay={80}><div className="glass-card p-7 rounded-2xl">
          <div className="text-sm font-semibold" style={{color:"var(--primary)"}}>02</div>
          <h3 className="mt-1 text-xl font-semibold">Smart Process Designer</h3>
          <p className="mt-2 text-sm text-muted">
            Configure Primary / Secondary / Tertiary stages and simulate effluent vs reuse targets.
          </p>
          <button onClick={()=>onNavigate?.("process")} className="mt-3 btn-outline text-sm">Open Designer</button>
        </div></Reveal>

        <Reveal delay={160}><div className="glass-card p-7 rounded-2xl">
          <div className="text-sm font-semibold" style={{color:"var(--primary)"}}>03</div>
          <h3 className="mt-1 text-xl font-semibold">Water Credit Marketplace</h3>
          <p className="mt-2 text-sm text-muted">
            List surplus treated water, buy credits and enable circular reuse across industries.
          </p>
          <button onClick={()=>onNavigate?.("marketplace")} className="mt-3 btn-outline text-sm">Explore Marketplace</button>
        </div></Reveal>
      </section>

      {/* WHY IT MATTERS */}
      <Reveal>
        <section className="glass-card p-10 rounded-2xl">
          <h3 className="text-2xl font-bold">Why it matters</h3>
          <p className="mt-3 text-muted">
            HydroLoop automates separation & cleaning — primary (solids), secondary (organics) and tertiary (nutrients & advanced contaminants),
            with reuse-driven targets. Result: less abstraction, lower discharge, measurable ESG.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-tile p-5 rounded-xl"><div className="text-sm text-muted">Compliance</div><div className="mt-2 text-sm">Tamper-evident audit ledger & auto reports.</div></div>
            <div className="glass-tile p-5 rounded-xl"><div className="text-sm text-muted">Optimization</div><div className="mt-2 text-sm">Tune efficiencies, energy & dosing.</div></div>
            <div className="glass-tile p-5 rounded-xl"><div className="text-sm text-muted">Biological Safety</div><div className="mt-2 text-sm">eDNA snapshots & microbial checks.</div></div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
