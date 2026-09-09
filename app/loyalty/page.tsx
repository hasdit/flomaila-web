"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { grantPts, loadLoyalty, type Points } from "@/lib/growth2";
export default function Page() {
  const [items, setItems] = useState<Points[]>([]);
  useEffect(() => setItems(loadLoyalty()), []);
  return (<><PageHeader title="Loyalty" desc="Points by email." /><Card className="mb-4"><form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); grantPts(String(d.get("email")), Number(d.get("pts") || 10)); setItems(loadLoyalty()); }}><input name="email" type="email" required className="rounded-xl border px-3 py-2" /><input name="pts" type="number" defaultValue={10} className="w-24 rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Grant</button></form></Card><Card className="p-0">{items.map((p) => <div key={p.email} className="border-b px-4 py-2 text-sm">{p.email} · {p.pts}</div>)}</Card></>);
}
