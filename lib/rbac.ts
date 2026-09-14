export const ROLES = ["owner", "admin", "agent", "analyst", "email_marketer"] as const;
export type Role = (typeof ROLES)[number];
export function can(role: Role, action: string) {
  const map: Record<string, Role[]> = {
    billing: ["owner"], keys: ["owner", "admin"], connectors: ["owner", "admin"], ai_master: ["owner", "admin"],
    catalog: ["owner", "admin"], inbox: ["owner", "admin", "agent"], orders: ["owner", "admin", "agent"],
    insights: ["owner", "admin", "analyst"], export: ["owner", "admin", "analyst"], email: ["owner", "admin", "email_marketer"],
  };
  return (map[action] || ["owner"]).includes(role);
}
