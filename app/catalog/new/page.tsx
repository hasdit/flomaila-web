import { Card, PageHeader } from "@/components/app-shell";

export default function NewProductPage() {
  return (
    <>
      <PageHeader title="Add product" desc="Manual entry · P0 local only" />
      <Card>
        <form className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm sm:col-span-2">
            Title
            <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" />
          </label>
          <label className="text-sm">
            Category
            <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" />
          </label>
          <label className="text-sm">
            SKU
            <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" />
          </label>
          <label className="text-sm">
            Price
            <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" />
          </label>
          <label className="text-sm">
            Stock
            <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" />
          </label>
          <label className="text-sm sm:col-span-2">
            Description
            <textarea className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2" rows={4} />
          </label>
          <button
            type="button"
            className="rounded-full bg-brand px-4 py-2 text-sm text-white sm:col-span-2"
          >
            Save (wired in next slice)
          </button>
        </form>
      </Card>
    </>
  );
}
