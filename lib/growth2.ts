import { readJson, writeJson } from "./store";
export type Partner = { name: string; code: string; rate: number };
export function loadPartners(): Partner[] { return readJson("flomaila.aff.v1", []); }
export function savePartner(p: Partner) {
  writeJson("flomaila.aff.v1", [p, ...loadPartners().filter((x) => x.code !== p.code)]);
  return loadPartners();
}
export type Points = { email: string; pts: number };
export function loadLoyalty(): Points[] { return readJson("flomaila.loyal.v1", []); }
export function grantPts(email: string, pts: number) {
  const all = loadLoyalty();
  const cur = all.find((p) => p.email === email) || { email, pts: 0 };
  cur.pts += pts;
  writeJson("flomaila.loyal.v1", [cur, ...all.filter((p) => p.email !== email)]);
  return cur;
}
export type Nps = { score: number; at: string };
export function loadNps(): Nps[] { return readJson("flomaila.nps.v1", []); }
export function addNps(score: number) {
  writeJson("flomaila.nps.v1", [{ score, at: new Date().toISOString() }, ...loadNps()]);
  return loadNps();
}
export function npsValue() {
  const all = loadNps();
  if (!all.length) return 0;
  const promoters = all.filter((n) => n.score >= 9).length;
  const detractors = all.filter((n) => n.score <= 6).length;
  return Math.round(((promoters - detractors) / all.length) * 100);
}
export type Review = { id: string; author: string; text: string; stars: number };
export function loadReviews(): Review[] { return readJson("flomaila.rev.v1", []); }
export function addReview(r: Review) {
  writeJson("flomaila.rev.v1", [r, ...loadReviews()]);
  return loadReviews();
}
