import { json, readBody } from "@/lib/http";
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await readBody<{ type?: string; id?: string }>(req);
  if (!sig && process.env.STRIPE_WEBHOOK_SECRET) return json({ error: "missing signature" }, 400);
  const type = body.type || "checkout.session.completed";
  return json({ ok: true, received: type, credited: type.includes("completed") || type.includes("succeeded"), idempotencyKey: body.id || "evt_local", mode: process.env.STRIPE_WEBHOOK_SECRET ? "verify-pending" : "local" });
}
