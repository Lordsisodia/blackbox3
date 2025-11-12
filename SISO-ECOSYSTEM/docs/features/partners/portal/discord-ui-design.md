# Partner Workspace UI Design Guide

This guide outlines the UX principles, layouts, and component expectations for the Discord-style partner workspace across desktop and mobile. Use it to brief design work (Figma) and inform engineering builds in the monorepo.

## 1. Experience Goals
- **Familiarity:** mirror Discord mental models (channels, sidebar, presence) so partners onboard quickly.
- **Productivity:** channel panels reveal actionable data with minimal clicks.
- **Responsiveness:** single codebase handles desktop, tablet, and mobile (PWA) elegantly.
- **Contextual cross-links:** every panel exposes obvious paths to related content (industries → assets → toolbox).

## 2. Layout Overview

| Region | Desktop Behaviour | Mobile Behaviour |
| --- | --- | --- |
| Global shell | Persistent top bar with search, notifications, partner profile menu. | Collapsible top bar; search opens full-screen overlay. |
| Sidebar | Left column (min 260px) listing channels grouped by lifecycle categories. | Hidden behind hamburger; swipable drawer. Quick-access bottom nav for key channels (Home, Clients, Commissions, Training). |
| Channel header | Displays channel title, context actions, presence avatars, breadcrumbs. | Sticky at top of viewport with condensed actions in overflow menu. |
| Main panel | Renders chat or functional panel; supports split-view on ≥1280px. | Full-width scrollable content; optional mini player for chat input. |
| Context rail | Optional right-hand rail for secondary info (e.g., client summary). | Slides up as bottom sheet when invoked. |

## 3. Channel Archetypes
- **Chat channel:** standard messaging timeline + composer (`#general-chat`, `#help-desk`).
- **Functional panel:** data-first dashboard (`#commissions`, `#app-plan-generator`). Shows key metrics with CTA to full page.
- **Hybrid:** chat timeline with pinned panel (e.g., `#deal-wins` where each win is structured and commentable).

Each archetype maps to a reusable UI template exported from `workspace.ui`. Panels provided by feature domains must conform to the templates’ slot API (header, body, footer, quick actions).

## 4. Navigation Patterns
- **Desktop:** sidebar channel selection; command palette (`⌘K`) for quick switching; breadcrumb links for cross-domain routing.
- **Mobile:** bottom nav anchors (Home, Clients, Plans, Revenue, Training) + swipe-out channel drawer. Deep links open panels as stacked pages with gesture-based back navigation.
- **Notifications:** toast + inbox sidebar displaying unread counts per channel; mobile uses push notifications when the PWA is installed.

## 5. Responsive Breakpoints
- `≥1440px` (wide desktop): allow split view (chat + panel) and persistent context rail.
- `1024–1439px` (desktop/tablet): single main panel, collapsible context rail.
- `768–1023px` (tablet portrait): sidebar collapses by default, use sticky bottom nav.
- `<768px` (mobile): full-screen panels, bottom sheet overlays for contextual info.

## 6. Component Guidelines
- **Channel list item:** badge for unread, icon variant for channel type (chat vs. functional), per-tier lock indicator.
- **Presence avatar stack:** limit to latest 5 active users with overflow indicator.
- **Chat composer:** modular action bar (attach file, slash commands, AI assist button).
- **Panel cards:** 16px corner radius, gradient accent for hero cards, accessible contrast.
- **Tables/Lists:** responsive stacking; on mobile replace tables with grouped cards.

## 7. Cross-Linking UX
- Inline chips linking to related panels (e.g., Industry chip opens `/clients/industries` in overlay).
- Quick actions row at top of each functional panel (`View assets`, `Generate plan`, `Open toolbox`).
- Persistent “Related” section in context rail referencing adjacent domains.

## 8. Design Asset Workflow
- Primary design source: **Figma** file `SISO Workspace / Partners` stored under the organization’s shared workspace. Include page sections: Desktop, Mobile, Components, Prototypes.
- Exported component specs (auto layout, spacing tokens) should sync to the `SISO-UI-Library` repo under `packages/ui/discord-workspace/` once ready.
- Color, typography, spacing tokens are defined in the design system; reference `SISO-UI-Library` tokens to keep parity with other apps.

## 9. Implementation Hooks
- Store layout configs in `workspace/application/channelRegistry.ts` (to be created) referencing domain panel exports.
- Domain-specific panels live inside their `ui/` directories and implement a shared interface (e.g., `WorkspacePanelProps`).
- Mobile/desktop detection handled via Tailwind breakpoints + React context provided by workspace shell.

## 10. Next Steps
1. Designers: create Figma mockups following this guide; export component specs to the UI library handoff doc.
2. Engineers: implement workspace shell scaffolding with placeholder panels to validate responsive behaviour.
3. Iterate with partners for feedback on navigation + key flows (plan creation, commission review, onboarding).
