import { localReply } from "@/lib/gateway";
import { json, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const body = await readBody<{ message?: string; products?: { sku: string; title: string; price: number; currency: string; stock: number }[] }>(req);
  const message = (body.message || "").trim();
  if (!message) return json({ error: "empty" }, 400);
  return json({ text: localReply(message, body.products || [], []), source: "local" });
}
