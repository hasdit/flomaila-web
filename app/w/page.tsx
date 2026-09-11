"use client";
import { useState } from "react";
export default function PublicWidget() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ from: string; text: string }[]>([{ from: "ai", text: "Hi — Flomaila store assistant." }]);
  async function send() {
    const text = input.trim(); if (!text) return; setInput("");
    setLines((m) => [...m, { from: "you", text }]);
    const data = (await (await fetch("/api/widget/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) })).json()) as { text?: string };
    setLines((m) => [...m, { from: "ai", text: data.text || "…" }]);
  }
  return (<div className="min-h-screen bg-stone-100 p-4"><div className="mx-auto max-w-md rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm font-medium text-[#C2410C]">Flomaila</p><div className="mt-3 min-h-48 space-y-2">{lines.map((l, i) => <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${l.from === "ai" ? "bg-orange-50" : "ml-auto bg-stone-900 text-white"}`}>{l.text}</div>)}</div><div className="mt-3 flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 rounded-full border px-3 py-2 text-sm" /><button type="button" onClick={send} className="rounded-full bg-[#C2410C] px-3 py-2 text-sm text-white">Send</button></div></div></div>);
}
