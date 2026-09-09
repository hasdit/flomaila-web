"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { draftOrder } from "@/lib/orders";
import { loadThreads, markRead, replyToThread, type Channel, type Thread } from "@/lib/inbox";
const filters: ("all" | Channel)[] = ["all", "web", "facebook", "instagram", "whatsapp"];
export default function InboxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [input, setInput] = useState("");
  useEffect(() => { const list = loadThreads(); setThreads(list); setActive(list[0]?.id || ""); }, []);
  const visible = threads.filter((t) => filter === "all" || t.channel === filter);
  const thread = threads.find((t) => t.id === active);
  async function send(as: "agent" | "ai") {
    const text = input.trim(); if (!thread || !text) return; setInput("");
    if (as === "agent") { setThreads(replyToThread(thread.id, "agent", text)); return; }
    const products = loadProducts();
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: thread.messages.at(-1)?.text || text, products, taught: [text] }) });
    const data = (await res.json()) as { text?: string };
    setThreads(replyToThread(thread.id, "ai", data.text || text));
  }
  return (
    <>
      <PageHeader title="Inbox" desc="One thread per customer. P0 is local only." />
      <div className="mb-3 flex gap-2 overflow-x-auto text-xs">{filters.map((c) => <button key={c} type="button" onClick={() => setFilter(c)} className={`rounded-full px-3 py-1 capitalize ${filter === c ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"}`}>{c}</button>)}</div>
      <div className="grid gap-3 lg:grid-cols-[280px_1fr]">
        <Card className="p-0">{visible.map((t) => (
          <button key={t.id} type="button" onClick={() => { setActive(t.id); setThreads(markRead(t.id)); }} className={`block w-full border-b border-stone-50 px-4 py-3 text-left ${t.id === active ? "bg-brand-tint" : ""}`}>
            <div className="flex justify-between text-sm"><span className="font-medium">{t.name}</span>{t.unread ? <span className="h-2 w-2 rounded-full bg-brand" /> : null}</div>
            <p className="truncate text-xs text-stone-500">{t.channel}</p>
          </button>
        ))}</Card>
        <Card className="flex min-h-[360px] flex-col p-0">
          {!thread ? <p className="p-8 text-center text-sm text-stone-500">Pick a thread.</p> : (
            <>
              <div className="flex items-center justify-between border-b px-4 py-3 text-sm font-medium">
                <span>{thread.name} · {thread.channel}</span>
                <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => {
                  const p = loadProducts()[0];
                  const order = draftOrder({ threadId: thread.id, customer: thread.name, channel: thread.channel, lines: p ? [{ sku: p.sku, title: p.title, qty: 1, price: p.price, currency: p.currency }] : [{ sku: "TBD", title: "Draft line", qty: 1, price: 0, currency: "USD" }] });
                  setThreads(replyToThread(thread.id, "agent", `Draft ${order.id} created. Confirm on Orders.`));
                }}>Draft order</button>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-4">{thread.messages.map((m) => (
                <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "customer" ? "bg-stone-100" : m.from === "ai" ? "ml-auto bg-brand-tint" : "ml-auto bg-stone-900 text-white"}`}><p className="text-[10px] uppercase opacity-60">{m.from}</p>{m.text}</div>
              ))}</div>
              <div className="flex gap-2 border-t p-3">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send("agent")} className="flex-1 rounded-full border px-3 py-2 text-sm" placeholder="Reply as agent" />
                <button type="button" onClick={() => send("agent")} className="rounded-full bg-stone-900 px-3 py-2 text-sm text-white">Send</button>
                <button type="button" onClick={() => send("ai")} className="rounded-full bg-brand px-3 py-2 text-sm text-white">AI</button>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
