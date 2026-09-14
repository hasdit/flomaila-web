import { json } from "@/lib/http";
export async function GET() {
  return json({ ok: true, user: null, hint: "Set AUTH_SECRET. Until then /login local session." });
}
