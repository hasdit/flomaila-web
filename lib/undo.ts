type Snap = { key: string; value: string };
const stack: Snap[] = [];
export function snapshot(keys: string[]) {
  if (typeof window === "undefined") return;
  keys.forEach((key) => stack.push({ key, value: localStorage.getItem(key) || "" }));
  if (stack.length > 40) stack.splice(0, stack.length - 40);
}
export function undoLast() {
  const snap = stack.pop();
  if (!snap) return false;
  if (snap.value) localStorage.setItem(snap.key, snap.value);
  else localStorage.removeItem(snap.key);
  return true;
}
