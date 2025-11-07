import type { QuickActionId } from "@/domains/partnerships/mobile/types/navigation";
import { getPathForQuickAction } from "@/domains/partnerships/mobile/application/quick-action-routes";
import {
  Bell,
  UserRound,
  Link2,
  BadgeCheck,
  BarChart3,
  Share2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SettingsMenuItem = {
  id: QuickActionId;
  label: string;
  icon: LucideIcon;
  path: string;
  meta?: string;
};

export const SETTINGS_MENU_ITEMS: SettingsMenuItem[] = [
  {
    id: "settings-account",
    label: "My Account Notifications",
    icon: Bell,
    path: getPathForQuickAction("settings-account"),
    meta: "2 new",
  },
  {
    id: "settings-profile",
    label: "Profile",
    icon: UserRound,
    path: getPathForQuickAction("settings-profile"),
    meta: "Updated",
  },
  {
    id: "settings-devices",
    label: "Connected Devices",
    icon: Link2,
    path: getPathForQuickAction("settings-devices"),
    meta: "5 linked",
  },
  {
    id: "settings-membership",
    label: "My Membership",
    icon: BadgeCheck,
    path: getPathForQuickAction("settings-membership"),
    meta: "Tier 3",
  },
  {
    id: "settings-affiliate",
    label: "Affiliate Dashboard",
    icon: BarChart3,
    path: getPathForQuickAction("settings-affiliate"),
    meta: "Live",
  },
  {
    id: "settings-refer",
    label: "Refer a Friend",
    icon: Share2,
    path: getPathForQuickAction("settings-refer"),
    meta: "Earn",
  },
  {
    id: "settings-feedback",
    label: "Provide Feedback",
    icon: MessageSquare,
    path: getPathForQuickAction("settings-feedback"),
    meta: "New form",
  },
  {
    id: "settings-whats-new",
    label: "What’s New",
    icon: Sparkles,
    path: getPathForQuickAction("settings-whats-new"),
    meta: "v3.2",
  },
];
