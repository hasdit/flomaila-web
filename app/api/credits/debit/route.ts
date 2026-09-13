import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ workspaceId?: string; amount?: number; key?: string }>(req);
  const db = getPrisma();
  if (!db) return localMode({ accepted: body });
  if (!body.workspaceId || !body.amount || !body.key) return json({ error: "workspaceId, amount, key required" }, 400);
  const last = await db.creditEntry.findFirst({ where: { workspaceId: body.workspaceId }, orderBy: { createdAt: "desc" } });
  const next = (last?.balanceAfter ?? 0) - Math.abs(body.amount);
  if (next < 0) return json({ error: "insufficient credits" }, 402);
  try {
    const entry = await db.creditEntry.create({ data: { workspaceId: body.workspaceId, reason: "debit_live_reply", delta: -Math.abs(body.amount), balanceAfter: next, idempotencyKey: body.key } });
    return json({ ok: true, mode: "neon", entry });
  } catch { return json({ ok: true, duplicate: true }); }
}
