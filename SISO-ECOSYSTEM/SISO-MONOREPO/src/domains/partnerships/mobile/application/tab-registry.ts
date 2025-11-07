import type { MobileTabId, QuickActionId } from "../types/navigation";

export interface MobileTabMeta {
  id: MobileTabId;
  label: string;
  icon: string; // placeholder for icon name
  supportsImmersive: boolean;
}

export const mobileTabs: MobileTabMeta[] = [
  { id: "campus", label: "Campus", icon: "sidebar", supportsImmersive: true },
  { id: "learning", label: "Learning", icon: "play", supportsImmersive: false },
  { id: "notifications", label: "Inbox", icon: "inbox", supportsImmersive: false },
  { id: "messages", label: "Messages", icon: "users", supportsImmersive: true },
  { id: "quick-actions", label: "Quick", icon: "dots", supportsImmersive: false },
];

export const quickActionEntries: Array<{ id: QuickActionId; label: string; description: string; icon: string }> = [
  { id: "settings", label: "Settings", description: "Notifications, devices, feedback", icon: "settings" },
  { id: "checklist", label: "Checklist", description: "Automation tasks and onboarding", icon: "check" },
  { id: "wallet", label: "Wallet", description: "Payouts and balances", icon: "wallet" },
];
