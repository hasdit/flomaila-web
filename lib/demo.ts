import { upsertProduct } from "./catalog";
import { mergeContacts } from "./email";
import { logEvent } from "./activity";
export function seedDemo() {
  upsertProduct({ sku: "TEE-BLK-M", title: "Black tee", description: "Cotton crew", category: "Apparel", price: 19.99, stock: 25, currency: "USD" });
  upsertProduct({ sku: "TOTE-01", title: "Canvas tote", description: "Everyday bag", category: "Accessories", price: 14, stock: 40, currency: "USD" });
  mergeContacts([
    { email: "maya@example.com", first_name: "Maya", last_name: "Chen", phone: "", country: "US", locale: "en", tags: "vip", source: "demo", custom_1: "", custom_2: "", custom_3: "" },
    { email: "omar@example.com", first_name: "Omar", last_name: "", phone: "", country: "DE", locale: "de", tags: "", source: "demo", custom_1: "", custom_2: "", custom_3: "" },
  ]);
  logEvent("demo", "Seeded products and contacts");
}
