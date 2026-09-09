"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { loadContacts, loadCampaigns } from "@/lib/email";
import { loadThreads } from "@/lib/inbox";
import { loadOrders, orderTotal } from "@/lib/orders";
export default function InsightsPage() {
  const [stats, setStats] = useState({ products: 0, orders: 0, sales: 0, threads: 0, contacts: 0, campaigns: 0, credits: 0 });
  useEffect(() => {
    const orders = loadOrders();
    setStats({ products: loadProducts().length, orders: orders.length, sales: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + orderTotal(o), 0), threads: loadThreads().length, contacts: loadContacts().length, campaigns: loadCampaigns().length, credits: loadWallet().balance });
  }, []);
  const cards: [string, string | number][] = [["Products", stats.products], ["Orders", stats.orders], ["Sales", stats.sales.toFixed(2)], ["Threads", stats.threads], ["Contacts", stats.contacts], ["Campaigns", stats.campaigns], ["Credits left", stats.credits]];
  return (<><PageHeader title="Insights" desc="Live from this browser workspace." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([l, v]) => <Card key={l}><p className="text-sm text-stone-500">{l}</p><p className="mt-2 text-3xl font-semibold">{v}</p></Card>)}</div></>);
}
