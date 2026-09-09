"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { checklist, markStep, type Step } from "@/lib/onboarding";
export default function Page() {
  const [steps, setSteps] = useState<Step[]>([]);
  useEffect(() => setSteps(checklist()), []);
  const done = steps.filter((s) => s.done).length;
  return (<><PageHeader title="Onboarding" desc={done + " / " + steps.length + " complete"} /><Card className="p-0">{steps.map((s) => <div key={s.id} className="flex items-center justify-between border-b px-4 py-3 text-sm"><span>{s.done ? "✓" : "○"} {s.label}</span><div className="flex gap-2"><Link href={s.href} className="text-xs text-brand">Open</Link>{!s.done && <button type="button" className="text-xs" onClick={() => { markStep(s.id); setSteps(checklist()); }}>Skip</button>}</div></div>)}</Card></>);
}
