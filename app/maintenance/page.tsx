"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { defaultOps, loadOps, saveOps, type Ops } from "@/lib/ops2";
export default function Page() {
  const [o, setO] = useState<Ops>(defaultOps);
  useEffect(() => setO(loadOps()), []);
  return (<><PageHeader title="Maintenance" desc="Trust flags." /><Card className="grid gap-3 text-sm"><label className="flex gap-2"><input type="checkbox" checked={o.maintenance} onChange={(e) => setO({ ...o, maintenance: e.target.checked })} />Maintenance</label><input className="rounded-xl border px-3 py-2" value={o.incident} onChange={(e) => setO({ ...o, incident: e.target.value })} /><label className="flex gap-2"><input type="checkbox" checked={o.sso} onChange={(e) => setO({ ...o, sso: e.target.checked })} />SSO flag</label><label className="flex gap-2"><input type="checkbox" checked={o.scim} onChange={(e) => setO({ ...o, scim: e.target.checked })} />SCIM flag</label><label className="flex gap-2"><input type="checkbox" checked={o.captcha} onChange={(e) => setO({ ...o, captcha: e.target.checked })} />Captcha</label><button type="button" className="rounded-full bg-brand py-2 text-white" onClick={() => saveOps(o)}>Save</button></Card></>);
}
