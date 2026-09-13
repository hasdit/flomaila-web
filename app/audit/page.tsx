"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [out, setOut] = useState("");
  async function load() { setOut(JSON.stringify(await (await fetch("/api/audit")).json(), null, 2)); }
  useEffect(() => { load(); }, []);
  return (<><PageHeader title="Audit API" desc="In-memory log." /><Card><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={async () => { await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "manual" }) }); load(); }}>Log event</button><pre className="mt-3 overflow-x-auto text-xs">{out}</pre></Card></>);
}
