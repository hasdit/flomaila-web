import { readJson, writeJson } from "./store";
export type Template = { id: string; name: string; subject: string; body: string; alt?: string };
export function loadTpls(): Template[] { return readJson("flomaila.tpl.v1", []); }
export function saveTpl(t: Template) {
  writeJson("flomaila.tpl.v1", [t, ...loadTpls().filter((x) => x.id !== t.id)]);
  return loadTpls();
}
export type Bounce = { email: string; at: string };
export function loadBounces(): Bounce[] { return readJson("flomaila.bounce.v1", []); }
export function addBounce(email: string) {
  writeJson("flomaila.bounce.v1", [{ email, at: new Date().toISOString() }, ...loadBounces()]);
  return loadBounces();
}
export type Metric = { campaign: string; opens: number; clicks: number };
export function loadMetrics(): Metric[] { return readJson("flomaila.emetrics.v1", []); }
export function bumpMetric(campaign: string, field: "opens" | "clicks") {
  const all = loadMetrics();
  const cur = all.find((m) => m.campaign === campaign) || { campaign, opens: 0, clicks: 0 };
  cur[field] += 1;
  writeJson("flomaila.emetrics.v1", [cur, ...all.filter((m) => m.campaign !== campaign)]);
  return cur;
}
export type Unsub = { email: string; at: string };
export function loadUnsub(): Unsub[] { return readJson("flomaila.unsub.v1", []); }
export function unsub(email: string) {
  writeJson("flomaila.unsub.v1", [{ email, at: new Date().toISOString() }, ...loadUnsub()]);
  return loadUnsub();
}
