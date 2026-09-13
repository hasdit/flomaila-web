"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  const [out, setOut] = useState("");
  useEffect(() => { fetch("/api/members").then((r) => r.json()).then((j) => setOut(JSON.stringify(j, null, 2))).catch(() => undefined); }, []);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workspaceId: "00000000-0000-0000-0000-000000000001", email: String(d.get("email")), role: String(d.get("role") || "agent") }) });
    setOut(JSON.stringify(await (await fetch("/api/members")).json(), null, 2));
  }
  return (<><PageHeader title="Members" desc="RBAC on Neon." /><Card className="mb-3"><form className="flex flex-wrap gap-2" onSubmit={onSubmit}><input name="email" type="email" required className="rounded-xl border px-3 py-2 text-sm" /><select name="role" className="rounded-xl border px-3 py-2 text-sm"><option>agent</option><option>admin</option><option>owner</option><option>analyst</option><option>email_marketer</option></select><button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Invite</button></form></Card><Card><pre className="overflow-x-auto text-xs">{out}</pre></Card></>);
}
