"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadEvals, saveEval, scoreEval, type EvalCase } from "@/lib/ai2";
import { localReply } from "@/lib/gateway";
import { loadProducts } from "@/lib/catalog";
export default function Page() {
  const [items, setItems] = useState<EvalCase[]>([]);
  useEffect(() => setItems(loadEvals()), []);
  return (<><PageHeader title="Eval set" desc="Golden questions." /><Card className="mb-4"><form className="grid gap-2" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); setItems(saveEval({ id: crypto.randomUUID(), q: String(d.get("q")), expect: String(d.get("expect")) })); }}><input name="q" required placeholder="Question" className="rounded-xl border px-3 py-2" /><input name="expect" required placeholder="Must contain" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Add</button></form></Card>{items.map((c) => <Card key={c.id} className="mb-2 text-sm"><p>{c.q}</p><button type="button" className="text-xs text-brand" onClick={() => setItems(scoreEval(c.id, localReply(c.q, loadProducts(), [])))}>Run</button>{c.last ? <p>{c.pass ? "PASS" : "FAIL"} · {c.last}</p> : null}</Card>)}</>);
}
