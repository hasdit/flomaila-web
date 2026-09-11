"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
const ENDPOINTS = [["GET", "/api/ready"], ["GET", "/api/db"], ["GET", "/api/products"], ["GET", "/api/orders"], ["GET", "/api/threads"], ["GET", "/api/credits"], ["GET", "/api/contacts"], ["GET", "/api/sla"], ["GET", "/api/export?kind=products"]];
export default function Page() {
  const [out, setOut] = useState("");
  async function hit(method: string, path: string) {
    const res = await fetch(path, { method });
    setOut(method + " " + path + "\n" + JSON.stringify(await res.json(), null, 2));
  }
  return (<><PageHeader title="API explorer" desc="JSON routes. Neon if DATABASE_URL is set." /><Card className="mb-3 flex flex-wrap gap-2">{ENDPOINTS.map(([m, p]) => <button key={p} type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => hit(m, p)}>{m} {p}</button>)}<button type="button" className="rounded-full bg-brand px-3 py-1 text-xs text-white" onClick={() => fetch("/api/seed", { method: "POST" }).then((r) => r.json()).then((j) => setOut(JSON.stringify(j, null, 2)))}>POST /api/seed</button></Card><Card><pre className="overflow-x-auto text-xs">{out || "Pick an endpoint."}</pre></Card></>);
}
