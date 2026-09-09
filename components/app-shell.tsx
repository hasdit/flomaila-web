"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { nav, workspace } from "@/lib/mock";
import clsx from "clsx";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-stone-200 bg-white px-4 py-3 lg:hidden">
        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
        <span className="text-lg font-semibold tracking-tight">flomaila</span>
        <span className="ml-auto rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand">{workspace.credits} cr</span>
      </header>
      <aside className={clsx("fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-stone-200 bg-white transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight">flomaila<span className="text-brand">.</span></Link>
          <button type="button" className="lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {nav.map((item) => {
            const active = item.href === "/" ? path === "/" : path === item.href || path.startsWith(item.href + "/");
            return (
              <div key={item.href} className="mb-1">
                <Link href={item.href} onClick={() => setOpen(false)} className={clsx("block rounded-xl px-3 py-2 text-sm font-medium", active ? "bg-brand-tint text-brand" : "text-stone-600 hover:bg-stone-50")}>{item.label}</Link>
                {item.children && (
                  <div className="ml-3 mt-0.5 space-y-0.5">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.locked ? "#" : c.href} onClick={() => setOpen(false)} className={clsx("block rounded-lg px-3 py-1.5 text-sm", path === c.href ? "text-brand" : "text-stone-500 hover:text-stone-800", c.locked && "opacity-50")}>{c.label}{c.locked ? " 🔒" : ""}</Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="border-t border-stone-100 p-4">
          <div className="rounded-2xl bg-brand-tint p-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-brand"><Wallet className="h-4 w-4" />{workspace.credits} credits</div>
            <p className="mt-1 text-xs text-stone-500">{workspace.plan} · AI {workspace.aiOn ? "On" : "Off"}</p>
          </div>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-black/20 lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <main className="lg:pl-72"><div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">{children}</div></main>
    </div>
  );
}

export function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">{title}</h1>
        {desc ? <p className="mt-1 text-sm text-stone-500">{desc}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
}
