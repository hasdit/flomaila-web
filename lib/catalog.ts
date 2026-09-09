export const PRODUCT_CSV_HEADER = "sku,title,description,category,price,stock,currency";
export type Product = { id: string; sku: string; title: string; description: string; category: string; price: number; stock: number; currency: string; createdAt: string };
const KEY = "flomaila.products.v1";
export function loadProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
export function saveProducts(items: Product[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
export function upsertProduct(input: Omit<Product, "id" | "createdAt"> & { id?: string }) {
  const items = loadProducts();
  const sku = input.sku.trim();
  const existing = items.find((p) => p.sku.toLowerCase() === sku.toLowerCase() || (input.id && p.id === input.id));
  const next: Product = {
    id: existing?.id ?? crypto.randomUUID(), sku,
    title: input.title.trim(), description: input.description.trim(), category: input.category.trim(),
    price: Number(input.price) || 0, stock: Number(input.stock) || 0,
    currency: (input.currency || "USD").trim().toUpperCase(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  saveProducts([next, ...items.filter((p) => p.id !== next.id)]);
  return next;
}
export function deleteProduct(id: string) { saveProducts(loadProducts().filter((p) => p.id !== id)); }
export function parseProductCsv(text: string): { ok: Product[]; errors: string[] } {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((l) => l.trim());
  const errors: string[] = []; const ok: Product[] = [];
  if (!lines.length) return { ok, errors: ["Empty file"] };
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  for (const r of ["sku", "title", "price"]) if (!header.includes(r)) errors.push(`Missing column: ${r}`);
  if (errors.length) return { ok, errors };
  const idx = (n: string) => header.indexOf(n);
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const sku = (cols[idx("sku")] ?? "").trim();
    const title = (cols[idx("title")] ?? "").trim();
    const price = Number(cols[idx("price")] ?? "");
    if (!sku || !title || Number.isNaN(price)) { errors.push(`Row ${i + 1} invalid`); continue; }
    ok.push({ id: crypto.randomUUID(), sku, title, description: (cols[idx("description")] ?? "").trim(), category: (cols[idx("category")] ?? "").trim(), price, stock: Number(cols[idx("stock")] ?? 0) || 0, currency: ((cols[idx("currency")] ?? "USD").trim() || "USD").toUpperCase(), createdAt: new Date().toISOString() });
  }
  return { ok, errors };
}
export function mergeImported(incoming: Product[]) {
  const current = loadProducts();
  const bySku = new Map(current.map((p) => [p.sku.toLowerCase(), p]));
  for (const p of incoming) {
    const prev = bySku.get(p.sku.toLowerCase());
    bySku.set(p.sku.toLowerCase(), prev ? { ...p, id: prev.id, createdAt: prev.createdAt } : p);
  }
  const all = Array.from(bySku.values()); saveProducts(all); return all.length;
}
export function duplicateProduct(id: string) {
  const src = loadProducts().find((p) => p.id === id);
  if (!src) return null;
  return upsertProduct({ sku: src.sku + "-COPY", title: src.title + " copy", description: src.description, category: src.category, price: src.price, stock: src.stock, currency: src.currency });
}
export function productsToCsv() {
  const rows = [PRODUCT_CSV_HEADER];
  for (const p of loadProducts()) rows.push([p.sku, p.title, p.description, p.category, String(p.price), String(p.stock), p.currency].join(","));
  return rows.join("\n");
}
