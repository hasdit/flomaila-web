import Link from "next/link";
import { Card, PageHeader } from "@/components/app-shell";
import { kpis, workspace } from "@/lib/mock";

export default function HomePage() {
  return (
    <>
      <PageHeader title="Home" desc={`${workspace.name} · ${workspace.country} · ${workspace.currency}`} />
      <div className="space-y-4">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Your AI setup</p>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand-soft text-sm font-semibold text-brand">
              {workspace.setupDone}/{workspace.setupTotal}
            </div>
            <div>
              <p className="font-medium">{workspace.setupDone}/{workspace.setupTotal} steps done</p>
              <Link href="/train" className="mt-2 inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm text-white">
                Next: tell it about your business
              </Link>
            </div>
          </div>
        </Card>
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white">
          <p className="text-xs uppercase tracking-wide text-white/80">Your balance</p>
          <p className="mt-2 text-4xl font-semibold">{workspace.credits}</p>
          <p className="mt-1 text-sm text-white/80">Credits · pay as you go</p>
          <Link href="/billing" className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-brand">Recharge</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Sales today", `${workspace.currency} ${kpis.salesToday}`],["Customers today", String(kpis.customersToday)],["Orders today", String(kpis.ordersToday)]].map(([l, v]) => (
            <Card key={l}>
              <p className="text-xs uppercase text-stone-400">{l}</p>
              <p className="mt-2 text-2xl font-semibold">{v}</p>
            </Card>
          ))}
        </div>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Chat performance · 7 days</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div><p className="text-3xl font-semibold">{kpis.messages7d}</p><p className="text-sm text-stone-500">Messages</p></div>
            <div><p className="text-3xl font-semibold">{kpis.aiReplies7d}</p><p className="text-sm text-stone-500">AI replies</p></div>
            <div><p className="text-3xl font-semibold">{kpis.adminReplies7d}</p><p className="text-sm text-stone-500">Admin replies</p></div>
          </div>
        </Card>
      </div>
    </>
  );
}
