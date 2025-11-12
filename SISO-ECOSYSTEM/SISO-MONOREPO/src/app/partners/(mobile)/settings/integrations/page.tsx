import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Plug } from "lucide-react";

export default function SettingsIntegrationsPage() {
  return (
    <SettingsDetailLayout
      title="Integrations"
      description="Connect tools and services"
      icon={<Plug className="h-6 w-6 text-siso-orange" />}
    >
      <div className="text-sm text-siso-text-muted">Coming soon.</div>
    </SettingsDetailLayout>
  );
}
