"use client";
import { useEffect, useState } from "react";
import { loadProducts } from "@/lib/catalog";
import { debit } from "@/lib/credits";
import { answerFirst, polish } from "@/lib/pipeline";
import { loadFaq } from "@/lib/faq";
import { loadGuard } from "@/lib/guardrails";
import { readJson, writeJson } from "@/lib/store";
import { toast } from "@/lib/toast";
type Msg = { role: "ai" | "you"; text: string };
export default function TrainPage() {
  const [tab, setTab] = useState<"teach" | "test">("teach");
  const [input, setInput] = useState("");
  const [teach, setTeach] = useState<Msg[]>([]);
  const [test, setTest] = useState<Msg[]>([]);
  useEffect(() => { setTeach(readJson("flomaila.teach.v1", [{ role: "ai", text: "What should customers know first — hours, shipping, or a hero product?" }])); }, []);
  function persistTeach(next: Msg[]) { writeJson("flomaila.teach.v1", next); setTeach(next); }
  async function send() {
    const text = input.trim(); if (!text) return; setInput("");
    const you: Msg = { role: "you", text };
    if (tab === "teach") { persistTeach([...teach, you, { role: "ai", text: "Saved to this workspace. Test it on the right." }]); toast("Taught"); return; }
    try { debit("debit_test", 1, "Test chat"); } catch { setTest((m) => [...m, you, { role: "ai", text: "Wallet empty. Recharge in Wallet." }]); return; }
    const faq = answerFirst(text);
    if (faq) { setTest((m) => [...m, you, { role: "ai", text: polish(faq.text) }]); return; }
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, products: loadProducts(), taught: teach.filter((t) => t.role === "you").map((t) => t.text) }) });
    const data = (await res.json()) as { text?: string };
    setTest((m) => [...m, you, { role: "ai", text: polish(data.text || "No reply") }]);
  }
  const thread = tab === "teach" ? teach : test;
  return (<div className="grid gap-3 lg:grid-cols-[220px_1fr]"><aside className="space-y-3"><div className="rounded-2xl border bg-white p-4 text-sm"><p className="text-xs uppercase text-stone-400">Sources</p><p className="mt-2">{loadProducts().length} products</p><p>{loadFaq().length} FAQs</p><p>{loadGuard().banned.length} banned phrases</p><p>{teach.filter((t) => t.role === "you").length} taught lines</p></div><div className="rounded-2xl border bg-white p-4 text-xs text-stone-500">Add XAI_API_KEY later. Until then replies stay catalog-aware local.</div></aside><section className="flex min-h-[60vh] flex-col rounded-2xl border bg-white"><div className="flex border-b p-1">{(["teach", "test"] as const).map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`flex-1 rounded-full py-2 text-sm capitalize ${tab === t ? "bg-stone-900 text-white" : "text-stone-500"}`}>{t}</button>)}</div><div className="flex-1 space-y-2 overflow-y-auto p-4">{thread.map((m, i) => <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "ai" ? "bg-orange-50" : "ml-auto bg-stone-900 text-white"}`}>{m.text}</div>)}</div><div className="flex gap-2 border-t p-3"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 rounded-full border px-3 py-2 text-sm" placeholder={tab === "teach" ? "Teach a fact" : "Ask as a customer"} /><button type="button" onClick={send} className="rounded-full bg-brand px-4 py-2 text-sm text-white">Send</button></div></section></div>);
}
