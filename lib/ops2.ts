import { readJson, writeJson } from "./store";
export type Ops = { maintenance: boolean; incident: string; retentionDays: number; sso: boolean; scim: boolean; captcha: boolean; ratePerIp: number; rtl: boolean; cookie: string };
export const defaultOps: Ops = { maintenance: false, incident: "", retentionDays: 365, sso: false, scim: false, captcha: false, ratePerIp: 60, rtl: false, cookie: "We use essential cookies to run Flomaila." };
export function loadOps(): Ops { return { ...defaultOps, ...readJson("flomaila.ops2.v1", defaultOps) }; }
export function saveOps(o: Ops) { writeJson("flomaila.ops2.v1", o); }
export type Note = { id: string; title: string; body: string; at: string };
export function loadNotes(): Note[] { return readJson("flomaila.notif.v1", []); }
export function pushNote(title: string, body: string) {
  const n: Note = { id: crypto.randomUUID(), title, body, at: new Date().toISOString() };
  writeJson("flomaila.notif.v1", [n, ...loadNotes()].slice(0, 40));
  return loadNotes();
}
export type Incident = { id: string; text: string; open: boolean; at: string };
export function loadIncidents(): Incident[] { return readJson("flomaila.inc.v1", []); }
export function openIncident(text: string) {
  const i: Incident = { id: crypto.randomUUID(), text, open: true, at: new Date().toISOString() };
  writeJson("flomaila.inc.v1", [i, ...loadIncidents()]);
  return loadIncidents();
}
export function closeIncident(id: string) {
  writeJson("flomaila.inc.v1", loadIncidents().map((i) => i.id === id ? { ...i, open: false } : i));
  return loadIncidents();
}
