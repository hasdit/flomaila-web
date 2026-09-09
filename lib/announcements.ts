import { readJson, writeJson } from "./store";
export type Banner = { id: string; text: string; active: boolean };
const KEY = "flomaila.banner.v1";
export function loadBanners(): Banner[] { return readJson(KEY, []); }
export function saveBanner(b: Banner) {
  const all = [b, ...loadBanners().filter((x) => x.id !== b.id)];
  writeJson(KEY, all); return all;
}
export function activeBanner() { return loadBanners().find((b) => b.active) || null; }
