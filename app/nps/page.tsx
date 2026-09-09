"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addNps, loadNps, npsValue } from "@/lib/growth2";
export default function Page() {
  const [score, setScore] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => { setScore(npsValue()); setN(loadNps().length); }, []);
  return (<><PageHeader title="NPS" desc="0-10." /><Card><p className="text-4xl font-semibold">{score}</p><p className="text-sm text-stone-500">{n} responses</p><div className="mt-3 flex flex-wrap gap-1">{Array.from({ length: 11 }, (_, i) => <button key={i} type="button" className="rounded-full border px-2 py-1 text-xs" onClick={() => { addNps(i); setScore(npsValue()); setN(loadNps().length); }}>{i}</button>)}</div></Card></>);
}
