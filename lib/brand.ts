import { readJson, writeJson } from "./store";
export type Brand = { logo: string; greeting: string; accent: string; widgetPosition: "right" | "left" };
const KEY = "flomaila.brand.v1";
export const defaultBrand: Brand = { logo: "", greeting: "Hi — I am the Flomaila store assistant.", accent: "#C2410C", widgetPosition: "right" };
export function loadBrand(): Brand { return { ...defaultBrand, ...readJson(KEY, defaultBrand) }; }
export function saveBrand(b: Brand) { writeJson(KEY, b); }
