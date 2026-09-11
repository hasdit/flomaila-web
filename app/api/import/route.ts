import { getPrisma } from "@/lib/prisma";
import { json, localMode, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ workspaceId?: string; rows?: { sku: string; title: string; price: number; stock?: number }[] }>(req);
  const rows = body.rows || [];
  const errors = rows.flatMap((r, i) => (!r.sku || !r.title ? [`row ${i + 1}: sku and title required`] : []));
  const db = getPrisma();
  if (!db) return localMode({ accepted: rows.length, errors });
  if (!body.workspaceId) return json({ error: "workspaceId required", errors }, 400);
  let upserted = 0;
  for (const r of rows.filter((x) => x.sku && x.title)) {
    await db.product.upsert({ where: { workspaceId_sku: { workspaceId: body.workspaceId, sku: r.sku } }, update: { title: r.title, price: r.price, stock: r.stock ?? 0 }, create: { workspaceId: body.workspaceId, sku: r.sku, title: r.title, price: r.price, stock: r.stock ?? 0 } });
    upserted += 1;
  }
  return json({ ok: true, mode: "neon", upserted, errors });
}
