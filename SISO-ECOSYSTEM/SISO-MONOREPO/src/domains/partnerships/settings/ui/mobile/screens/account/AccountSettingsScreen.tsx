import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { IdCard } from "lucide-react";

export function AccountSettingsScreen() {
  return (
    <SettingsDetailLayout
      title="My Account"
      description="Manage your partner identity, password, and workspace preferences."
      icon={<IdCard className="h-5 w-5 text-siso-orange" />}
    >
      <p>Account overview controls will land here.</p>
    </SettingsDetailLayout>
  );
}
