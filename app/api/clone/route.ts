import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ productId?: string }>(req);
  const db = getPrisma();
  if (!db) return localMode({ accepted: body });
  if (!body.productId) return json({ error: "productId required" }, 400);
  const src = await db.product.findUnique({ where: { id: body.productId } });
  if (!src) return json({ error: "not found" }, 404);
  const item = await db.product.create({ data: { workspaceId: src.workspaceId, sku: src.sku + "-COPY", title: src.title + " copy", description: src.description, category: src.category, price: src.price, stock: src.stock, currency: src.currency } });
  return json({ ok: true, mode: "neon", item }, 201);
}
