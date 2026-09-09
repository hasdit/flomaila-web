"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadProducts, upsertProduct, type Product } from "@/lib/catalog";
import { logEvent } from "@/lib/activity";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(loadProducts().find((x) => x.id === id) || null);
  }, [id]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;
    const data = new FormData(e.currentTarget);
    upsertProduct({
      id: product.id,
      sku: String(data.get("sku") || product.sku),
      title: String(data.get("title") || product.title),
      category: String(data.get("category") || ""),
      description: String(data.get("description") || ""),
      price: Number(data.get("price")),
      stock: Number(data.get("stock") || 0),
      currency: String(data.get("currency") || "USD"),
    });
    logEvent("catalog", "Updated " + product.sku);
    router.push("/catalog");
  }

  if (!product) {
    return <PageHeader title="Product" desc="Not found in this browser catalog." />;
  }

  return (
    <>
      <PageHeader title="Edit product" desc={product.sku} />
      <Card>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <input name="title" defaultValue={product.title} className="rounded-xl border px-3 py-2 sm:col-span-2" />
          <input name="sku" defaultValue={product.sku} className="rounded-xl border px-3 py-2" />
          <input name="category" defaultValue={product.category} className="rounded-xl border px-3 py-2" />
          <input name="price" type="number" step="0.01" defaultValue={product.price} className="rounded-xl border px-3 py-2" />
          <input name="stock" type="number" defaultValue={product.stock} className="rounded-xl border px-3 py-2" />
          <input name="currency" defaultValue={product.currency} className="rounded-xl border px-3 py-2" />
          <textarea name="description" defaultValue={product.description} rows={3} className="rounded-xl border px-3 py-2 sm:col-span-2" />
          <button className="rounded-full bg-brand py-2 text-sm text-white sm:col-span-2" type="submit">Save</button>
        </form>
      </Card>
    </>
  );
}
