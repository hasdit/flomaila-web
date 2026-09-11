"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadReports, reportHallucination, type Report } from "@/lib/ai2";
export default function Page() {
  const [items, setItems] = useState<Report[]>([]);
  useEffect(() => setItems(loadReports()), []);
  return (<><PageHeader title="Hallucination reports" desc="Flag a bad answer." /><Card className="mb-3"><button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => { reportHallucination("Invented a price"); setItems(loadReports()); }}>Report sample</button></Card>{items.map((r) => <Card key={r.id} className="mb-2 text-sm">{r.text}</Card>)}</>);
}
