"use client";
import { Card, PageHeader } from "@/components/app-shell";
import { PLANS } from "@/lib/plans";
export default function Page() {
  return (<><PageHeader title="Plans" desc="Public pricing." /><div className="grid gap-3 sm:grid-cols-2">{PLANS.map((p) => <Card key={p.id}><p className="text-xs uppercase text-stone-400">{p.id}</p><p className="mt-1 text-2xl font-semibold">{p.name}</p><p className="mt-2 text-sm">${p.price}/mo · {p.credits} credits · {p.seats} seats</p></Card>)}</div></>);
}
