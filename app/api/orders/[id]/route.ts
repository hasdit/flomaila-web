import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await readBody<{ status?: "draft" | "pending" | "paid" | "cancelled" | "refunded"; note?: string }>(req);
  const db = getPrisma();
  if (!db) return localMode({ id, accepted: body });
  const item = await db.order.update({ where: { id }, data: { status: body.status, note: body.note } });
  return json({ ok: true, mode: "neon", item });
}
