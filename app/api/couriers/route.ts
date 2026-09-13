import { json, readBody } from "@/lib/http";
export async function GET() { return json({ ok: true, adapters: [{ id: "generic", label: "Generic courier", countries: ["*"] }] }); }
export async function POST(req: Request) {
  const body = await readBody<{ tracking?: string }>(req);
  return json({ ok: true, tracking: body.tracking || "TRK-DEMO", status: "in_transit" });
}
