export type Step = { id: string; type: "wait" | "send" | "tag"; label: string };
export type Workflow = { id: string; name: string; active: boolean; steps: Step[] };
const KEY = "flomaila.workflows.v1";
export function loadWorkflows(): Workflow[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Workflow[]; } catch { return []; }
}
export function saveWorkflow(w: Workflow) {
  const all = [w, ...loadWorkflows().filter((x) => x.id !== w.id)];
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
export function toggleWorkflow(id: string) {
  const all = loadWorkflows().map((w) => (w.id === id ? { ...w, active: !w.active } : w));
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
