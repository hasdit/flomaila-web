"use client";
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (<html><body><p>Flomaila crashed.</p><button type="button" onClick={reset}>Retry</button></body></html>);
}
