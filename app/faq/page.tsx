"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { deleteFaq, loadFaq, saveFaq, type Faq } from "@/lib/faq";
export default function Page() {
  const [items, setItems] = useState<Faq[]>([]);
  useEffect(() => setItems(loadFaq()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(saveFaq({ id: crypto.randomUUID(), q: String(d.get("q")), a: String(d.get("a")) }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="FAQ knowledge" desc="Deterministic answers before the model." /><Card className="mb-4"><form className="grid gap-2" onSubmit={onSubmit}><input name="q" required placeholder="Question" className="rounded-xl border px-3 py-2" /><textarea name="a" required rows={3} className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Save FAQ</button></form></Card>{items.map((f) => <Card key={f.id} className="mb-2"><p className="font-medium">{f.q}</p><p className="text-sm text-stone-600">{f.a}</p><button type="button" className="mt-2 text-xs text-stone-400" onClick={() => setItems(deleteFaq(f.id))}>Delete</button></Card>)}</>);
}
