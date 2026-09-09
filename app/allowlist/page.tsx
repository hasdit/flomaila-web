"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadAllow, saveAllow } from "@/lib/allowlist";
export default function Page() {
  const [text, setText] = useState("");
  useEffect(() => setText(loadAllow().join("\n")), []);
  return (<><PageHeader title="IP allowlist" desc="Empty list means allow all." /><Card><textarea className="h-40 w-full rounded-xl border px-3 py-2 font-mono text-sm" value={text} onChange={(e) => setText(e.target.value)} /><button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => saveAllow(text.split("\n").map((s) => s.trim()).filter(Boolean))}>Save</button></Card></>);
}
