import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { UserRound } from "lucide-react";

export function ProfileSettingsScreen() {
  return (
    <SettingsDetailLayout
      title="Profile"
      description="Update your partner identity and avatar."
      icon={<UserRound className="h-5 w-5 text-siso-orange" />}
    >
      <p>Profile controls will be implemented here.</p>
    </SettingsDetailLayout>
  );
}
