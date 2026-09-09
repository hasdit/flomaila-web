"use client";
import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { debit } from "@/lib/credits";
type Msg = { role: "bot" | "you"; text: string };
export default function WidgetPreviewPage() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "Hi — I am the Flomaila store assistant. Ask about a product." }]);
  const snippet = useMemo(() => `<script src="${typeof window !== "undefined" ? window.location.origin : ""}/widget.js" data-workspace="demo" async></script>`, []);
  async function send() {
    const text = input.trim(); if (!text) return; setInput("");
    const products = loadProducts();
    try { debit("debit_embed", 1, "Widget preview turn"); }
    catch { setMsgs((m) => [...m, { role: "you", text }, { role: "bot", text: "Wallet empty. Recharge on Billing." }]); return; }
    setMsgs((m) => [...m, { role: "you", text }, { role: "bot", text: "…" }]);
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, products, taught: [] }) });
    const data = (await res.json()) as { text?: string };
    setMsgs((m) => { const copy = [...m]; copy[copy.length - 1] = { role: "bot", text: data.text || "No reply" }; return copy; });
  }
  return (
    <>
      <PageHeader title="Website chatbot" desc="P0 preview." />
      <Card className="mb-4"><pre className="overflow-x-auto rounded-xl bg-stone-900 p-3 text-xs text-white">{snippet}</pre></Card>
      <div className="relative min-h-[420px] rounded-2xl border border-dashed border-stone-300 bg-white">
        <p className="p-6 text-sm text-stone-400">Merchant website preview</p>
        {open && (
          <div className="absolute bottom-20 right-4 flex w-80 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
            <div className="bg-brand px-4 py-3 text-sm font-medium text-white">Shop assistant</div>
            <div className="max-h-64 space-y-2 overflow-y-auto p-3 text-sm">{msgs.map((m, i) => <div key={i} className={`rounded-2xl px-3 py-2 ${m.role === "bot" ? "bg-brand-tint" : "ml-8 bg-stone-900 text-white"}`}>{m.text}</div>)}</div>
            <div className="flex gap-2 border-t p-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 rounded-full border px-3 py-1 text-sm" />
              <button type="button" onClick={send} className="rounded-full bg-brand px-3 py-1 text-sm text-white">Send</button>
            </div>
          </div>
        )}
        <button type="button" onClick={() => setOpen((v) => !v)} className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-xl text-white shadow-lg" aria-label="Toggle chat">{open ? "×" : "chat"}</button>
      </div>
    </>
  );
}
