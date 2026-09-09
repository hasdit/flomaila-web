"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadSegments, runSegment, saveSegment, type Segment } from "@/lib/segments";
export default function Page() {
  const [items, setItems] = useState<Segment[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => setItems(loadSegments()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(saveSegment({ id: crypto.randomUUID(), name: String(d.get("name")), tag: String(d.get("tag")) }));
  }
  return (<><PageHeader title="Segments" desc="Tag-based lists." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="name" required placeholder="VIPs" className="rounded-xl border px-3 py-2" /><input name="tag" required placeholder="vip" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Save</button></form></Card>{items.map((s) => <Card key={s.id} className="mb-2 flex justify-between text-sm"><span>{s.name} · tag:{s.tag}</span><button type="button" className="text-xs text-brand" onClick={() => setCount(runSegment(s).length)}>Preview {count || ""}</button></Card>)}</>);
}
