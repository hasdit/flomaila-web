"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadBanners, saveBanner, type Banner } from "@/lib/announcements";
export default function Page() {
  const [items, setItems] = useState<Banner[]>([]);
  useEffect(() => setItems(loadBanners()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItems(saveBanner({ id: crypto.randomUUID(), text: String(new FormData(e.currentTarget).get("text")), active: true }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Announcements" desc="One active banner." /><Card className="mb-4"><form className="flex gap-2" onSubmit={onSubmit}><input name="text" required className="flex-1 rounded-full border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Publish</button></form></Card>{items.map((b) => <Card key={b.id} className="mb-2 flex justify-between text-sm"><span>{b.text}</span><button type="button" className="text-xs text-brand" onClick={() => setItems(saveBanner({ ...b, active: !b.active }))}>{b.active ? "Active" : "Off"}</button></Card>)}</>);
}
