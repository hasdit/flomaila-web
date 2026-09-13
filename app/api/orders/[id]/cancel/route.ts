import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getPrisma();
  if (!db) return localMode({ id, status: "cancelled" });
  const item = await db.order.update({ where: { id }, data: { status: "cancelled" } });
  return json({ ok: true, mode: "neon", item });
}
