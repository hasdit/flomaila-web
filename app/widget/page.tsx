"use client";

import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { debit } from "@/lib/credits";

type Msg = { role: "bot" | "you"; text: string };

export default function WidgetPreviewPage() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi — I am the Flomaila store assistant. Ask about a product." },
  ]);
  const snippet = useMemo(
    () => `<script src="${typeof window !== "undefined" ? window.location.origin : ""}/widget.js" data-workspace="demo" async></script>`,
    []
  );

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const products = loadProducts();
    const hit = products.find((p) =>
      `${p.title} ${p.sku} ${p.category}`.toLowerCase().includes(text.toLowerCase())
    );
    let reply = "I do not have that in the catalog yet. Add it under Products.";
    if (hit) reply = `${hit.title} (${hit.sku}) is ${hit.currency} ${hit.price.toFixed(2)}. Stock ${hit.stock}.`;
    try {
      debit("debit_embed", 1, "Widget preview turn");
    } catch {
      reply = "Wallet empty. Recharge on Billing — the live widget is paused.";
    }
    setMsgs((m) => [...m, { role: "you", text }, { role: "bot", text: reply }]);
  }

  return (
    <>
      <PageHeader title="Website chatbot" desc="P0 preview. Paste the snippet after you ship /widget.js." />
      <Card className="mb-4">
        <p className="text-sm text-stone-600">Embed snippet</p>
        <pre className="mt-2 overflow-x-auto rounded-xl bg-stone-900 p-3 text-xs text-white">{snippet}</pre>
      </Card>
      <div className="relative min-h-[420px] rounded-2xl border border-dashed border-stone-300 bg-white">
        <p className="p-6 text-sm text-stone-400">Merchant website preview</p>
        {open && (
          <div className="absolute bottom-20 right-4 flex w-80 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
            <div className="bg-brand px-4 py-3 text-sm font-medium text-white">Shop assistant</div>
            <div className="max-h-64 space-y-2 overflow-y-auto p-3 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={`rounded-2xl px-3 py-2 ${m.role === "bot" ? "bg-brand-tint" : "ml-8 bg-stone-900 text-white"}`}>{m.text}</div>
              ))}
            </div>
            <div className="flex gap-2 border-t p-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 rounded-full border px-3 py-1 text-sm" placeholder="Ask about a SKU" />
              <button type="button" onClick={send} className="rounded-full bg-brand px-3 py-1 text-sm text-white">Send</button>
            </div>
          </div>
        )}
        <button type="button" onClick={() => setOpen((v) => !v)} className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-xl text-white shadow-lg" aria-label="Toggle chat">{open ? "×" : "💬"}</button>
      </div>
    </>
  );
}
