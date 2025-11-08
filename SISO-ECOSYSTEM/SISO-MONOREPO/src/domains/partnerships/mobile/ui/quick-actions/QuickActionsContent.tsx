import { SettingsPanel } from "@/domains/partnerships/settings/ui/mobile/menu/SettingsPanel";
import { AccountSettingsScreen } from "@/domains/partnerships/settings/ui/mobile/screens/account/AccountSettingsScreen";
import { AccountNotificationsScreen } from "@/domains/partnerships/settings/ui/mobile/screens/account-notifications/AccountNotificationsScreen";
import { ProfileSettingsScreen } from "@/domains/partnerships/settings/ui/mobile/screens/profile/ProfileSettingsScreen";
import { ConnectedDevicesScreen } from "@/domains/partnerships/settings/ui/mobile/screens/connected-devices/ConnectedDevicesScreen";
import { TierListScreen } from "@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen";
import { AffiliateDashboardScreen } from "@/domains/partnerships/settings/ui/mobile/screens/affiliate-dashboard/AffiliateDashboardScreen";
import { ReferAFriendScreen } from "@/domains/partnerships/settings/ui/mobile/screens/refer-a-friend/ReferAFriendScreen";
import { ProvideFeedbackScreen } from "@/domains/partnerships/settings/ui/mobile/screens/provide-feedback/ProvideFeedbackScreen";
import { WhatsNewScreen } from "@/domains/partnerships/settings/ui/mobile/screens/whats-new/WhatsNewScreen";
import { ChecklistPanel } from "@/domains/partnerships/checklist/ui/mobile";
import { WalletPanel } from "@/domains/partnerships/wallet/ui/mobile";
import { useMobileNavigation } from "../../application/navigation-store";

export function QuickActionsContent() {
  const { activeQuickAction } = useMobileNavigation();

  switch (activeQuickAction) {
    case "settings":
      return <SettingsPanel />;
    case "settings-account":
      return <AccountSettingsScreen />;
    case "settings-notifications":
      return <AccountNotificationsScreen />;
    case "settings-profile":
      return <ProfileSettingsScreen />;
    case "settings-devices":
      return <ConnectedDevicesScreen />;
    case "settings-membership":
      return <TierListScreen />;
    case "settings-affiliate":
      return <AffiliateDashboardScreen />;
    case "settings-refer":
      return <ReferAFriendScreen />;
    case "settings-feedback":
      return <ProvideFeedbackScreen />;
    case "settings-whats-new":
      return <WhatsNewScreen />;
    case "checklist":
      return <ChecklistPanel />;
    case "wallet":
      return <WalletPanel />;
    default:
      return null;
  }
}
