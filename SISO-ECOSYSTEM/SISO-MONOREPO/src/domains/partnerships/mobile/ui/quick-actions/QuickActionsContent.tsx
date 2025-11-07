import { SettingsPanel } from "@/domains/partnerships/settings/ui/mobile";
import { ChecklistPanel } from "@/domains/partnerships/checklist/ui/mobile";
import { ProfilePanel } from "@/domains/partnerships/profile/ui/mobile";
import { WalletPanel } from "@/domains/partnerships/wallet/ui/mobile";
import { useMobileNavigation } from "../../application/navigation-store";

export function QuickActionsContent() {
  const { activeQuickAction } = useMobileNavigation();

  switch (activeQuickAction) {
    case "settings":
      return <SettingsPanel />;
    case "profile":
      return <ProfilePanel />;
    case "checklist":
      return <ChecklistPanel />;
    case "wallet":
      return <WalletPanel />;
    default:
      return null;
  }
}
