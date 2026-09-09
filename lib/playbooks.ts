import { readJson, writeJson } from "./store";
export type Play = { id: string; title: string; steps: string[] };
const KEY = "flomaila.plays.v1";
export function loadPlays(): Play[] { return readJson(KEY, [
  { id: "p1", title: "New order", steps: ["Confirm SKU", "Collect address", "Draft order", "Send payment link"] },
  { id: "p2", title: "Where is my order", steps: ["Ask order id", "Look up parcel", "Share tracking"] },
]); }
export function savePlay(p: Play) {
  writeJson(KEY, [p, ...loadPlays().filter((x) => x.id !== p.id)]);
  return loadPlays();
}
