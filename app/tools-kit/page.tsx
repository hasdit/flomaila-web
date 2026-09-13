"use client";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { money } from "@/lib/money";
import { shortId, isUuid } from "@/lib/ids";
import { parseCsv, toCsv } from "@/lib/csv";
import { allow } from "@/lib/rate";
import { slaDue, slaBreached } from "@/lib/sla";
export default function Page() {
  const [out, setOut] = useState("");
  return (<><PageHeader title="Toolkit" desc="Helpers + API pings." /><Card className="flex flex-wrap gap-2">
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => setOut(money(19.5))}>money</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => setOut(shortId("ord") + " " + isUuid("00000000-0000-0000-0000-000000000001"))}>ids</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => setOut(toCsv(parseCsv("a,b\n1,2")))}>csv</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => setOut("allow " + allow("demo", 5))}>rate</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={() => setOut(slaDue(4) + " " + slaBreached(new Date(0).toISOString()))}>sla</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={async () => setOut(JSON.stringify(await (await fetch("/api/ping")).json()))}>ping</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={async () => setOut(JSON.stringify(await (await fetch("/api/me")).json()))}>me</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={async () => setOut(JSON.stringify(await (await fetch("/api/channels")).json()))}>channels</button>
    <button type="button" className="rounded-full border px-3 py-1 text-xs" onClick={async () => setOut(JSON.stringify(await (await fetch("/api/couriers")).json()))}>couriers</button>
  </Card><Card className="mt-3"><pre className="text-xs">{out}</pre></Card></>);
}
