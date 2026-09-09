"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadActivity, type Event } from "@/lib/activity";
export default function ActivityPage() {
  const [items, setItems] = useState<Event[]>([]);
  useEffect(() => setItems(loadActivity()), []);
  return (<><PageHeader title="Activity" desc="Last 100 workspace events." /><Card className="p-0">{items.length === 0 ? <p className="p-8 text-center text-sm text-stone-500">No events yet.</p> : items.map((e) => <div key={e.id} className="border-b px-4 py-3 text-sm"><p className="text-xs uppercase text-stone-400">{e.kind} · {new Date(e.at).toLocaleString()}</p><p>{e.text}</p></div>)}</Card></>);
}
