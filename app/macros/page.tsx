"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { deleteMacro, loadMacros, saveMacro, type Macro } from "@/lib/macros";
export default function Page() {
  const [items, setItems] = useState<Macro[]>([]);
  useEffect(() => setItems(loadMacros()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(saveMacro({ id: crypto.randomUUID(), title: String(d.get("title")), body: String(d.get("body")) }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Macros" desc="Canned replies for inbox agents." /><Card className="mb-4"><form className="grid gap-2" onSubmit={onSubmit}><input name="title" required placeholder="Title" className="rounded-xl border px-3 py-2" /><textarea name="body" required rows={3} className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Save macro</button></form></Card>{items.map((m) => <Card key={m.id} className="mb-2"><div className="flex justify-between"><p className="font-medium">{m.title}</p><button type="button" className="text-xs text-stone-400" onClick={() => setItems(deleteMacro(m.id))}>Delete</button></div><p className="mt-1 text-sm text-stone-600">{m.body}</p></Card>)}</>);
}
