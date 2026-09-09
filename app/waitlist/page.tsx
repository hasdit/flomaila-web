"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { joinWait, loadWait, type WaitItem } from "@/lib/commerce2";
export default function Page() {
  const [items, setItems] = useState<WaitItem[]>([]);
  useEffect(() => setItems(loadWait()), []);
  return (<><PageHeader title="Waitlist" desc="Back in stock." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); setItems(joinWait(String(d.get("email")), String(d.get("sku")))); }}><input name="email" type="email" required className="rounded-xl border px-3 py-2" /><input name="sku" required placeholder="SKU" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Join</button></form></Card><Card className="p-0">{items.map((w) => <div key={w.id} className="border-b px-4 py-3 text-sm">{w.email} · {w.sku}</div>)}</Card></>);
}
