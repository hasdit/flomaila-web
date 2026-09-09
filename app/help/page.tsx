import { Card, PageHeader } from "@/components/app-shell";

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help" desc="Guides and tickets for your Flomaila workspace." />
      <Card>
        <p className="text-sm text-stone-600">
          P0 ships empty tickets. Docs live in /docs of the program folder.
        </p>
      </Card>
    </>
  );
}
