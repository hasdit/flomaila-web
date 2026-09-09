"use client";
import { Card, PageHeader } from "@/components/app-shell";
import { DPA } from "@/lib/legal";
export default function Page() { return (<><PageHeader title="DPA" desc="Preview." /><Card><p className="text-sm leading-6">{DPA}</p></Card></>); }
