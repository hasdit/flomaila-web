"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadSnaps, takeSnap, type Snap } from "@/lib/ai2";
export default function Page() {
  const [items, setItems] = useState<Snap[]>([]);
  useEffect(() => setItems(loadSnaps()), []);
  return (<><PageHeader title="Train snapshots" desc="Point-in-time taught text." /><Card className="mb-3"><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => { takeSnap("manual", ["snapshot"]); setItems(loadSnaps()); }}>Snapshot</button></Card>{items.map((s) => <Card key={s.id} className="mb-2 text-sm"><p>{s.note}</p><p className="text-stone-500">{s.at}</p></Card>)}</>);
}
