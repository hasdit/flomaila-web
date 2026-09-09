import { readJson, writeJson } from "./store";
export type Intent = { id: string; orderId: string; rail: string; amount: number; status: "created" | "paid" | "failed" };
const KEY = "flomaila.intents.v1";
export function loadIntents(): Intent[] { return readJson(KEY, []); }
export function createIntent(orderId: string, rail: string, amount: number) {
  const i: Intent = { id: "pi_" + crypto.randomUUID().slice(0, 8), orderId, rail, amount, status: "created" };
  writeJson(KEY, [i, ...loadIntents()]); return i;
}
export function payIntent(id: string) {
  const all = loadIntents().map((i) => i.id === id ? { ...i, status: "paid" as const } : i);
  writeJson(KEY, all); return all;
}
