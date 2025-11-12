# Discord-Inspired Workspace Customization Roadmap

Guest facilitator: **Bernstein ALLi burn Garrison**

## Goal
Retain Discord’s channel-centric navigation (hashtags, presence, chat timeline) while layering in SISO feature panels—plan wizards, revenue dashboards, streak trackers—so partners stay oriented yet see clear calls to action.

## 1. UX Principles
1. **Keep the hashtags** – enhancements sit on `#commissions`, `#app-plan-generator`, etc.; no renaming to “campus”.
2. **Panel-first content** – structured panels (metrics, CTAs) appear above the chat feed so actionable data is front and center.
3. **Contextual bridges** – embedded links/hover cards connect clients ↔ assets ↔ toolbox in one click.
4. **Responsive parity** – sidebar groups on desktop, bottom-nav shortcuts on mobile, pointing to the same channels.
5. **Safe personalisation** – partners pin favourites and choose accent themes without breaking shared layout.

## 2. Channel Enhancements (channel names unchanged)
| Channel | Discord baseline | SISO overlay |
| --- | --- | --- |
| `#welcome` | Orientation chat | Onboarding checklist panel with completion %, streak counter, next mentor session banner. |
| `#commissions` | Informal updates | Metrics grid, payout timeline, tier meter, ledger CTA. |
| `#app-plan-generator` | Conversation thread | Hero card + “Start plan” CTA, recent drafts, AI tip list, client shortcuts. |
| `#clients` | Ad-hoc chatter | Card/table hybrid for assigned accounts, filters, quick actions. |
| `#training` | Announcements | Curriculum progress, streak reminders, upcoming live call countdown. citeturn1search6 |
| `#analytics` | Stats drop | KPI cards, experiment list, feedback button. |

## 3. Navigation & Personalisation
- **Lifecycle groupings** – visually cluster channels (Activate, Operate, Optimise) while keeping their names.
- **Pins & favourites** – partners pin up to five channels; mobile bottom nav mirrors the pinned set (default: `#commissions`, `#clients`, `#app-plan-generator`, `#training`).
- **Command palette** – keep `⌘K / Ctrl+K` for channel jumps, client lookup, and quick actions (e.g., “Create plan for Astro Logistics”).

## 4. Panel Template System
Reusable panels (store under `workspace/ui/panels`):
- **Hero panel** – gradient background, progress chips, CTA buttons (use in `#welcome`, `#app-plan-generator`).
- **Metrics grid** – value + delta cards (ideal for `#commissions`, `#analytics`).
- **Timeline list** – chronological cards with status pills (payout timeline, daily missions).
- **Card grid** – responsive layout for clients, industries, assets.

## 5. Cross-Domain Interactions
- Mentioning `@client` surfaces hover cards from `client-exchange` (status, industry, quick actions).
- Plan submissions automatically post follow-up prompts in `#growth-hub` (assets, referral link).
- Enablement streak completions broadcast celebration badges into `#deal-wins`.

## 6. Live Ops & Habit Loops
- **Daily missions** – scheduler pushes 8 a.m. embeds (mirroring TRW’s cadence) into `#announcements` and relevant channels. citeturn2search2
- **Mentor banners** – workspace header advertises the next live call with link + replay button. citeturn1search6
- **Success highlights** – partners who close deals or complete missions auto-post structured cards in `#deal-wins`.

## 7. Security & Trust Differentiators
TRW suffered a large data breach (names, emails, chat logs exposed), so we lead with transparency. citeturn1search0
- Security status widget (latest audit, uptime) in the shell header.
- 2FA, session management, and downloadable activity logs baked into settings.
- Quarterly security digest pinned in `#announcements`.

## 8. Accessibility & Performance
- Dark theme with WCAG AA contrast; offer high-contrast toggle.
- Full keyboard navigation and screen-reader landmarks for channel list, main panel, chat.
- Lazy-load analytics charts, prefetch pinned channel panels, cache daily missions for offline-ready PWA behaviour.

## 9. Design Deliverables
1. Channel archetype mockups (desktop + mobile) using the panel templates.
2. Component tokens added to `SISO-UI-Library` for hero, metrics, timeline, and card-grid panels.
3. Interactive prototype showing channel switch → panel overlay → mobile nav flow.

## 10. Implementation Roadmap
1. Extend channel registry with grouping metadata and panel references (workspace domain).
2. Build shared panel components and retrofit current demo panels.
3. Implement daily mission scheduler + streak tracking (enablement + shared events).
4. Layer mentor directory + live session banners (communications + enablement).
5. Ship security widget + auth hardening (shared infrastructure).

## 11. Next Steps
- UX: Translate this roadmap into Figma frames while preserving channel names.
- Engineering: Spike on panel templates and mission scheduler integration.
- Product/Enablement: Draft mission content, mentor roster, and success highlight rules.
- Security: Scope audit tasks and prepare transparency messaging.
