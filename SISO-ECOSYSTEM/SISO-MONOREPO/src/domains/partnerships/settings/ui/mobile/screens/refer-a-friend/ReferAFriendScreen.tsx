import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { Share2 } from "lucide-react";

export function ReferAFriendScreen() {
  return (
    <SettingsDetailLayout
      title="Refer a Friend"
      description="Share invite links and monitor referral bonuses."
      icon={<Share2 className="h-5 w-5 text-siso-orange" />}
    >
      <p>Referral tools will appear here.</p>
    </SettingsDetailLayout>
  );
}
