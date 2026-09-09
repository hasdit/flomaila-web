"use client";
import { Card, PageHeader } from "@/components/app-shell";
const rows = [["g i", "Inbox"], ["g o", "Orders"], ["g p", "Products"], ["/", "Search"], ["c", "Compose"]];
export default function Page() {
  return (<><PageHeader title="Shortcuts" desc="Documented keymap." /><Card className="p-0">{rows.map(([k, v]) => <div key={k} className="flex justify-between border-b px-4 py-3 text-sm"><kbd className="rounded bg-stone-100 px-2 py-0.5 text-xs">{k}</kbd><span>{v}</span></div>)}</Card></>);
}
