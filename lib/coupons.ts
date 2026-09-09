import { readJson, writeJson } from "./store";
export type Coupon = { code: string; percent: number; active: boolean; uses: number };
const KEY = "flomaila.coupons.v1";
export function loadCoupons(): Coupon[] { return readJson(KEY, []); }
export function saveCoupon(c: Coupon) {
  const all = [c, ...loadCoupons().filter((x) => x.code !== c.code)];
  writeJson(KEY, all); return all;
}
export function applyCoupon(code: string, amount: number) {
  const c = loadCoupons().find((x) => x.code.toLowerCase() === code.toLowerCase() && x.active);
  if (!c) return { ok: false, total: amount, message: "Invalid code" };
  const total = Math.max(0, amount * (1 - c.percent / 100));
  saveCoupon({ ...c, uses: c.uses + 1 });
  return { ok: true, total, message: c.percent + "% off" };
}
