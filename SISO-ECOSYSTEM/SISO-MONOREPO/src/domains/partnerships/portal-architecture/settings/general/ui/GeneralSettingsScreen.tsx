"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Palette, Globe, Bell, Link2, ChevronRight, BellRing, MessageSquare, Megaphone, ChevronLeft, DollarSign, CheckSquare, Users, CreditCard, MessageCircle, Moon, Sun, Smartphone, AlertTriangle, Star, TrendingUp, Info } from "lucide-react";
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
    badge: null,
    color: "purple"
  },
  {
    id: "integrations",
    title: "App Integrations",
    description: "Connect Notion, Google Drive, Calendar, and other tools",
    icon: Link2,
    href: "/partners/settings/integrations",
    badge: null,
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
  const [notificationTypes, setNotificationTypes] = useState({
    deals: true,
    tasks: true,
    system: true,
    social: true,
    financial: true,
    sms: false,
    push: true,
    email: true,
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: "22:00",
    endTime: "08:00",
    timezone: "America/New_York",
  });

  const [priorityLevels, setPriorityLevels] = useState({
    critical: true,
    high: true,
    medium: true,
    low: false,
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

                        {/* Deal Notifications */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <DollarSign className="h-4 w-4" /> Deal notifications
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Deal Notifications Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• New deal opportunities</li>
                                  <li>• Deal stage updates</li>
                                  <li>• Commission earned alerts</li>
                                  <li>• Payment received notifications</li>
                                  <li>• Deal deadline reminders</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.deals}
                            onClick={() => setNotificationTypes(v => ({...v, deals: !v.deals}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.deals ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.deals ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Task Notifications */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <CheckSquare className="h-4 w-4" /> Task notifications
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Task Notifications Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Task assignments</li>
                                  <li>• Deadline reminders</li>
                                  <li>• Task updates</li>
                                  <li>• Collaboration requests</li>
                                  <li>• Task completion alerts</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.tasks}
                            onClick={() => setNotificationTypes(v => ({...v, tasks: !v.tasks}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.tasks ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.tasks ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* System Updates */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <AlertTriangle className="h-4 w-4" /> System updates
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">System Updates Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Platform changes</li>
                                  <li>• Feature releases</li>
                                  <li>• Maintenance notices</li>
                                  <li>• Security alerts</li>
                                  <li>• Service updates</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.system}
                            onClick={() => setNotificationTypes(v => ({...v, system: !v.system}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.system ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.system ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Social Interactions */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <Users className="h-4 w-4" /> Social interactions
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Social Interactions Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Comments on content</li>
                                  <li>• Mentions and tags</li>
                                  <li>• Follow notifications</li>
                                  <li>• Likes and reactions</li>
                                  <li>• Connection requests</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.social}
                            onClick={() => setNotificationTypes(v => ({...v, social: !v.social}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.social ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.social ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Financial Notifications */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <CreditCard className="h-4 w-4" /> Financial notifications
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Financial Notifications Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Payment received</li>
                                  <li>• Commission earned</li>
                                  <li>• Invoice generated</li>
                                  <li>• Contract changes</li>
                                  <li>• Billing updates</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.financial}
                            onClick={() => setNotificationTypes(v => ({...v, financial: !v.financial}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.financial ? "bg-siso-orange/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.financial ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* SMS Notifications */}
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <Smartphone className="h-4 w-4" /> SMS notifications
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">SMS Notifications Include:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Critical security alerts</li>
                                  <li>• Urgent payment notifications</li>
                                  <li>• Account verification codes</li>
                                  <li>• Emergency system alerts</li>
                                  <li>• Time-sensitive updates</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={notificationTypes.sms}
                            onClick={() => setNotificationTypes(v => ({...v, sms: !v.sms}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              notificationTypes.sms ? "bg-orange-500/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                notificationTypes.sms ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Quiet Hours Section */}
                      <div className="divide-y divide-white/5 rounded-[18px] border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between gap-3 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                              <Moon className="h-4 w-4" /> Quiet hours
                            </span>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-48 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Quiet Hours:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• Suppress non-critical notifications</li>
                                  <li>• Set sleep/wake times</li>
                                  <li>• Critical alerts still break through</li>
                                  <li>• Timezone-aware scheduling</li>
                                  <li>• Preserve work-life balance</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={quietHours.enabled}
                            onClick={() => setQuietHours(v => ({...v, enabled: !v.enabled}))}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                              quietHours.enabled ? "bg-purple-500/80" : "bg-siso-border/60"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                quietHours.enabled ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                        {quietHours.enabled && (
                          <div className="px-3 py-3 space-y-2">
                            <div className="flex items-center gap-3">
                              <Sun className="h-4 w-4 text-siso-text-muted" />
                              <input
                                type="time"
                                value={quietHours.startTime}
                                onChange={(e) => setQuietHours(v => ({...v, startTime: e.target.value}))}
                                className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-xs text-siso-text-primary"
                              />
                              <span className="text-xs text-siso-text-muted">to</span>
                              <Moon className="h-4 w-4 text-siso-text-muted" />
                              <input
                                type="time"
                                value={quietHours.endTime}
                                onChange={(e) => setQuietHours(v => ({...v, endTime: e.target.value}))}
                                className="rounded-lg border border-siso-border/60 bg-transparent px-2 py-1 text-xs text-siso-text-primary"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Priority Levels Section */}
                      <div className="divide-y divide-white/5 rounded-[18px] border border-white/10 bg-white/5">
                        <div className="px-3 py-3">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs text-siso-text-muted">Priority levels</p>
                            <div className="group relative">
                              <Info className="h-3 w-3 text-siso-text-muted cursor-help" />
                              <div className="absolute left-0 top-5 z-50 hidden w-52 rounded-lg bg-siso-bg-secondary border border-siso-border/60 p-2 text-xs text-siso-text-primary shadow-lg group-hover:block">
                                <p className="font-semibold mb-1">Priority Levels Explained:</p>
                                <ul className="space-y-1 text-siso-text-muted">
                                  <li>• <span className="text-red-400">Critical:</span> Security, payments, system downtime</li>
                                  <li>• <span className="text-orange-400">High:</span> Deals, commissions, deadlines</li>
                                  <li>• <span className="text-blue-400">Medium:</span> Messages, social, task updates</li>
                                  <li>• <span className="text-gray-400">Low:</span> Likes, follows, general updates</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {/* Critical */}
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                                <Star className="h-4 w-4 text-red-400" /> Critical
                              </span>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={priorityLevels.critical}
                                onClick={() => setPriorityLevels(v => ({...v, critical: !v.critical}))}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                                  priorityLevels.critical ? "bg-red-500/80" : "bg-siso-border/60"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                    priorityLevels.critical ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                            {/* High */}
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                                <TrendingUp className="h-4 w-4 text-orange-400" /> High
                              </span>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={priorityLevels.high}
                                onClick={() => setPriorityLevels(v => ({...v, high: !v.high}))}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                                  priorityLevels.high ? "bg-orange-400/80" : "bg-siso-border/60"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                    priorityLevels.high ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                            {/* Medium */}
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                                <MessageCircle className="h-4 w-4 text-blue-400" /> Medium
                              </span>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={priorityLevels.medium}
                                onClick={() => setPriorityLevels(v => ({...v, medium: !v.medium}))}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                                  priorityLevels.medium ? "bg-blue-400/80" : "bg-siso-border/60"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                    priorityLevels.medium ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                            {/* Low */}
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-xs text-siso-text-muted">
                                <Bell className="h-4 w-4 text-gray-400" /> Low
                              </span>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={priorityLevels.low}
                                onClick={() => setPriorityLevels(v => ({...v, low: !v.low}))}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                                  priorityLevels.low ? "bg-gray-400/80" : "bg-siso-border/60"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                    priorityLevels.low ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
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
