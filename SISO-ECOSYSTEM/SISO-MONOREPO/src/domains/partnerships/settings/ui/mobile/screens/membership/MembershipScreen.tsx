import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { BadgeCheck } from "lucide-react";

export function MembershipScreen() {
  return (
    <SettingsDetailLayout
      title="My Membership"
      description="Review perks, tiers, and upgrade options."
      icon={<BadgeCheck className="h-5 w-5 text-siso-orange" />}
    >
      <p>Membership details panel coming soon.</p>
    </SettingsDetailLayout>
  );
}
