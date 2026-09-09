import { Card, PageHeader } from "@/components/app-shell";
export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" desc="Profile, security, AI behavior, notifications." />
      <Card>
        <p className="font-medium">Team roles</p>
        <p className="mt-1 text-sm text-stone-500">owner · admin · agent · analyst · email_marketer</p>
      </Card>
    </>
  );
}
