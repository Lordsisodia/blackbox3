"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Palette, Globe, Bell, Link2, ChevronRight, BellRing, MessageSquare, Megaphone, ChevronLeft, DollarSign, CheckSquare, Users, CreditCard, MessageCircle, Moon, Sun, Smartphone, AlertTriangle, Star, TrendingUp, Info as InfoIcon } from "lucide-react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { useAppearanceSettings } from "../sections/appearance/application/useAppearanceSettings";
import { useLanguageSettings } from "../sections/language/application/useLanguageSettings";
import { LanguageDropdown } from "./LanguageDropdown";
import { TimezoneDropdown } from "./TimezoneDropdown";
import Switch from "@/components/ui/sky-toggle";
import { ThemeToggle } from "./ThemeToggle";

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

  // Notification info state for bottom popup
  const [notificationInfo, setNotificationInfo] = useState<{
    type: string;
    title: string;
    description: string;
    items: string[];
  } | null>(null);

  const notificationInfoData = {
    deals: {
      title: "Deal Notifications",
      description: "Stay informed about business opportunities and revenue-generating activities",
      items: [
        "New deal opportunities from partners",
        "Deal stage updates and progress",
        "Commission earned notifications",
        "Payment received confirmations",
        "Deal deadline reminders",
        "Contract renewal notifications"
      ]
    },
    tasks: {
      title: "Task Notifications",
      description: "Keep track of your responsibilities and collaborative work",
      items: [
        "Task assignments from team members",
        "Deadline reminders and alerts",
        "Task status updates",
        "Collaboration requests",
        "Task completion notifications",
        "Project milestone updates"
      ]
    },
    system: {
      title: "System Updates",
      description: "Important platform changes and maintenance information",
      items: [
        "New feature releases",
        "Platform improvements",
        "Scheduled maintenance",
        "Security alerts and patches",
        "Service status updates",
        "API changes and deprecations"
      ]
    },
    social: {
      title: "Social Interactions",
      description: "Stay connected with your network and community",
      items: [
        "Comments on your content",
        "Mentions and tags from others",
        "Follow notifications",
        "Likes and reactions",
        "Connection requests",
        "Share notifications"
      ]
    },
    financial: {
      title: "Financial Notifications",
      description: "Monitor your earnings and financial activities",
      items: [
        "Payment received confirmations",
        "Commission earned updates",
        "Invoice generated notifications",
        "Contract changes and updates",
        "Billing and subscription alerts",
        "Tax document notifications"
      ]
    },
    sms: {
      title: "SMS Notifications",
      description: "Critical alerts delivered directly to your phone",
      items: [
        "Security breach alerts",
        "Urgent payment notifications",
        "Account verification codes",
        "Emergency system alerts",
        "Time-sensitive updates",
        "Two-factor authentication codes"
      ]
    },
    quietHours: {
      title: "Quiet Hours",
      description: "Maintain work-life balance with intelligent notification scheduling",
      items: [
        "Suppress non-critical notifications",
        "Customizable sleep/wake times",
        "Critical alerts still break through",
        "Timezone-aware scheduling",
        "Weekend and holiday settings",
        "Preserve personal time"
      ]
    },
    priority: {
      title: "Priority Levels",
      description: "Control which notification urgency levels you receive",
      items: [
        "Critical: Security alerts, payments, system failures",
        "High: Deals, commissions, urgent deadlines",
        "Medium: Messages, social interactions, task updates",
        "Low: Likes, follows, general announcements"
      ]
    }
  };

  const connectedIntegrations = 2;
  const totalIntegrations = 4;

  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="General Settings"
      >
        <div className="general-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* General Header Card */}
          <div className="relative min-h-[128px]">
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
              title="General"
              description="Workspace defaults, appearance, and quick preferences"
              icon={<Settings className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Original General Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
        {/* Callout cards with inline controls */}
        <section className="space-y-5">

          {quickSettingsCards.map(({ id, title, description, icon: Icon, href, badge }) => (
            <section
              key={id}
              id={id}
              className="space-y-2 scroll-mt-24"
              onPointerEnter={() => {
                if (id === "appearance") {
                  // appearance route redirects to general; no prefetch needed
                } else if (id === "language") {
                  // language route redirects to general; no prefetch needed
                } else if (id === "notifications") {
                  void import("@/domains/partnerships/portal-architecture/settings/general/sections/notifications/ui/AccountNotificationsView");
                } else if (id === "integrations") {
                  void import("@/domains/partnerships/portal-architecture/settings/integrations/ui/IntegrationsSettingsScreen");
                }
              }}
              onTouchStart={() => {
                if (id === "notifications") {
                  void import("@/domains/partnerships/portal-architecture/settings/general/sections/notifications/ui/AccountNotificationsView");
                } else if (id === "integrations") {
                  void import("@/domains/partnerships/portal-architecture/settings/integrations/ui/IntegrationsSettingsScreen");
                }
              }}
            >
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
                        <ThemeToggle
                          currentTheme={appearance.theme}
                          onThemeChange={updateTheme}
                        />
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
                        <p className="mb-2 text-[11px] uppercase tracking-widest text-siso-text-muted">Language</p>
                        <LanguageDropdown
                          value={language.locale}
                          onChange={updateLocale}
                          className="w-full"
                        />
                      </div>
                      <div className="px-3 py-3">
                        <p className="mb-2 text-[11px] uppercase tracking-widest text-siso-text-muted">Timezone</p>
                        <TimezoneDropdown
                          value={language.timezone}
                          onChange={updateTimezone}
                          className="w-full"
                        />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.deals)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.tasks)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.system)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.social)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.financial)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.sms)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.quietHours)}
                            />
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
                            <InfoIcon
                              className="h-3 w-3 text-siso-text-muted cursor-pointer"
                              onClick={() => setNotificationInfo(notificationInfoData.priority)}
                            />
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

        {/* Bottom Popup for Notification Info */}
        {notificationInfo && (
          <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true">
            <button
              className="absolute inset-0 bg-black/40"
              onClick={() => setNotificationInfo(null)}
              aria-label="Dismiss notification info overlay"
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-[rgba(255,167,38,0.32)] bg-[#0b0b0b] p-4 shadow-2xl"
              style={{ boxShadow: "0 -12px 30px rgba(0,0,0,0.6)" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ color: "var(--siso-orange)" }}>
                  <InfoIcon size={16} />
                </span>
                <h3 className="text-[15px] font-semibold text-siso-text-primary">{notificationInfo.title}</h3>
              </div>
              <p className="mb-3 text-[13px] text-neutral-300 leading-snug">{notificationInfo.description}</p>
              {notificationInfo.items && notificationInfo.items.length > 0 && (
                <div className="mb-4 space-y-2">
                  {notificationInfo.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-siso-orange mt-1 text-xs">•</span>
                      <span className="text-[13px] text-neutral-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-white"
                style={{ background: "var(--siso-gradient-primary)" }}
                onClick={() => setNotificationInfo(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </SettingsDetailLayout>
    </>
  );
}
