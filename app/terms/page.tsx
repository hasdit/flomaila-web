"use client";
import { Card, PageHeader } from "@/components/app-shell";
import { TERMS } from "@/lib/legal";
export default function Page() { return (<><PageHeader title="Terms" desc="Preview." /><Card><p className="text-sm leading-6">{TERMS}</p></Card></>); }
