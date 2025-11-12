# Partnership Workspace Architecture

This document captures the channel/page layout and domain ownership for the Discord-style partner program. Use it as the source of truth when building or wiring new features.

## 1. Workspace Vision

Partners operate inside a workspace that mirrors Discord: sidebar channels, live presence, and panels that surface functional tooling. Every capability maps to one of three lifecycle goals:

1. **Activate** – recruit, onboard, and orient partners.
2. **Operate** – help partners sell, deliver, and collaborate with SISO.
3. **Optimize** – drive revenue, learning, and continuous improvement.

The workspace domain handles navigation, permissions, and channel orchestration. Feature domains plug into it by exposing chat feeds or functional panels.

## 2. Channels & Pages

### Activation (Recruit → Onboard)
- `#welcome` – auto greets new partners, links to onboarding checklist.
- `#announcements` – official updates, launch notes; restricted posting.
- `#starter-checklist` – embeds the onboarding checklist panel.
- **/onboarding/checklist** – interactive tasks, document uploads, contact info.
- **/onboarding/forms** – application status, compliance, Stripe onboarding.

### Daily Communications
- `#general-chat` – open community discussion.
- `#deal-wins` – structured win posts, cross-post to analytics.
- `#help-desk` – partner support (ties into ticketing).
- `#office-hours` – scheduled AMAs, integrates with calendar invites.
- **Direct Messages** – partner ↔ partner / staff chats.

### Client Exchange (Operate)
- `#clients` – overview of assigned clients; cards deep-link to roster page. Partner reps manage their own client notes/data.
- `#industries` – highlights target industries; links to relevant assets.
- `#assets` – quick access to client-specific collateral (logos, copy decks). Assets focus on ready-to-use marketing materials; resources (below) cover broader knowledge.
- **/clients/roster** – filters by status, industry, stage; supports partner annotations.
- **/clients/opportunities** – pipeline/kanban of deals.
- **/clients/industries** – market intel, recommended verticals.

### App Plan Lab
- `#app-plan-generator` – entry point to the AI plan wizard; lists recent drafts.
- **/app-plans/create** – multi-step form, uploads branding assets, captures goals.
- **/app-plans/library** – archive of generated plans with status (submitted, approved).
- **/app-plans/templates** – curated plan templates for common verticals.

### Revenue & Performance
- `#commissions` – live earnings snapshot, CTA to revenue dashboard.
- `#leaderboard` – gamified ranking, highlights top performers.
- `#goals` – monthly KPIs, automatically fed by analytics domain.
- **/revenue/overview** – ledger, upcoming payouts, effective commission rate.
- **/revenue/tiers** – tier progression map, requirements, unlocked perks.
- **/revenue/payouts** – payout history, Stripe Connect status.

### Enablement & Training
- `#training` – announces new curriculum, tracks completion streaks.
- `#resources` – living knowledge base (SOPs, scripts, objection handlers).
- `#case-studies` – showcases client success stories for inspiration.
- `#toolbox` – quick links to macros, AI prompts, calculators. Toolbox is a hands-on subset of enablement, while resources are reference docs.
- **/enablement/curriculum** – course catalog, certification progress.
- **/enablement/checklists** – SOP compliance boards per client type.
- **/enablement/badges** – achievements, rewards for engagement.

### Growth Hub & Marketing
- `#marketing-kits` – downloadable campaign assets, tracking links.
- `#events` – calendar of webinars, live demos, office hours.
- `#referrals` – referral codes, reward status.
- `#landing-pages` – manage personal landing pages and performance analytics.
- **/growth/landing-pages** – configure partner-specific landing pages.
- **/growth/campaigns** – manage outreach sequences (email/SMS scripts).
- **/growth/referrals** – view referral pipeline, rewards, follow-ups.

### Analytics & Optimization
- `#analytics` – daily snapshot of KPIs.
- `#experiments` – announces A/B tests, collects partner opt-ins.
- `#feedback` – structured product feedback intake.
- **/analytics/dashboard** – filters by timeframe, industry, partner tier.
- **/analytics/experiments** – experiment status, sample sizes, results.

### Support & Operations
- `#support-tickets` – ticket updates, escalation notices.
- `#system-status` – automated alerts for outages/maintenance.
- **/support/cases** – manage open support requests, attach evidence.

### Community & Culture
- `#introductions` – new partners share bios.
- `#spotlight` – HQ highlights partner achievements.
- `#off-topic` – informal chat to keep community lively.
- `#beta-features` *(permissioned)* – pilot programs and feature previews.
- `#executive-briefing` *(top-tier)* – strategic updates for elite partners.

## 3. Domain Ownership Map

| Domain | Channels / Pages Powered | Notes |
| --- | --- | --- |
| `workspace` | Channel registry, navigation shell | Determines channel type, handles presence + permissions. |
| `communications` | `#general-chat`, `#deal-wins`, `#help-desk`, DMs | Messaging infrastructure, moderation hooks. |
| `activation` | `#welcome`, `#starter-checklist`, onboarding pages | Recruiting forms, checklists, first-login automation. |
| `client-exchange` | `#clients`, `#industries`, roster/opportunity pages | Partners maintain their own client data; enforces access to client-base APIs. |
| `app-plans` | `#app-plan-generator`, plan pages | AI orchestration, plan lifecycle, hand-off to client-base. |
| `revenue` | `#commissions`, `#leaderboard`, revenue pages | Commission ledger, tier rules, payouts. |
| `enablement` | `#training`, `#resources`, `#toolbox`, enablement pages | Curriculum, SOPs, badges; toolbox is the hands-on module. |
| `growth-hub` | `#marketing-kits`, `#events`, `#referrals`, `#landing-pages` | Marketing assets, landing page builder, referral tracking. |
| `community-insights` | `#analytics`, `#experiments`, `#feedback`, analytics pages | KPI definitions, dashboards, experiment lifecycle. |
| `support` (future) | `#support-tickets`, `#system-status`, support pages | Optional dedicated domain for operational tooling. |
| `shared` | Cross-domain contracts (PartnerProfile, TierEntitlements) | Consumed by every domain. |

## 4. Relationships & Cross-Linking

- Industries ↔ Assets ↔ Toolbox: industry updates reference related collateral and quick-action tools.
- App plans ↔ Client roster ↔ Case studies: each plan links back to the client record and relevant success stories.
- Leaderboard ↔ Enablement badges: achievements unlock new training modules or perks.
- Analytics ↔ Experiments ↔ Feedback: metrics surface experiment status and solicit partner feedback loops.

## 5. Terminology

- **Assets** – ready-to-send marketing collateral (logos, campaign decks) aligned to industries/clients.
- **Resources** – reference knowledge (SOPs, scripts, research) for self-serve learning.
- **Toolbox** – practical utilities (AI prompts, calculators, macros) used during partner workflows.

## 6. Next Steps

1. Align the domain folder structure with this map.
2. Register channels in the workspace configuration and link them to domain exporters.
3. Begin migrating existing SISO-PARTNERSHIPS features into their corresponding domains.
4. Expand each domain README with TODOs/owners as implementation progresses.
