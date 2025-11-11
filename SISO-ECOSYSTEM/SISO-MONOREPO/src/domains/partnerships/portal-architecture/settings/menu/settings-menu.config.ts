import type { QuickActionId } from "@/domains/partnerships/mobile/types/navigation";
import { getPathForQuickAction } from "@/domains/partnerships/mobile/application/quick-action-routes";
import { ClipboardList, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { settingsRouteRegistry } from "../settings-route-registry";

export type SettingsMenuItem = {
  id: QuickActionId;
  label: string;
  icon: LucideIcon;
  path: string;
  meta?: string;
};

const registryMenuItems: SettingsMenuItem[] = settingsRouteRegistry
  .filter((route) => route.quickActionId && route.status === "live")
  .map((route) => ({
    id: route.quickActionId as QuickActionId,
    label: route.title,
    icon: route.icon,
    path: route.path,
    meta: route.menuMeta,
  }));

export const SETTINGS_MENU_ITEMS: SettingsMenuItem[] = [
  ...registryMenuItems,
  {
    id: "checklist",
    label: "Checklist",
    icon: ClipboardList,
    path: getPathForQuickAction("checklist"),
    meta: "6 tasks",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
    path: getPathForQuickAction("wallet"),
    meta: "£18k",
  },
];
