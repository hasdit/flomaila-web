"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [q, setQ] = useState("");
  const [out, setOut] = useState("");
  async function run() { setOut(JSON.stringify(await (await fetch("/api/search?q=" + encodeURIComponent(q))).json(), null, 2)); }
  return (<><PageHeader title="Global search" desc="Products, orders, threads." /><Card className="mb-3 flex gap-2"><input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} className="flex-1 rounded-full border px-4 py-2 text-sm" /><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={run}>Search</button></Card><Card><pre className="overflow-x-auto text-xs">{out || "Type a query."}</pre></Card></>);
}
