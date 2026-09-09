"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { loadThreads } from "@/lib/inbox";
import { loadOrders, orderTotal } from "@/lib/orders";
import { loadSettings } from "@/lib/settings";

type HomeStats = {
  name: string;
  country: string;
  currency: string;
  credits: number;
  products: number;
  orders: number;
  sales: number;
  threads: number;
};

export default function HomePage() {
  const [s, setS] = useState<HomeStats>({
    name: "Flomaila Demo",
    country: "US",
    currency: "USD",
    credits: 0,
    products: 0,
    orders: 0,
    sales: 0,
    threads: 0,
  });

  useEffect(() => {
    const st = loadSettings();
    const orders = loadOrders();
    const sales = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((n, o) => n + orderTotal(o), 0);
    setS({
      name: st.workspaceName,
      country: st.country,
      currency: st.currency,
      credits: loadWallet().balance,
      products: loadProducts().length,
      orders: orders.length,
      sales,
      threads: loadThreads().length,
    });
  }, []);

  const subtitle = s.name + " \u00b7 " + s.country + " \u00b7 " + s.currency;
  const salesLabel = s.currency + " " + s.sales.toFixed(2);

  return (
    <>
      <PageHeader title="Home" desc={subtitle} />
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white">
          <p className="text-xs uppercase text-white/80">Your balance</p>
          <p className="mt-2 text-4xl font-semibold">{s.credits}</p>
          <Link href="/billing" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-brand">
            Recharge
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <p className="text-xs uppercase text-stone-400">Sales</p>
            <p className="mt-2 text-2xl font-semibold">{salesLabel}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-stone-400">Orders</p>
            <p className="mt-2 text-2xl font-semibold">{s.orders}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-stone-400">Threads</p>
            <p className="mt-2 text-2xl font-semibold">{s.threads}</p>
          </Card>
        </div>
        <Card>
          <p className="text-sm text-stone-500">{s.products} products in catalog</p>
          <Link href="/train" className="mt-3 inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm text-white">
            Train assistant
          </Link>
        </Card>
      </div>
    </>
  );
}
