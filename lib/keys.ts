import { readJson, writeJson } from "./store";
export type ApiKey = { id: string; name: string; hint: string; createdAt: string };
const KEY = "flomaila.apikeys.v1";
export function loadKeys(): ApiKey[] { return readJson(KEY, []); }
export function createKey(name: string) {
  const raw = "flm_" + crypto.randomUUID().replace(/-/g, "");
  const k: ApiKey = { id: crypto.randomUUID(), name, hint: raw.slice(0, 8) + "…" + raw.slice(-4), createdAt: new Date().toISOString() };
  writeJson(KEY, [k, ...loadKeys()]);
  return { key: k, raw };
}
export function revokeKey(id: string) {
  writeJson(KEY, loadKeys().filter((k) => k.id !== id));
  return loadKeys();
}
