"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { defaultBrand, loadBrand, saveBrand, type Brand } from "@/lib/brand";
export default function Page() {
  const [br, setBr] = useState<Brand>(defaultBrand);
  useEffect(() => setBr(loadBrand()), []);
  return (<><PageHeader title="Brand & widget" desc="Greeting and bubble side." /><Card className="grid gap-3"><input placeholder="Logo URL" className="rounded-xl border px-3 py-2" value={br.logo} onChange={(e) => setBr({ ...br, logo: e.target.value })} /><textarea className="rounded-xl border px-3 py-2" rows={3} value={br.greeting} onChange={(e) => setBr({ ...br, greeting: e.target.value })} /><input className="rounded-xl border px-3 py-2" value={br.accent} onChange={(e) => setBr({ ...br, accent: e.target.value })} /><select className="rounded-xl border px-3 py-2" value={br.widgetPosition} onChange={(e) => setBr({ ...br, widgetPosition: e.target.value as Brand["widgetPosition"] })}><option value="right">right</option><option value="left">left</option></select><button type="button" className="rounded-full bg-brand py-2 text-sm text-white" onClick={() => saveBrand(br)}>Save brand</button></Card></>);
}
