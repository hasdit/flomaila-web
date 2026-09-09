import { matchFaq } from "./faq";
import { scanReply } from "./guardrails";
export function answerFirst(userText: string) {
  const faq = matchFaq(userText);
  if (faq) return { text: faq.a, source: "faq" as const };
  return null;
}
export function polish(text: string) {
  const g = scanReply(text);
  if (g.blocked) return "I cannot make that claim. A teammate will join.";
  if (g.handoff) return g.text + " — handing to a human.";
  return g.text;
}
