import { json, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ weightKg?: number; country?: string }>(req);
  const base = (body.country || "US") === "US" ? 5 : 8;
  return json({ cost: Math.round((base + Number(body.weightKg || 0.5) * 4) * 100) / 100, carrier: "generic" });
}
