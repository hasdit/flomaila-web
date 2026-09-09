import { readJson, writeJson } from "./store";
export type Faq = { id: string; q: string; a: string };
const KEY = "flomaila.faq.v1";
export function loadFaq(): Faq[] { return readJson(KEY, []); }
export function saveFaq(f: Faq) {
  const all = [f, ...loadFaq().filter((x) => x.id !== f.id)];
  writeJson(KEY, all); return all;
}
export function deleteFaq(id: string) {
  const all = loadFaq().filter((f) => f.id !== id);
  writeJson(KEY, all); return all;
}
export function matchFaq(text: string) {
  const q = text.toLowerCase();
  return loadFaq().find((f) => f.q.toLowerCase().split(" ").some((w) => w.length > 3 && q.includes(w)));
}
