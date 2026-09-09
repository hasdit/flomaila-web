export type OrderStatus = "draft" | "pending" | "paid" | "cancelled";
export type OrderLine = { sku: string; title: string; qty: number; price: number; currency: string };
export type Order = { id: string; threadId?: string; customer: string; channel: string; status: OrderStatus; lines: OrderLine[]; createdAt: string };
const KEY = "flomaila.orders.v1";
export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(KEY); if (!raw) return []; const parsed = JSON.parse(raw) as Order[]; return Array.isArray(parsed) ? parsed : []; } catch { return []; }
}
export function saveOrders(items: Order[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
export function draftOrder(input: Omit<Order, "id" | "createdAt" | "status">) {
  const order: Order = { id: `ord_${crypto.randomUUID().slice(0, 8)}`, status: "draft", createdAt: new Date().toISOString(), ...input };
  saveOrders([order, ...loadOrders()]);
  return order;
}
export function setStatus(id: string, status: OrderStatus) {
  const next = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(next);
  return next;
}
export function orderTotal(o: Order) { return o.lines.reduce((s, l) => s + l.price * l.qty, 0); }
