export type Ticket = { id: string; title: string; body: string; status: "open" | "closed"; at: string };
const KEY = "flomaila.tickets.v1";
export function loadTickets(): Ticket[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Ticket[]; } catch { return []; }
}
export function addTicket(title: string, body: string) {
  const t: Ticket = { id: crypto.randomUUID(), title, body, status: "open", at: new Date().toISOString() };
  const all = [t, ...loadTickets()];
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
export function closeTicket(id: string) {
  const all = loadTickets().map((t) => (t.id === id ? { ...t, status: "closed" as const } : t));
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
