"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { loadThreads } from "@/lib/inbox";
import { loadOrders, orderTotal } from "@/lib/orders";
import { seedDemo } from "@/lib/demo";
import { loadSettings } from "@/lib/settings";
import { loadConnectors } from "@/lib/connect";
type Mode = "setup" | "live" | "agent";
export default function HomePage() {
  const [mode, setMode] = useState<Mode>("setup");
  const [credits, setCredits] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState(0);
  const [unread, setUnread] = useState(0);
  const [connected, setConnected] = useState(0);
  function refresh() {
    const o = loadOrders();
    setCredits(loadWallet().balance);
    setProducts(loadProducts().length);
    setOrders(o.length);
    setSales(o.filter((x) => x.status !== "cancelled").reduce((n, x) => n + orderTotal(x), 0));
    setUnread(loadThreads().filter((t) => t.unread).length);
    setConnected(loadConnectors().filter((c) => c.connected).length);
    const setupDone = loadProducts().length > 0 && loadConnectors().some((c) => c.connected);
    if (setupDone && loadThreads().some((t) => t.unread)) setMode("agent");
    else if (setupDone) setMode("live");
    else setMode("setup");
  }
  useEffect(() => { refresh(); }, []);
  const st = typeof window === "undefined" ? { workspaceName: "Flomaila", country: "US", currency: "USD" } : loadSettings();
  return (<><PageHeader title="Home" desc={st.workspaceName + " · " + st.country} />
    <div className="mb-4 flex gap-2 text-xs">{(["setup", "live", "agent"] as const).map((m) => <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full px-3 py-1 capitalize ${mode === m ? "bg-stone-900 text-white" : "bg-stone-100"}`}>{m}</button>)}</div>
    {mode === "setup" && <Card><p className="font-medium">Finish setup</p><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm"><li><Link className="text-brand" href="/catalog">Add a product</Link> {products ? "✓" : ""}</li><li><Link className="text-brand" href="/train">Teach the bot</Link></li><li><Link className="text-brand" href="/connect">Paste a channel key</Link> {connected ? "✓" : ""}</li><li><Link className="text-brand" href="/billing">Confirm wallet</Link> {credits ? "✓" : ""}</li></ol><button type="button" className="mt-4 rounded-full border px-4 py-2 text-sm" onClick={() => { seedDemo(); refresh(); }}>Load demo data</button></Card>}
    {mode === "live" && <><div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white"><p className="text-xs uppercase text-white/80">Balance</p><p className="mt-2 text-4xl font-semibold">{credits} cr</p></div><div className="mt-3 grid gap-3 sm:grid-cols-3"><Card><p className="text-xs text-stone-400">Sales</p><p className="mt-2 text-2xl font-semibold">{st.currency} {sales.toFixed(2)}</p></Card><Card><p className="text-xs text-stone-400">Orders</p><p className="mt-2 text-2xl font-semibold">{orders}</p></Card><Card><p className="text-xs text-stone-400">Channels</p><p className="mt-2 text-2xl font-semibold">{connected}</p></Card></div></>}
    {mode === "agent" && <Card><p className="font-medium">{unread} unread threads</p><p className="mt-1 text-sm text-stone-500">Jump to the queue.</p><Link href="/inbox" className="mt-4 inline-flex rounded-full bg-brand px-4 py-2 text-sm text-white">Open inbox</Link></Card>}</>);
}
