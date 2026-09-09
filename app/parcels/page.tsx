"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadOrders } from "@/lib/orders";
import { advanceParcel, createParcel, loadParcels, type Parcel } from "@/lib/parcels";
import { logEvent } from "@/lib/activity";
export default function ParcelsPage() {
  const [items, setItems] = useState<Parcel[]>([]);
  const [orders, setOrders] = useState<{ id: string; customer: string }[]>([]);
  useEffect(() => { setItems(loadParcels()); setOrders(loadOrders()); }, []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const p = createParcel(String(data.get("orderId") || "none"), String(data.get("courier") || "generic"));
    logEvent("parcel", `Created ${p.id} / ${p.tracking}`);
    setItems(loadParcels());
  }
  return (<><PageHeader title="Parcels" desc="Generic courier — BYO label." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}>
    <select name="orderId" className="rounded-xl border px-3 py-2 text-sm"><option value="none">No order</option>{orders.map((o) => <option key={o.id} value={o.id}>{o.id} · {o.customer}</option>)}</select>
    <input name="courier" placeholder="Courier name" defaultValue="Generic" className="rounded-xl border px-3 py-2 text-sm" />
    <button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Create shipment</button>
  </form></Card>
  <Card className="p-0">{items.length === 0 ? <p className="p-8 text-center text-sm text-stone-500">No parcels.</p> : items.map((p) => <div key={p.id} className="flex items-center justify-between border-b px-4 py-3 text-sm"><div><p className="font-medium">{p.tracking}</p><p className="text-xs text-stone-500">{p.courier} · {p.status}</p></div><button type="button" className="text-xs text-brand" onClick={() => setItems(advanceParcel(p.id))}>Advance</button></div>)}</Card></>);
}
