"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { dropSess, touchSess, type Sess } from "@/lib/sessions";
export default function Page() {
  const [items, setItems] = useState<Sess[]>([]);
  useEffect(() => setItems(touchSess()), []);
  return (<><PageHeader title="Sessions" desc="Devices in this workspace." /><Card className="p-0">{items.map((s) => <div key={s.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{s.device}<br /><span className="text-xs text-stone-400">{s.at}</span></span><button type="button" className="text-xs text-stone-400" onClick={() => setItems(dropSess(s.id))}>Revoke</button></div>)}</Card></>);
}
