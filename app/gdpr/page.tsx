"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { exportCustomer, forgetCustomer } from "@/lib/gdpr";
export default function Page() {
  const [out, setOut] = useState("");
  const [email, setEmail] = useState("");
  return (<><PageHeader title="GDPR tools" desc="Export or forget a customer." /><Card><div className="flex flex-wrap gap-2"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full border px-3 py-2 text-sm" /><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => setOut(JSON.stringify(exportCustomer(email), null, 2))}>Export</button><button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => setOut(JSON.stringify(forgetCustomer(email), null, 2))}>Forget</button></div><pre className="mt-3 overflow-x-auto rounded-xl bg-stone-900 p-3 text-xs text-white">{out}</pre></Card></>);
}
