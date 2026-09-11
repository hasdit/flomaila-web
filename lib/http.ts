import { NextResponse } from "next/server";
export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "x-flomaila": "p0", "cache-control": "no-store" } });
}
export function localMode(extra: Record<string, unknown> = {}) {
  return json({ ok: true, mode: "local", hint: "Set DATABASE_URL to persist on Neon.", ...extra });
}
export async function readBody<T>(req: Request): Promise<T> {
  try { return (await req.json()) as T; } catch { return {} as T; }
}
