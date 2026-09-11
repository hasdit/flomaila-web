import { getPrisma } from "@/lib/prisma";
import { json, localMode } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ open: 0, due: 0 });
  const open = await db.thread.count({ where: { unread: true } });
  const due = await db.thread.count({ where: { slaDueAt: { lte: new Date() } } });
  return json({ ok: true, mode: "neon", open, due });
}
