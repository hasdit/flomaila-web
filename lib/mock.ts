export const workspace = {
  name: "Flomaila Demo",
  country: "US",
  currency: "USD",
  credits: 100,
  aiOn: true,
  plan: "Free",
  setupDone: 1,
  setupTotal: 5,
};

export const kpis = {
  salesToday: 0,
  customersToday: 1,
  ordersToday: 0,
  messages7d: 7,
  aiReplies7d: 8,
  adminReplies7d: 0,
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; locked?: boolean }[];
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/inbox", label: "Inbox" },
  { href: "/connect", label: "Connect" },
  {
    href: "/orders",
    label: "Sales",
    children: [
      { href: "/orders", label: "Orders" },
      { href: "/catalog", label: "Products" },
      { href: "/parcels", label: "Parcels", locked: true },
    ],
  },
  {
    href: "/train",
    label: "Train",
    children: [
      { href: "/train", label: "AI Setup" },
      { href: "/train/content", label: "Train Content" },
    ],
  },
  { href: "/email", label: "Email" },
  { href: "/insights", label: "Insights" },
  { href: "/billing", label: "Billing" },
  { href: "/settings", label: "Settings" },
  { href: "/help", label: "Help" },
];

export const products: { id: string; title: string; sku: string; price: number; stock: number }[] = [];
export const orders: unknown[] = [];
