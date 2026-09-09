export const workspace = { name: "Flomaila Demo", country: "US", currency: "USD", credits: 100, aiOn: true, plan: "Free", setupDone: 1, setupTotal: 5 };
export const kpis = { salesToday: 0, customersToday: 1, ordersToday: 0, messages7d: 7, aiReplies7d: 8, adminReplies7d: 0 };
export type NavItem = { href: string; label: string; children?: { href: string; label: string; locked?: boolean }[] };
export const nav: NavItem[] = [
  { href: "/", label: "Home" }, { href: "/inbox", label: "Inbox" }, { href: "/connect", label: "Connect" }, { href: "/widget", label: "Widget" },
  { href: "/orders", label: "Sales", children: [{ href: "/orders", label: "Orders" }, { href: "/catalog", label: "Products" }, { href: "/parcels", label: "Parcels" }, { href: "/coupons", label: "Coupons" }, { href: "/returns", label: "Returns" }, { href: "/shipping", label: "Shipping" }, { href: "/intents", label: "Intents" }, { href: "/low-stock", label: "Low stock" }] },
  { href: "/train", label: "Train", children: [{ href: "/train", label: "AI Setup" }, { href: "/train/content", label: "Train Content" }, { href: "/faq", label: "FAQ" }, { href: "/guardrails", label: "Guardrails" }, { href: "/macros", label: "Macros" }, { href: "/playbooks", label: "Playbooks" }] },
  { href: "/email", label: "Email", children: [{ href: "/email", label: "Studio" }, { href: "/email/workflows", label: "Workflows" }, { href: "/segments", label: "Segments" }, { href: "/suppress", label: "Suppression" }] },
  { href: "/ops", label: "Ops" }, { href: "/onboarding", label: "Onboarding" }, { href: "/activity", label: "Activity" }, { href: "/insights", label: "Insights" }, { href: "/billing", label: "Billing" }, { href: "/team", label: "Team" }, { href: "/settings", label: "Settings" }, { href: "/help", label: "Help" }, { href: "/tools", label: "Tools" }, { href: "/status", label: "Status" },
];
export const products: { id: string; title: string; sku: string; price: number; stock: number }[] = [];
export const orders: unknown[] = [];
