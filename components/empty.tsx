export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (<div className="rounded-2xl border border-dashed bg-white px-6 py-14 text-center"><p className="text-sm font-medium">{title}</p>{hint ? <p className="mt-1 text-sm text-stone-500">{hint}</p> : null}</div>);
}
