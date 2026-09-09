import { Card, PageHeader } from "@/components/app-shell";
import { kpis } from "@/lib/mock";

export default function InsightsPage() {
  return (
    <>
      <PageHeader title="Insights" desc="Chat, sales, credits, email — P0 lite." />
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-stone-500">Messages 7d</p>
          <p className="text-3xl font-semibold">{kpis.messages7d}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-500">AI replies 7d</p>
          <p className="text-3xl font-semibold">{kpis.aiReplies7d}</p>
        </Card>
      </div>
    </>
  );
}
