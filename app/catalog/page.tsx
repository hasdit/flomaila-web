"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { deleteProduct, loadProducts, type Product } from "@/lib/catalog";
import { workspace } from "@/lib/mock";

export default function CatalogPage() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { setItems(loadProducts()); }, []);
  return (
    <>
      <PageHeader
        title="Products"
        desc="Catalog the assistant can sell. Contacts CSV is only in Email Studio."
        action={
          <div className="flex gap-2">
            <Link href="/catalog/import" className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm">Import CSV</Link>
            <Link href="/catalog/new" className="rounded-full bg-brand px-4 py-2 text-sm text-white">Add product</Link>
          </div>
        }
      />
      {!items.length ? (
        <Card className="py-16 text-center text-sm text-stone-500">No products yet.</Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-100 text-xs uppercase text-stone-400">
              <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">SKU</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-stone-50">
                  <td className="px-4 py-3"><p className="font-medium">{p.title}</p><p className="text-xs text-stone-400">{p.category || "—"}</p></td>
                  <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3">{p.currency || workspace.currency} {p.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3 text-right"><button type="button" className="text-xs text-stone-400 hover:text-red-600" onClick={() => { deleteProduct(p.id); setItems(loadProducts()); }}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
