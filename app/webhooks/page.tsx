"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { deleteHook, fireHook, loadHooks, saveHook, type Hook } from "@/lib/webhooks";
export default function Page() {
  const [items, setItems] = useState<Hook[]>([]);
  useEffect(() => setItems(loadHooks()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(saveHook({ id: crypto.randomUUID(), url: String(d.get("url")), event: String(d.get("event")), last: "" }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Webhooks" desc="Local fire log." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="url" required placeholder="https://..." className="flex-1 rounded-xl border px-3 py-2" /><input name="event" defaultValue="order.paid" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button></form></Card>{items.map((h) => <Card key={h.id} className="mb-2"><p className="text-sm">{h.event} → {h.url}</p><p className="text-xs text-stone-400">{h.last || "never fired"}</p><button type="button" className="mr-2 text-xs text-brand" onClick={() => setItems(fireHook(h.event, "test"))}>Fire test</button><button type="button" className="text-xs text-stone-400" onClick={() => setItems(deleteHook(h.id))}>Delete</button></Card>)}</>);
}
