import { LifeBuoy } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const HELP_CARDS = [
  {
    title: "Guides & rituals",
    detail: "Surface the same help content already living under Support > Help Center.",
  },
  {
    title: "Ask HQ",
    detail: "One tap to open a ticket or ping an HQ Guide DM.",
  },
  {
    title: "Live office hours",
    detail: "Calendar slots + streaming links embedded inline.",
  },
];

export default function CommunityHelpPage() {
  return (
    <CommunitySection
      title="Help Center"
      description="Self-serve articles with fast paths to HQ humans."
      icon={<LifeBuoy className="h-5 w-5" />}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {HELP_CARDS.map((card) => (
          <div key={card.title} className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4">
            <p className="text-sm font-semibold text-siso-text-primary">{card.title}</p>
            <p className="text-xs text-siso-text-muted">{card.detail}</p>
          </div>
        ))}
      </div>
    </CommunitySection>
  );
}
