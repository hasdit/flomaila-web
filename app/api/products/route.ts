import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.product.findMany({ take: 200, orderBy: { createdAt: "desc" } });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ workspaceId?: string; sku?: string; title?: string; price?: number; stock?: number; currency?: string }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.sku || !body.title) return json({ error: "workspaceId, sku, title required" }, 400);
  const item = await db.product.create({ data: { workspaceId: body.workspaceId, sku: body.sku, title: body.title, price: body.price ?? 0, stock: body.stock ?? 0, currency: body.currency || "USD" } });
  return json({ ok: true, mode: "neon", item }, 201);
}
