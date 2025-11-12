import { Sparkles } from "lucide-react";

import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";

const whatsNewTimeline: TimelineItem[] = [
  {
    id: "wallet-beta",
    title: "Partner wallet beta",
    description: "Mobile wallet dashboards with live payout monitoring rolled out to Gold partners.",
    timestamp: new Date("2025-11-01T09:00:00Z"),
    status: "completed",
  },
  {
    id: "agent-checklist",
    title: "Agent checklist view",
    description: "Automation-fed plan view now powers the Activate checklist, surfacing blockers automatically.",
    timestamp: new Date("2025-11-08T12:00:00Z"),
    status: "active",
  },
  {
    id: "revenue-refresh",
    title: "Revenue insights refresh",
    description: "Cohort filters and tier benchmarks arrive across analytics widgets for deeper breakdowns.",
    timestamp: new Date("2025-11-18T15:00:00Z"),
    status: "pending",
  },
  {
    id: "global-payouts",
    title: "Global payouts expansion",
    description: "Wise + Revolut payout rails move into pilot to support 14 new partner markets before year end.",
    timestamp: new Date("2025-12-05T18:00:00Z"),
    status: "pending",
  },
  {
    id: "ai-playbooks",
    title: "AI playbooks",
    description: "Context-aware playbooks will surface in checklist steps when progress stalls to keep teams moving.",
    timestamp: new Date("2026-01-10T10:00:00Z"),
    status: "pending",
  },
];

export function WhatsNewScreen() {
  return (
    <SettingsDetailLayout
      title="What’s New"
      description="Release notes and feature previews."
      icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
    >
      <Timeline items={whatsNewTimeline} className="mt-2" />
    </SettingsDetailLayout>
  );
}
