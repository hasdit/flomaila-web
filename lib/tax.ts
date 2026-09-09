import { readJson, writeJson } from "./store";
export type Tax = { region: string; rate: number };
const KEY = "flomaila.tax.v1";
export function loadTax(): Tax[] { return readJson(KEY, [{ region: "US", rate: 0 }, { region: "EU", rate: 0.2 }]); }
export function saveTax(rows: Tax[]) { writeJson(KEY, rows); }
export function taxOn(amount: number, region: string) {
  const t = loadTax().find((x) => x.region === region);
  return Number((amount * (t?.rate ?? 0)).toFixed(2));
}
