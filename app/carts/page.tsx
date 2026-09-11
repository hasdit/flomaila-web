"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { readJson, writeJson } from "@/lib/store";
type Cart = { id: string; email: string; total: number; ageH: number };
export default function Page() {
  const [items, setItems] = useState<Cart[]>([]);
  useEffect(() => setItems(readJson("flomaila.carts.v1", [])), []);
  function persist(next: Cart[]) { writeJson("flomaila.carts.v1", next); setItems(next); }
  function onSubmit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const d = new FormData(e.currentTarget); persist([{ id: crypto.randomUUID().slice(0, 8), email: String(d.get("email")), total: Number(d.get("total") || 0), ageH: 2 }, ...items]); }
  return (<><PageHeader title="Abandoned carts" desc="Recover later." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="email" type="email" required className="rounded-xl border px-3 py-2 text-sm" /><input name="total" type="number" required className="w-28 rounded-xl border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button></form></Card><Card className="p-0">{items.map((c) => <div key={c.id} className="border-b px-4 py-2 text-sm">{c.email} · {c.total} · {c.ageH}h</div>)}</Card></>);
}
