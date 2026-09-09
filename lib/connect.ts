export type Connector = { id: string; family: string; name: string; connected: boolean; keyHint: string };
const KEY = "flomaila.connectors.v1";
export const catalog: Omit<Connector, "connected" | "keyHint">[] = [
  { id: "meta", family: "Messaging", name: "Facebook & Instagram" },
  { id: "wa", family: "Messaging", name: "WhatsApp Cloud" },
  { id: "web", family: "Messaging", name: "Website chatbot" },
  { id: "shopify", family: "Commerce", name: "Shopify" },
  { id: "woo", family: "Commerce", name: "WooCommerce" },
  { id: "ads", family: "Ads", name: "Meta Ads" },
  { id: "courier", family: "Courier", name: "Generic courier" },
  { id: "stripe", family: "Payments", name: "Stripe" },
  { id: "paypal", family: "Payments", name: "PayPal" },
  { id: "ssl", family: "Payments", name: "SSLCOMMERZ" },
  { id: "bkash", family: "Payments", name: "bKash" },
  { id: "nagad", family: "Payments", name: "Nagad" },
  { id: "brevo", family: "Email", name: "Brevo" },
];
export function loadConnectors(): Connector[] {
  if (typeof window === "undefined") return catalog.map((c) => ({ ...c, connected: false, keyHint: "" }));
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return catalog.map((c) => ({ ...c, connected: false, keyHint: "" }));
    return JSON.parse(raw) as Connector[];
  } catch { return catalog.map((c) => ({ ...c, connected: false, keyHint: "" })); }
}
export function saveConnector(id: string, key: string) {
  const list = loadConnectors().map((c) => c.id === id ? { ...c, connected: Boolean(key.trim()), keyHint: key ? `••••${key.slice(-4)}` : "" } : c);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
