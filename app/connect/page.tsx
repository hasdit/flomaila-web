"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { disconnect, loadConnectors, saveConnector, type Connector } from "@/lib/connect";
import { toast } from "@/lib/toast";
const families = ["All", "Messaging", "Commerce", "Ads", "Courier", "Payments", "Email"] as const;
export default function ConnectPage() {
  const [items, setItems] = useState<Connector[]>([]);
  const [fam, setFam] = useState<(typeof families)[number]>("All");
  const [health, setHealth] = useState<Record<string, string>>({});
  useEffect(() => { setItems(loadConnectors()); }, []);
  const shown = items.filter((c) => fam === "All" || c.family === fam);
  return (<><PageHeader title="Connect" desc="Channels · Stores · Ads · Couriers · Payments." />
    <div className="mb-3 flex flex-wrap gap-1 text-xs">{families.map((f) => <button key={f} type="button" onClick={() => setFam(f)} className={`rounded-full px-3 py-1 ${fam === f ? "bg-stone-900 text-white" : "bg-stone-100"}`}>{f}</button>)}</div>
    <div className="grid gap-3 sm:grid-cols-2">{shown.map((c) => <Card key={c.id}><div className="flex items-start justify-between gap-2"><div><p className="text-[11px] uppercase tracking-wide text-brand">{c.family}</p><p className="mt-1 font-medium">{c.name}</p><p className="mt-1 text-xs text-stone-500">{c.connected ? c.keyHint : "Not connected"}</p></div><span className={`rounded-full px-2 py-0.5 text-[11px] ${c.connected ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>{c.connected ? "on" : "off"}</span></div>
      <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); const key = String(new FormData(e.currentTarget).get("key") || ""); setItems(saveConnector(c.id, key)); toast(key ? "Saved" : "Empty"); e.currentTarget.reset(); }}><input name="key" placeholder="API key" className="flex-1 rounded-full border px-3 py-1 text-sm" /><button className="rounded-full bg-brand px-3 py-1 text-sm text-white" type="submit">Save</button></form>
      <div className="mt-2 flex gap-2 text-xs"><button type="button" className="rounded-full border px-2 py-1" onClick={() => { const ok = c.connected; setHealth((h) => ({ ...h, [c.id]: ok ? "green" : "red" })); toast(ok ? "Ping ok" : "Connect first"); }}>Health</button><button type="button" className="rounded-full border px-2 py-1" onClick={() => { setItems(disconnect(c.id)); toast("Revoked"); }}>Revoke</button></div></Card>)}</div></>);
}
