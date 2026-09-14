import { json, readBody } from "@/lib/http";
export async function GET() { return json({ ok: true, items: [{ id: "wh_main", name: "Main", country: "US" }] }); }
export async function POST(req: Request) { return json({ ok: true, mode: "local", warehouse: await readBody(req) }); }
