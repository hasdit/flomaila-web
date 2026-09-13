"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [id, setId] = useState("");
  const [out, setOut] = useState("");
  return (<><PageHeader title="Clone product" desc="SKU-COPY on Neon." /><Card><input value={id} onChange={(e) => setId(e.target.value)} placeholder="product id" className="w-full rounded-xl border px-3 py-2 text-sm" /><button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={async () => setOut(JSON.stringify(await (await fetch("/api/clone", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: id }) })).json(), null, 2))}>Clone</button><pre className="mt-3 text-xs">{out}</pre></Card></>);
}
