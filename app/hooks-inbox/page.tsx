"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [out, setOut] = useState("");
  async function fire() {
    const res = await fetch("/api/webhooks/inbound", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: crypto.randomUUID(), event: "order.paid" }) });
    setOut(JSON.stringify(await res.json(), null, 2));
  }
  return (<><PageHeader title="Inbound webhooks" desc="Idempotent accept." /><Card><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={fire}>Fire test</button><pre className="mt-3 text-xs">{out}</pre></Card></>);
}
