import { readJson, writeJson } from "./store";
export type Row = { id: string; title: string; note?: string; at: string };
function bag(key: string) {
  const k = "flomaila.s50." + key;
  return {
    load: (): Row[] => readJson(k, []),
    add: (title: string, note = "") => {
      const row: Row = { id: crypto.randomUUID().slice(0, 8), title, note, at: new Date().toISOString() };
      const all = [row, ...readJson<Row[]>(k, [])];
      writeJson(k, all);
      return all;
    },
    remove: (id: string) => {
      const all = readJson<Row[]>(k, []).filter((r) => r.id !== id);
      writeJson(k, all);
      return all;
    },
  };
}
export const SLICES: { slug: string; label: string }[] = [
  { slug: "reviews", label: "Product reviews" }, { slug: "waitlist", label: "Waitlist" }, { slug: "referrals2", label: "Referral payouts" },
  { slug: "inv-ledger", label: "Inventory ledger" }, { slug: "pricelists", label: "Price lists" }, { slug: "variants", label: "Variants" },
  { slug: "bundles", label: "Bundles" }, { slug: "preorders", label: "Preorders" }, { slug: "crm-notes", label: "CRM notes" },
  { slug: "macro-groups", label: "Macro groups" }, { slug: "hours-x", label: "Hours exceptions" }, { slug: "holidays", label: "Holidays" },
  { slug: "i18n", label: "Translations" }, { slug: "locales", label: "Locales" }, { slug: "tax-ids", label: "Tax IDs" },
  { slug: "invoices", label: "Invoices" }, { slug: "quotes", label: "Saved quotes" }, { slug: "slips", label: "Packing slips" },
  { slug: "picks", label: "Pick lists" }, { slug: "warehouses", label: "Warehouses" }, { slug: "transfers", label: "Stock transfers" },
  { slug: "suppliers", label: "Suppliers" }, { slug: "pos", label: "Purchase orders" }, { slug: "serials", label: "Serials" },
  { slug: "warranties", label: "Warranties" }, { slug: "subs", label: "Subscriptions" }, { slug: "trials", label: "Trials" },
  { slug: "hook-log", label: "Webhook log" }, { slug: "key-rotate", label: "Key rotation" }, { slug: "domains", label: "Custom domains" },
  { slug: "fields", label: "Custom fields" }, { slug: "tags", label: "Tag manager" }, { slug: "views", label: "Saved views" },
  { slug: "notify", label: "Notify prefs" }, { slug: "quiet", label: "Quiet hours" }, { slug: "assign", label: "Auto-assign" },
  { slug: "routing", label: "Inbox routing" }, { slug: "csat", label: "CSAT" }, { slug: "frt", label: "First response" },
  { slug: "gaps", label: "Knowledge gaps" }, { slug: "intents-miss", label: "Unhandled intents" }, { slug: "pqa", label: "Product Q&A" },
  { slug: "sizeguide", label: "Size guide" }, { slug: "storefront", label: "Storefront preview" }, { slug: "tokens", label: "Theme tokens" },
  { slug: "email-tpl", label: "Email templates" }, { slug: "sms", label: "SMS drafts" }, { slug: "push", label: "Push drafts" },
  { slug: "requests", label: "Feature requests" }, { slug: "roadmap", label: "Roadmap" },
];
export function sliceOf(slug: string) { return bag(slug); }
