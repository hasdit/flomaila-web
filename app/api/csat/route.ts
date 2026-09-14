import { json, readBody } from "@/lib/http";
export async function GET() { return json({ ok: true, avg: 0, n: 0 }); }
export async function POST(req: Request) {
  const body = await readBody<{ score?: number }>(req);
  return json({ ok: true, mode: "local", score: body.score ?? 5 });
}
