import { readJson, writeJson } from "./store";
const KEY = "flomaila.allow.v1";
export function loadAllow(): string[] { return readJson(KEY, []); }
export function saveAllow(list: string[]) { writeJson(KEY, list.filter(Boolean)); }
export function allowed(ip: string) {
  const list = loadAllow();
  return list.length === 0 || list.includes(ip);
}
