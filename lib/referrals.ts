import { readJson, writeJson } from "./store";
export type Ref = { code: string; uses: number };
const KEY = "flomaila.ref.v1";
export function loadRef(): Ref { return readJson(KEY, { code: "FLO-DEMO", uses: 0 }); }
export function bumpRef() { const r = loadRef(); r.uses += 1; writeJson(KEY, r); return r; }
