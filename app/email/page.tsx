"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { CONTACT_CSV_HEADER, deleteCampaign, deleteContact, loadCampaigns, loadContacts, mergeContacts, parseContactsCsv, sendCampaign, type Campaign, type Contact } from "@/lib/email";
export default function EmailPage() {
  const [tab, setTab] = useState<"audience" | "campaign">("audience");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [log, setLog] = useState("");
  useEffect(() => { setContacts(loadContacts()); setCampaigns(loadCampaigns()); }, []);
  function downloadTemplate() {
    const blob = new Blob([CONTACT_CSV_HEADER + "\nhello@shop.com,Maya,Chen,+1,US,en,vip,web,,,\n"], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "flomaila-contacts-template.csv"; a.click(); URL.revokeObjectURL(url);
  }
  return (
    <>
      <PageHeader title="Email Studio" desc="Contacts CSV is here — not on Products." />
      <div className="mb-4 flex rounded-full bg-stone-100 p-1 text-sm">{(["audience", "campaign"] as const).map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`flex-1 rounded-full py-2 capitalize ${tab === t ? "bg-white font-medium" : "text-stone-500"}`}>{t}</button>)}</div>
      {tab === "audience" ? (
        <Card>
          <p className="text-sm text-stone-600">Columns: <code className="text-xs">{CONTACT_CSV_HEADER}</code></p>
          <button type="button" onClick={downloadTemplate} className="mt-3 rounded-full border px-4 py-2 text-sm">Download template</button>
          <input type="file" accept=".csv" className="mt-3 block text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const { ok, errors } = parseContactsCsv(await f.text()); if (ok.length) mergeContacts(ok); setContacts(loadContacts()); setLog("Imported " + ok.length + ". " + errors.join(" ")); }} />
          <p className="mt-2 text-sm text-stone-500">{log || contacts.length + " contacts"}</p>
          <ul className="mt-3 text-sm">{contacts.slice(0, 20).map((c) => <li key={c.email} className="flex justify-between border-b py-2">{c.email}<button type="button" className="text-xs text-stone-400" onClick={() => setContacts(deleteContact(c.email))}>Remove</button></li>)}</ul>
        </Card>
      ) : (
        <Card>
          <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); sendCampaign(String(data.get("name") || "Campaign"), String(data.get("subject") || ""), String(data.get("body") || "")); setCampaigns(loadCampaigns()); }}>
            <input name="name" placeholder="Name" className="rounded-xl border px-3 py-2" required />
            <input name="subject" placeholder="Subject" className="rounded-xl border px-3 py-2" required />
            <textarea name="body" placeholder="Body" rows={4} className="rounded-xl border px-3 py-2" />
            <button className="rounded-full bg-brand py-2 text-sm text-white" type="submit">Send to {contacts.length} contacts</button>
          </form>
          <ul className="mt-4 text-sm">{campaigns.map((c) => <li key={c.id} className="flex justify-between border-t py-2">{c.name}<button type="button" className="text-xs text-stone-400" onClick={() => setCampaigns(deleteCampaign(c.id))}>Remove</button></li>)}</ul>
        </Card>
      )}
    </>
  );
}
