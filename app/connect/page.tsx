"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadConnectors, saveConnector, type Connector } from "@/lib/connect";
export default function ConnectPage() {
  const [items, setItems] = useState<Connector[]>([]);
  useEffect(() => { setItems(loadConnectors()); }, []);
  return (
    <>
      <PageHeader title="Connect" desc="Store BYO keys locally until OAuth adapters ship." />
      <div className="grid gap-3 sm:grid-cols-2">{items.map((c) => (
        <Card key={c.id}>
          <p className="text-[11px] uppercase tracking-wide text-brand">{c.family}</p>
          <p className="mt-1 font-medium">{c.name}</p>
          <p className="mt-1 text-xs text-stone-500">{c.connected ? c.keyHint : "Not connected"}</p>
          <form className="mt-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); const key = String(new FormData(e.currentTarget).get("key") || ""); setItems(saveConnector(c.id, key)); e.currentTarget.reset(); }}>
            <input name="key" placeholder="API key" className="flex-1 rounded-full border px-3 py-1 text-sm" />
            <button className="rounded-full bg-brand px-3 py-1 text-sm text-white" type="submit">Save</button>
            {c.connected ? <button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => setItems(saveConnector(c.id, ""))}>Off</button> : null}
          </form>
        </Card>
      ))}</div>
    </>
  );
}
