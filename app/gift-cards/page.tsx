"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { issueGift, loadGifts, redeemGift, type GiftCard } from "@/lib/commerce2";
export default function Page() {
  const [items, setItems] = useState<GiftCard[]>([]);
  useEffect(() => setItems(loadGifts()), []);
  return (<><PageHeader title="Gift cards" desc="Issue and redeem." /><Card className="mb-4"><form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); issueGift(Number(new FormData(e.currentTarget).get("amt") || 25)); setItems(loadGifts()); }}><input name="amt" type="number" defaultValue={25} className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Issue</button></form></Card><Card className="p-0">{items.map((g) => <div key={g.code} className="flex justify-between border-b px-4 py-3 text-sm"><span>{g.code} · {g.balance}</span><button type="button" className="text-xs text-brand" onClick={() => { redeemGift(g.code, 5); setItems(loadGifts()); }}>Redeem 5</button></div>)}</Card></>);
}
