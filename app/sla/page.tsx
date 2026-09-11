"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [data, setData] = useState({ open: 0, due: 0, mode: "local" });
  useEffect(() => { fetch("/api/sla").then((r) => r.json()).then((j) => setData({ open: j.open || 0, due: j.due || 0, mode: j.mode || "local" })).catch(() => undefined); }, []);
  return (<><PageHeader title="SLA board" desc={"Mode " + data.mode} /><div className="grid gap-3 sm:grid-cols-2"><Card><p className="text-sm text-stone-500">Unread</p><p className="text-3xl font-semibold">{data.open}</p></Card><Card><p className="text-sm text-stone-500">Past due</p><p className="text-3xl font-semibold">{data.due}</p></Card></div></>);
}
