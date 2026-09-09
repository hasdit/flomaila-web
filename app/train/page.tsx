"use client";

import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { workspace } from "@/lib/mock";

type Msg = { role: "ai" | "you"; text: string };

export default function TrainPage() {
  const [tab, setTab] = useState<"teach" | "test">("teach");
  const [input, setInput] = useState("");
  const [teach, setTeach] = useState<Msg[]>([
    {
      role: "ai",
      text: "Welcome. I will help you set up your Flomaila assistant. What is your business name?",
    },
  ]);
  const [test, setTest] = useState<Msg[]>([]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const you: Msg = { role: "you", text };
    const ai: Msg = {
      role: "ai",
      text:
        tab === "teach"
          ? "Saved. Add a product, a return policy, or keep answering — then switch to Test."
          : teach.length > 3
            ? "Based on what you taught so far, I would answer from your catalog and policies."
            : "The AI has not learned enough yet. Teach it first.",
    };
    if (tab === "teach") setTeach((m) => [...m, you, ai]);
    else setTest((m) => [...m, you, ai]);
  }

  const thread = tab === "teach" ? teach : test;

  return (
    <>
      <PageHeader title="AI Setup" desc="Train here, test like a customer." />
      <div className="mb-4 flex rounded-full bg-stone-100 p-1 text-sm">
        {(["teach", "test"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full py-2 capitalize ${
              tab === t ? "bg-white font-medium shadow-sm" : "text-stone-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs text-stone-500">{workspace.credits} credits left</p>
      <Card>
        <div className="min-h-[280px] space-y-3">
          {thread.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "ai"
                  ? "bg-brand-tint text-stone-800"
                  : "ml-auto bg-stone-900 text-white"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={tab === "teach" ? "Tell me about your business" : "Message"}
            className="flex-1 rounded-full border border-stone-200 px-4 py-2 text-sm outline-none focus:border-brand"
          />
          <button type="button" onClick={send} className="rounded-full bg-brand px-4 py-2 text-sm text-white">
            Send
          </button>
        </div>
      </Card>
    </>
  );
}
