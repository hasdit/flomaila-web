"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { inviteMember, loadTeam, removeMember, type Member } from "@/lib/team";
import { logEvent } from "@/lib/activity";
export default function TeamPage() {
  const [items, setItems] = useState<Member[]>([]);
  useEffect(() => setItems(loadTeam()), []);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const role = String(data.get("role") || "agent") as Member["role"];
    if (!email.includes("@")) return;
    setItems(inviteMember(email, role));
    logEvent("team", "Invited " + email);
    e.currentTarget.reset();
  }
  return (
    <>
      <PageHeader title="Team" desc="P0 local RBAC list." />
      <Card className="mb-4">
        <form className="flex flex-wrap gap-2" onSubmit={onSubmit}>
          <input name="email" type="email" required placeholder="email" className="rounded-full border px-3 py-2 text-sm" />
          <select name="role" className="rounded-full border px-3 py-2 text-sm">
            <option value="agent">agent</option><option value="admin">admin</option><option value="analyst">analyst</option><option value="email_marketer">email_marketer</option>
          </select>
          <button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Invite</button>
        </form>
      </Card>
      <Card className="p-0">{items.map((m) => (
        <div key={m.email} className="flex items-center justify-between border-b px-4 py-3 text-sm">
          <span>{m.email} · {m.role}</span>
          {m.role !== "owner" ? <button type="button" className="text-xs text-stone-400" onClick={() => setItems(removeMember(m.email))}>Remove</button> : null}
        </div>
      ))}</Card>
    </>
  );
}
