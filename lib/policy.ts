export type OrderPolicy = "system_default" | "ai_updates_pending" | "always_hand_off";
export function canAiChange(status: string, policy: OrderPolicy) {
  if (policy === "always_hand_off") return { ok: false, tool: "handoff_order_change" as const };
  if (status === "paid" || status === "cancelled" || status === "refunded") {
    return { ok: false, tool: "handoff_order_change" as const };
  }
  if (status === "draft") return { ok: true, tool: "confirm_order" as const };
  return { ok: true, tool: "update_order" as const };
}
