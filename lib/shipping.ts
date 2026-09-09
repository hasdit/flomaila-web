import { readJson, writeJson } from "./store";
export type Zone = { id: string; name: string; countries: string; rate: number };
const KEY = "flomaila.zones.v1";
export function loadZones(): Zone[] { return readJson(KEY, [{ id: "z1", name: "Domestic", countries: "US", rate: 5 }, { id: "z2", name: "Intl", countries: "*", rate: 18 }]); }
export function saveZone(z: Zone) {
  const all = [z, ...loadZones().filter((x) => x.id !== z.id)];
  writeJson(KEY, all); return all;
}
export function quoteShip(country: string) {
  const z = loadZones().find((x) => x.countries === country) || loadZones().find((x) => x.countries === "*");
  return z?.rate ?? 0;
}
