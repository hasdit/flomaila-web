import { Card, PageHeader } from "@/components/app-shell";
import { workspace } from "@/lib/mock";

export default function BillingPage() {
  return (
    <>
      <PageHeader title="Plan & Billing" desc="Subscription plus prepaid AI credits." />
      <div className="mb-4 rounded-2xl bg-gradient-to-br from-brand to-orange-500 p-6 text-white">
        <p className="text-xs uppercase text-white/80">Balance</p>
        <p className="mt-2 text-4xl font-semibold">{workspace.credits} cr</p>
        <p className="mt-1 text-sm text-white/80">
          Welcome grant · live replies pause at zero
        </p>
      </div>
      <Card>
        <p className="font-medium">Top up rails</p>
        <p className="mt-1 text-sm text-stone-500">
          Stripe, PayPal, SSLCOMMERZ, bKash, Nagad — availability by workspace
          country. If a rail is down, other rails stay; credit only after
          webhook.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Stripe", "PayPal", "SSLCOMMERZ", "bKash", "Nagad"].map((p) => (
            <span
              key={p}
              className="rounded-full border border-stone-200 px-3 py-1 text-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </Card>
    </>
  );
}
