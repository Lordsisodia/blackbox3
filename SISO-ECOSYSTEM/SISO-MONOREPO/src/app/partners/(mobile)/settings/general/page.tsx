import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";

export default function SettingsGeneralPage() {
  return (
    <SettingsDetailLayout
      title="General Settings"
      description="Workspace defaults, region, and integrations will live here."
    >
      <div className="space-y-3 text-sm text-siso-text-muted">
        <p>Thanks for checking—this page is a placeholder so routing works end-to-end.</p>
        <p>Language & Region controls and integrations management will consolidate inside this surface once designs are final.</p>
      </div>
    </SettingsDetailLayout>
  );
}
