import { NextResponse } from "next/server";
import { dbConfigured, getPrisma } from "@/lib/prisma";
export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL missing — using localStorage" });
  }
  try {
    const prisma = getPrisma();
    if (!prisma) return NextResponse.json({ ok: false, error: "client unavailable" });
    const workspaces = await prisma.workspace.count();
    return NextResponse.json({ ok: true, provider: "neon", workspaces });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "query failed" });
  }
}
