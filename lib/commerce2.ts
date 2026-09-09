import { readJson, writeJson } from "./store";
import { loadProducts, saveProducts, type Product } from "./catalog";
export type GiftCard = { code: string; balance: number; currency: string };
export type WaitItem = { id: string; email: string; sku: string };
export type Collection = { id: string; name: string; skus: string[] };
export type Move = { id: string; sku: string; delta: number; reason: string; at: string };
export type Invoice = { id: string; orderId: string; total: number; at: string };
export type CurrencyRow = { code: string; rate: number };
export type Hold = { id: string; orderId: string; amount: number; status: "held" | "captured" | "released" };
export function loadGifts(): GiftCard[] { return readJson("flomaila.gifts.v1", []); }
export function issueGift(amount: number, currency = "USD") {
  const g: GiftCard = { code: "GIFT-" + crypto.randomUUID().slice(0, 6).toUpperCase(), balance: amount, currency };
  writeJson("flomaila.gifts.v1", [g, ...loadGifts()]); return g;
}
export function redeemGift(code: string, spend: number) {
  const all = loadGifts().map((g) => g.code === code ? { ...g, balance: Math.max(0, g.balance - spend) } : g);
  writeJson("flomaila.gifts.v1", all); return all.find((g) => g.code === code) || null;
}
export function loadWait(): WaitItem[] { return readJson("flomaila.wait.v1", []); }
export function joinWait(email: string, sku: string) {
  writeJson("flomaila.wait.v1", [{ id: crypto.randomUUID(), email, sku }, ...loadWait()]); return loadWait();
}
export function loadCols(): Collection[] { return readJson("flomaila.cols.v1", []); }
export function saveCol(c: Collection) {
  writeJson("flomaila.cols.v1", [c, ...loadCols().filter((x) => x.id !== c.id)]); return loadCols();
}
export function loadMoves(): Move[] { return readJson("flomaila.moves.v1", []); }
export function moveStock(sku: string, delta: number, reason: string) {
  saveProducts(loadProducts().map((p) => p.sku === sku ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
  const m: Move = { id: crypto.randomUUID(), sku, delta, reason, at: new Date().toISOString() };
  writeJson("flomaila.moves.v1", [m, ...loadMoves()]); return m;
}
export function loadInvoices(): Invoice[] { return readJson("flomaila.inv.v1", []); }
export function makeInvoice(orderId: string, total: number) {
  const inv: Invoice = { id: "inv_" + crypto.randomUUID().slice(0, 6), orderId, total, at: new Date().toISOString() };
  writeJson("flomaila.inv.v1", [inv, ...loadInvoices()]); return inv;
}
export function invoiceText(inv: Invoice) { return ["FLOMAILA INVOICE", inv.id, "Order " + inv.orderId, "Total " + inv.total, inv.at].join("\n"); }
export function loadFx(): CurrencyRow[] { return readJson("flomaila.fx.v1", [{ code: "USD", rate: 1 }, { code: "EUR", rate: 0.92 }, { code: "BDT", rate: 110 }]); }
export function saveFx(rows: CurrencyRow[]) { writeJson("flomaila.fx.v1", rows); }
export function convert(amountUsd: number, code: string) { return Number((amountUsd * (loadFx().find((r) => r.code === code)?.rate ?? 1)).toFixed(2)); }
export function loadHolds(): Hold[] { return readJson("flomaila.holds.v1", []); }
export function holdPay(orderId: string, amount: number) {
  const h: Hold = { id: "hold_" + crypto.randomUUID().slice(0, 6), orderId, amount, status: "held" };
  writeJson("flomaila.holds.v1", [h, ...loadHolds()]); return h;
}
export function settleHold(id: string, status: Hold["status"]) {
  writeJson("flomaila.holds.v1", loadHolds().map((h) => h.id === id ? { ...h, status } : h)); return loadHolds();
}
export function tagProduct(id: string, tags: string) {
  saveProducts(loadProducts().map((p) => p.id === id ? ({ ...p, category: p.category || tags } as Product) : p));
}
