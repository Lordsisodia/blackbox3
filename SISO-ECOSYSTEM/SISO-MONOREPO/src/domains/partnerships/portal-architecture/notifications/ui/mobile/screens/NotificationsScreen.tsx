"use client";

import { MobileNotificationsCard } from "../components/MobileNotificationsCard";
import { mockNotifications } from "../fixtures/notification-fixtures";
import { Bell, Menu } from "lucide-react";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

export function NotificationsScreen() {
  const { openDrawer } = useMobileNavigation();

  return (
    <section className="flex flex-1 flex-col gap-4 px-3 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+88px)]">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-left">
          <Bell className="h-6 w-6 text-siso-orange" />
          <h2 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">Notifications</h2>
          <div
            className="ml-auto inline-flex items-center rounded-2xl border border-siso-border bg-siso-bg-secondary/60 px-2 py-1 shadow-sm"
            aria-label="Navigation controls"
          >
            <button
              type="button"
              aria-label="Open navigation"
              onClick={openDrawer}
              className="inline-flex h-8 w-8 items-center justify-center text-siso-text-muted transition hover:text-siso-orange"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="h-1 rounded-full bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166] shadow-[0_0_12px_rgba(255,138,0,0.45)]" />
        <p className="text-xs text-siso-text-muted">Daily snapshots across chats, campus drops, and shoutouts.</p>
      </header>

      <div className="flex flex-1 flex-col">
        <MobileNotificationsCard items={mockNotifications} />
      </div>
    </section>
  );
}
