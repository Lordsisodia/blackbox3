import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Languages } from "lucide-react";

export default function SettingsLanguagePage() {
  return (
    <SettingsDetailLayout
      title="Language"
      description="Language, timezone, and format preferences"
      icon={<Languages className="h-6 w-6 text-siso-orange" />}
    >
      <div className="text-sm text-siso-text-muted">Coming soon.</div>
    </SettingsDetailLayout>
  );
}
