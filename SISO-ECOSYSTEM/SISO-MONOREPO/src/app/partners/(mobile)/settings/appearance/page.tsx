import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";

export default function SettingsAppearancePage() {
  return (
    <SettingsDetailLayout
      title="Appearance"
      description="Theme, typography, and density controls coming soon."
    >
      <p className="text-sm text-siso-text-muted">This is a stub so QA can reach the route. UI knobs will wire in once the design is approved.</p>
    </SettingsDetailLayout>
  );
}
