import { readJson, writeJson } from "./store";
import { loadThreads, saveThreads, type Thread } from "./inbox";
export type Meta = { id: string; tags: string; assignee: string; priority: "low" | "normal" | "high"; snoozeUntil?: string; closed?: boolean; spam?: boolean; notes: string; slaDue?: string };
const KEY = "flomaila.threadmeta.v1";
export function loadMeta(): Record<string, Meta> { return readJson(KEY, {}); }
export function upsertMeta(m: Meta) { const all = loadMeta(); all[m.id] = m; writeJson(KEY, all); return m; }
export function metaOf(id: string): Meta { return loadMeta()[id] || { id, tags: "", assignee: "", priority: "normal", notes: "", slaDue: new Date(Date.now() + 4 * 3600000).toISOString() }; }
export function closeThread(id: string) { const m = metaOf(id); m.closed = true; return upsertMeta(m); }
export function spamThread(id: string) { const m = metaOf(id); m.spam = true; return upsertMeta(m); }
export function snoozeThread(id: string, hours: number) { const m = metaOf(id); m.snoozeUntil = new Date(Date.now() + hours * 3600000).toISOString(); return upsertMeta(m); }
export function bulkRead() { const next = loadThreads().map((t) => ({ ...t, unread: false })); saveThreads(next); return next; }
export type Csat = { threadId: string; score: number };
export function loadCsat(): Csat[] { return readJson("flomaila.csat.v1", []); }
export function addCsat(threadId: string, score: number) { writeJson("flomaila.csat.v1", [{ threadId, score }, ...loadCsat()]); return loadCsat(); }
export function avgCsat() { const all = loadCsat(); return all.length ? Number((all.reduce((s, c) => s + c.score, 0) / all.length).toFixed(2)) : 0; }
export function firstResponseMs(t: Thread) { const firstStaff = t.messages.find((m) => m.from !== "customer"); if (!firstStaff) return 0; return new Date(firstStaff.at).getTime() - new Date(t.messages[0]?.at || firstStaff.at).getTime(); }
