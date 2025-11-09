import Plan from "@/components/ui/agent-plan";
import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { ClipboardList } from "lucide-react";

export function ChecklistPanel() {
  return (
    <SettingsDetailLayout
      title="Partner Checklist"
      description="Track onboarding, payout readiness, and enablement tasks powered by the new agent plan view."
      icon={<ClipboardList className="h-6 w-6 text-siso-orange" />}
      wrapContent={false}
    >
      <div className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-2">
        <Plan />
      </div>
    </SettingsDetailLayout>
  );
}
