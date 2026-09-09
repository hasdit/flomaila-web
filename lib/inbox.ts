export type Channel = "web" | "facebook" | "instagram" | "whatsapp";
export type ThreadMsg = { id: string; at: string; from: "customer" | "ai" | "agent"; text: string };
export type Thread = { id: string; name: string; channel: Channel; lastAt: string; unread: boolean; messages: ThreadMsg[] };
const KEY = "flomaila.inbox.v1";
const seed: Thread[] = [
  { id: "t1", name: "Maya Chen", channel: "web", lastAt: new Date().toISOString(), unread: true, messages: [{ id: "m1", at: new Date().toISOString(), from: "customer", text: "Do you have the black tee in M?" }] },
  { id: "t2", name: "Omar", channel: "whatsapp", lastAt: new Date(Date.now() - 3600000).toISOString(), unread: false, messages: [{ id: "m2", at: new Date(Date.now() - 3600000).toISOString(), from: "customer", text: "Where is my order?" }] },
];
export function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) { localStorage.setItem(KEY, JSON.stringify(seed)); return seed; }
    const parsed = JSON.parse(raw) as Thread[];
    return Array.isArray(parsed) && parsed.length ? parsed : seed;
  } catch { return seed; }
}
export function saveThreads(items: Thread[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
export function replyToThread(id: string, from: ThreadMsg["from"], text: string) {
  const next = loadThreads().map((t) => {
    if (t.id !== id) return t;
    const msg: ThreadMsg = { id: crypto.randomUUID(), at: new Date().toISOString(), from, text };
    return { ...t, unread: from === "customer", lastAt: msg.at, messages: [...t.messages, msg] };
  });
  saveThreads(next); return next;
}
export function markRead(id: string) {
  const next = loadThreads().map((t) => (t.id === id ? { ...t, unread: false } : t));
  saveThreads(next); return next;
}
export function markUnread(id: string) {
  const next = loadThreads().map((t) => (t.id === id ? { ...t, unread: true } : t));
  saveThreads(next); return next;
}
