import { Sparkles } from "lucide-react";

import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";

const whatsNewTimeline: TimelineItem[] = [
  {
    id: "wallet-beta",
    title: "Partner wallet beta",
    description: "Mobile wallet dashboards with live payout monitoring rolled out to Gold partners.",
    timestamp: "2025-11-01",
    status: "completed",
  },
  {
    id: "agent-checklist",
    title: "Agent checklist view",
    description: "New agent-driven checklist helps teams visualize onboarding progress and blockers.",
    timestamp: "2025-11-08",
    status: "active",
  },
  {
    id: "revenue-refresh",
    title: "Revenue insights refresh",
    description: "Upcoming release adds cohort filters plus tier benchmarks right inside analytics.",
    timestamp: "2025-11-18",
    status: "pending",
  },
  {
    id: "global-payout",
    title: "Global payout expansion",
    description: "Wise + Revolut rails enter pilot to support partners in 14 new markets.",
    timestamp: "2025-12-05",
    status: "pending",
  },
  {
    id: "ai-playbooks",
    title: "AI playbooks",
    description: "Context-aware playbooks will surface when tasks stall to keep partners moving.",
    timestamp: "2026-01-10",
    status: "pending",
  },
];

export function WhatsNewScreen() {
  return (
    <SettingsDetailLayout
      title="What’s New"
      description="Release notes and feature previews."
      icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
    >
      <Timeline items={whatsNewTimeline} className="mt-2" />
    </SettingsDetailLayout>
  );
}
