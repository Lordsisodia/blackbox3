export type MobileTabId = "campus" | "learning" | "notifications" | "messages" | "quick-actions";

export type QuickActionId =
  | "settings"
  | "settings-account"
  | "settings-notifications"
  | "settings-profile"
  | "settings-devices"
  | "settings-membership"
  | "settings-affiliate"
  | "settings-refer"
  | "settings-feedback"
  | "settings-whats-new"
  | "checklist"
  | "wallet";

export interface NavigationState {
  activeTab: MobileTabId;
  previousTab: MobileTabId;
  isQuickActionsOpen: boolean;
  isDrawerOpen: boolean;
  activeQuickAction: QuickActionId | null;
  /** Used to hide bottom bar when true (e.g., message detail, profile modal). */
  isImmersiveMode: boolean;
}
