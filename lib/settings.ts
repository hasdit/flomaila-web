export type Settings = { workspaceName: string; country: string; currency: string; photoPolicy: "ask" | "never_guess" | "suggest" | "fixed"; postConfirm: "default" | "ai_pending" | "handoff"; aiOn: boolean };
const KEY = "flomaila.settings.v1";
export const defaults: Settings = { workspaceName: "Flomaila Demo", country: "US", currency: "USD", photoPolicy: "ask", postConfirm: "default", aiOn: true };
export function loadSettings(): Settings {
  if (typeof window === "undefined") return defaults;
  try { return { ...defaults, ...(JSON.parse(localStorage.getItem(KEY) || "{}") as Settings) }; } catch { return defaults; }
}
export function saveSettings(s: Settings) { localStorage.setItem(KEY, JSON.stringify(s)); }
