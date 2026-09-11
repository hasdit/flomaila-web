import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function GET() {
  const db = getPrisma();
  if (!db) return localMode({ items: [] });
  const items = await db.workspace.findMany({ take: 50, orderBy: { createdAt: "desc" } });
  return json({ ok: true, mode: "neon", items });
}
export async function POST(req: Request) {
  const db = getPrisma();
  const body = await readBody<{ name?: string; country?: string; currency?: string }>(req);
  if (!db) return localMode({ accepted: body });
  if (!body.name) return json({ error: "name required" }, 400);
  const item = await db.workspace.create({ data: { name: body.name, country: body.country || "US", currency: body.currency || "USD" } });
  return json({ ok: true, mode: "neon", item }, 201);
}
