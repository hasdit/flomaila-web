import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function POST() {
  const db = getPrisma();
  if (!db) return localMode({ seeded: false });
  const ws = await db.workspace.upsert({ where: { id: "00000000-0000-0000-0000-000000000001" }, update: { name: "Flomaila Demo" }, create: { id: "00000000-0000-0000-0000-000000000001", name: "Flomaila Demo", country: "US", currency: "USD" } });
  const user = await db.user.upsert({ where: { email: "you@brand.com" }, update: {}, create: { email: "you@brand.com", name: "Owner" } });
  await db.membership.upsert({ where: { workspaceId_userId: { workspaceId: ws.id, userId: user.id } }, update: { role: "owner" }, create: { workspaceId: ws.id, userId: user.id, role: "owner" } });
  return json({ ok: true, mode: "neon", workspaceId: ws.id, userId: user.id });
}
