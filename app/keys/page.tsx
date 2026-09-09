"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { createKey, loadKeys, revokeKey, type ApiKey } from "@/lib/keys";
export default function Page() {
  const [items, setItems] = useState<ApiKey[]>([]);
  const [raw, setRaw] = useState("");
  useEffect(() => setItems(loadKeys()), []);
  return (<><PageHeader title="API keys" desc="Shown once in P0." /><Card className="mb-4"><form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const r = createKey(String(new FormData(e.currentTarget).get("name") || "key")); setItems(loadKeys()); setRaw(r.raw); }}><input name="name" placeholder="Name" className="flex-1 rounded-full border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Create</button></form>{raw ? <p className="mt-3 break-all font-mono text-xs">{raw}</p> : null}</Card><Card className="p-0">{items.map((k) => <div key={k.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{k.name} · {k.hint}</span><button type="button" className="text-xs text-stone-400" onClick={() => setItems(revokeKey(k.id))}>Revoke</button></div>)}</Card></>);
}
