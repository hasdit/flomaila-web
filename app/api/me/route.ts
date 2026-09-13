import { json } from "@/lib/http";
export async function GET() { return json({ email: "you@brand.com", role: "owner", workspaceId: "00000000-0000-0000-0000-000000000001" }); }
