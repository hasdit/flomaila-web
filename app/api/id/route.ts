import { json } from "@/lib/http";
import { shortId } from "@/lib/ids";
export async function GET() { return json({ id: shortId("flo") }); }
