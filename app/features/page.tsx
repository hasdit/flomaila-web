"use client";
import Link from "next/link";
import { Card, PageHeader } from "@/components/app-shell";
const ITEMS: [string, string][] = [["/lab","Build lab"],["/gift-cards","Gift cards"],["/waitlist","Waitlist"],["/collections","Collections"],["/inventory","Inventory"],["/invoices","Invoices"],["/currencies","FX"],["/holds","Holds"],["/prompt","Model settings"],["/evals","Evals"],["/quality","CSAT"],["/templates","Templates"],["/unsub","Unsub"],["/loyalty","Loyalty"],["/affiliates","Affiliates"],["/reviews","Reviews"],["/nps","NPS"],["/maintenance","Maintenance"],["/incidents","Incidents"],["/notifications","Notices"],["/palette","Palette"],["/privacy","Privacy"],["/terms","Terms"],["/dpa","DPA"],["/ops","Ops hub"]];
export default function Page() {
  return (<><PageHeader title="Feature catalog" desc={String(ITEMS.length) + " surfaces"} /><Card className="p-0">{ITEMS.map(([href, label], i) => <Link key={href} href={href} className="flex justify-between border-b px-4 py-2 text-sm hover:bg-stone-50"><span>{i + 1}. {label}</span><span className="text-xs text-stone-400">{href}</span></Link>)}</Card></>);
}
