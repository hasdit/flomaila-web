export type Parcel = { id: string; orderId: string; courier: string; tracking: string; status: "created" | "in_transit" | "delivered" | "failed" };
const KEY = "flomaila.parcels.v1";
export function loadParcels(): Parcel[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Parcel[]; } catch { return []; }
}
export function createParcel(orderId: string, courier: string) {
  const p: Parcel = { id: `pcl_${crypto.randomUUID().slice(0, 6)}`, orderId, courier, tracking: `TRK${Math.floor(Math.random() * 1e8)}`, status: "created" };
  localStorage.setItem(KEY, JSON.stringify([p, ...loadParcels()]));
  return p;
}
export function advanceParcel(id: string) {
  const next = ["created", "in_transit", "delivered"] as const;
  const all = loadParcels().map((p) => {
    if (p.id !== id) return p;
    const i = next.indexOf(p.status as (typeof next)[number]);
    return { ...p, status: next[Math.min(i + 1, next.length - 1)] };
  });
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
