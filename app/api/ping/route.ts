import { json } from "@/lib/http";
export async function GET() { return json({ pong: true, t: Date.now() }); }
