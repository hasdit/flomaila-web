import { readJson, writeJson } from "./store";
export type Hook = { id: string; url: string; event: string; last: string };
const KEY = "flomaila.hooks.v1";
export function loadHooks(): Hook[] { return readJson(KEY, []); }
export function saveHook(h: Hook) {
  const all = [h, ...loadHooks().filter((x) => x.id !== h.id)];
  writeJson(KEY, all); return all;
}
export function fireHook(event: string, payload: string) {
  const all = loadHooks().map((h) => h.event === event || h.event === "*" ? { ...h, last: new Date().toISOString() + " " + payload.slice(0, 80) } : h);
  writeJson(KEY, all); return all;
}
export function deleteHook(id: string) {
  const all = loadHooks().filter((h) => h.id !== id);
  writeJson(KEY, all); return all;
}
