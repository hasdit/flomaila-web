import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ op?: "restock" | "zero"; workspaceId?: string; delta?: number }>(req);
  const db = getPrisma();
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId) return json({ error: "workspaceId required" }, 400);
  if (body.op === "zero") {
    const r = await db.product.updateMany({ where: { workspaceId: body.workspaceId }, data: { stock: 0 } });
    return json({ ok: true, mode: "neon", updated: r.count });
  }
  const items = await db.product.findMany({ where: { workspaceId: body.workspaceId } });
  let n = 0;
  for (const p of items) {
    await db.product.update({ where: { id: p.id }, data: { stock: Math.max(0, p.stock + (body.delta ?? 1)) } });
    n += 1;
  }
  return json({ ok: true, mode: "neon", updated: n });
}
