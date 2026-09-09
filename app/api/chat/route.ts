import { NextRequest, NextResponse } from "next/server";
import { localReply, type ProductHint } from "@/lib/gateway";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { message?: string; products?: ProductHint[]; taught?: string[] };
  const message = (body.message || "").trim();
  if (!message) return NextResponse.json({ error: "empty" }, { status: 400 });
  const products = body.products || [];
  const taught = body.taught || [];
  if (process.env.XAI_API_KEY) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.FLOMAILA_MODEL || "grok-4-fast",
          messages: [
            { role: "system", content: "You are the Flomaila store assistant. Use only the catalog and taught facts. Never invent prices." },
            { role: "system", content: `Catalog: ${JSON.stringify(products)}\nTaught: ${taught.join(" | ")}` },
            { role: "user", content: message },
          ],
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        const text = json.choices?.[0]?.message?.content;
        if (text) return NextResponse.json({ text, source: "xai" });
      }
    } catch { /* local fallback */ }
  }
  return NextResponse.json({ text: localReply(message, products, taught), source: "local" });
}
