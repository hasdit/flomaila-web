"use client";
import { Card, PageHeader } from "@/components/app-shell";
export default function Page() {
  return (<><PageHeader title="Forbidden" desc="RBAC denied preview." /><Card><p className="text-sm">Higher role required.</p></Card></>);
}
