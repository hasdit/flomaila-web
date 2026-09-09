"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
export default function StatusPage() {
  const [health, setHealth] = useState("checking");
  const [version, setVersion] = useState("");
  useEffect(() => {
    fetch("/api/health").then((r) => r.json()).then((j) => setHealth(j.ok ? "ok" : "down")).catch(() => setHealth("down"));
    fetch("/api/version").then((r) => r.json()).then((j) => setVersion(j.version + " " + j.phase)).catch(() => setVersion("unknown"));
  }, []);
  return (<><PageHeader title="Status" desc="Local app health." /><Card><p className="text-sm">Health: {health}</p><p className="mt-2 text-sm">Version: {version}</p></Card></>);
}
