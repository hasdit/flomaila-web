export type ChatTurn = { role: "user" | "assistant" | "system"; content: string };
export type ProductHint = { sku: string; title: string; price: number; currency: string; stock: number };
export function localReply(userText: string, products: ProductHint[], taught: string[]) {
  const q = userText.toLowerCase();
  const hit = products.find((p) => `${p.title} ${p.sku}`.toLowerCase().includes(q) || q.includes(p.sku.toLowerCase()));
  if (hit) return `${hit.title} (${hit.sku}) is ${hit.currency} ${hit.price.toFixed(2)}. ${hit.stock} in stock.`;
  if (taught.length) return `From what you taught: ${taught.slice(-3).join(" · ")}`;
  return "I need more training or a catalog match. Teach the assistant, then add products.";
}
