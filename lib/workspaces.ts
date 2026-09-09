export type Workspace = { id: string; name: string; country: string };
const KEY = "flomaila.workspaces.v1";
const ACTIVE = "flomaila.activeWorkspace.v1";
export const seed: Workspace[] = [{ id: "ws_demo", name: "Flomaila Demo", country: "US" }, { id: "ws_eu", name: "EU Shop", country: "DE" }];
export function loadWorkspaces(): Workspace[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) { localStorage.setItem(KEY, JSON.stringify(seed)); return seed; }
    return JSON.parse(raw) as Workspace[];
  } catch { return seed; }
}
export function activeWorkspaceId() {
  if (typeof window === "undefined") return "ws_demo";
  return localStorage.getItem(ACTIVE) || "ws_demo";
}
export function setActiveWorkspace(id: string) { localStorage.setItem(ACTIVE, id); }
export function addWorkspace(name: string, country: string) {
  const w: Workspace = { id: `ws_${crypto.randomUUID().slice(0, 6)}`, name, country };
  const all = [...loadWorkspaces(), w];
  localStorage.setItem(KEY, JSON.stringify(all));
  setActiveWorkspace(w.id);
  return all;
}
