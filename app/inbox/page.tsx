"use client";
import { useEffect, useState } from "react";
import { loadProducts } from "@/lib/catalog";
import { draftOrder, loadOrders } from "@/lib/orders";
import { loadMacros } from "@/lib/macros";
import { loadThreads, markRead, markUnread, replyToThread, type Channel, type Thread } from "@/lib/inbox";
import { metaOf, upsertMeta } from "@/lib/inbox2";
import { toast } from "@/lib/toast";
const filters: ("all" | Channel)[] = ["all", "web", "facebook", "instagram", "whatsapp"];
export default function InboxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  useEffect(() => { const list = loadThreads(); setThreads(list); setActive(list[0]?.id || ""); }, []);
  const visible = threads.filter((t) => (filter === "all" || t.channel === filter) && (!q.trim() || (t.name + " " + t.channel).toLowerCase().includes(q.toLowerCase())));
  const thread = threads.find((t) => t.id === active);
  const lastOrder = loadOrders()[0];
  async function send(as: "agent" | "ai") {
    const text = input.trim(); if (!thread || !text) return; setInput("");
    if (as === "agent") { setThreads(replyToThread(thread.id, "agent", text)); toast("Sent"); return; }
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, products: loadProducts(), taught: [] }) });
    const data = (await res.json()) as { text?: string };
    setThreads(replyToThread(thread.id, "ai", data.text || text)); toast("AI replied");
  }
  return (
    <div className="-mx-1 flex min-h-[70vh] flex-col gap-3 lg:flex-row">
      <aside className="w-full shrink-0 rounded-2xl border bg-white lg:w-72">
        <div className="border-b p-3"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full rounded-full border px-3 py-1.5 text-sm" />
          <div className="mt-2 flex gap-1 overflow-x-auto text-[11px]">{filters.map((c) => <button key={c} type="button" onClick={() => setFilter(c)} className={`rounded-full px-2 py-0.5 capitalize ${filter === c ? "bg-stone-900 text-white" : "bg-stone-100"}`}>{c}</button>)}</div></div>
        {visible.map((t) => <button key={t.id} type="button" onClick={() => { setActive(t.id); markRead(t.id); setThreads(loadThreads()); }} className={`block w-full border-b px-3 py-3 text-left ${t.id === active ? "bg-orange-50" : ""}`}><p className="flex justify-between text-sm font-medium"><span>{t.name}</span>{t.unread ? <span className="h-2 w-2 rounded-full bg-brand" /> : null}</p><p className="text-[11px] capitalize text-stone-500">{t.channel}</p></button>)}
      </aside>
      <section className="flex min-h-[50vh] flex-1 flex-col rounded-2xl border bg-white">
        {thread ? (<><div className="flex items-center justify-between border-b px-4 py-3"><div><p className="font-medium">{thread.name}</p><p className="text-xs capitalize text-stone-500">{thread.channel}</p></div><div className="flex gap-2 text-xs"><button type="button" className="rounded-full border px-2 py-1" onClick={() => { markUnread(thread.id); setThreads(loadThreads()); }}>Unread</button><button type="button" className="rounded-full border px-2 py-1" onClick={() => { upsertMeta({ ...metaOf(thread.id), closed: true }); toast("Closed"); }}>Close</button></div></div>
        <div className="flex-1 space-y-2 overflow-y-auto p-4">{thread.messages.map((m) => <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "customer" ? "bg-stone-100" : m.from === "ai" ? "bg-orange-50" : "ml-auto bg-stone-900 text-white"}`}>{m.text}</div>)}</div>
        <div className="border-t p-3"><div className="mb-2 flex flex-wrap gap-1">{loadMacros().slice(0, 4).map((m) => <button key={m.id} type="button" className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px]" onClick={() => setInput(m.body)}>{m.title}</button>)}</div>
        <div className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send("agent")} className="flex-1 rounded-full border px-3 py-2 text-sm" placeholder="Reply" /><button type="button" className="rounded-full bg-stone-900 px-3 py-2 text-sm text-white" onClick={() => send("agent")}>Send</button><button type="button" className="rounded-full bg-brand px-3 py-2 text-sm text-white" onClick={() => send("ai")}>AI</button></div></div></>) : <p className="p-8 text-sm text-stone-500">Pick a thread</p>}
      </section>
      <aside className="w-full shrink-0 space-y-3 lg:w-64">
        <div className="rounded-2xl border bg-white p-4 text-sm"><p className="text-xs uppercase text-stone-400">Customer</p><p className="mt-1 font-medium">{thread?.name || "—"}</p>
          <label className="mt-3 block text-xs text-stone-500">Assignee<input className="mt-1 w-full rounded-xl border px-2 py-1 text-sm" defaultValue={thread ? metaOf(thread.id).assignee : ""} onBlur={(e) => thread && upsertMeta({ ...metaOf(thread.id), assignee: e.target.value })} /></label>
          <label className="mt-2 block text-xs text-stone-500">Tags<input className="mt-1 w-full rounded-xl border px-2 py-1 text-sm" defaultValue={thread ? metaOf(thread.id).tags : ""} onBlur={(e) => thread && upsertMeta({ ...metaOf(thread.id), tags: e.target.value })} /></label></div>
        <div className="rounded-2xl border bg-white p-4 text-sm"><p className="text-xs uppercase text-stone-400">Order</p><p className="mt-1">{lastOrder ? lastOrder.id + " · " + lastOrder.status : "None"}</p>
          <button type="button" className="mt-2 text-xs text-brand" onClick={() => { const p = loadProducts()[0]; if (!p || !thread) return; draftOrder({ customer: thread.name, channel: thread.channel, threadId: thread.id, lines: [{ sku: p.sku, title: p.title, qty: 1, price: p.price, currency: p.currency || "USD" }] }); toast("Draft order"); }}>Draft from catalog</button></div>
      </aside></div>
  );
}
