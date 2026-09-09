"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { loadOrders, orderTotal, setStatus, type Order } from "@/lib/orders";
export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  useEffect(() => { setItems(loadOrders()); }, []);
  const sales = items.filter((o) => o.status !== "cancelled").reduce((s, o) => s + orderTotal(o), 0);
  return (
    <>
      <PageHeader title="Orders" desc="Drafts from Inbox stay pending until you confirm." />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[`Total ${items.length}`, `Sales ${sales.toFixed(2)}`, `Draft ${items.filter((o) => o.status === "draft").length}`, `Paid ${items.filter((o) => o.status === "paid").length}`].map((t) => <Card key={t}><p className="text-sm text-stone-600">{t}</p></Card>)}</div>
      {!items.length ? <Card className="py-16 text-center text-sm text-stone-500">No orders. Open Inbox and press Draft order.</Card> : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-stone-400"><tr><th className="px-4 py-3">Id</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3" /></tr></thead>
            <tbody>{items.map((o) => (
              <tr key={o.id} className="border-t border-stone-50">
                <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                <td className="px-4 py-3">{o.customer}<p className="text-xs text-stone-400">{o.channel}</p></td>
                <td className="px-4 py-3">{orderTotal(o).toFixed(2)}</td>
                <td className="px-4 py-3">{o.status}</td>
                <td className="px-4 py-3 text-right">
                  {o.status === "draft" && <button type="button" className="text-xs text-brand" onClick={() => setItems(setStatus(o.id, "pending"))}>Confirm</button>}
                  {o.status === "pending" && <button type="button" className="text-xs text-brand" onClick={() => setItems(setStatus(o.id, "paid"))}>Mark paid</button>}
                  {o.status !== "cancelled" && o.status !== "paid" ? <button type="button" className="ml-2 text-xs text-stone-400" onClick={() => setItems(setStatus(o.id, "cancelled"))}>Cancel</button> : null}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      )}
    </>
  );
}
