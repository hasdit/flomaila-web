"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, PageHeader } from "@/components/app-shell";
import { PRODUCT_CSV_HEADER, mergeImported, parseProductCsv } from "@/lib/catalog";

export default function ImportProductsPage() {
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);
  function downloadTemplate() {
    const sample = `${PRODUCT_CSV_HEADER}\nTEE-BLK-M,Black tee,Cotton crew,Apparel,19.99,25,USD\n`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flomaila-products-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  async function onFile(file: File) {
    const text = await file.text();
    const { ok, errors } = parseProductCsv(text);
    if (ok.length) mergeImported(ok);
    setLog([`Imported ${ok.length} row(s). Same SKU updates the existing product.`, ...errors]);
    if (ok.length && !errors.length) router.push("/catalog");
  }
  return (
    <>
      <PageHeader title="Import products" desc="Product catalog CSV — not the Email contacts template." />
      <Card>
        <p className="text-sm text-stone-600">Required: <code className="font-mono text-xs">sku, title, price</code>. Optional: description, category, stock, currency.</p>
        <button type="button" onClick={downloadTemplate} className="mt-3 rounded-full border border-stone-200 px-4 py-2 text-sm">Download template</button>
        <input type="file" accept=".csv,text/csv" className="mt-4 block w-full text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) void onFile(f); }} />
        {log.length > 0 && <ul className="mt-4 space-y-1 text-sm text-stone-600">{log.map((l) => <li key={l}>{l}</li>)}</ul>}
      </Card>
    </>
  );
}
