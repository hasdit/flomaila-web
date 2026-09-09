import Link from "next/link";
import { Card, PageHeader } from "@/components/app-shell";

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        title="Products"
        desc="What the assistant can sell. Import CSV or add manually."
        action={
          <Link
            href="/catalog/new"
            className="rounded-full bg-brand px-4 py-2 text-sm text-white"
          >
            Add product
          </Link>
        }
      />
      <Card className="py-16 text-center text-sm text-stone-500">
        No products yet. CSV columns stay in the product importer — contacts
        CSV is only for Email.
      </Card>
    </>
  );
}
