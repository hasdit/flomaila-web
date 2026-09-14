import { json, readBody } from "@/lib/http";
import { SLICES } from "@/lib/slice50";
export async function GET() { return json({ ok: true, count: SLICES.length, slices: SLICES }); }
export async function POST(req: Request) {
  const body = await readBody<{ slug?: string; title?: string }>(req);
  const found = SLICES.find((s) => s.slug === body.slug);
  if (!found) return json({ error: "unknown slice" }, 404);
  return json({ ok: true, accepted: { slug: found.slug, title: body.title || "row" }, mode: "local" });
}
