import { readJson, writeJson } from "./store";
export type PromptCfg = { system: string; temperature: number; model: string; maxTokens: number; language: string; confidence: number };
export const defaultPrompt: PromptCfg = { system: "You are the Flomaila store assistant. Never invent prices.", temperature: 0.2, model: "grok-4-fast", maxTokens: 400, language: "en", confidence: 0.55 };
export function loadPrompt(): PromptCfg { return { ...defaultPrompt, ...readJson("flomaila.prompt.v1", defaultPrompt) }; }
export function savePrompt(p: PromptCfg) { writeJson("flomaila.prompt.v1", p); }
export type EvalCase = { id: string; q: string; expect: string; last?: string; pass?: boolean };
export function loadEvals(): EvalCase[] { return readJson("flomaila.eval.v1", []); }
export function saveEval(c: EvalCase) {
  writeJson("flomaila.eval.v1", [c, ...loadEvals().filter((x) => x.id !== c.id)]);
  return loadEvals();
}
export function scoreEval(id: string, answer: string) {
  const all = loadEvals().map((c) => c.id !== id ? c : { ...c, last: answer, pass: answer.toLowerCase().includes(c.expect.toLowerCase()) });
  writeJson("flomaila.eval.v1", all);
  return all;
}
export type Snap = { id: string; at: string; note: string; taught: string[] };
export function loadSnaps(): Snap[] { return readJson("flomaila.snaps.v1", []); }
export function takeSnap(note: string, taught: string[]) {
  const s: Snap = { id: crypto.randomUUID(), at: new Date().toISOString(), note, taught };
  writeJson("flomaila.snaps.v1", [s, ...loadSnaps()]);
  return s;
}
export type Report = { id: string; text: string; at: string };
export function loadReports(): Report[] { return readJson("flomaila.hallu.v1", []); }
export function reportHallucination(text: string) {
  writeJson("flomaila.hallu.v1", [{ id: crypto.randomUUID(), text, at: new Date().toISOString() }, ...loadReports()]);
  return loadReports();
}
