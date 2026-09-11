"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [m, setM] = useState({ products: 0, orders: 0, threads: 0, contacts: 0, mode: "local" });
  useEffect(() => { fetch("/api/metrics").then((r) => r.json()).then((j) => setM((prev) => ({ ...prev, ...j }))).catch(() => undefined); }, []);
  return (<><PageHeader title="Metrics" desc={"Mode " + m.mode} /><div className="grid gap-3 sm:grid-cols-4">{(["products", "orders", "threads", "contacts"] as const).map((k) => <Card key={k}><p className="text-sm text-stone-500">{k}</p><p className="text-3xl font-semibold">{m[k]}</p></Card>)}</div></>);
}
