"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [csv, setCsv] = useState("");
  async function pull(kind: string) {
    const data = (await (await fetch("/api/export?kind=" + kind)).json()) as { csv?: string };
    setCsv(data.csv || "");
  }
  return (<><PageHeader title="Export" desc="CSV from Neon or empty local." /><Card className="mb-3 flex gap-2">{["products", "orders", "contacts"].map((k) => <button key={k} type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => pull(k)}>{k}</button>)}</Card><Card><pre className="overflow-x-auto text-xs">{csv || "No file yet."}</pre></Card></>);
}
