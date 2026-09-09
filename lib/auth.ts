export type Session = { email: string; name: string };
const KEY = "flomaila.session.v1";
export function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try { const raw = localStorage.getItem(KEY); return raw ? (JSON.parse(raw) as Session) : null; } catch { return null; }
}
export function login(email: string, name: string) {
  const s: Session = { email, name: name || email.split("@")[0] };
  localStorage.setItem(KEY, JSON.stringify(s));
  return s;
}
export function logout() { localStorage.removeItem(KEY); }
