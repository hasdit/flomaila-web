import { json, readBody } from "@/lib/http";
const items = [{ id: "whatsapp", family: "messaging", on: false }, { id: "widget", family: "messaging", on: true }, { id: "shopify", family: "commerce", on: false }, { id: "stripe", family: "payments", on: false }];
export async function GET() { return json({ ok: true, items }); }
export async function POST(req: Request) {
  const body = await readBody<{ id?: string; on?: boolean }>(req);
  const row = items.find((i) => i.id === body.id);
  if (!row) return json({ error: "unknown channel" }, 404);
  row.on = Boolean(body.on);
  return json({ ok: true, item: row });
}
