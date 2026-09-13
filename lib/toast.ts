export function toast(msg: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("flomaila-toast", { detail: msg }));
}
