"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { loadSession, logout } from "@/lib/auth";
import { loadWallet } from "@/lib/credits";
import { nav } from "@/lib/mock";
import { activeWorkspaceId, loadWorkspaces, setActiveWorkspace } from "@/lib/workspaces";
import clsx from "clsx";
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [wsId, setWsId] = useState("ws_demo");
  const workspaces = typeof window === "undefined" ? [] : loadWorkspaces();
  useEffect(() => { setCredits(loadWallet().balance); setEmail(loadSession()?.email ?? null); setWsId(activeWorkspaceId()); }, [path]);
  if (path === "/login") return <>{children}</>;
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 lg:hidden">
        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
        <span className="font-semibold">flomaila</span>
        <span className="ml-auto rounded-full bg-brand-tint px-3 py-1 text-xs text-brand">{credits} cr</span>
      </header>
      <aside className={clsx("fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-white transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <Link href="/" className="px-5 py-5 text-xl font-semibold">flomaila<span className="text-brand">.</span></Link>
        <nav className="flex-1 overflow-y-auto px-3">
          {nav.map((item) => {
            const active = item.href === "/" ? path === "/" : path === item.href || path.startsWith(item.href + "/");
            return (
              <div key={item.href} className="mb-1">
                <Link href={item.href} onClick={() => setOpen(false)} className={clsx("block rounded-xl px-3 py-2 text-sm font-medium", active ? "bg-brand-tint text-brand" : "text-stone-600")}>{item.label}</Link>
                {item.children && item.children.map((c) => (
                  <Link key={c.href} href={c.locked ? "#" : c.href} onClick={() => setOpen(false)} className={clsx("ml-3 block rounded-lg px-3 py-1.5 text-sm", path === c.href ? "text-brand" : "text-stone-500", c.locked && "opacity-50")}>{c.label}</Link>
                ))}
              </div>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <div className="rounded-2xl bg-brand-tint p-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-brand"><Wallet className="h-4 w-4" />{credits} credits</div>
            <select className="mt-2 w-full rounded-lg border bg-white px-2 py-1 text-xs" value={wsId} onChange={(e) => { setActiveWorkspace(e.target.value); setWsId(e.target.value); }}>
              {workspaces.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <p className="mt-2 text-xs text-stone-500">{email ? <button type="button" className="underline" onClick={() => { logout(); setEmail(null); }}>{email} · sign out</button> : <Link href="/login">Sign in</Link>}</p>
          </div>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-black/20 lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <main className="lg:pl-72"><div className="mx-auto max-w-5xl px-4 py-6">{children}</div></main>
    </div>
  );
}
export function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{title}</h1>{desc ? <p className="mt-1 text-sm text-stone-500">{desc}</p> : null}</div>{action}</div>;
}
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
}
