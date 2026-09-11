"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { readJson, writeJson } from "@/lib/store";
type Quote = { id: string; customer: string; total: number; status: "open" | "sent" | "won" | "lost" };
export default function Page() {
  const [items, setItems] = useState<Quote[]>([]);
  useEffect(() => setItems(readJson("flomaila.quotes.v1", [])), []);
  function persist(next: Quote[]) { writeJson("flomaila.quotes.v1", next); setItems(next); }
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    persist([{ id: "q_" + crypto.randomUUID().slice(0, 6), customer: String(d.get("customer")), total: Number(d.get("total") || 0), status: "open" }, ...items]);
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Quotes" desc="Pre-order estimates." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="customer" required className="rounded-xl border px-3 py-2 text-sm" /><input name="total" type="number" required className="w-28 rounded-xl border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Create</button></form></Card><Card className="p-0">{items.map((q) => <div key={q.id} className="flex justify-between border-b px-4 py-2 text-sm"><span>{q.id} · {q.customer} · {q.total} · {q.status}</span><button type="button" className="text-xs text-brand" onClick={() => persist(items.map((x) => x.id === q.id ? { ...x, status: "sent" } : x))}>Send</button></div>)}</Card></>);
}
