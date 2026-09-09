export function exportWorkspace() {
  if (typeof window === "undefined") return "{}";
  const out: Record<string, string | null> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("flomaila.")) out[k] = localStorage.getItem(k);
  }
  return JSON.stringify(out, null, 2);
}
export function importWorkspace(json: string) {
  const data = JSON.parse(json) as Record<string, string>;
  Object.entries(data).forEach(([k, v]) => { if (k.startsWith("flomaila.")) localStorage.setItem(k, v); });
}
export function wipeWorkspace() {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("flomaila.")) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}
