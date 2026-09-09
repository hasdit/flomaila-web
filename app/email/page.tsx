import { Card, PageHeader } from "@/components/app-shell";

export default function EmailPage() {
  return (
    <>
      <PageHeader title="Email Studio" desc="Separate world: providers, audiences, workflows, campaigns." />
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["Providers", "Add a Brevo (or later SendGrid/SES) key"],
          ["Audiences", "CSV import — email, name, phone, country, locale, tags, source, custom_1-3"],
          ["Templates", "Blocks + tokens"],
          ["Workflows", "Canvas · auto-send master switch"],
          ["Campaigns", "One-shot + quiet hours"],
          ["Compliance", "Unsub, bounce, GDPR export"],
        ].map(([t, d]) => (
          <Card key={t}>
            <p className="font-medium">{t}</p>
            <p className="mt-1 text-sm text-stone-500">{d}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
