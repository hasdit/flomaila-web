"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadCoupons, saveCoupon, type Coupon } from "@/lib/coupons";
export default function Page() {
  const [items, setItems] = useState<Coupon[]>([]);
  useEffect(() => setItems(loadCoupons()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setItems(saveCoupon({ code: String(d.get("code")).toUpperCase(), percent: Number(d.get("percent")), active: true, uses: 0 }));
    e.currentTarget.reset();
  }
  return (<><PageHeader title="Coupons" desc="Percent-off codes." /><Card className="mb-4"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="code" required placeholder="SAVE10" className="rounded-xl border px-3 py-2" /><input name="percent" type="number" required className="w-24 rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Add</button></form></Card><Card className="p-0">{items.map((c) => <div key={c.code} className="flex justify-between border-b px-4 py-3 text-sm"><span>{c.code} · {c.percent}% · used {c.uses}</span><button type="button" className="text-xs text-brand" onClick={() => setItems(saveCoupon({ ...c, active: !c.active }))}>{c.active ? "On" : "Off"}</button></div>)}</Card></>);
}
