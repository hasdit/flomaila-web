"use client";
import { Card, PageHeader } from "@/components/app-shell";
import { PRIVACY } from "@/lib/legal";
export default function Page() { return (<><PageHeader title="Privacy" desc="Preview." /><Card><p className="text-sm leading-6">{PRIVACY}</p></Card></>); }
