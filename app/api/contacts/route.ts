import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.contact.findMany({ take: 500, orderBy: { email: "asc" } });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ workspaceId?: string; email?: string; firstName?: string; tags?: string }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.email) return json({ error: "workspaceId, email required" }, 400);
  const item = await db.contact.upsert({ where: { workspaceId_email: { workspaceId: body.workspaceId, email: body.email } }, update: { firstName: body.firstName || "", tags: body.tags || "" }, create: { workspaceId: body.workspaceId, email: body.email, firstName: body.firstName || "", tags: body.tags || "" } });
  return json({ ok: true, mode: "neon", item });
}
