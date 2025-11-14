"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { HighlightCard } from "@/components/ui/card-5-static";
import {
  NotificationsFilterTabs,
  NotificationsMenu,
  type NotificationFilter,
} from "@/components/ui/notifications-menu";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { mockNotifications } from "../fixtures/notification-fixtures";
import { Bell, Filter, Inbox, Menu } from "lucide-react";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const FallingPattern = dynamic(
  () => import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then((m) => m.FallingPattern),
  { ssr: false, loading: () => null },
);

function useShouldShowBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const idle = "requestIdleCallback" in window
      ? (window as any).requestIdleCallback
      : (cb: FrameRequestCallback) => window.setTimeout(cb, 250);
    const handle = idle(() => setReady(media.matches));
    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback?.(handle);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);
  return ready;
}

const filterNotifications = (items: typeof mockNotifications, filter: NotificationFilter) => {
  switch (filter) {
    case "verified":
      return items.filter((n) => n.type === "follow" || n.type === "like");
    case "mentions":
      return items.filter((n) => n.type === "mention");
    default:
      return items;
  }
};

export function NotificationsScreen() {
  const { openDrawer } = useMobileNavigation();
  const showBg = useShouldShowBackground();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");

  const stats = useMemo(() => {
    const unread = mockNotifications.filter((n) => !n.isRead).length;
    const verified = mockNotifications.filter((n) => n.type === "follow" || n.type === "like").length;
    const mentions = mockNotifications.filter((n) => n.type === "mention").length;
    return {
      total: mockNotifications.length,
      unread,
      counts: {
        all: mockNotifications.length,
        verified,
        mentions,
      },
    };
  }, []);
  const filteredItems = useMemo(() => filterNotifications(mockNotifications, activeFilter), [activeFilter]);

  return (
    <section className="settings-panel-scope relative flex flex-1 flex-col gap-6 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      {showBg ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col gap-6">
        <header className="relative">
          <HighlightCard
            color="orange"
            className="w-full"
            title="Notifications"
            description="Partner pulse—updates, invites, and shoutouts."
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
            icon={<Bell className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="absolute z-20 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-black/70 text-white transition hover:bg-black/80 hover:border-neutral-600"
            style={{ top: "-1rem", right: "calc(env(safe-area-inset-right, 0px) + 0.25rem)" }}
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <SettingsGroupCallout
          icon={<Filter className="h-4 w-4" />}
          title="Focus filters"
          subtitle="Dial into mentions, verified partners, or the full stream"
          showChevron={false}
        >
          <div className="px-1 pb-2">
            <NotificationsFilterTabs value={activeFilter} onValueChange={setActiveFilter} counts={stats.counts} />
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Inbox className="h-4 w-4" />}
          title="All activity"
          subtitle={activeFilter === "all" ? "Latest partner shoutouts across the network" : "Filtered view based on your selection"}
          showChevron={false}
        >
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-3">
            <NotificationsMenu items={filteredItems} showFilters={false} />
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}
