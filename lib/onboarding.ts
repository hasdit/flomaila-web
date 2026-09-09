import { readJson, writeJson } from "./store";
import { loadProducts } from "./catalog";
import { loadConnectors } from "./connect";
import { loadSettings } from "./settings";
import { loadSources } from "./content";
export type Step = { id: string; label: string; done: boolean; href: string };
export function checklist(): Step[] {
  const extra = readJson<Record<string, boolean>>("flomaila.onboard.v1", {});
  return [
    { id: "ws", label: "Name the workspace", done: extra.ws || loadSettings().workspaceName !== "Flomaila Demo", href: "/settings" },
    { id: "cat", label: "Add a product", done: extra.cat || loadProducts().length > 0, href: "/catalog" },
    { id: "train", label: "Teach the assistant", done: extra.train || loadSources().length > 0, href: "/train" },
    { id: "connect", label: "Save a connector key", done: extra.connect || loadConnectors().some((c) => c.connected), href: "/connect" },
    { id: "widget", label: "Preview the widget", done: Boolean(extra.widget), href: "/widget" },
  ];
}
export function markStep(id: string) {
  const extra = readJson<Record<string, boolean>>("flomaila.onboard.v1", {});
  extra[id] = true;
  writeJson("flomaila.onboard.v1", extra);
}
