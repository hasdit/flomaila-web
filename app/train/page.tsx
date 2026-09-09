"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { debit } from "@/lib/credits";
import { workspace } from "@/lib/mock";
import { answerFirst, polish } from "@/lib/pipeline";
type Msg = { role: "ai" | "you"; text: string };
export default function TrainPage() {
  const [tab, setTab] = useState<"teach" | "test">("teach");
  const [input, setInput] = useState("");
  const [teach, setTeach] = useState<Msg[]>([{ role: "ai", text: "Welcome. I will help you set up your Flomaila assistant. What is your business name?" }]);
  const [test, setTest] = useState<Msg[]>([]);
  async function send() {
    const text = input.trim(); if (!text) return; setInput("");
    const you: Msg = { role: "you", text };
    if (tab === "teach") { setTeach((m) => [...m, you, { role: "ai", text: "Saved. Add a product or a policy, then switch to Test." }]); return; }
    try { debit("debit_test", 1, "Test chat turn"); }
    catch { setTest((m) => [...m, you, { role: "ai", text: "Wallet empty. Recharge on Billing." }]); return; }
    const faq = answerFirst(text);
    if (faq) { setTest((m) => [...m, you, { role: "ai", text: polish(faq.text) }]); return; }
    setTest((m) => [...m, you, { role: "ai", text: "…" }]);
    const products = loadProducts();
    const taught = teach.filter((t) => t.role === "you").map((t) => t.text);
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, products, taught }) });
    const data = (await res.json()) as { text?: string };
    setTest((m) => { const copy = [...m]; copy[copy.length - 1] = { role: "ai", text: polish(data.text || "No reply") }; return copy; });
  }
  const thread = tab === "teach" ? teach : test;
  return (<><PageHeader title="AI Setup" desc="Train here, test like a customer." /><div className="mb-4 flex rounded-full bg-stone-100 p-1 text-sm">{(["teach", "test"] as const).map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`flex-1 rounded-full py-2 capitalize ${tab === t ? "bg-white font-medium shadow-sm" : "text-stone-500"}`}>{t}</button>)}</div><p className="mb-3 text-xs text-stone-500">{workspace.credits} credits left</p><Card><div className="min-h-[280px] space-y-3">{thread.map((m, i) => <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "ai" ? "bg-brand-tint text-stone-800" : "ml-auto bg-stone-900 text-white"}`}>{m.text}</div>)}</div><div className="mt-4 flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={tab === "teach" ? "Tell me about your business" : "Message"} className="flex-1 rounded-full border border-stone-200 px-4 py-2 text-sm outline-none focus:border-brand" /><button type="button" onClick={send} className="rounded-full bg-brand px-4 py-2 text-sm text-white">Send</button></div></Card></>);
}
