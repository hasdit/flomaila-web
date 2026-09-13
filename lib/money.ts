export function cents(n: number) { return Math.round(n * 100); }
export function fromCents(n: number) { return n / 100; }
export function money(n: number, currency = "USD") { return new Intl.NumberFormat("en", { style: "currency", currency }).format(n); }
