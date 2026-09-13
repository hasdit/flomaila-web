import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getPrisma();
  if (!db) return localMode({ id, unread: false });
  const item = await db.thread.update({ where: { id }, data: { unread: false } });
  return json({ ok: true, mode: "neon", item });
}
