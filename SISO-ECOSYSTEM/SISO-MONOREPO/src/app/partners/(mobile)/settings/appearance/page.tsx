import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Palette } from "lucide-react";

export default function SettingsAppearancePage() {
  return (
    <SettingsDetailLayout
      title="Appearance"
      description="Theme, typography, and density controls coming soon."
      icon={<Palette className="h-6 w-6 text-siso-orange" />}
    >
      <p className="text-sm text-siso-text-muted">This is a stub so QA can reach the route. UI knobs will wire in once the design is approved.</p>
    </SettingsDetailLayout>
  );
}
