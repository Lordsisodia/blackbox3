import { Users } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const SAMPLE_PARTNERS = [
  { name: "SISO Agency", tier: "Tier S", focus: "Hospitality", status: "Online" },
  { name: "Nova Carter", tier: "Tier A", focus: "DTC Retail", status: "Drafting pitch" },
  { name: "Leo Summers", tier: "Tier B", focus: "Fintech", status: "Open for collabs" },
];

export default function CommunityDirectoryPage() {
  return (
    <CommunitySection
      title="Partner Directory"
      description="Plan roster filters and DM entry points."
      icon={<Users className="h-5 w-5" />}
    >
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/40 p-4 text-sm text-siso-text-muted">
        <p>
          Search + filters live here (tier, industry, availability). Selecting a partner routes shoppers straight into a
          `/partners/community/messages/[partnerId]` thread using the existing DM stack.
        </p>
      </div>
      <div className="space-y-3">
        {SAMPLE_PARTNERS.map((partner) => (
          <div key={partner.name} className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-siso-text-primary">{partner.name}</p>
                <p className="text-xs text-siso-text-muted">{partner.focus}</p>
              </div>
              <span className="rounded-full border border-siso-border px-3 py-0.5 text-[10px] uppercase tracking-wide text-siso-text-muted">
                {partner.tier}
              </span>
            </div>
            <p className="mt-1 text-xs text-siso-text-muted/90">{partner.status}</p>
          </div>
        ))}
      </div>
    </CommunitySection>
  );
}
