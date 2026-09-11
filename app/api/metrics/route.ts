import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ products: 0, orders: 0, threads: 0, contacts: 0 });
  const [products, orders, threads, contacts] = await Promise.all([db.product.count(), db.order.count(), db.thread.count(), db.contact.count()]);
  return json({ ok: true, mode: "neon", products, orders, threads, contacts });
}
