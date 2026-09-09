"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadGuard, saveGuard, type Guard } from "@/lib/guardrails";
export default function Page() {
  const [g, setG] = useState<Guard>({ banned: [], requireHandoff: [], maxReplyChars: 800 });
  useEffect(() => setG(loadGuard()), []);
  return (<><PageHeader title="AI guardrails" desc="Banned phrases and forced handoff." /><Card>
    <label className="block text-sm">Banned<input className="mt-1 w-full rounded-xl border px-3 py-2" value={g.banned.join(", ")} onChange={(e) => setG({ ...g, banned: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></label>
    <label className="mt-3 block text-sm">Handoff if contains<input className="mt-1 w-full rounded-xl border px-3 py-2" value={g.requireHandoff.join(", ")} onChange={(e) => setG({ ...g, requireHandoff: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></label>
    <input type="number" className="mt-3 w-full rounded-xl border px-3 py-2" value={g.maxReplyChars} onChange={(e) => setG({ ...g, maxReplyChars: Number(e.target.value) })} />
    <button type="button" className="mt-4 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => saveGuard(g)}>Save</button>
  </Card></>);
}
