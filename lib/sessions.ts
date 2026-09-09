import { readJson, writeJson } from "./store";
export type Sess = { id: string; device: string; at: string };
const KEY = "flomaila.sess.v1";
export function loadSess(): Sess[] { return readJson(KEY, []); }
export function touchSess() {
  if (typeof navigator === "undefined") return loadSess();
  const s: Sess = { id: crypto.randomUUID(), device: navigator.userAgent.slice(0, 48), at: new Date().toISOString() };
  const all = [s, ...loadSess()].slice(0, 8);
  writeJson(KEY, all); return all;
}
export function dropSess(id: string) {
  writeJson(KEY, loadSess().filter((s) => s.id !== id));
  return loadSess();
}
