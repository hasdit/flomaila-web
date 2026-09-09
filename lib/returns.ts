import { readJson, writeJson } from "./store";
export type Rma = { id: string; orderId: string; reason: string; status: "open" | "approved" | "rejected" | "refunded" };
const KEY = "flomaila.rma.v1";
export function loadRma(): Rma[] { return readJson(KEY, []); }
export function createRma(orderId: string, reason: string) {
  const r: Rma = { id: "rma_" + crypto.randomUUID().slice(0, 6), orderId, reason, status: "open" };
  writeJson(KEY, [r, ...loadRma()]); return r;
}
export function setRma(id: string, status: Rma["status"]) {
  const all = loadRma().map((r) => r.id === id ? { ...r, status } : r);
  writeJson(KEY, all); return all;
}
