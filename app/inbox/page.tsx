import { Card, PageHeader } from "@/components/app-shell";

const tabs = ["Messages", "Orders", "Unreplied", "Tickets", "Comments"];
const channels = ["All", "Facebook", "Instagram", "WhatsApp", "Web"];

export default function InboxPage() {
  return (
    <>
      <PageHeader title="Inbox" desc="One thread per customer across official channels." />
      <div className="mb-3 flex gap-4 overflow-x-auto text-sm">
        {tabs.map((t, i) => (
          <span key={t} className={i === 0 ? "font-medium text-brand" : "text-stone-500"}>{t}</span>
        ))}
      </div>
      <div className="mb-4 flex gap-2 text-xs">
        {channels.map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"}`}>{c}</span>
        ))}
      </div>
      <Card className="py-20 text-center text-sm text-stone-500">
        No chats yet. Connect a channel under Connect, or try the web widget after Teach.
      </Card>
    </>
  );
}
