"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [out, setOut] = useState("");
  async function run(op: "restock" | "zero") {
    setOut(JSON.stringify(await (await fetch("/api/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op, workspaceId: "00000000-0000-0000-0000-000000000001", delta: 5 }) })).json(), null, 2));
  }
  return (<><PageHeader title="Bulk stock" desc="Restock or zero." /><Card className="flex gap-2"><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => run("restock")}>+5 all</button><button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => run("zero")}>Zero all</button></Card><Card className="mt-3"><pre className="text-xs">{out}</pre></Card></>);
}
