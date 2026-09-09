import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ version: "0.1.0", phase: "P0-local" });
}
