import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getPrisma();
  if (!db) return localMode({ id });
  const item = await db.product.findUnique({ where: { id } });
  if (!item) return json({ error: "not found" }, 404);
  return json({ ok: true, mode: "neon", item });
}
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await readBody<{ title?: string; price?: number; stock?: number; description?: string }>(req);
  const db = getPrisma();
  if (!db) return localMode({ id, accepted: body });
  const item = await db.product.update({ where: { id }, data: body });
  return json({ ok: true, mode: "neon", item });
}
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getPrisma();
  if (!db) return localMode({ id, deleted: false });
  await db.product.delete({ where: { id } });
  return json({ ok: true, mode: "neon", deleted: true });
}
