import { json, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ subtotal?: number; country?: string; weightKg?: number }>(req);
  const subtotal = Number(body.subtotal || 0);
  const country = (body.country || "US").toUpperCase();
  const weight = Number(body.weightKg || 0.5);
  const taxRate = country === "US" ? 0.08 : country === "BD" ? 0.05 : country === "DE" ? 0.19 : 0.1;
  const ship = Math.max(4, Math.round(weight * 6 * 100) / 100);
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  return json({ ok: true, country, taxRate, tax, shipping: ship, total: Math.round((subtotal + tax + ship) * 100) / 100 });
}
