"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Palette, Globe, Bell, Link2, ChevronRight, BellRing, MessageSquare, Megaphone, ChevronLeft } from "lucide-react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { useAppearanceSettings } from "../sections/appearance/application/useAppearanceSettings";
import { useLanguageSettings } from "../sections/language/application/useLanguageSettings";

const quickSettingsCards = [
  {
    id: "appearance",
    title: "Appearance & Accessibility",
    description: "Theme, contrast, font size, reduced motion, haptics",
    icon: Palette,
    href: "/partners/settings/appearance",
    badge: null,
    color: "orange"
  },
  {
    id: "language",
    title: "Language & Region",
    description: "Language, timezone, number/currency formats",
    icon: Globe,
    href: "/partners/settings/language",
    badge: null,
    color: "blue"
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Email, push, and in-app notification preferences",
    icon: Bell,
    href: "/partners/settings/account/notifications",
    badge: "3",
    color: "purple"
  },
  {
    id: "integrations",
    title: "App Integrations",
    description: "Connect Notion, Google Drive, Calendar, and other tools",
    icon: Link2,
    href: "/partners/settings/integrations",
    badge: "2 connected",
    color: "green"
  }
];

// (Removed quickToggles — per request, not needed anymore)

// Use main Settings callout styling consistently

export function GeneralSettingsScreen() {

  // Inline quick controls (wired to feature hooks)
  const {
    settings: appearance,
    updateTheme,
    updateFontSize,
    toggleReducedMotion,
    toggleHighContrast,
    toggleHapticFeedback,
  } = useAppearanceSettings();

  const {
    settings: language,
    updateLocale,
    updateTimezone,
    updateTimeFormat,
    updateCurrencyFormat,
  } = useLanguageSettings();

  const [notificationsMaster, setNotificationsMaster] = useState(true);
  const [notifChannels, setNotifChannels] = useState({
    channel: true,
    messages: true,
    announcements: true,
  });
  const connectedIntegrations = 2;
  const totalIntegrations = 4;

  return (
    <>
      <style jsx global>{`
        div[aria-hidden="true"] {
          display: none !important;
        }
        /* Match top padding to side padding */
        section[class*="flex flex-1 flex-col gap-4 px-4 pt-8"] {
          padding-top: 1rem !important;
        }
        /* Hide HighlightCard divider and bottom section when empty */
        .general-card [style*="background-image"] > div > div > div.my-4.h-px.w-full.bg-white\/20 {
          display: none !important;
        }
        .general-card [style*="background-image"] > div > div > div.flex.items-end.justify-between {
          display: none !important;
        }
        .general-card [style*="background-image"] > div > div > div.flex.h-full.flex-col.justify-between {
          justify-content: flex-start !important;
        }
        /* Alternative targeting */
        .general-card div[class*="my-4"] {
          display: none !important;
        }
        .general-card div[class*="items-end"] {
          display: none !important;
        }
      `}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
      >
        <div className="space-y-4 pb-32 text-siso-text-primary">
          {/* General Header Card */}
          <div className="relative">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 general-card"
              title="General Settings"
              description="Workspace defaults, appearance, and quick preferences"
              icon={<Settings className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>

          {/* Original General Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
        {/* Callout cards with inline controls */}
        <section className="space-y-5">

          {quickSettingsCards.map(({ id, title, description, icon: Icon, href, badge }) => (
            <section key={id} className="space-y-2">
              <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-3 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">{title}</p>
                      <p className="text-xs text-siso-text-muted">{description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {badge ? (
                      <span className="rounded-full border border-siso-border/50 px-2 py-0.5 text-[11px] text-siso-text-muted">
                        {badge}
                      </span>
                    ) : null}
                    <Link href={href} className="inline-flex items-center gap-1 text-siso-text-muted hover:text-siso-text-primary text-sm">
                      <span className="hidden sm:inline">Manage</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Inline controls per section */}
                <div className="px-4 pb-4">
                  {id === "appearance" && (
                    <div className="rounded-[18px] border border-white/10 bg-white/5 divide-y divide-white/5">
                      <div className="px-3 py-3">
                        <p className="mb-2 text-[11px] uppercase tracking-widest text-siso-text-muted">Theme</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {["system","light","dark"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateTheme(opt as any)}
                              className={`rounded-full px-3 py-1 text-xs border transition ${
                                appearance.theme === opt ? "border-siso-orange text-siso-orange" : "border-siso-border/60 text-siso-text-muted hover:text-siso-text-primary"
                              }`}
                            >
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </button>
                          ))}
                          <span className="ml-2 text-[11px] text-siso-text-muted">Current: {appearance.theme}</span>
                        </div>
                      </div>
                      <div className="px-3 py-3">
                        <p className="mb-2 text-[11px] uppercase tracking-widest text-siso-text-muted">Font Size</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {["small","medium","large"].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => updateFontSize(size as any)}
                              className={`rounded-full px-3 py-1 text-xs border transition ${
                                appearance.fontSize === size ? "border-siso-orange text-siso-orange" : "border-siso-border/60 text-siso-text-muted hover:text-siso-text-primary"
                              }`}
                            >
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="px-3 py-3">
                        <div className="flex flex-wrap items-center gap-4">
                          <label className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <input type="checkbox" checked={appearance.reducedMotion} onChange={toggleReducedMotion} />
                            Reduced motion
                          </label>
                          <label className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <input type="checkbox" checked={appearance.highContrast} onChange={toggleHighContrast} />
                            High contrast
                          </label>
                          <label className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <input type="checkbox" checked={appearance.hapticFeedback} onChange={toggleHapticFeedback} />
                            Haptics
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "language" && (
                    <div className="rounded-[18px] border border-white/10 bg-white/5 divide-y divide-white/5 text-xs">
                      <div className="flex items-center gap-3 px-3 py-3">
                        <label className="w-28 text-siso-text-muted">Language</label>
                        <select
                          value={language.locale}
                          onChange={(e) => updateLocale(e.target.value)}
                          className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-siso-text-primary"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-3">
                        <label className="w-28 text-siso-text-muted">Time</label>
                        <select
                          value={language.timeFormat}
                          onChange={(e) => updateTimeFormat(e.target.value as any)}
                          className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-siso-text-primary"
                        >
                          <option value="12h">12h</option>
                          <option value="24h">24h</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-3">
                        <label className="w-28 text-siso-text-muted">Timezone</label>
                        <input
                          value={language.timezone}
                          onChange={(e) => updateTimezone(e.target.value)}
                          className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-siso-text-primary min-w-[200px]"
                        />
                      </div>
                      <div className="flex items-center gap-3 px-3 py-3">
                        <label className="w-28 text-siso-text-muted">Currency</label>
                        <select
                          value={language.currencyFormat}
                          onChange={(e) => updateCurrencyFormat(e.target.value)}
                          className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-siso-text-primary"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="JPY">JPY (¥)</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {id === "notifications" && (
                    <div className="space-y-3">
                      <div className="divide-y divide-white/5 rounded-[18px] border border-white/10 bg-white/5">
                        {/* Master */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <p className="text-xs text-siso-text-muted">Turn off all notifications</p>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationsMaster}
                            onClick={() => setNotificationsMaster((v) => !v)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationsMaster ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationsMaster ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                        {/* Channel */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <BellRing className="h-4 w-4" /> Channel notifications
                          </span>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notifChannels.channel}
                            onClick={() => setNotifChannels(v => ({...v, channel: !v.channel}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notifChannels.channel ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notifChannels.channel ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                        {/* Messages */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <MessageSquare className="h-4 w-4" /> Message notifications
                          </span>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notifChannels.messages}
                            onClick={() => setNotifChannels(v => ({...v, messages: !v.messages}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notifChannels.messages ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notifChannels.messages ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                        {/* Announcements */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                            <Megaphone className="h-4 w-4" /> Announcement notifications
                          </span>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notifChannels.announcements}
                            onClick={() => setNotifChannels(v => ({...v, announcements: !v.announcements}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notifChannels.announcements ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notifChannels.announcements ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "integrations" && (
                    <div className="rounded-[18px] border border-white/10 bg-white/5 divide-y divide-white/5 text-xs">
                      <div className="flex items-center justify-between px-3 py-3">
                        <span className="text-siso-text-muted">Connections</span>
                        <span className="text-siso-text-primary">{connectedIntegrations} / {totalIntegrations}</span>
                      </div>
                      {[{name:"Notion",connected:true},{name:"Google Drive",connected:false},{name:"Slack",connected:true},{name:"Calendar",connected:false}].map(app => (
                        <div key={app.name} className="flex items-center justify-between px-3 py-3">
                          <span className="text-siso-text-primary">{app.name}</span>
                          <span className={`rounded-full px-2 py-0.5 border ${app.connected ? 'border-emerald-400/60 text-emerald-300' : 'border-siso-border/60 text-siso-text-muted'}`}>
                            {app.connected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </section>

        {/* (Removed Quick Preferences and Settings Overview per request) */}

            </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
