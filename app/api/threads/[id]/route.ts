import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getPrisma();
  if (!db) return localMode({ id });
  const item = await db.thread.findUnique({ where: { id }, include: { messages: true } });
  if (!item) return json({ error: "not found" }, 404);
  return json({ ok: true, mode: "neon", item });
}
