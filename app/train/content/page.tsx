"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addSource, loadSources, removeSource, type Source, type SourceKind } from "@/lib/content";
const kinds: SourceKind[] = ["text", "file", "url", "store", "media", "ad_creative"];
export default function TrainContentPage() {
  const [tab, setTab] = useState<SourceKind>("text");
  const [items, setItems] = useState<Source[]>([]);
  useEffect(() => setItems(loadSources()), []);
  function onText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") || "");
    if (!name) return;
    setItems(addSource(tab, name));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Train Content" desc="RAG later. Ads tab needs family=ads." />
    <div className="mb-3 flex flex-wrap gap-1 text-xs">{kinds.map((k) => <button key={k} type="button" onClick={() => setTab(k)} className={`rounded-full px-3 py-1 ${tab === k ? "bg-stone-900 text-white" : "bg-stone-100"}`}>{k}</button>)}</div>
    <Card className="mb-4">{tab === "file" || tab === "media" ? <input type="file" className="block text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) setItems(addSource(tab, f.name)); }} /> : <form className="flex gap-2" onSubmit={onText}><input name="name" className="flex-1 rounded-full border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button></form>}</Card>
    <Card className="p-0">{items.filter((s) => s.kind === tab).map((s) => <div key={s.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{s.name}</span><button type="button" className="text-xs text-stone-400" onClick={() => setItems(removeSource(s.id))}>Remove</button></div>)}</Card></>);
}
