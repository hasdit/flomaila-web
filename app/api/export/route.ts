import { json, localMode } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const kind = new URL(req.url).searchParams.get("kind") || "products";
  const db = getPrisma();
  if (!db) return localMode({ csv: "id\n" });
  if (kind === "orders") {
    const rows = await db.order.findMany({ take: 500 });
    return json({ ok: true, mode: "neon", csv: ["id,customer,status,channel", ...rows.map((r) => [r.id, r.customer, r.status, r.channel].join(","))].join("\n") });
  }
  if (kind === "contacts") {
    const rows = await db.contact.findMany({ take: 500 });
    return json({ ok: true, mode: "neon", csv: ["email,firstName,tags", ...rows.map((r) => [r.email, r.firstName, r.tags].join(","))].join("\n") });
  }
  const rows = await db.product.findMany({ take: 500 });
  return json({ ok: true, mode: "neon", csv: ["sku,title,price,stock", ...rows.map((r) => [r.sku, r.title, String(r.price), String(r.stock)].join(","))].join("\n") });
}
