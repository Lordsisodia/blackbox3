"use client";

import { useMemo, useState } from "react";
import { ChatViewport } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ChatViewport";
import { ComposerBar } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ComposerBar";
import { ConversationTimeline } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/conversation/ConversationTimeline";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { communityChannels } from "@/domains/partnerships/community/data/channelPresets";
import type { ConversationMessage } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/fixtures/conversation-fixtures";
import { ExternalLink, Hash, Megaphone, X } from "lucide-react";
import Link from "next/link";

const channel = communityChannels.general;

const formatTimestamp = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const dayLabel = sameDay
    ? "Today"
    : date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dayLabel} • ${timeLabel}`;
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
          threadName="# general-chat"
          threadStatus={threadStatus}
          avatarLabel="GC"
          contentOffset={composerHeight + 24}
          onOpenAppDrawer={() => setIsDetailsOpen(true)}
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
        <header className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-white">
            <Hash className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-siso-orange">Channel</p>
            <h3 className="text-xl font-semibold text-white"># general-chat</h3>
            <p className="text-sm text-siso-text-muted">{channel.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close channel details"
            className="rounded-full border border-white/10 p-1.5 text-siso-text-muted transition hover:text-siso-orange"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">Highlights</p>
          <ul className="mt-3 grid gap-3">
            {channel.highlights.map((stat) => (
              <li key={stat.label} className="rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/50 p-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                {stat.change ? <p className="text-xs text-siso-text-muted">{stat.change}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">Guidelines</p>
          <ul className="mt-3 space-y-3">
            {channel.guidelines.map((guideline) => (
              <li key={guideline.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-semibold text-white">{guideline.title}</p>
                <p className="text-xs text-siso-text-muted">{guideline.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {channel.quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/40 px-3 py-2 text-sm text-siso-text-primary transition hover:border-siso-orange/60 hover:text-white"
                >
                  <span>
                    <span className="block font-semibold">{link.label}</span>
                    <span className="text-xs text-siso-text-muted">{link.description}</span>
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {channel.pinned.length ? (
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">Pinned</p>
            <ul className="mt-3 space-y-3">
              {channel.pinned.map((pin) => (
                <li key={pin.id} className="rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/50 p-3">
                  <p className="text-sm font-semibold text-white">{pin.title}</p>
                  <p className="text-xs text-siso-text-muted">{pin.summary}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">
                    {pin.author}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>
      <button type="button" aria-label="Close overlay" className="flex-1 bg-black/60" onClick={onClose} />
    </div>
  );
}
