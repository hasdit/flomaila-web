import { Card, PageHeader } from "@/components/app-shell";

const cards = [
  ["Messaging", "Facebook & Instagram", "Official Meta Cloud API"],
  ["Messaging", "WhatsApp", "WhatsApp Cloud API"],
  ["Messaging", "Website chatbot", "Embed widget"],
  ["Commerce", "Shopify", "Catalog + orders"],
  ["Commerce", "WordPress / Woo", "Two-way sync"],
  ["Commerce", "Custom store", "REST / SDK"],
  ["Ads", "Meta Ads", "Creatives for Train Content"],
  ["Courier", "Generic courier", "BYO keys — no hardcoded local carrier"],
  ["Payments", "Stripe · PayPal · SSLCOMMERZ · bKash · Nagad", "Wallet + later checkout"],
  ["Email", "Brevo (and others)", "Email Studio providers"],
  ["Data", "Google Sheets", "Optional export"],
];

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        title="Connect"
        desc="Official APIs only. Families from the v1.1 TRD."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map(([fam, title, desc]) => (
          <Card key={title}>
            <p className="text-[11px] uppercase tracking-wide text-brand">{fam}</p>
            <p className="mt-1 font-medium">{title}</p>
            <p className="mt-1 text-sm text-stone-500">{desc}</p>
            <button type="button" className="mt-3 text-sm font-medium text-brand">
              Set up →
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}
