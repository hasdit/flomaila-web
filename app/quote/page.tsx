"use client";
import { FormEvent, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [out, setOut] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setOut(JSON.stringify(await (await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subtotal: Number(d.get("subtotal")), country: String(d.get("country")), weightKg: Number(d.get("weightKg")) }) })).json(), null, 2));
  }
  return (<><PageHeader title="Landed-cost quote" desc="Tax + generic shipping." /><Card><form className="grid gap-2 sm:grid-cols-3" onSubmit={onSubmit}><input name="subtotal" type="number" defaultValue={100} className="rounded-xl border px-3 py-2 text-sm" /><input name="country" defaultValue="US" className="rounded-xl border px-3 py-2 text-sm" /><input name="weightKg" type="number" step="0.1" defaultValue={0.5} className="rounded-xl border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Quote</button></form><pre className="mt-3 text-xs">{out}</pre></Card></>);
}
