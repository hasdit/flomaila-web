import { readJson, writeJson } from "./store";
export type Hours = { days: Record<string, string>; tz: string };
const KEY = "flomaila.hours.v1";
export const defaultHours: Hours = { tz: "UTC", days: { mon: "09-18", tue: "09-18", wed: "09-18", thu: "09-18", fri: "09-18", sat: "closed", sun: "closed" } };
export function loadHours(): Hours {
  const raw = readJson<Hours>(KEY, defaultHours);
  return { ...defaultHours, ...raw, days: { ...defaultHours.days, ...(raw.days || {}) } };
}
export function saveHours(h: Hours) { writeJson(KEY, h); }
