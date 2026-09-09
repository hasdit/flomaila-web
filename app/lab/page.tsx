"use client";
import { useEffect, useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { convert, holdPay, issueGift, joinWait, loadCols, loadGifts, loadHolds, loadInvoices, loadMoves, loadWait, makeInvoice, moveStock, redeemGift, saveCol, settleHold } from "@/lib/commerce2";
import { loadProducts } from "@/lib/catalog";
import { loadOrders, orderTotal } from "@/lib/orders";
import { defaultPrompt, loadEvals, loadPrompt, saveEval, savePrompt, scoreEval } from "@/lib/ai2";
import { localReply } from "@/lib/gateway";
import { addBounce, loadTpls, saveTpl, unsub } from "@/lib/email2";
import { addNps, addReview, grantPts, loadLoyalty, loadPartners, npsValue, savePartner } from "@/lib/growth2";
import { defaultOps, loadIncidents, loadOps, openIncident, saveOps } from "@/lib/ops2";
import { addCsat, avgCsat, bulkRead } from "@/lib/inbox2";
const TABS = ["commerce", "ai", "email", "growth", "ops"] as const;
export default function LabPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("commerce");
  const [log, setLog] = useState("");
  const [nps, setNps] = useState(0);
  const [csat, setCsat] = useState(0);
  useEffect(() => { setNps(npsValue()); setCsat(avgCsat()); }, []);
  return (<><PageHeader title="Build lab" desc="P0 capabilities on one bench." /><div className="mb-4 flex flex-wrap gap-2 text-xs">{TABS.map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-3 py-1 capitalize ${tab === t ? "bg-stone-900 text-white" : "bg-stone-100"}`}>{t}</button>)}</div>{log ? <p className="mb-3 text-sm text-stone-500">{log}</p> : null}
    {tab === "commerce" && <Card><button type="button" className="rounded-full bg-brand px-3 py-1 text-sm text-white" onClick={() => setLog(JSON.stringify(issueGift(25)))}>Gift</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const g = loadGifts()[0]; if (g) redeemGift(g.code, 5); setLog("redeem"); }}>Redeem</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { joinWait("wait@shop.com", "TEE-BLK-M"); setLog("wait " + loadWait().length); }}>Wait</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { saveCol({ id: "c1", name: "Featured", skus: loadProducts().slice(0, 3).map((p) => p.sku) }); setLog("cols " + loadCols().length); }}>Cols</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const p = loadProducts()[0]; if (p) moveStock(p.sku, -1, "lab"); setLog("moves " + loadMoves().length); }}>-1 stock</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const o = loadOrders()[0]; if (o) makeInvoice(o.id, orderTotal(o)); setLog("inv " + loadInvoices().length); }}>Invoice</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => setLog("FX " + convert(100, "BDT"))}>FX</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const o = loadOrders()[0]; if (o) holdPay(o.id, orderTotal(o)); setLog("holds " + loadHolds().length); }}>Hold</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const h = loadHolds()[0]; if (h) settleHold(h.id, "captured"); }}>Capture</button></Card>}
    {tab === "ai" && <Card><button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => { savePrompt({ ...defaultPrompt, ...loadPrompt(), temperature: 0.1 }); setLog("prompt"); }}>Temp 0.1</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { const c = { id: crypto.randomUUID(), q: "price of tee", expect: "stock" }; saveEval(c); scoreEval(c.id, localReply(c.q, loadProducts(), [])); setLog("evals " + loadEvals().length); }}>Eval</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { addCsat("lab", 5); setCsat(avgCsat()); }}>CSAT</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => bulkRead()}>Bulk read</button><p className="mt-2 text-sm">CSAT {csat}</p></Card>}
    {tab === "email" && <Card><button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => { saveTpl({ id: "t1", name: "Welcome", subject: "A", alt: "B", body: "Hi" }); setLog("tpls " + loadTpls().length); }}>Template</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => unsub("leave@shop.com")}>Unsub</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => addBounce("bad@shop.com")}>Bounce</button></Card>}
    {tab === "growth" && <Card><button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => { grantPts("maya@example.com", 20); setLog(JSON.stringify(loadLoyalty())); }}>Points</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { savePartner({ name: "Partner", code: "FLO", rate: 10 }); setLog(JSON.stringify(loadPartners())); }}>Affiliate</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { addNps(9); setNps(npsValue()); }}>NPS 9</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => addReview({ id: crypto.randomUUID(), author: "Maya", text: "Great tee", stars: 5 })}>Review</button><p className="mt-2 text-sm">NPS {nps}</p></Card>}
    {tab === "ops" && <Card><button type="button" className="rounded-full border px-3 py-1 text-sm" onClick={() => { saveOps({ ...defaultOps, ...loadOps(), maintenance: true }); setLog("maint on"); }}>Maint on</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { saveOps({ ...defaultOps, ...loadOps(), maintenance: false }); setLog("maint off"); }}>Off</button>
      <button type="button" className="ml-2 rounded-full border px-3 py-1 text-sm" onClick={() => { openIncident("Elevated latency"); setLog("inc " + loadIncidents().length); }}>Incident</button></Card>}
  </>);
}
