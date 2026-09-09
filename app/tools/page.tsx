"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { logEvent } from "@/lib/activity";
import { productsToCsv } from "@/lib/catalog";
import { loadWallet } from "@/lib/credits";
import { seedDemo } from "@/lib/demo";
import { CONTACT_CSV_HEADER, loadContacts } from "@/lib/email";
import { logout } from "@/lib/auth";
function download(name: string, text: string) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}
export default function ToolsPage() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <PageHeader title="Tools" desc="Demo seed, exports, and session helpers." />
      <Card>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => { seedDemo(); setMsg("Demo catalog and contacts loaded"); }}>Load demo data</button>
          <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => { download("products.csv", productsToCsv()); logEvent("export", "products"); setMsg("Products CSV downloaded"); }}>Export products</button>
          <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => {
            const rows = [CONTACT_CSV_HEADER, ...loadContacts().map((c) => [c.email, c.first_name, c.last_name, c.phone, c.country, c.locale, c.tags, c.source, c.custom_1, c.custom_2, c.custom_3].join(","))];
            download("contacts.csv", rows.join("\n")); logEvent("export", "contacts"); setMsg("Contacts CSV downloaded");
          }}>Export contacts</button>
          <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => {
            const w = loadWallet();
            const rows = ["at,reason,delta,balance,note", ...w.entries.map((e) => [e.at, e.reason, String(e.delta), String(e.balanceAfter), e.note].join(","))];
            download("ledger.csv", rows.join("\n")); setMsg("Ledger CSV downloaded");
          }}>Export ledger</button>
          <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => { logout(); setMsg("Signed out"); }}>Sign out</button>
        </div>
        {msg ? <p className="mt-3 text-sm text-stone-500">{msg}</p> : null}
      </Card>
    </>
  );
}
