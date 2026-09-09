"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadZones, saveZone, type Zone } from "@/lib/shipping";
import { loadTax, saveTax, type Tax } from "@/lib/tax";
export default function Page() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [tax, setTax] = useState<Tax[]>([]);
  useEffect(() => { setZones(loadZones()); setTax(loadTax()); }, []);
  return (<><PageHeader title="Shipping & tax" desc="Zones + regional tax." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); setZones(saveZone({ id: crypto.randomUUID(), name: String(d.get("name")), countries: String(d.get("countries")), rate: Number(d.get("rate")) })); }}><input name="name" placeholder="Zone" className="rounded-xl border px-3 py-2" required /><input name="countries" placeholder="US or *" className="rounded-xl border px-3 py-2" required /><input name="rate" type="number" className="w-24 rounded-xl border px-3 py-2" required /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add zone</button></form>{zones.map((z) => <p key={z.id} className="mt-2 text-sm">{z.name} · {z.countries} · {z.rate}</p>)}</Card><Card><p className="font-medium">Tax</p>{tax.map((t, i) => <div key={t.region} className="mt-2 flex gap-2 text-sm"><span className="w-16">{t.region}</span><input type="number" step="0.01" className="w-24 rounded-xl border px-2 py-1" value={t.rate} onChange={(e) => { const next = tax.map((x, j) => j === i ? { ...x, rate: Number(e.target.value) } : x); setTax(next); saveTax(next); }} /></div>)}</Card></>);
}
