import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.order.findMany({ take: 200, include: { lines: true }, orderBy: { createdAt: "desc" } });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ workspaceId?: string; customer?: string; channel?: string; lines?: { sku: string; title: string; qty: number; price: number }[] }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.customer) return json({ error: "workspaceId, customer required" }, 400);
  const item = await db.order.create({ data: { workspaceId: body.workspaceId, customer: body.customer, channel: body.channel || "web", lines: { create: (body.lines || []).map((l) => ({ sku: l.sku, title: l.title, qty: l.qty, price: l.price })) } }, include: { lines: true } });
  return json({ ok: true, mode: "neon", item }, 201);
}
