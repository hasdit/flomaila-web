"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { addWorkspace } from "@/lib/workspaces";
import { defaults, loadSettings, saveSettings, type Settings } from "@/lib/settings";
import { logEvent } from "@/lib/activity";
export default function SettingsPage() {
  const [s, setS] = useState<Settings>(defaults);
  useEffect(() => { setS(loadSettings()); }, []);
  function onSubmit(e: FormEvent) { e.preventDefault(); saveSettings(s); }
  return (
    <>
      <PageHeader title="Settings" desc="Workspace and AI behavior." />
      <form className="space-y-3" onSubmit={onSubmit}>
        <Card>
          <label className="block text-sm">Workspace<input className="mt-1 w-full rounded-xl border px-3 py-2" value={s.workspaceName} onChange={(e) => setS({ ...s, workspaceName: e.target.value })} /></label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input className="rounded-xl border px-3 py-2" value={s.country} onChange={(e) => setS({ ...s, country: e.target.value })} />
            <input className="rounded-xl border px-3 py-2" value={s.currency} onChange={(e) => setS({ ...s, currency: e.target.value })} />
          </div>
        </Card>
        <Card>
          <p className="font-medium">AI behavior</p>
          <select className="mt-2 w-full rounded-xl border px-3 py-2" value={s.photoPolicy} onChange={(e) => setS({ ...s, photoPolicy: e.target.value as Settings["photoPolicy"] })}>
            <option value="ask">Ask</option><option value="never_guess">Never guess</option><option value="suggest">Suggest</option><option value="fixed">Fixed reply</option>
          </select>
          <select className="mt-2 w-full rounded-xl border px-3 py-2" value={s.postConfirm} onChange={(e) => setS({ ...s, postConfirm: e.target.value as Settings["postConfirm"] })}>
            <option value="default">System default</option><option value="ai_pending">AI may update pending</option><option value="handoff">Always hand off</option>
          </select>
          <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={s.aiOn} onChange={(e) => setS({ ...s, aiOn: e.target.checked })} />AI replies on</label>
        </Card>
        <button className="rounded-full bg-brand px-4 py-2 text-sm text-white" type="submit">Save settings</button>
      </form>
      <Card className="mt-4">
        <p className="font-medium">New workspace</p>
        <form className="mt-2 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); addWorkspace(String(data.get("name") || "Workspace"), String(data.get("country") || "US")); logEvent("workspace", "Added workspace"); e.currentTarget.reset(); }}>
          <input name="name" placeholder="Name" className="rounded-xl border px-3 py-2 text-sm" required />
          <input name="country" placeholder="Country" defaultValue="US" className="rounded-xl border px-3 py-2 text-sm" />
          <button className="rounded-full border px-4 py-2 text-sm" type="submit">Add</button>
        </form>
      </Card>
    </>
  );
}
