"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadWallet } from "@/lib/credits";
export default function Page() {
  const [n, setN] = useState({ grant: 0, debit: 0, balance: 0 });
  useEffect(() => {
    const w = loadWallet();
    setN({ grant: w.entries.filter((e) => e.delta > 0).reduce((s, e) => s + e.delta, 0), debit: w.entries.filter((e) => e.delta < 0).reduce((s, e) => s + e.delta, 0), balance: w.balance });
  }, []);
  return (<><PageHeader title="Usage meter" desc="Credit grants vs spend." /><div className="grid gap-3 sm:grid-cols-3"><Card><p className="text-sm text-stone-500">Granted</p><p className="text-3xl font-semibold">{n.grant}</p></Card><Card><p className="text-sm text-stone-500">Spent</p><p className="text-3xl font-semibold">{n.debit}</p></Card><Card><p className="text-sm text-stone-500">Left</p><p className="text-3xl font-semibold">{n.balance}</p></Card></div></>);
}
