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
  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-2xl font-semibold">Sign in to flomaila<span className="text-brand">.</span></h1>
      <p className="mt-1 text-sm text-stone-500">P0 local session — no password server yet.</p>
      <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
        <input name="name" placeholder="Name" className="rounded-xl border px-3 py-2" />
        <input name="email" type="email" required placeholder="you@brand.com" className="rounded-xl border px-3 py-2" />
        <button className="rounded-full bg-brand py-2 text-white" type="submit">Continue</button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
