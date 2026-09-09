"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { defaultFlags, loadFlags, saveFlags, type Flags } from "@/lib/flags";
export default function Page() {
  const [f, setF] = useState<Flags>(defaultFlags);
  useEffect(() => setF(loadFlags()), []);
  const keys = Object.keys(f) as (keyof Flags)[];
  return (<><PageHeader title="Feature flags" desc="Workspace kill-switches." /><Card>{keys.map((k) => <label key={k} className="mb-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.checked })} />{k}</label>)}<button type="button" className="mt-3 rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => saveFlags(f)}>Save flags</button></Card></>);
}
