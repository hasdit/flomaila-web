"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { loadThreads } from "@/lib/inbox";
import { loadOrders, orderTotal } from "@/lib/orders";
import { loadSettings } from "@/lib/settings";
export default function HomePage() {
  const [s, setS] = useState({ name: "Flomaila Demo", country: "US", currency: "USD", credits: 0, products: 0, orders: 0, sales: 0, threads: 0 });
  useEffect(() => {
    const st = loadSettings();
    const orders = loadOrders();
    setS({ name: st.workspaceName, country: st.country, currency: st.currency, credits: loadWallet().balance, products: loadProducts().length, orders: orders.length, sales: orders.filter((o) => o.status !== "cancelled").reduce((n, o) => n + orderTotal(o), 0), threads: loadThreads().length });
  }, []);
  return (
    <>
      <PageHeader title="Home" desc={`${s.name} · ${s.country} · ${s.currency}`} />
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white">
          <p className="text-xs uppercase text-white/80">Your balance</p>
          <p className="mt-2 text-4xl font-semibold">{s.credits}</p>
          <Link href="/billing" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-brand">Recharge</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Sales", `${s.currency} ${s.sales.toFixed(2)}"], ["Orders", String(s.orders)], ["Threads", String(s.threads)]].map(([l, v]) => (
            <Card key={l}><p className="text-xs uppercase text-stone-400">{l}</p><p className="mt-2 text-2xl font-semibold">{v}</p></Card>
          ))}
        </div>
        <Card>
          <p className="text-sm text-stone-500">{s.products} products in catalog</p>
          <Link href="/train" className="mt-3 inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm text-white">Train assistant</Link>
        </Card>
      </div>
    </>
  );
}
