"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { defaultHours, loadHours, saveHours, type Hours } from "@/lib/hours";
export default function Page() {
  const [h, setH] = useState<Hours>(defaultHours);
  useEffect(() => setH(loadHours()), []);
  return (<><PageHeader title="Store hours" desc="After-hours copy for the assistant." /><Card><input className="mb-3 rounded-xl border px-3 py-2" value={h.tz} onChange={(e) => setH({ ...h, tz: e.target.value })} />{Object.keys(h.days).map((d) => <label key={d} className="mb-2 flex items-center gap-2 text-sm"><span className="w-10 uppercase">{d}</span><input className="flex-1 rounded-xl border px-3 py-2" value={h.days[d]} onChange={(e) => setH({ ...h, days: { ...h.days, [d]: e.target.value } })} /></label>)}<button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => saveHours(h)}>Save hours</button></Card></>);
}
