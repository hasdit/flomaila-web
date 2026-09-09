"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { deleteProduct, duplicateProduct, loadProducts, type Product } from "@/lib/catalog";
import { logEvent } from "@/lib/activity";
export default function CatalogPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => { setItems(loadProducts()); }, []);
  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => (p.title + p.sku + p.category).toLowerCase().includes(s));
  }, [items, q]);
  return (
    <>
      <PageHeader title="Products" desc="Search, edit, duplicate." action={<div className="flex gap-2"><Link href="/catalog/import" className="rounded-full border px-4 py-2 text-sm">Import CSV</Link><Link href="/catalog/new" className="rounded-full bg-brand px-4 py-2 text-sm text-white">Add product</Link></div>} />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or SKU" className="mb-3 w-full rounded-full border px-4 py-2 text-sm" />
      {!visible.length ? <Card className="py-16 text-center text-sm text-stone-500">No products.</Card> : (
        <Card className="p-0">{visible.map((p) => (
          <div key={p.id} className="flex items-center justify-between border-b px-4 py-3 text-sm">
            <div><p className="font-medium">{p.title}</p><p className="text-xs text-stone-400">{p.sku} · {p.currency} {p.price.toFixed(2)} · stock {p.stock}</p></div>
            <div className="flex gap-2 text-xs">
              <Link href={"/catalog/" + p.id} className="text-brand">Edit</Link>
              <button type="button" className="text-stone-500" onClick={() => { duplicateProduct(p.id); logEvent("catalog", "duplicated " + p.sku); setItems(loadProducts()); }}>Duplicate</button>
              <button type="button" className="text-stone-400" onClick={() => { deleteProduct(p.id); setItems(loadProducts()); }}>Remove</button>
            </div>
          </div>
        ))}</Card>
      )}
    </>
  );
}
