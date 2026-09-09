"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { nav } from "@/lib/mock";
export default function Page() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const flat = nav.flatMap((n) => [n, ...(n.children || [])]);
    return flat.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()) || n.href.includes(q.toLowerCase()));
  }, [q]);
  return (<><PageHeader title="Jump" desc="Command palette." /><input value={q} onChange={(e) => setQ(e.target.value)} className="mb-3 w-full rounded-full border px-4 py-2" /><Card className="p-0">{items.map((n) => <Link key={n.href + n.label} href={n.href} className="block border-b px-4 py-2 text-sm hover:bg-stone-50">{n.label} · {n.href}</Link>)}</Card></>);
}
