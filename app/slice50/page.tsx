"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { SLICES, sliceOf, type Row } from "@/lib/slice50";
export default function Slice50() {
  const [slug, setSlug] = useState(SLICES[0].slug);
  const [rows, setRows] = useState<Row[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => { setRows(sliceOf(slug).load()); }, [slug]);
  const label = SLICES.find((s) => s.slug === slug)?.label || slug;
  return (<><PageHeader title="Slice 50" desc="50 working local stores. Keys later." />
    <div className="grid gap-3 lg:grid-cols-[240px_1fr]"><aside className="max-h-[70vh] overflow-y-auto rounded-2xl border bg-white">
      {SLICES.map((s) => <button key={s.slug} type="button" onClick={() => setSlug(s.slug)} className={`block w-full border-b px-3 py-2 text-left text-sm ${s.slug === slug ? "bg-orange-50 text-brand" : ""}`}>{s.label}</button>)}
    </aside><Card><p className="font-medium">{label}</p>
      <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!title.trim()) return; setRows(sliceOf(slug).add(title.trim())); setTitle(""); }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 rounded-full border px-3 py-2 text-sm" placeholder={"Add " + label} />
        <button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button>
      </form>
      <ul className="mt-4 text-sm">{rows.map((r) => <li key={r.id} className="flex justify-between border-b py-2"><span>{r.title}</span><button type="button" className="text-xs text-stone-400" onClick={() => setRows(sliceOf(slug).remove(r.id))}>Remove</button></li>)}</ul>
      {rows.length === 0 ? <p className="mt-3 text-sm text-stone-500">Empty. Stored in this browser.</p> : null}
    </Card></div></>);
}
