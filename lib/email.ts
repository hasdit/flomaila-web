export const CONTACT_CSV_HEADER = "email,first_name,last_name,phone,country,locale,tags,source,custom_1,custom_2,custom_3";
export type Contact = { email: string; first_name: string; last_name: string; phone: string; country: string; locale: string; tags: string; source: string; custom_1: string; custom_2: string; custom_3: string };
export type Campaign = { id: string; name: string; subject: string; body: string; sentAt: string; recipients: number };
const CKEY = "flomaila.contacts.v1";
const KKEY = "flomaila.campaigns.v1";
export function loadContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CKEY) || "[]") as Contact[]; } catch { return []; }
}
export function saveContacts(items: Contact[]) { localStorage.setItem(CKEY, JSON.stringify(items)); }
export function parseContactsCsv(text: string): { ok: Contact[]; errors: string[] } {
  const lines = text.replace(/\r\n/g, "\n").split("\n").filter((l) => l.trim());
  const errors: string[] = []; const ok: Contact[] = [];
  if (!lines.length) return { ok, errors: ["Empty file"] };
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  if (!header.includes("email")) return { ok, errors: ["Missing column: email"] };
  const idx = (n: string) => header.indexOf(n);
  const cell = (cols: string[], n: string) => (idx(n) >= 0 ? (cols[idx(n)] || "").trim() : "");
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const email = cell(cols, "email");
    if (!email.includes("@")) { errors.push(`Row ${i + 1}: invalid email`); continue; }
    ok.push({ email, first_name: cell(cols, "first_name"), last_name: cell(cols, "last_name"), phone: cell(cols, "phone"), country: cell(cols, "country"), locale: cell(cols, "locale"), tags: cell(cols, "tags"), source: cell(cols, "source"), custom_1: cell(cols, "custom_1"), custom_2: cell(cols, "custom_2"), custom_3: cell(cols, "custom_3") });
  }
  return { ok, errors };
}
export function mergeContacts(incoming: Contact[]) {
  const map = new Map(loadContacts().map((c) => [c.email.toLowerCase(), c]));
  for (const c of incoming) map.set(c.email.toLowerCase(), c);
  const all = Array.from(map.values()); saveContacts(all); return all.length;
}
export function loadCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KKEY) || "[]") as Campaign[]; } catch { return []; }
}
export function sendCampaign(name: string, subject: string, body: string) {
  const c: Campaign = { id: crypto.randomUUID(), name, subject, body, sentAt: new Date().toISOString(), recipients: loadContacts().length };
  localStorage.setItem(KKEY, JSON.stringify([c, ...loadCampaigns()]));
  return c;
}
