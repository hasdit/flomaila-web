"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { upsertProduct } from "@/lib/catalog";
import { workspace } from "@/lib/mock";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") || "");
    const sku = String(data.get("sku") || "");
    const price = Number(data.get("price"));
    if (!title.trim() || !sku.trim() || Number.isNaN(price)) {
      setError("Title, SKU, and a numeric price are required.");
      return;
    }
    upsertProduct({
      title, sku,
      category: String(data.get("category") || ""),
      description: String(data.get("description") || ""),
      price, stock: Number(data.get("stock") || 0),
      currency: String(data.get("currency") || workspace.currency),
    });
    router.push("/catalog");
  }
  return (
    <>
      <PageHeader title="Add product" desc="Saved in this browser until the database slice." />
      <Card>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="text-sm sm:col-span-2">Title *<input name="title" required className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm">Category<input name="category" className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm">SKU *<input name="sku" required className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm">Price *<input name="price" type="number" step="0.01" required className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm">Stock<input name="stock" type="number" defaultValue={0} className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm">Currency<input name="currency" defaultValue={workspace.currency} className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          <label className="text-sm sm:col-span-2">Description<textarea name="description" rows={4} className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" /></label>
          {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
          <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm text-white sm:col-span-2">Save product</button>
        </form>
      </Card>
    </>
  );
}
