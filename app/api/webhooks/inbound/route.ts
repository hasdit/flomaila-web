import { json, readBody } from "@/lib/http";
const seen = new Set<string>();
export async function POST(req: Request) {
  const body = await readBody<{ id?: string; event?: string }>(req);
  const id = body.id || crypto.randomUUID();
  if (seen.has(id)) return json({ ok: true, duplicate: true });
  seen.add(id);
  if (seen.size > 200) seen.clear();
  return json({ ok: true, accepted: true, id, event: body.event || "unknown" }, 202);
}
