import { readJson, writeJson } from "./store";
export type Guard = { banned: string[]; requireHandoff: string[]; maxReplyChars: number };
const KEY = "flomaila.guard.v1";
export const defaultGuard: Guard = { banned: ["guarantee profit"], requireHandoff: ["lawyer", "lawsuit"], maxReplyChars: 800 };
export function loadGuard(): Guard { return { ...defaultGuard, ...readJson(KEY, defaultGuard) }; }
export function saveGuard(g: Guard) { writeJson(KEY, g); }
export function scanReply(text: string) {
  const g = loadGuard();
  const low = text.toLowerCase();
  const hit = g.banned.find((w) => low.includes(w.toLowerCase()));
  const handoff = g.requireHandoff.find((w) => low.includes(w.toLowerCase()));
  const trimmed = text.slice(0, g.maxReplyChars);
  return { text: trimmed, blocked: Boolean(hit), handoff: Boolean(handoff), reason: hit || handoff || "" };
}
