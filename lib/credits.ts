export type CreditReason =
  | "grant"
  | "purchase"
  | "debit_live_reply"
  | "debit_test"
  | "debit_embed"
  | "debit_vision"
  | "hold"
  | "release"
  | "refund";

export type LedgerEntry = {
  id: string;
  at: string;
  reason: CreditReason;
  delta: number;
  balanceAfter: number;
  note: string;
  idempotencyKey: string;
};

export type Wallet = {
  balance: number;
  welcomeGranted: boolean;
  entries: LedgerEntry[];
};

const KEY = "flomaila.wallet.v1";
const WELCOME = 100;

const empty = (): Wallet => ({ balance: 0, welcomeGranted: false, entries: [] });

export function loadWallet(): Wallet {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedWelcome(empty());
    const parsed = JSON.parse(raw) as Wallet;
    if (!parsed.welcomeGranted) return seedWelcome(parsed);
    return parsed;
  } catch {
    return seedWelcome(empty());
  }
}

function persist(w: Wallet) {
  localStorage.setItem(KEY, JSON.stringify(w));
  return w;
}

function seedWelcome(w: Wallet): Wallet {
  return apply(w, {
    reason: "grant",
    delta: WELCOME,
    note: "Welcome grant",
    idempotencyKey: "welcome-v1",
  });
}

export function apply(
  w: Wallet,
  input: { reason: CreditReason; delta: number; note: string; idempotencyKey: string }
): Wallet {
  if (w.entries.some((e) => e.idempotencyKey === input.idempotencyKey)) return persist(w);
  if (input.delta < 0 && w.balance + input.delta < 0) {
    throw new Error("INSUFFICIENT_CREDITS");
  }
  const balanceAfter = w.balance + input.delta;
  const entry: LedgerEntry = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    reason: input.reason,
    delta: input.delta,
    balanceAfter,
    note: input.note,
    idempotencyKey: input.idempotencyKey,
  };
  return persist({
    balance: balanceAfter,
    welcomeGranted: w.welcomeGranted || input.reason === "grant",
    entries: [entry, ...w.entries],
  });
}

export function topUp(credits: number, rail: string) {
  return apply(loadWallet(), {
    reason: "purchase",
    delta: credits,
    note: `Top-up via ${rail} (simulated until payment webhooks)`,
    idempotencyKey: `purchase-${rail}-${Date.now()}`,
  });
}

export function debit(reason: Extract<CreditReason, `debit_${string}`>, amount: number, note: string) {
  return apply(loadWallet(), {
    reason,
    delta: -Math.abs(amount),
    note,
    idempotencyKey: `${reason}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  });
}

export const PACKS = [
  { credits: 100, label: "100" },
  { credits: 500, label: "500" },
  { credits: 2000, label: "2,000" },
] as const;

export const RAILS = ["Stripe", "PayPal", "SSLCOMMERZ", "bKash", "Nagad"] as const;
