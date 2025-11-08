import { Sparkles } from "lucide-react";

import { Timeline, type TimelineItem } from "@/components/ui/modern-timeline";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";

const whatsNewTimeline: TimelineItem[] = [
  {
    title: "Partner wallet beta",
    description: "Mobile wallet dashboards with live payout monitoring rolled out to Gold partners.",
    date: "2025-11-01",
    category: "Financial",
    status: "completed",
  },
  {
    title: "Agent checklist view",
    description: "New agent-driven checklist helps teams visualize onboarding progress and blockers.",
    date: "2025-11-08",
    category: "Enablement",
    status: "current",
  },
  {
    title: "Revenue insights refresh",
    description: "Upcoming release adds cohort filters plus tier benchmarks right inside analytics.",
    date: "2025-11-18",
    category: "Analytics",
    status: "upcoming",
  },
  {
    title: "Global payout expansion",
    description: "Wise + Revolut rails enter pilot to support partners in 14 new markets.",
    date: "2025-12-05",
    category: "Payments",
    status: "upcoming",
  },
  {
    title: "AI playbooks",
    description: "Context-aware playbooks will surface when tasks stall to keep partners moving.",
    date: "2026-01-10",
    category: "Automation",
    status: "upcoming",
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
