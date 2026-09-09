"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadPlays, savePlay, type Play } from "@/lib/playbooks";
export default function Page() {
  const [items, setItems] = useState<Play[]>([]);
  useEffect(() => setItems(loadPlays()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(savePlay({ id: crypto.randomUUID(), title: String(d.get("title")), steps: String(d.get("steps")).split("\n").filter(Boolean) }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Playbooks" desc="Agent scripts." /><Card className="mb-4"><form className="grid gap-2" onSubmit={onSubmit}><input name="title" required className="rounded-xl border px-3 py-2" /><textarea name="steps" required rows={4} className="rounded-xl border px-3 py-2" placeholder="One step per line" /><button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Save</button></form></Card>{items.map((p) => <Card key={p.id} className="mb-2"><p className="font-medium">{p.title}</p><ol className="mt-1 list-decimal pl-5 text-sm">{p.steps.map((s) => <li key={s}>{s}</li>)}</ol></Card>)}</>);
}
