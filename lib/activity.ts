export type Event = { id: string; at: string; kind: string; text: string };
const KEY = "flomaila.activity.v1";
export function loadActivity(): Event[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Event[]; } catch { return []; }
}
export function logEvent(kind: string, text: string) {
  const e: Event = { id: crypto.randomUUID(), at: new Date().toISOString(), kind, text };
  const all = [e, ...loadActivity()].slice(0, 100);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
