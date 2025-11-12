import { SettingsPanel } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsPanel";
import { AccountSettingsView } from "@/domains/partnerships/portal-architecture/settings/account/ui/AccountSettingsView";
import { AccountNotificationsView } from "@/domains/partnerships/portal-architecture/settings/general/sections/notifications/ui/AccountNotificationsView";
import { ProfileSettingsView } from "@/domains/partnerships/portal-architecture/settings/profile/ui/ProfileSettingsView";
import { ConnectedDevicesView } from "@/domains/partnerships/portal-architecture/settings/devices/ui/ConnectedDevicesView";
import { TierListScreen } from "@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen";
import { AffiliateDashboardView } from "@/domains/partnerships/portal-architecture/recruitment/invite-partners/ui/AffiliateDashboardView";
import { InvitePartnersScreen } from "@/domains/partnerships/portal-architecture/recruitment/invite-partners/ui/InvitePartnersScreen";
import { ProvideFeedbackView } from "@/domains/partnerships/portal-architecture/partnership-hub/support/ui/ProvideFeedbackView";
import { WhatsNewView } from "@/domains/partnerships/portal-architecture/community/announcements/ui/WhatsNewView";
import { ChecklistPanel } from "@/domains/partnerships/checklist/ui/mobile";
import { WalletPanel } from "@/domains/partnerships/wallet/ui/mobile";
import { useMobileNavigation } from "../../application/navigation-store";
import { GeneralSettingsScreen } from "@/domains/partnerships/portal-architecture/settings/general/ui/GeneralSettingsScreen";

export function QuickActionsContent() {
  const { activeQuickAction } = useMobileNavigation();

  switch (activeQuickAction) {
    case "settings":
      return <SettingsPanel />;
    case "settings-account":
      return <AccountSettingsView />;
    case "settings-notifications":
      return <AccountNotificationsView />;
    case "settings-profile":
      return <ProfileSettingsView />;
    case "settings-general":
      return <GeneralSettingsScreen />;
    case "settings-devices":
      return <ConnectedDevicesView />;
    case "settings-membership":
      return <TierListScreen />;
    case "settings-affiliate":
      return <AffiliateDashboardView />;
    case "settings-refer":
      return <InvitePartnersScreen />;
    case "settings-feedback":
      return <ProvideFeedbackView />;
    case "settings-whats-new":
      return <WhatsNewView />;
    case "checklist":
      return <ChecklistPanel />;
    case "wallet":
      return <WalletPanel />;
    default:
      return null;
  }
}
