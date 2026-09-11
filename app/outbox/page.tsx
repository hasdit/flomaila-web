"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { readJson, writeJson } from "@/lib/store";
type Job = { id: string; kind: string; status: "queued" | "sent" | "failed" };
export default function Page() {
  const [items, setItems] = useState<Job[]>([]);
  useEffect(() => setItems(readJson("flomaila.outbox.v1", [])), []);
  function persist(next: Job[]) { writeJson("flomaila.outbox.v1", next); setItems(next); }
  return (<><PageHeader title="Outbox" desc="Retry failed sends." /><Card className="mb-3"><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => persist([{ id: crypto.randomUUID().slice(0, 6), kind: "email", status: "queued" }, ...items])}>Queue job</button></Card><Card className="p-0">{items.map((j) => <div key={j.id} className="flex justify-between border-b px-4 py-2 text-sm"><span>{j.id} · {j.kind} · {j.status}</span><button type="button" className="text-xs text-brand" onClick={() => persist(items.map((x) => x.id === j.id ? { ...x, status: "sent" } : x))}>Mark sent</button></div>)}</Card></>);
}
