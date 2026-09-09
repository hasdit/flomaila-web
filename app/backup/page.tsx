"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { exportWorkspace, importWorkspace, wipeWorkspace } from "@/lib/backup";
export default function Page() {
  const [msg, setMsg] = useState("");
  return (<><PageHeader title="Backup" desc="Export or restore this browser workspace." /><Card className="flex flex-wrap gap-2"><button type="button" className="rounded-full bg-brand px-4 py-2 text-sm text-white" onClick={() => { const blob = new Blob([exportWorkspace()], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "flomaila-backup.json"; a.click(); setMsg("Exported"); }}>Export JSON</button><input type="file" accept="application/json" className="text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; importWorkspace(await f.text()); setMsg("Imported — reload"); }} /><button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => { wipeWorkspace(); setMsg("Wiped"); }}>Wipe local data</button>{msg ? <p className="w-full text-sm text-stone-500">{msg}</p> : null}</Card></>);
}
