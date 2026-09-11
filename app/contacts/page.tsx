"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
type Row = { email: string; firstName?: string; tags?: string };
export default function Page() {
  const [items, setItems] = useState<Row[]>([]);
  const [mode, setMode] = useState("local");
  useEffect(() => { fetch("/api/contacts").then((r) => r.json()).then((j) => { setMode(j.mode || "local"); setItems(j.items || []); }).catch(() => undefined); }, []);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workspaceId: "00000000-0000-0000-0000-000000000001", email: String(d.get("email")), firstName: String(d.get("firstName") || ""), tags: String(d.get("tags") || "") }) });
    const j = await (await fetch("/api/contacts")).json();
    setItems(j.items || []); setMode(j.mode || "local");
  }
  return (<><PageHeader title="Contacts" desc={"Mode " + mode} /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="email" type="email" required className="rounded-xl border px-3 py-2 text-sm" /><input name="firstName" className="rounded-xl border px-3 py-2 text-sm" /><input name="tags" className="rounded-xl border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Save</button></form></Card><Card className="p-0">{items.length === 0 ? <p className="p-8 text-center text-sm text-stone-500">Empty until Neon seed.</p> : items.map((c) => <div key={c.email} className="border-b px-4 py-2 text-sm">{c.email} · {c.firstName} · {c.tags}</div>)}</Card></>);
}
