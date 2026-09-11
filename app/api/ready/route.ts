import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/prisma";
export async function GET() {
  return NextResponse.json({ ok: true, db: dbConfigured(), ts: new Date().toISOString() });
}
