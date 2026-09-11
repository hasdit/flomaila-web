"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [text, setText] = useState("TEE-BLK-M,Black Tee,29,12");
  const [out, setOut] = useState("");
  async function run() {
    const rows = text.split("\n").map((line) => { const [sku, title, price, stock] = line.split(",").map((s) => s.trim()); return { sku, title, price: Number(price || 0), stock: Number(stock || 0) }; });
    setOut(JSON.stringify(await (await fetch("/api/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workspaceId: "00000000-0000-0000-0000-000000000001", rows }) })).json(), null, 2));
  }
  return (<><PageHeader title="CSV import" desc="sku,title,price,stock" /><Card><textarea className="h-32 w-full rounded-xl border px-3 py-2 text-sm" value={text} onChange={(e) => setText(e.target.value)} /><button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={run}>Validate + upsert</button><pre className="mt-3 text-xs">{out}</pre></Card></>);
}
