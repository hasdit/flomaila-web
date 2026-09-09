"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadOrders } from "@/lib/orders";
import { createRma, loadRma, setRma, type Rma } from "@/lib/returns";
export default function Page() {
  const [items, setItems] = useState<Rma[]>([]);
  const [orders, setOrders] = useState<{ id: string }[]>([]);
  useEffect(() => { setItems(loadRma()); setOrders(loadOrders()); }, []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    createRma(String(d.get("orderId")), String(d.get("reason")));
    setItems(loadRma());
  }
  return (<><PageHeader title="Returns / RMA" desc="Approve, reject, or refund." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><select name="orderId" className="rounded-xl border px-3 py-2">{orders.map((o) => <option key={o.id}>{o.id}</option>)}<option>none</option></select><input name="reason" required placeholder="Reason" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Open RMA</button></form></Card><Card className="p-0">{items.map((r) => <div key={r.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{r.id} · {r.status} · {r.reason}</span><div className="flex gap-2 text-xs"><button type="button" onClick={() => setItems(setRma(r.id, "approved"))}>Approve</button><button type="button" onClick={() => setItems(setRma(r.id, "rejected"))}>Reject</button><button type="button" onClick={() => setItems(setRma(r.id, "refunded"))}>Refund</button></div></div>)}</Card></>);
}
