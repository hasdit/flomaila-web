"use client";
import { useEffect, useState } from "react";
import { loadCampaigns, loadContacts, sendCampaign, type Campaign } from "@/lib/email";
import { toast } from "@/lib/toast";
const STEPS = ["Trigger", "Wait 1h", "Filter", "Send", "Goal"];
export default function EmailStudio() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [active, setActive] = useState(0);
  const [from, setFrom] = useState("hello@brand.com");
  const [subject, setSubject] = useState("Welcome");
  useEffect(() => { setCampaigns(loadCampaigns()); }, []);
  const camp = campaigns[active];
  return (<div className="flex min-h-[70vh] flex-col gap-3 lg:flex-row">
    <aside className="w-full rounded-2xl border bg-white lg:w-56"><p className="border-b px-3 py-2 text-xs uppercase text-stone-400">Workflows</p>{campaigns.length === 0 ? <p className="p-3 text-sm text-stone-500">No workflows yet.</p> : null}{campaigns.map((c, i) => <button key={c.id} type="button" onClick={() => setActive(i)} className={`block w-full border-b px-3 py-2 text-left text-sm ${i === active ? "bg-orange-50" : ""}`}>{c.name}</button>)}</aside>
    <section className="flex flex-1 items-center justify-center gap-2 overflow-x-auto rounded-2xl border bg-white p-6">{STEPS.map((s, i) => <div key={s} className="flex items-center gap-2"><div className="rounded-2xl border bg-stone-50 px-4 py-6 text-center text-sm font-medium">{s}</div>{i < STEPS.length - 1 ? <span className="text-stone-300">→</span> : null}</div>)}</section>
    <aside className="w-full space-y-3 rounded-2xl border bg-white p-4 lg:w-64"><p className="text-xs uppercase text-stone-400">Send</p><label className="block text-xs">From<input className="mt-1 w-full rounded-xl border px-2 py-1 text-sm" value={from} onChange={(e) => setFrom(e.target.value)} /></label><label className="block text-xs">Subject<input className="mt-1 w-full rounded-xl border px-2 py-1 text-sm" value={subject} onChange={(e) => setSubject(e.target.value)} /></label><p className="text-xs text-stone-500">{loadContacts().length} contacts</p><button type="button" className="w-full rounded-full bg-brand py-2 text-sm text-white" onClick={() => { sendCampaign(camp?.name || "Welcome", subject, "Hello from Flomaila"); setCampaigns(loadCampaigns()); toast("Queued locally"); }}>Activate</button></aside></div>);
}
