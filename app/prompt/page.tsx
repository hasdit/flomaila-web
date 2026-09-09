"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { defaultPrompt, loadPrompt, savePrompt, type PromptCfg } from "@/lib/ai2";
export default function Page() {
  const [p, setP] = useState<PromptCfg>(defaultPrompt);
  useEffect(() => setP(loadPrompt()), []);
  return (<><PageHeader title="Model settings" desc="System prompt and knobs." /><Card className="grid gap-3"><textarea className="rounded-xl border px-3 py-2" rows={5} value={p.system} onChange={(e) => setP({ ...p, system: e.target.value })} /><input type="number" step="0.1" className="rounded-xl border px-3 py-2" value={p.temperature} onChange={(e) => setP({ ...p, temperature: Number(e.target.value) })} /><input className="rounded-xl border px-3 py-2" value={p.model} onChange={(e) => setP({ ...p, model: e.target.value })} /><button type="button" className="rounded-full bg-brand py-2 text-sm text-white" onClick={() => savePrompt(p)}>Save</button></Card></>);
}
