"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (<div className="p-10 text-center"><p className="text-lg font-semibold">Something broke</p><button type="button" className="mt-4 rounded-full bg-[#C2410C] px-4 py-2 text-sm text-white" onClick={reset}>Retry</button></div>);
}
