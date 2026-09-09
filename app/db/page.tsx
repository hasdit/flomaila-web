"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function DbPage() {
  const [state, setState] = useState("checking");
  useEffect(() => {
    fetch("/api/db").then((r) => r.json()).then((j) => setState(j.ok ? "Neon connected · " + j.workspaces + " workspaces" : j.error || "not configured")).catch(() => setState("unreachable"));
  }, []);
  return (<><PageHeader title="Database" desc="Neon Postgres via Prisma. LocalStorage until DATABASE_URL is set." /><Card><p className="text-sm">{state}</p><ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-stone-600"><li>Create neon.tech project flomaila</li><li>Copy pooled connection string</li><li>Set DATABASE_URL in .env.local and Vercel</li><li>npx prisma migrate dev --name init</li></ol></Card></>);
}
