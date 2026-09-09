"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addCsat, avgCsat, bulkRead, firstResponseMs } from "@/lib/inbox2";
import { loadThreads } from "@/lib/inbox";
export default function Page() {
  const [avg, setAvg] = useState(0);
  const [frt, setFrt] = useState(0);
  useEffect(() => { setAvg(avgCsat()); const ms = loadThreads().map(firstResponseMs).filter(Boolean); setFrt(ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length / 1000) : 0); }, []);
  return (<><PageHeader title="Inbox quality" desc="CSAT and FRT." /><div className="grid gap-3 sm:grid-cols-2"><Card><p className="text-sm text-stone-500">CSAT</p><p className="text-3xl font-semibold">{avg}</p><div className="mt-2 flex gap-1">{[1,2,3,4,5].map((s) => <button key={s} type="button" className="rounded-full border px-2 text-xs" onClick={() => { addCsat("manual", s); setAvg(avgCsat()); }}>{s}</button>)}</div></Card><Card><p className="text-sm text-stone-500">First response (s)</p><p className="text-3xl font-semibold">{frt}</p><button type="button" className="mt-3 text-xs text-brand" onClick={() => bulkRead()}>Bulk read</button></Card></div></>);
}
