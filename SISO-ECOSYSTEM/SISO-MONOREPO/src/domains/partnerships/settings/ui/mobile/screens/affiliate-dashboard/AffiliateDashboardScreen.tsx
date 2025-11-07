import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { BarChart3 } from "lucide-react";

export function AffiliateDashboardScreen() {
  return (
    <SettingsDetailLayout
      title="Affiliate Dashboard"
      description="Snapshots of performance, payouts, and partner tasks."
      icon={<BarChart3 className="h-5 w-5 text-siso-orange" />}
    >
      <p>Affiliate dashboard settings coming soon.</p>
    </SettingsDetailLayout>
  );
}
