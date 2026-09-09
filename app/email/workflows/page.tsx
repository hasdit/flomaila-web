"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadWorkflows, saveWorkflow, toggleWorkflow, type Workflow } from "@/lib/workflows";
import { logEvent } from "@/lib/activity";
export default function WorkflowsPage() {
  const [items, setItems] = useState<Workflow[]>([]);
  useEffect(() => setItems(loadWorkflows()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") || "Workflow");
    const w: Workflow = { id: crypto.randomUUID(), name, active: false, steps: [{ id: "1", type: "wait", label: "Wait 1 hour" }, { id: "2", type: "send", label: "Send welcome" }, { id: "3", type: "tag", label: "Tag: welcomed" }] };
    setItems(saveWorkflow(w)); logEvent("workflow", `Created ${name}`); e.currentTarget.reset();
  }
  return (<><PageHeader title="Email workflows" desc="Linear steps for P0." /><Card className="mb-4"><form className="flex gap-2" onSubmit={onSubmit}><input name="name" required placeholder="Workflow name" className="flex-1 rounded-full border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Create</button></form></Card>
    {items.map((w) => <Card key={w.id} className="mb-3"><div className="flex items-center justify-between"><p className="font-medium">{w.name}</p><button type="button" className="text-xs text-brand" onClick={() => setItems(toggleWorkflow(w.id))}>{w.active ? "Active" : "Off"}</button></div><ol className="mt-2 list-decimal pl-5 text-sm text-stone-600">{w.steps.map((s) => <li key={s.id}>{s.label}</li>)}</ol></Card>)}</>);
}
