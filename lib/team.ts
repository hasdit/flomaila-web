export type Member = { email: string; role: "owner" | "admin" | "agent" | "analyst" | "email_marketer" };
const KEY = "flomaila.team.v1";
export function loadTeam(): Member[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seed: Member[] = [{ email: "you@brand.com", role: "owner" }];
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Member[];
  } catch { return []; }
}
export function inviteMember(email: string, role: Member["role"]) {
  const all = [...loadTeam().filter((m) => m.email !== email), { email, role }];
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
export function removeMember(email: string) {
  const all = loadTeam().filter((m) => m.email !== email);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
