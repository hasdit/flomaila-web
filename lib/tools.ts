import { draftOrder, loadOrders, saveOrders, type Order, type OrderStatus } from "./orders";
import { canAiChange, type OrderPolicy } from "./policy";
export type ToolName = "search_products" | "get_product" | "get_order" | "draft_order" | "confirm_order" | "update_order" | "cancel_order" | "handoff_order_change" | "handoff" | "tag_thread";
export function runOrderTool(name: ToolName, input: { orderId?: string; customer?: string; channel?: string; lines?: Order["lines"]; status?: OrderStatus; policy?: OrderPolicy }) {
  const policy = input.policy || "system_default";
  if (name === "draft_order") return draftOrder({ customer: input.customer || "Guest", channel: input.channel || "web", lines: input.lines || [] });
  const orders = loadOrders();
  const order = orders.find((o) => o.id === input.orderId);
  if (!order) return { error: "order_not_found" };
  const gate = canAiChange(order.status, policy);
  if (name === "handoff_order_change" || name === "handoff") { order.note = (order.note || "") + " | handoff"; saveOrders(orders); return { ok: true, handedOff: true, order }; }
  if (!gate.ok) return { error: "policy_blocked", use: gate.tool, order };
  if (name === "confirm_order") { if (order.status !== "draft" && order.status !== "pending") return { error: "not_pending" }; order.status = "pending"; }
  if (name === "update_order" && input.status) order.status = input.status;
  if (name === "cancel_order") order.status = "cancelled";
  saveOrders(orders);
  return { ok: true, order };
}
