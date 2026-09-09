"use client";
import Link from "next/link";
import { Card, PageHeader } from "@/components/app-shell";
const groups: { title: string; items: [string, string][] }[] = [
  { title: "Inbox & AI", items: [["/macros", "Macros"], ["/faq", "FAQ"], ["/guardrails", "Guardrails"], ["/playbooks", "Playbooks"], ["/train", "Teach"], ["/widget", "Widget"]] },
  { title: "Commerce", items: [["/coupons", "Coupons"], ["/returns", "RMA"], ["/shipping", "Shipping"], ["/intents", "Intents"], ["/low-stock", "Low stock"], ["/parcels", "Parcels"]] },
  { title: "Growth", items: [["/segments", "Segments"], ["/suppress", "Suppression"], ["/announcements", "Banners"], ["/referrals", "Referrals"], ["/plans", "Plans"], ["/usage", "Usage"]] },
  { title: "Ops", items: [["/onboarding", "Onboarding"], ["/webhooks", "Webhooks"], ["/flags", "Flags"], ["/keys", "API keys"], ["/backup", "Backup"], ["/gdpr", "GDPR"], ["/allowlist", "Allowlist"], ["/sessions", "Sessions"], ["/hours", "Hours"], ["/brand", "Brand"], ["/changelog", "Changelog"]] },
];
export default function Page() {
  return (<><PageHeader title="Command center" desc="Working P0 modules." /><div className="grid gap-4 md:grid-cols-2">{groups.map((g) => <Card key={g.title}><p className="font-medium">{g.title}</p><ul className="mt-2 space-y-1 text-sm">{g.items.map(([href, label]) => <li key={href}><Link href={href} className="text-brand hover:underline">{label}</Link></li>)}</ul></Card>)}</div></>);
}
