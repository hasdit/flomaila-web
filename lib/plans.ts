export const PLANS = [
  { id: "free", name: "Free", price: 0, credits: 100, seats: 1 },
  { id: "starter", name: "Starter", price: 29, credits: 2000, seats: 3 },
  { id: "growth", name: "Growth", price: 99, credits: 10000, seats: 10 },
  { id: "scale", name: "Scale", price: 299, credits: 50000, seats: 50 },
] as const;
