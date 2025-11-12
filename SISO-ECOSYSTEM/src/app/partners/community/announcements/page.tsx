import { Megaphone } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const UPCOMING_DROPS = [
  { title: "December sprint", detail: "Roadmap + KPI doc ships Nov 28." },
  { title: "Finance AMA", detail: "Live office hours next Tuesday." },
  { title: "Portal release", detail: "Community layout beta mid-December." },
];

export default function CommunityAnnouncementsPage() {
  return (
    <CommunitySection
      title="Announcements"
      description="HQ broadcast lane for launches, playbooks, and mission-critical updates."
      icon={<Megaphone className="h-5 w-5" />}
    >
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/40 p-4 text-sm text-siso-text-muted">
        <p>
          This channel renders the same timeline component, but the composer stays hidden unless you are on the HQ
          roster. Partners can react, copy links, and jump to referenced docs.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {UPCOMING_DROPS.map((drop) => (
          <div key={drop.title} className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4">
            <p className="text-sm font-semibold text-siso-text-primary">{drop.title}</p>
            <p className="text-xs text-siso-text-muted">{drop.detail}</p>
          </div>
        ))}
      </div>
    </CommunitySection>
  );
}
