import { readJson, writeJson } from "./store";
export type Macro = { id: string; title: string; body: string };
const KEY = "flomaila.macros.v1";
export function loadMacros(): Macro[] { return readJson(KEY, []); }
export function saveMacro(m: Macro) {
  const all = [m, ...loadMacros().filter((x) => x.id !== m.id)];
  writeJson(KEY, all); return all;
}
export function deleteMacro(id: string) {
  const all = loadMacros().filter((m) => m.id !== id);
  writeJson(KEY, all); return all;
}
