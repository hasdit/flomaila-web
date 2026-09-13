"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    Promise.all([fetch("/api/metrics").then((r) => r.json()).catch(() => ({})), fetch("/api/sla").then((r) => r.json()).catch(() => ({})), fetch("/api/ready").then((r) => r.json()).catch(() => ({}))]).then(([m, s, r]) => setLines(["DB " + String(r.db), "products " + (m.products ?? 0), "orders " + (m.orders ?? 0), "unread " + (s.open ?? 0), "SLA due " + (s.due ?? 0)]));
  }, []);
  return (<><PageHeader title="Daily digest" desc="Ready + metrics + SLA." /><Card>{lines.map((l) => <p key={l} className="text-sm">{l}</p>)}</Card></>);
}
