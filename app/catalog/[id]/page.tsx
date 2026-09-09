"use client";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts, upsertProduct, type Product } from "@/lib/catalog";
import { logEvent } from "@/lib/activity";
export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [p, setP] = useState<Product | null>(null);
  useEffect(() => { setP(loadProducts().find((x) => x.id === id) || null); }, [id]);
  if (!p) return <PageHeader title="Product" desc="Not found" />;
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    upsertProduct({ id: p.id, sku: String(data.get("sku")), title: String(data.get("title")), category: String(data.get("category") || ""), description: String(data.get("description") || ""), price: Number(data.get("price")), stock: Number(data.get("stock") || 0), currency: String(data.get("currency") || "USD") });
    logEvent("catalog", `Updated ${p.sku}`);
    router.push("/catalog");
  }
  return (<><PageHeader title="Edit product" desc={p.sku} /><Card><form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
    <input name="title" defaultValue={p.title} className="rounded-xl border px-3 py-2 sm:col-span-2" />
    <input name="sku" defaultValue={p.sku} className="rounded-xl border px-3 py-2" />
    <input name="category" defaultValue={p.category} className="rounded-xl border px-3 py-2" />
    <input name="price" type="number" step="0.01" defaultValue={p.price} className="rounded-xl border px-3 py-2" />
    <input name="stock" type="number" defaultValue={p.stock} className="rounded-xl border px-3 py-2" />
    <input name="currency" defaultValue={p.currency} className="rounded-xl border px-3 py-2" />
    <textarea name="description" defaultValue={p.description} className="rounded-xl border px-3 py-2 sm:col-span-2" rows={3} />
    <button className="rounded-full bg-brand py-2 text-sm text-white sm:col-span-2" type="submit">Save</button>
  </form></Card></>);
}
