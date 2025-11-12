# Settings Portal Architecture Groundwork

_Last updated: November 11, 2025_

## 1. Current Assets Inventory

| Route / Surface | File | Status | Notes |
| --- | --- | --- | --- |
| `/partners/settings` (menu) | `src/domains/partnerships/settings/ui/mobile/menu/SettingsPanel.tsx` | ✅ Exists | Lists quick actions via `SETTINGS_MENU_ITEMS`; uses legacy layout. |
| `/partners/settings/account` | `.../screens/account/AccountSettingsScreen.tsx` | ✅ Exists | Includes account info + 2FA highlights; still owns layout + mock data. |
| `/partners/settings/account/notifications` | `.../screens/account-notifications/AccountNotificationsScreen.tsx` | ✅ Exists | Basic notification toggles; needs new shell. |
| `/partners/settings/profile` | `.../screens/profile/ProfileSettingsScreen.tsx` | ✅ Exists | Profile form mock. |
| `/partners/settings/connected-devices` | `.../screens/connected-devices/ConnectedDevicesScreen.tsx` | ✅ Exists | Device cards + revoke action. |
| `/partners/settings/membership` | `.../screens/membership/MembershipScreen.tsx` | ✅ Exists | Tier overview. |
| `/partners/settings/affiliate-dashboard` | `.../screens/affiliate-dashboard/AffiliateDashboardScreen.tsx` | ✅ Exists | Metrics stub. |
| `/partners/settings/refer-a-friend` | `.../screens/refer-a-friend/ReferAFriendScreen.tsx` | ✅ Exists | Referral CTA. |
| `/partners/settings/provide-feedback` | `.../screens/provide-feedback/ProvideFeedbackScreen.tsx` | ✅ Exists | Feedback form shell. |
| `/partners/settings/whats-new` | `.../screens/whats-new/WhatsNewScreen.tsx` | ✅ Exists | Release notes stub. |
| `/partners/settings/devices` | Alias of connected devices | ⚠️ Duplicate | Campus sidebar expects `/devices`; need redirect or alias. |
| `/partners/settings/general`, `/appearance`, `/language`, `/integrations`, `/security`, `/privacy`, `/legal`, `/team` | _Not implemented_ | ❌ Missing | Listed in Campus sidebar config but no screens. |
| `/partners/checklist`, `/partners/wallet` | Lives outside settings | ⚠️ External | Need confirm if Settings shell should link or embed. |

## 2. Target Architecture (Portal-Compatible)

1. **Settings Shell Layout**
   - Location: `apps/partners/(app router)/partners/settings/[slug]/page.tsx` (or equivalent route) should render a shared `SettingsShell` component (new directory: `src/portal-architecture/settings/ui/` to align with portal architecture).
   - Shell props: `title`, `description`, `actions`, `children`, `meta` (tier, comingSoon). Shell handles header, safe-area padding, breadcrumbs, and consistent card spacing.

2. **Route Registry**
   - Create `src/portal-architecture/settings/settings-route-registry.ts` exporting an array of `SettingsRoute` objects:
     ```ts
     export interface SettingsRoute {
       slug: string;            // e.g., "account"
       path: string;            // "/partners/settings/account"
       title: string;
       description?: string;
       icon: IconType;          // for nav + quick actions
       component: () => Promise<{ default: SettingsView }>;
       tier?: "starter" | "active" | ...;
       featureFlag?: string;
       status: "live" | "planned" | "deprecated";
     }
     ```
   - This registry becomes source of truth for:
     - Quick action routing (`getPathForQuickAction` reads from registry).
     - Campus sidebar `settings` sections (generate lists + lock states automatically).
     - Settings menu grid (render from registry instead of hard-coded `SETTINGS_MENU_ITEMS`).

3. **Module Placement**
   - Move existing screens into `src/portal-architecture/settings/views/<slug>/` but re-export through `src/domains/partnerships/settings/ui/mobile/screens` for backwards compatibility during migration.
   - Shared hooks/services live under `src/portal-architecture/settings/application/` (e.g., `useNotificationPreferences`). This keeps domain logic inside portal architecture package.

4. **Navigation Alignment**
   - Update Campus sidebar config to consume the registry (no duplication).
   - Quick actions map registry IDs (rename to `SettingsRoute.id`).
   - Settings menu uses grouped view (Basics, Account, Privacy, Integrations) derived from registry metadata.

## 3. Migration Steps

1. **Author the Registry + Shell**
   - Create `settings-route-registry.ts` with current screens marked `status: "live"` and missing ones as `"planned"` (with `component: null`).
   - Build `SettingsShell.tsx` in portal architecture folder; wrap `SettingsDetailLayout` or replace it.
   - Ensure current screens simply export their inner content and register in the registry; shell handles layout.

2. **Routing Layer**
   - Add Next.js dynamic route (`app/partners/settings/[slug]/page.tsx`) that:
     - looks up slug in registry,
     - lazy-loads the component (`route.component()`),
     - renders inside `SettingsShell` with metadata.
   - Provide fallback for missing slug (404 or redirect).

3. **Menu + Drawer Refactor**
   - Replace `SETTINGS_MENU_ITEMS` with data derived from registry groups. For now, create `group` field in registry to produce sections like Basics / Account / Integrations.
   - Update `campus-sidebar/config/sidebarContent.tsx` to import registry and map automatically.

4. **Audit & Fill Gaps**
   - For each missing route (General, Appearance, Language, Integrations, Security, Privacy, Legal, Team):
     - create stub view under `portal-architecture/settings/views/<slug>/index.tsx` returning shell w/ “Coming soon”.
     - mark `status: "planned"` so nav shows lock icon.
   - Verify duplicates (e.g., `/connected-devices` vs `/devices`), decide on canonical slug, and update quick-action + nav entries.

5. **Align Data + UX**
   - Centralize repeated logic (e.g., contact info). Example: `AccountSettingsScreen` currently defines `accountFields` and layout. Move data fetching to `useAccountSettings`. Shell handles skeleton state.
   - Ensure each view exports `SettingsViewProps` (maybe `({ shell }: SettingsViewContext) => JSX.Element`) to pass actions.

6. **Documentation**
   - Expand this file with a checklist per route (columns: owner, API dependency, design link).
   - Update `docs/features/partners/portal/partnership-workspace-architecture.md` to reference the new settings architecture module.

## 4. Open Questions

1. **Desktop Layout** – Will the same shell serve desktop? If yes, add responsive variants now.
2. **Checklist & Wallet** – Are these staying outside settings? If not, include them as embedded routes.
3. **Auth/Permissions** – Need a guard layer to block routes based on tier/feature flags (tie into existing `useMobileNavigation` store?).

## 5. Immediate Next Actions

1. Create `settings-route-registry.ts` + types under `docs/features/partners/portal/portal-architecture/` (spec doc) before implementing.
2. Draft `SettingsShell` API contract (props, slots). Document expected usage and share with design.
3. Convert one screen (Account) to prove the pattern: wrap with shell, register in registry, update quick actions to read from registry.
