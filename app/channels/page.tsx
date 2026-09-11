"use client";
import { Card, PageHeader } from "@/components/app-shell";
const ROWS = [["WhatsApp", "messaging", "BYO token"], ["Messenger", "messaging", "BYO token"], ["Web widget", "messaging", "built-in"], ["Shopify", "commerce", "BYO key"], ["Courier", "logistics", "per-country later"], ["Payments", "payments", "Stripe/PayPal/SSLCOMMERZ/bKash/Nagad"], ["Email", "email", "provider key"]];
export default function Page() {
  return (<><PageHeader title="Channel matrix" desc="Generic connectors." /><Card className="p-0">{ROWS.map(([name, family, how]) => <div key={name} className="grid grid-cols-3 border-b px-4 py-2 text-sm"><span>{name}</span><span className="text-stone-500">{family}</span><span>{how}</span></div>)}</Card></>);
}
