"use client";
import { useEffect, useState } from "react";
import { catalog, loadConnectors, saveConnector, type Connector } from "@/lib/connect";
import { toast } from "@/lib/toast";
export default function ConnectWizard() {
  const [step, setStep] = useState(0);
  const [id, setId] = useState("web");
  const [key, setKey] = useState("");
  const [items, setItems] = useState<Connector[]>([]);
  const [ping, setPing] = useState<"idle" | "ok" | "fail">("idle");
  useEffect(() => { setItems(loadConnectors()); }, []);
  const chosen = catalog.find((c) => c.id === id)!;
  return (<div className="mx-auto max-w-xl space-y-4"><p className="text-sm text-stone-500">Step {step + 1} / 4</p>
    {step === 0 && <div className="grid gap-2 sm:grid-cols-2">{catalog.map((c) => <button key={c.id} type="button" onClick={() => setId(c.id)} className={`rounded-2xl border p-3 text-left ${id === c.id ? "border-brand bg-orange-50" : "bg-white"}`}><p className="text-[11px] uppercase text-stone-400">{c.family}</p><p className="font-medium">{c.name}</p></button>)}<button type="button" className="col-span-full rounded-full bg-stone-900 py-2 text-sm text-white" onClick={() => setStep(1)}>Continue</button></div>}
    {step === 1 && <div className="rounded-2xl border bg-white p-4"><p className="font-medium">Paste key for {chosen.name}</p><input value={key} onChange={(e) => setKey(e.target.value)} className="mt-3 w-full rounded-xl border px-3 py-2 text-sm" placeholder="token" /><button type="button" className="mt-3 rounded-full bg-stone-900 px-4 py-2 text-sm text-white" onClick={() => setStep(2)}>Save & ping</button></div>}
    {step === 2 && <div className="rounded-2xl border bg-white p-4"><p className="text-sm">Local ping — live API waits for env.</p><button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => { const ok = key.trim().length >= 4; setPing(ok ? "ok" : "fail"); if (ok) setItems(saveConnector(id, key)); toast(ok ? "Ping ok" : "Key too short"); }}>Run ping</button>{ping === "ok" && <button type="button" className="ml-2 rounded-full border px-4 py-2 text-sm" onClick={() => setStep(3)}>Next</button>}</div>}
    {step === 3 && <div className="rounded-2xl border bg-emerald-50 p-6 text-center"><p className="text-lg font-semibold text-emerald-800">Connected</p><p className="mt-1 text-sm text-emerald-700">{chosen.name} ready.</p></div>}
    <p className="text-xs text-stone-400">{items.filter((i) => i.connected).length} channels stored</p></div>);
}
