import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET(req: Request) {
  const db = getPrisma();
  const ws = new URL(req.url).searchParams.get("workspaceId") || "";
  if (!db) return localMode({ balance: 0, entries: [] });
  const entries = await db.creditEntry.findMany({ where: ws ? { workspaceId: ws } : undefined, orderBy: { createdAt: "desc" }, take: 50 });
  return json({ ok: true, mode: "neon", balance: entries[0]?.balanceAfter ?? 0, entries });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ workspaceId?: string; delta?: number; reason?: string; key?: string; note?: string }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.delta || !body.key) return json({ error: "workspaceId, delta, key required" }, 400);
  const last = await db.creditEntry.findFirst({ where: { workspaceId: body.workspaceId }, orderBy: { createdAt: "desc" } });
  try {
    const entry = await db.creditEntry.create({ data: { workspaceId: body.workspaceId, reason: "grant", delta: body.delta, balanceAfter: (last?.balanceAfter ?? 0) + body.delta, note: body.note || "", idempotencyKey: body.key } });
    return json({ ok: true, mode: "neon", entry });
  } catch { return json({ ok: true, duplicate: true }); }
}
