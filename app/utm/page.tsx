"use client";
import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [base, setBase] = useState("https://shop.example.com");
  const [source, setSource] = useState("flomaila");
  const [campaign, setCampaign] = useState("spring");
  const url = useMemo(() => { const u = new URL(base.startsWith("http") ? base : "https://" + base); u.searchParams.set("utm_source", source); u.searchParams.set("utm_campaign", campaign); return u.toString(); }, [base, source, campaign]);
  return (<><PageHeader title="UTM builder" desc="Tag campaign links." /><Card className="grid gap-2"><input value={base} onChange={(e) => setBase(e.target.value)} className="rounded-xl border px-3 py-2 text-sm" /><input value={source} onChange={(e) => setSource(e.target.value)} className="rounded-xl border px-3 py-2 text-sm" /><input value={campaign} onChange={(e) => setCampaign(e.target.value)} className="rounded-xl border px-3 py-2 text-sm" /><p className="break-all text-sm">{url}</p></Card></>);
}
