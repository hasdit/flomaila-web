"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addSuppress, loadSuppress } from "@/lib/suppress";
export default function Page() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => setItems(loadSuppress()), []);
  return (<><PageHeader title="Suppression list" desc="Never email these." /><Card><form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setItems(addSuppress(String(new FormData(e.currentTarget).get("email")))); e.currentTarget.reset(); }}><input name="email" type="email" required className="flex-1 rounded-full border px-3 py-2 text-sm" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button></form><ul className="mt-3 text-sm">{items.map((e) => <li key={e} className="border-b py-2">{e}</li>)}</ul></Card></>);
}
