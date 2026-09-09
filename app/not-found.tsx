import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-sm uppercase text-stone-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not in Flomaila</h1>
      <Link href="/" className="mt-4 inline-flex rounded-full bg-brand px-4 py-2 text-sm text-white">Home</Link>
    </div>
  );
}
