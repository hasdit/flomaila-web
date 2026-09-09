"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addTicket, closeTicket, loadTickets, type Ticket } from "@/lib/tickets";
export default function HelpPage() {
  const [items, setItems] = useState<Ticket[]>([]);
  useEffect(() => setItems(loadTickets()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setItems(addTicket(String(data.get("title") || "Ticket"), String(data.get("body") || "")));
    e.currentTarget.reset();
  }
  return (
    <>
      <PageHeader title="Help" desc="Workspace tickets." />
      <Card className="mb-4">
        <form className="grid gap-2" onSubmit={onSubmit}>
          <input name="title" required placeholder="Title" className="rounded-xl border px-3 py-2" />
          <textarea name="body" placeholder="What broke?" className="rounded-xl border px-3 py-2" rows={3} />
          <button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Open ticket</button>
        </form>
      </Card>
      <Card className="p-0">{items.length === 0 ? <p className="p-6 text-sm text-stone-500">No tickets.</p> : items.map((t) => (
        <div key={t.id} className="flex items-start justify-between border-b px-4 py-3 text-sm">
          <div><p className="font-medium">{t.title}</p><p className="text-stone-500">{t.body}</p><p className="text-xs text-stone-400">{t.status}</p></div>
          {t.status === "open" && <button type="button" className="text-xs text-brand" onClick={() => setItems(closeTicket(t.id))}>Close</button>}
        </div>
      ))}</Card>
    </>
  );
}
