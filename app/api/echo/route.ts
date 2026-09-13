import { json, readBody } from "@/lib/http";
export async function POST(req: Request) { return json({ echo: await readBody(req) }); }
