import { Card, PageHeader } from "@/components/app-shell";
export default function ParcelsPage() {
  return (
    <>
      <PageHeader title="Parcels" desc="Generic courier connectors — not a single-country preset." />
      <Card className="text-sm text-stone-600">Add a courier with your own API keys under Connect.</Card>
    </>
  );
}
