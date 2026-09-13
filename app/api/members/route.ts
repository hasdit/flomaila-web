import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET(req: Request) {
  const ws = new URL(req.url).searchParams.get("workspaceId") || "";
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.membership.findMany({ where: ws ? { workspaceId: ws } : undefined, include: { user: true }, take: 100 });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const body = await readBody<{ workspaceId?: string; email?: string; role?: "owner" | "admin" | "agent" | "analyst" | "email_marketer" }>(req);
  const db = getPrisma();
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.email) return json({ error: "workspaceId, email required" }, 400);
  const user = await db.user.upsert({ where: { email: body.email }, update: {}, create: { email: body.email } });
  const item = await db.membership.upsert({ where: { workspaceId_userId: { workspaceId: body.workspaceId, userId: user.id } }, update: { role: body.role || "agent" }, create: { workspaceId: body.workspaceId, userId: user.id, role: body.role || "agent" } });
  return json({ ok: true, mode: "neon", item });
}
