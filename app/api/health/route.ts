import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, name: "flomaila", ts: new Date().toISOString() });
}
