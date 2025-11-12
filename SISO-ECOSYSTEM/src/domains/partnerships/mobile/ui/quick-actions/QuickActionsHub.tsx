import { IdCard, Bell, UserRound, MonitorSmartphone, Users, Trophy, Share2, MessageCircle, Megaphone, ClipboardList, Wallet } from "lucide-react";

import { useMobileNavigation } from "../../application/navigation-store";
import type { QuickActionId } from "../../types/navigation";

const SECTIONS: { title: string; actions: { id: QuickActionId; label: string; helper: string; icon: React.ComponentType<{ className?: string }> }[] }[] = [
  {
    title: "Settings",
    actions: [
      { id: "settings-account", label: "My Account", helper: "Identity & credentials", icon: IdCard },
      { id: "settings-notifications", label: "Notifications", helper: "Pings & sounds", icon: Bell },
      { id: "settings-profile", label: "Profile", helper: "Avatar & bio", icon: UserRound },
      { id: "settings-devices", label: "Devices", helper: "Connected hardware", icon: MonitorSmartphone },
      { id: "settings-membership", label: "Membership", helper: "Tiers & perks", icon: Trophy },
      { id: "settings-affiliate", label: "Affiliate", helper: "Partner dashboard", icon: Users },
      { id: "settings-refer", label: "Refer a friend", helper: "Invite partners", icon: Share2 },
      { id: "settings-feedback", label: "Feedback", helper: "Tell us what to build", icon: MessageCircle },
      { id: "settings-whats-new", label: "What's new", helper: "Recent drops", icon: Megaphone },
    ],
  },
  {
    title: "Ops",
    actions: [
      { id: "checklist", label: "Checklist", helper: "Stay on track", icon: ClipboardList },
      { id: "wallet", label: "Wallet", helper: "Balances & payouts", icon: Wallet },
    ],
  },
];

export function QuickActionsHub() {
  const { selectQuickAction } = useMobileNavigation();

  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">{section.title}</p>
          <div className="grid gap-3">
            {section.actions.map(({ id, label, helper, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectQuickAction(id)}
                className="flex items-center gap-3 rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/70 px-4 py-3 text-left transition hover:border-siso-orange/70 hover:text-siso-text-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <p className="text-sm font-semibold text-siso-text-primary">{label}</p>
                  <p className="text-xs text-siso-text-muted">{helper}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
