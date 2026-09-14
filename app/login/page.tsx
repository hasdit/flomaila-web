"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    if (!email.includes("@")) { setError("Use a valid email"); return; }
    login(email, String(data.get("name") || ""));
    router.push("/");
  }
  return (<div className="flex min-h-screen items-center justify-center bg-stone-50 px-4"><div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm"><p className="text-2xl font-semibold tracking-tight">flomaila<span className="text-brand">.</span></p><p className="mt-2 text-sm text-stone-500">Train one AI on your store. Local session until Auth.js keys.</p><form className="mt-6 grid gap-3" onSubmit={onSubmit}><input name="name" placeholder="Name" className="rounded-xl border px-3 py-2" /><input name="email" type="email" required placeholder="you@brand.com" className="rounded-xl border px-3 py-2" /><button className="rounded-full bg-brand py-2.5 text-white" type="submit">Continue</button>{error ? <p className="text-sm text-red-600">{error}</p> : null}</form></div></div>);
}
