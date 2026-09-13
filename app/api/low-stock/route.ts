import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.product.findMany({ where: { stock: { lte: 3 } }, take: 50 });
  return json({ ok: true, mode: "neon", items });
}
