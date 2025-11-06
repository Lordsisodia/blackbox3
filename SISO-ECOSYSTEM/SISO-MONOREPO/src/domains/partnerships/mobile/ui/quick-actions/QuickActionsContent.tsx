import { SettingsPanel } from "@/domains/partnerships/workspace/ui/mobile";
import { ChecklistPanel } from "@/domains/partnerships/activation/ui/mobile";
import { ProfilePanel } from "@/domains/partnerships/growth-hub/ui/mobile";
import { WalletPanel } from "@/domains/partnerships/revenue/ui/mobile";
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
