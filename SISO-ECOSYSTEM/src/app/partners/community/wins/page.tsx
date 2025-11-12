import { Trophy } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const WIN_TEMPLATES = [
  { title: "Deal closed", body: "Client + package + ACV" },
  { title: "Referral shoutout", body: "Tag partner + conversion story" },
  { title: "Milestone unlocked", body: "Tier jump, leaderboard climb, or streak" },
];

export default function CommunityWinsPage() {
  return (
    <CommunitySection
      title="#wins"
      description="Celebrate revenue moments, unlock streaks, and showcase templates from HQ."
      icon={<Trophy className="h-5 w-5" />}
    >
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/40 p-4">
        <h2 className="text-sm font-semibold text-siso-text-primary">Post templates</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {WIN_TEMPLATES.map((template) => (
            <div key={template.title} className="rounded-2xl border border-siso-border/60 p-3 text-xs text-siso-text-muted">
              <p className="font-semibold text-siso-text-primary">{template.title}</p>
              <p className="mt-1">{template.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-siso-border/60 bg-siso-bg-secondary/30 p-4 text-sm text-siso-text-muted">
        <p>
          The live channel reuses our message timeline with pinned win cards, quick reactions, and the “Share a win” CTA
          above the composer. Posting here feeds the leaderboard widgets on the Earnings pillar.
        </p>
      </div>
    </CommunitySection>
  );
}
