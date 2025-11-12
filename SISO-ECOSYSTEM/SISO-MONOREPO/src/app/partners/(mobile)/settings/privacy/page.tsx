import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Shield } from "lucide-react";

export default function SettingsPrivacyPage() {
  return (
    <SettingsDetailLayout
      title="Privacy"
      description="Export data, manage consent, and handle delete requests."
      icon={<Shield className="h-6 w-6 text-siso-orange" />}
    >
      <p className="text-sm text-siso-text-muted">Placeholder content—hook your privacy flows here when ready.</p>
    </SettingsDetailLayout>
  );
}
