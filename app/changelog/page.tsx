"use client";
import { Card, PageHeader } from "@/components/app-shell";
import { CHANGELOG } from "@/lib/changelog";
export default function Page() {
  return (<><PageHeader title="Changelog" desc="What shipped." />{CHANGELOG.map((c) => <Card key={c.v} className="mb-3"><p className="font-medium">{c.v} · {c.date}</p><p className="text-sm text-stone-600">{c.notes}</p></Card>)}</>);
}
