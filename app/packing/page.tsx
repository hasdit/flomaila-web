"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadOrders, orderTotal, type Order } from "@/lib/orders";
export default function Page() {
  const [items, setItems] = useState<Order[]>([]);
  useEffect(() => setItems(loadOrders()), []);
  return (<><PageHeader title="Packing slips" desc="From local orders." />{items.length === 0 ? <Card>No orders.</Card> : items.map((o) => <Card key={o.id} className="mb-3 text-sm"><p className="font-medium">Pack {o.id}</p><p>{o.customer} · {o.status}</p><ul className="mt-2 list-disc pl-5">{o.lines.map((l) => <li key={l.sku}>{l.qty} × {l.title}</li>)}</ul><p className="mt-2">Total {orderTotal(o).toFixed(2)}</p></Card>)}</>);
}
