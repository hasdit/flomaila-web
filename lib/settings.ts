export type Settings = {
  workspaceName: string; country: string; currency: string; locale: string;
  photoPolicy: "ask" | "never_guess" | "suggest" | "fixed";
  postConfirm: "default" | "ai_pending" | "handoff";
  aiOn: boolean; notifications: boolean; quietStart: string; quietEnd: string;
};
const KEY = "flomaila.settings.v1";
export const defaults: Settings = {
  workspaceName: "Flomaila Demo", country: "US", currency: "USD", locale: "en",
  photoPolicy: "ask", postConfirm: "default", aiOn: true, notifications: true,
  quietStart: "22:00", quietEnd: "08:00",
};
export function loadSettings(): Settings {
  if (typeof window === "undefined") return defaults;
  try { return { ...defaults, ...(JSON.parse(localStorage.getItem(KEY) || "{}") as Settings) }; }
  catch { return defaults; }
}
export function saveSettings(s: Settings) { localStorage.setItem(KEY, JSON.stringify(s)); }
