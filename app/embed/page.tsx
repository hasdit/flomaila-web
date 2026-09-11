"use client";
import { Card, PageHeader } from "@/components/app-shell";
const snippet = `<iframe src="/w" title="Flomaila" style="width:360px;height:520px;border:0;border-radius:16px"></iframe>`;
export default function Page() {
  return (<><PageHeader title="Embed" desc="Widget iframe." /><Card><pre className="overflow-x-auto text-xs">{snippet}</pre><button type="button" className="mt-3 rounded-full border px-4 py-2 text-sm" onClick={() => navigator.clipboard.writeText(snippet)}>Copy</button></Card></>);
}
