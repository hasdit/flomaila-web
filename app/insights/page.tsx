"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { loadContacts, loadCampaigns } from "@/lib/email";
import { loadThreads } from "@/lib/inbox";
import { loadOrders, orderTotal } from "@/lib/orders";
import { loadParcels } from "@/lib/parcels";
import { loadSources } from "@/lib/content";
import { loadTickets } from "@/lib/tickets";
import { loadWorkflows } from "@/lib/workflows";
export default function InsightsPage() {
  const [stats, setStats] = useState({ products: 0, orders: 0, sales: 0, threads: 0, unread: 0, contacts: 0, campaigns: 0, credits: 0, parcels: 0, sources: 0, tickets: 0, workflows: 0 });
  useEffect(() => {
    const orders = loadOrders(); const threads = loadThreads();
    setStats({ products: loadProducts().length, orders: orders.length, sales: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + orderTotal(o), 0), threads: threads.length, unread: threads.filter((t) => t.unread).length, contacts: loadContacts().length, campaigns: loadCampaigns().length, credits: loadWallet().balance, parcels: loadParcels().length, sources: loadSources().length, tickets: loadTickets().length, workflows: loadWorkflows().length });
  }, []);
  const bars: [string, number][] = [["Chat threads", stats.threads], ["Unread", stats.unread], ["Orders", stats.orders], ["Contacts", stats.contacts], ["Campaigns", stats.campaigns], ["Credits", stats.credits]];
  const max = Math.max(1, ...bars.map(([, n]) => n));
  return (<><PageHeader title="Insights" desc="Chat · Sales · Credits · Email." />
    <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white"><p className="text-xs uppercase text-white/80">Sales</p><p className="mt-2 text-4xl font-semibold">{stats.sales.toFixed(2)}</p></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{([["Products", stats.products], ["Orders", stats.orders], ["Threads", stats.threads], ["Unread", stats.unread], ["Contacts", stats.contacts], ["Campaigns", stats.campaigns], ["Credits", stats.credits], ["Parcels", stats.parcels], ["Sources", stats.sources], ["Tickets", stats.tickets], ["Workflows", stats.workflows]] as [string, number][]).map(([k, v]) => <Card key={k}><p className="text-xs uppercase text-stone-400">{k}</p><p className="mt-2 text-2xl font-semibold">{v}</p></Card>)}</div>
    <Card className="mt-4 space-y-3"><p className="font-medium">Mix</p>{bars.map(([k, n]) => <div key={k}><div className="mb-1 flex justify-between text-xs text-stone-500"><span>{k}</span><span>{n}</span></div><div className="h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full bg-brand" style={{ width: `${Math.round((n / max) * 100)}%` }} /></div></div>)}</Card></>);
}
