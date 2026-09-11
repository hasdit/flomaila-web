import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim();
  const db = getPrisma();
  if (!db) return localMode({ q, products: [], orders: [], threads: [] });
  const products = await db.product.findMany({ where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { sku: { contains: q, mode: "insensitive" } }] }, take: 20 });
  const orders = await db.order.findMany({ where: { OR: [{ customer: { contains: q, mode: "insensitive" } }, { id: { contains: q } }] }, take: 20 });
  const threads = await db.thread.findMany({ where: { name: { contains: q, mode: "insensitive" } }, take: 20 });
  return json({ ok: true, mode: "neon", q, products, orders, threads });
}
