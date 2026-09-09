"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { bumpRef, loadRef, type Ref } from "@/lib/referrals";
export default function Page() {
  const [r, setR] = useState<Ref>({ code: "", uses: 0 });
  useEffect(() => setR(loadRef()), []);
  return (<><PageHeader title="Referrals" desc="Share a code." /><Card><p className="text-3xl font-semibold">{r.code}</p><p className="mt-1 text-sm text-stone-500">{r.uses} uses</p><button type="button" className="mt-3 rounded-full border px-4 py-2 text-sm" onClick={() => navigator.clipboard.writeText(r.code)}>Copy</button><button type="button" className="ml-2 mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => setR(bumpRef())}>Simulate use</button></Card></>);
}
