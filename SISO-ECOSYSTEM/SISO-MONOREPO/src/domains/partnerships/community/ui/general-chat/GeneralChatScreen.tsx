"use client";

import { useMemo, useState } from "react";
import { ChatViewport } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ChatViewport";
import { ComposerBar } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ComposerBar";
import { ConversationTimeline } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/conversation/ConversationTimeline";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { communityChannels } from "@/domains/partnerships/community/data/channelPresets";
import type { ConversationMessage } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/fixtures/conversation-fixtures";
import { ExternalLink, Hash, Megaphone, UsersRound, ListChecks, Bookmark, X } from "lucide-react";
import Link from "next/link";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const channel = communityChannels.general;

const localeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const formatTimestamp = (iso: string): string => {
  return localeFormatter.format(new Date(iso));
};

const toConversationMessages = (): ConversationMessage[] =>
  channel.messages.map((message) => ({
    id: message.id,
    authorName: message.author.name,
    authorInitials: message.author.avatarInitials,
    content: message.content,
    timestamp: formatTimestamp(message.timestamp),
    direction: "incoming",
  }));

export function GeneralChatScreen() {
  const [composerHeight, setComposerHeight] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { openDrawer } = useMobileNavigation();

  const mappedConversation = useMemo(() => toConversationMessages(), []);

  const activeHighlight = channel.highlights[0];
  const threadStatus = activeHighlight ? `${activeHighlight.value}` : "Active now";

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-3 pt-1.5">
        <ChatViewport
          isDirectoryOpen={isDetailsOpen}
          onOpenDirectory={() => setIsDetailsOpen(true)}
          threadName="General Chat"
          threadStatus={threadStatus}
          avatarLabel="GC"
          contentOffset={composerHeight + 24}
          onOpenAppDrawer={openDrawer}
        >
          <SettingsGroupCallout
            icon={<Megaphone className="h-4 w-4" />}
            title="Community broadcast"
            subtitle="Program-wide channel for quick wins, questions, and daily stand-ups."
            showChevron={false}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
              <p className="text-xs text-siso-text-muted">Drop updates, shoutouts, and questions for the entire program.</p>
            </div>
          </SettingsGroupCallout>
          <ConversationTimeline messages={mappedConversation} />
        </ChatViewport>

        <ComposerBar onHeightChange={setComposerHeight} />
      </div>

      <ChannelDetailsOverlay open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </section>
  );
}

type ChannelDetailsOverlayProps = {
  open: boolean;
  onClose: () => void;
};

function ChannelDetailsOverlay({ open, onClose }: ChannelDetailsOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex">
      <aside className="flex h-full w-[92%] max-w-md flex-col gap-5 overflow-y-auto border-r border-siso-border bg-siso-bg-tertiary/95 px-5 py-6 shadow-[12px_0_45px_rgba(0,0,0,0.55)]">
        <div className="relative">
          <HighlightCard
            color="orange"
            className="w-full"
            title="General Chat"
            description={channel.description}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[22px]"
            descriptionClassName="text-xs"
            icon={<Hash className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close channel details"
            className="absolute right-4 top-3 rounded-full border border-white/30 bg-black/40 p-1.5 text-white/80 backdrop-blur transition hover:border-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <SettingsGroupCallout
          icon={<UsersRound className="h-4 w-4" />}
          title="Highlights"
          subtitle="Pulse of General Chat"
          showChevron={false}
        >
          <div className="grid gap-3">
            {channel.highlights.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-siso-text-muted">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                {stat.change ? <p className="text-xs text-siso-text-muted">{stat.change}</p> : null}
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ListChecks className="h-4 w-4" />}
          title="Guidelines"
          subtitle="Keep threads crisp and helpful"
          showChevron={false}
        >
          <div className="space-y-3">
            {channel.guidelines.map((guideline) => (
              <div key={guideline.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-semibold text-white">{guideline.title}</p>
                <p className="text-xs text-siso-text-muted">{guideline.description}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Bookmark className="h-4 w-4" />}
          title="Quick links"
          subtitle="Jump into the supporting docs"
          showChevron={false}
        >
          <div className="space-y-2">
            {channel.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/40 px-3 py-2 text-sm text-siso-text-primary transition hover:border-siso-orange/60 hover:text-white"
              >
                <span>
                  <span className="block font-semibold">{link.label}</span>
                  <span className="text-xs text-siso-text-muted">{link.description}</span>
                </span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>

        {channel.pinned.length ? (
          <SettingsGroupCallout
            icon={<Bookmark className="h-4 w-4" />}
            title="Pinned"
            subtitle="Keep these handy"
            showChevron={false}
          >
            <div className="space-y-3">
              {channel.pinned.map((pin) => (
                <div key={pin.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{pin.title}</p>
                  <p className="text-xs text-siso-text-muted">{pin.summary}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">{pin.author}</p>
                </div>
              ))}
            </div>
          </SettingsGroupCallout>
        ) : null}
      </aside>
      <button type="button" aria-label="Close overlay" className="flex-1 bg-black/60" onClick={onClose} />
    </div>
  );
}
