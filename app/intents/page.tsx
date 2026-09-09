"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadOrders, orderTotal } from "@/lib/orders";
import { createIntent, loadIntents, payIntent, type Intent } from "@/lib/intents";
export default function Page() {
  const [items, setItems] = useState<Intent[]>([]);
  const [orders, setOrders] = useState<{ id: string }[]>([]);
  useEffect(() => { setItems(loadIntents()); setOrders(loadOrders()); }, []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = String(new FormData(e.currentTarget).get("orderId"));
    const o = loadOrders().find((x) => x.id === id);
    createIntent(id, String(new FormData(e.currentTarget).get("rail")), o ? orderTotal(o) : 0);
    setItems(loadIntents());
  }
  return (<><PageHeader title="Payment intents" desc="Simulated rails." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><select name="orderId" className="rounded-xl border px-3 py-2">{orders.map((o) => <option key={o.id} value={o.id}>{o.id}</option>)}</select><select name="rail" className="rounded-xl border px-3 py-2"><option>Stripe</option><option>PayPal</option><option>SSLCOMMERZ</option><option>bKash</option><option>Nagad</option></select><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Create intent</button></form></Card><Card className="p-0">{items.map((i) => <div key={i.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{i.id} · {i.rail} · {i.status}</span>{i.status === "created" && <button type="button" className="text-xs text-brand" onClick={() => setItems(payIntent(i.id))}>Mark paid</button>}</div>)}</Card></>);
}
