import { json } from "@/lib/http";
import { allow } from "@/lib/rate";
export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const ok = allow(ip, 30);
  return json({ ok, ip }, ok ? 200 : 429);
}
