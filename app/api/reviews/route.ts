import { json, readBody } from "@/lib/http";
export async function GET() { return json({ ok: true, items: [] }); }
export async function POST(req: Request) { return json({ ok: true, mode: "local", review: await readBody(req) }); }
