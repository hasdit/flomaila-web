import { json, readBody } from "@/lib/http";
import { canAiChange, type OrderPolicy } from "@/lib/policy";
export async function POST(req: Request) {
  const body = await readBody<{ tool?: string; status?: string; policy?: OrderPolicy }>(req);
  return json({ ok: true, tool: body.tool, gate: canAiChange(body.status || "draft", body.policy || "system_default") });
}
