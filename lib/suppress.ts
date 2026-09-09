import { readJson, writeJson } from "./store";
const KEY = "flomaila.suppress.v1";
export function loadSuppress(): string[] { return readJson(KEY, []); }
export function addSuppress(email: string) {
  const all = Array.from(new Set([...loadSuppress(), email.toLowerCase()]));
  writeJson(KEY, all); return all;
}
export function canEmail(email: string) { return !loadSuppress().includes(email.toLowerCase()); }
