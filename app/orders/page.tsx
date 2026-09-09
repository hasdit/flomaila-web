import { Card, PageHeader } from "@/components/app-shell";

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" desc="Chat, manual, and store-synced orders." />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["Total 0", "Sales 0", "Pending 0", "Completed 0"].map((t) => (
          <Card key={t}>
            <p className="text-sm text-stone-600">{t}</p>
          </Card>
        ))}
      </div>
      <Card className="py-16 text-center text-sm text-stone-500">No orders found.</Card>
    </>
  );
}
