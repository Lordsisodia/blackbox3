import type { QuickActionId } from "../types/navigation";

export const QUICK_ACTION_DEFAULT_PATH = "/partners/settings";

export const QUICK_ACTION_PATHS: Record<QuickActionId, string> = {
  settings: "/partners/settings",
  "settings-account": "/partners/settings/account",
  "settings-notifications": "/partners/settings/account/notifications",
  "settings-profile": "/partners/settings/profile",
  "settings-devices": "/partners/settings/connected-devices",
  "settings-membership": "/partners/settings/membership",
  "settings-affiliate": "/partners/settings/affiliate-dashboard",
  "settings-refer": "/partners/settings/refer-a-friend",
  "settings-feedback": "/partners/settings/provide-feedback",
  "settings-whats-new": "/partners/settings/whats-new",
  checklist: "/partners/checklist",
  wallet: "/partners/wallet",
  "submit-client": "/partner/submit-client",
  "messages-new": "/partner/community/messages/new",
};

export const QUICK_ACTION_PATH_LOOKUP: Record<string, QuickActionId> = {
  [QUICK_ACTION_DEFAULT_PATH]: "settings",
  "/partners/quick": "settings",
  ...Object.entries(QUICK_ACTION_PATHS).reduce<Record<string, QuickActionId>>((acc, [action, path]) => {
    acc[path] = action as QuickActionId;
    return acc;
  }, {}),
};

export const getPathForQuickAction = (action: QuickActionId) =>
  QUICK_ACTION_PATHS[action] ?? QUICK_ACTION_DEFAULT_PATH;
