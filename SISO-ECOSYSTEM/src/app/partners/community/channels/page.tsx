import { Radio, Hash, Users } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const CHANNELS = [
  { id: "general", label: "#general", members: 214, cadence: "24/7", badge: "Default" },
  { id: "wins", label: "#wins", members: 87, cadence: "Daily", badge: "Celebrate" },
  { id: "announcements", label: "#announcements", members: 214, cadence: "HQ", badge: "Read only" },
  { id: "referrals", label: "#referrals", members: 63, cadence: "Weekly", badge: "Pipeline" },
  { id: "events", label: "#events", members: 48, cadence: "Weekly", badge: "IRL" },
];

export default function CommunityChannelsPage() {
  return (
    <CommunitySection
      title="Channel Directory"
      description="Browse default rooms or plan new partner-led spaces."
      icon={<Radio className="h-5 w-5" />}
    >
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/40 p-4 text-xs text-siso-text-muted">
        <p>Channel settings (mute, leave, pin) will live inside the three-dot menu on each channel view.</p>
      </div>

      <div className="grid gap-3">
        {CHANNELS.map((channel) => (
          <div
            key={channel.id}
            className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-siso-text-primary">
                <Hash className="h-4 w-4" />
                <span className="font-semibold">{channel.label}</span>
              </div>
              <span className="rounded-full border border-siso-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-siso-text-muted">
                {channel.badge}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-siso-text-muted">
              <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{channel.members} members</span>
              <span className="inline-flex items-center gap-1 text-siso-text-muted/80"><Radio className="h-3 w-3" />{channel.cadence}</span>
            </div>
          </div>
        ))}
      </div>
    </CommunitySection>
  );
}
