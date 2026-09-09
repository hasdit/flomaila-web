"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addSource, loadSources, removeSource, type Source } from "@/lib/content";
export default function TrainContentPage() {
  const [items, setItems] = useState<Source[]>([]);
  useEffect(() => setItems(loadSources()), []);
  function onUrl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = String(new FormData(e.currentTarget).get("url") || "");
    if (!url) return;
    setItems(addSource("url", url));
    e.currentTarget.reset();
  }
  return (
    <>
      <PageHeader title="Train Content" desc="Index names only in P0 — embeddings come with the DB slice." />
      <Card className="mb-4">
        <input type="file" className="block text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) setItems(addSource("file", f.name)); }} />
        <form className="mt-3 flex gap-2" onSubmit={onUrl}>
          <input name="url" placeholder="https://..." className="flex-1 rounded-full border px-3 py-2 text-sm" />
          <button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add URL</button>
        </form>
      </Card>
      <Card className="p-0">{items.length === 0 ? <p className="p-8 text-center text-sm text-stone-500">Nothing here yet.</p> : items.map((s) => (
        <div key={s.id} className="flex justify-between border-b px-4 py-3 text-sm">
          <span>{s.kind} · {s.name}</span>
          <button type="button" className="text-xs text-stone-400" onClick={() => setItems(removeSource(s.id))}>Remove</button>
        </div>
      ))}</Card>
    </>
  );
}
