import { json } from "@/lib/http";
export async function GET() { const d = new Date(); return json({ iso: d.toISOString(), epoch: d.getTime(), tz: "UTC" }); }
