import React from "react";
import PageSection from "../components/PageSection";
import { listListings, createListing, buyListing, getLedger } from "../services/mockApi";
import MarketplaceCard from "../components/MarketplaceCard";
import WaterLedger from "../components/WaterLedger";

export default function MarketplacePage(){
  const [items, setItems] = React.useState([]);
  const [ledger, setLedger] = React.useState([]);
  const [form, setForm] = React.useState({ qty: 1000, price: 100, turbidity: 5, BOD: 10, TN: 2, seller: "Plant A" });

  const load = ()=> { setItems(listListings()); setLedger(getLedger()); };
  React.useEffect(load,[]);

  const actions = (
    <>
      <button className="btn-outline" onClick={load}>Refresh</button>
      <button className="btn-primary" onClick={() => { createListing({ ...form, id: Date.now().toString() }); load(); }}>Create Listing</button>
    </>
  );

  return (
    <div className="space-y-8">
      <PageSection kicker="Marketplace" title="Water Credit Exchange" subtitle="List surplus treated water and buy credits to enable circular reuse." actions={actions}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input className="p-2 border rounded" value={form.qty} onChange={e=>setForm(f=>({...f, qty:+e.target.value||0}))} placeholder="Qty (L)"/>
          <input className="p-2 border rounded" value={form.price} onChange={e=>setForm(f=>({...f, price:+e.target.value||0}))} placeholder="Price"/>
          <input className="p-2 border rounded" value={form.turbidity} onChange={e=>setForm(f=>({...f, turbidity:+e.target.value||0}))} placeholder="Turbidity NTU"/>
          <input className="p-2 border rounded" value={form.BOD} onChange={e=>setForm(f=>({...f, BOD:+e.target.value||0}))} placeholder="BOD mg/L"/>
          <input className="p-2 border rounded" value={form.TN} onChange={e=>setForm(f=>({...f, TN:+e.target.value||0}))} placeholder="TN mg/L"/>
        </div>
      </PageSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageSection title="Available Listings">
          <div className="space-y-3">
            {items.length===0 && <div className="text-muted">No listings yet.</div>}
            {items.map((it)=> <MarketplaceCard key={it.id} item={it} onBuy={() => { buyListing({ buyer:"Factory X", id: it.id }); load(); }} />)}
          </div>
        </PageSection>

        <PageSection title="Water Ledger (tamper-style)">
          <WaterLedger entries={ledger} />
        </PageSection>
      </div>
    </div>
  );
}
