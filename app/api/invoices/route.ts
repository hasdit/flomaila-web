import { json, readBody } from "@/lib/http";
export async function GET() { return json({ ok: true, items: [] }); }
export async function POST(req: Request) {
  const body = await readBody<{ total?: number; currency?: string }>(req);
  return json({ ok: true, mode: "local", id: "inv_" + Date.now(), ...body });
}
