import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.thread.findMany({ take: 100, include: { messages: true }, orderBy: { createdAt: "desc" } });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ workspaceId?: string; name?: string; channel?: string; text?: string }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.name) return json({ error: "workspaceId, name required" }, 400);
  const item = await db.thread.create({ data: { workspaceId: body.workspaceId, name: body.name, channel: body.channel || "web", slaDueAt: new Date(Date.now() + 4 * 3600000), messages: body.text ? { create: [{ from: "customer", text: body.text }] } : undefined }, include: { messages: true } });
  return json({ ok: true, mode: "neon", item }, 201);
}
