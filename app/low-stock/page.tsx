"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts, type Product } from "@/lib/catalog";
export default function Page() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => setItems(loadProducts().filter((p) => p.stock <= 5)), []);
  return (<><PageHeader title="Low stock" desc="Stock 5 or below." /><Card className="p-0">{items.length === 0 ? <p className="p-8 text-center text-sm text-stone-500">Nothing low.</p> : items.map((p) => <div key={p.id} className="flex justify-between border-b px-4 py-3 text-sm"><span>{p.title} · {p.sku} · {p.stock}</span><Link href={"/catalog/" + p.id} className="text-xs text-brand">Edit</Link></div>)}</Card></>);
}
