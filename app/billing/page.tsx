"use client";

import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { PACKS, RAILS, loadWallet, topUp, type Wallet } from "@/lib/credits";

export default function BillingPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [rail, setRail] = useState<(typeof RAILS)[number]>("Stripe");
  const [error, setError] = useState("");
  useEffect(() => { setWallet(loadWallet()); }, []);
  if (!wallet) return null;
  return (
    <>
      <PageHeader title="Plan & Billing" desc="Append-only credit ledger. Live AI pauses at zero; humans do not." />
      <div className="mb-4 rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white">
        <p className="text-xs uppercase text-white/80">Balance</p>
        <p className="mt-2 text-4xl font-semibold">{wallet.balance} cr</p>
        <p className="mt-1 text-sm text-white/80">Free plan · PAYG credits</p>
      </div>
      <Card className="mb-4">
        <p className="font-medium">Top up</p>
        <p className="mt-1 text-sm text-stone-500">Simulated until payment webhooks. Same idempotency key will not double-grant.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {RAILS.map((r) => (
            <button key={r} type="button" onClick={() => setRail(r)} className={`rounded-full px-3 py-1 text-sm ${rail === r ? "bg-stone-900 text-white" : "border border-stone-200"}`}>{r}</button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PACKS.map((p) => (
            <button key={p.credits} type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => { try { setError(""); setWallet(topUp(p.credits, rail)); } catch (e) { setError(e instanceof Error ? e.message : "Failed"); } }}>+{p.label}</button>
          ))}
        </div>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </Card>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-100 text-xs uppercase text-stone-400">
            <tr><th className="px-4 py-3">When</th><th className="px-4 py-3">Reason</th><th className="px-4 py-3">Delta</th><th className="px-4 py-3">Balance</th></tr>
          </thead>
          <tbody>
            {wallet.entries.map((e) => (
              <tr key={e.id} className="border-b border-stone-50">
                <td className="px-4 py-3 text-xs text-stone-500">{new Date(e.at).toLocaleString()}</td>
                <td className="px-4 py-3"><p>{e.reason}</p><p className="text-xs text-stone-400">{e.note}</p></td>
                <td className={`px-4 py-3 ${e.delta < 0 ? "text-red-600" : "text-emerald-700"}`}>{e.delta > 0 ? `+${e.delta}` : e.delta}</td>
                <td className="px-4 py-3">{e.balanceAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
