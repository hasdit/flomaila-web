import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await readBody<{ from?: string; text?: string }>(req);
  if (!body.text) return json({ error: "text required" }, 400);
  const db = getPrisma();
  if (!db) return localMode({ id, accepted: body });
  const item = await db.message.create({ data: { threadId: id, from: body.from || "agent", text: body.text } });
  await db.thread.update({ where: { id }, data: { unread: body.from === "customer" } });
  return json({ ok: true, mode: "neon", item });
}
