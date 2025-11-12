import { Users, Hash, Megaphone, Trophy } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";
import Link from "next/link";

const quickCards = [
  {
    title: "#general",
    description: "Daily chat with every active partner.",
    href: "/partners/community/general",
    icon: <Hash className="h-4 w-4" />,
  },
  {
    title: "#wins",
    description: "Celebrate client deals and shoutouts.",
    href: "/partners/community/wins",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    title: "Announcements",
    description: "Official drops from HQ.",
    href: "/partners/community/announcements",
    icon: <Megaphone className="h-4 w-4" />,
  },
  {
    title: "Messages",
    description: "Direct threads & coaching chats.",
    href: "/partners/community/messages",
    icon: <Users className="h-4 w-4" />,
  },
];

const roadmapRows = [
  {
    title: "Channel presets",
    detail: "Default pillars (#general, #wins, #announcements) + partner-created rooms.",
  },
  {
    title: "Directory integrations",
    detail: "Searchable roster that jumps straight into DM threads.",
  },
  {
    title: "Moderation toolkit",
    detail: "Mute, pin, and alert controls surfaced in the new three-dot menus.",
  },
];

export default function CommunityHubPage() {
  return (
    <CommunitySection
      title="Community Hub"
      description="Navigate partner channels, DMs, and support rituals from one launchpad."
      icon={<Users className="h-5 w-5" />}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {quickCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 transition hover:border-siso-orange/50"
          >
            <div className="flex items-center gap-2 text-siso-text-primary">
              {card.icon}
              <span className="text-sm font-semibold">{card.title}</span>
            </div>
            <p className="mt-1 text-xs text-siso-text-muted">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/40 p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Upcoming</p>
        <h2 className="text-lg font-semibold text-siso-text-primary">Community roadmap</h2>
        <ul className="mt-3 space-y-2 text-sm text-siso-text-muted">
          {roadmapRows.map((row) => (
            <li key={row.title} className="rounded-2xl border border-dashed border-siso-border/50 p-3">
              <p className="font-semibold text-siso-text-primary">{row.title}</p>
              <p className="text-xs text-siso-text-muted">{row.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </CommunitySection>
  );
}
