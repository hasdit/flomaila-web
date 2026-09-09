import { readJson, writeJson } from "./store";
export type Flags = { sla: boolean; vision: boolean; ads: boolean; widgetV2: boolean; agency: boolean };
const KEY = "flomaila.flags.v1";
export const defaultFlags: Flags = { sla: true, vision: false, ads: false, widgetV2: true, agency: true };
export function loadFlags(): Flags { return { ...defaultFlags, ...readJson(KEY, defaultFlags) }; }
export function saveFlags(f: Flags) { writeJson(KEY, f); }
