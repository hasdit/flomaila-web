import { json, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ amount?: number; country?: string }>(req);
  const rate = (body.country || "US") === "DE" ? 0.19 : (body.country || "US") === "BD" ? 0.05 : 0.08;
  const amount = Number(body.amount || 0);
  return json({ rate, tax: Math.round(amount * rate * 100) / 100 });
}
