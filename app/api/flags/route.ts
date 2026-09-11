import { json, readBody } from "@/lib/http";
const flags: Record<string, boolean> = { sla: true, email: true, widget: true, neon: false };
export async function GET() { return json({ ok: true, flags }); }
export async function POST(req: Request) {
  const body = await readBody<{ key?: string; on?: boolean }>(req);
  if (!body.key) return json({ error: "key required" }, 400);
  flags[body.key] = Boolean(body.on);
  return json({ ok: true, flags });
}
