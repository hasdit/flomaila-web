export type Source = { id: string; kind: "file" | "url"; name: string; at: string };
const KEY = "flomaila.traincontent.v1";
export function loadSources(): Source[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Source[]; } catch { return []; }
}
export function addSource(kind: Source["kind"], name: string) {
  const s: Source = { id: crypto.randomUUID(), kind, name, at: new Date().toISOString() };
  const all = [s, ...loadSources()];
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
export function removeSource(id: string) {
  const all = loadSources().filter((s) => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
