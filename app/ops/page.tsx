"use client";
import Link from "next/link";
import { Card, PageHeader } from "@/components/app-shell";
const groups: { title: string; items: [string, string][] }[] = [
  { title: "Inbox & AI", items: [["/macros", "Canned macros"], ["/faq", "FAQ knowledge"], ["/guardrails", "AI guardrails"], ["/playbooks", "Agent playbooks"], ["/train", "Teach / Test"], ["/widget", "Website widget"]] },
  { title: "Commerce", items: [["/coupons", "Coupons"], ["/returns", "RMA"], ["/shipping", "Shipping & tax"], ["/intents", "Payment intents"], ["/low-stock", "Low stock"], ["/parcels", "Parcels"]] },
  { title: "Growth", items: [["/segments", "Segments"], ["/suppress", "Suppression"], ["/announcements", "Banners"], ["/referrals", "Referral code"], ["/plans", "Plans"], ["/usage", "Usage meter"]] },
  { title: "Ops & trust", items: [["/onboarding", "Onboarding"], ["/webhooks", "Webhooks"], ["/flags", "Feature flags"], ["/keys", "API keys"], ["/backup", "Backup / restore"], ["/gdpr", "GDPR export"], ["/allowlist", "IP allowlist"], ["/sessions", "Sessions"], ["/team", "Team RBAC"], ["/hours", "Store hours"], ["/brand", "Brand / widget"], ["/shortcuts", "Shortcuts"], ["/changelog", "Changelog"], ["/status", "Health"], ["/slice50", "Next 50 slices"]] },
];
export default function OpsPage() {
  return (<><PageHeader title="Command center" desc="P0 modules + next 50 slices." />
    <div className="grid gap-4 md:grid-cols-2">{groups.map((g) => <Card key={g.title}><p className="font-medium">{g.title}</p><ul className="mt-2 space-y-1 text-sm">{g.items.map(([href, label]) => <li key={href}><Link href={href} className="text-brand hover:underline">{label}</Link></li>)}</ul></Card>)}</div></>);
}
