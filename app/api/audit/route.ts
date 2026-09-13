import { json, readBody } from "@/lib/http";
type Row = { id: string; action: string; at: string };
const rows: Row[] = [];
export async function GET() { return json({ ok: true, items: rows.slice(0, 100) }); }
export async function POST(req: Request) {
  const body = await readBody<{ action?: string }>(req);
  const row = { id: crypto.randomUUID(), action: body.action || "unknown", at: new Date().toISOString() };
  rows.unshift(row);
  return json({ ok: true, item: row }, 201);
}
