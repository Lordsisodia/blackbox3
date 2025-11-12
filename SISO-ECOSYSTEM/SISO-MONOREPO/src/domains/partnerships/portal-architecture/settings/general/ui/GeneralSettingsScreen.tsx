"use client";

import { Settings, Palette, Globe, Bell, Link2 } from "lucide-react";
import { useGeneralSettings } from "../application/useGeneralSettings";
import {
  QuickSettingsCard,
  SettingsOverview,
  AppearancePreview,
  NotificationsPreview,
  LanguagePreview,
  IntegrationsPreview
} from "./components";

export function GeneralSettingsScreen() {
  const { settings, loading, error } = useGeneralSettings();

  // Debug logging
  console.log('GeneralSettingsScreen - loading:', loading);
  console.log('GeneralSettingsScreen - error:', error);
  console.log('GeneralSettingsScreen - settings:', settings);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 pb-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-siso-orange" />
            <h1 className="text-2xl font-bold text-siso-text-primary">General Settings</h1>
          </div>
          <p className="text-siso-text-muted">
            Loading your settings...
          </p>
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-siso-bg-secondary rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 pb-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold text-siso-text-primary">General Settings</h1>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-medium mb-2">Unable to load settings</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2 pb-6">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-siso-orange" />
          <h1 className="text-2xl font-bold text-siso-text-primary">General Settings</h1>
        </div>
        <p className="text-siso-text-muted">
          Quick access to appearance, notifications, language, and integration preferences.
          Manage your most-used settings from one central location.
        </p>
      </div>

      {/* Quick Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Appearance & Accessibility Card */}
        <QuickSettingsCard
          title="Appearance & Accessibility"
          description="Theme, contrast, font size, reduced motion, haptics"
          icon={<Palette className="h-8 w-8" />}
          href="/partners/settings/appearance"
          badge={settings.hasUnsavedAppearanceChanges ? "Modified" : null}
          color="orange"
          preview={
            <AppearancePreview
              theme={settings.currentTheme}
              fontSize={settings.fontSize}
              reducedMotion={settings.reducedMotion}
            />
          }
        />

        {/* Language & Region Card */}
        <QuickSettingsCard
          title="Language & Region"
          description="Language, timezone, number/currency formats"
          icon={<Globe className="h-8 w-8" />}
          href="/partners/settings/language"
          badge={settings.currentLanguage !== "en" ? "Modified" : null}
          color="blue"
          preview={
            <LanguagePreview
              language={settings.currentLanguage}
              timezone={settings.currentTimezone}
            />
          }
        />

        {/* Notifications Card */}
        <QuickSettingsCard
          title="Notifications"
          description="Email, push, and in-app notification preferences"
          icon={<Bell className="h-8 w-8" />}
          href="/partners/settings/account/notifications"
          badge={settings.unreadNotifications > 0 ? `${settings.unreadNotifications}` : null}
          color="purple"
          preview={
            <NotificationsPreview
              unreadCount={settings.unreadNotifications}
              enabledCategories={settings.enabledNotificationCategories}
              totalCategories={settings.totalNotificationCategories}
            />
          }
        />

        {/* App Integrations Card */}
        <QuickSettingsCard
          title="App Integrations"
          description="Connect Notion, Google Drive, Calendar, and other tools"
          icon={<Link2 className="h-8 w-8" />}
          href="/partners/settings/integrations"
          badge={settings.connectedIntegrations > 0 ? `${settings.connectedIntegrations} connected` : null}
          color="green"
          preview={
            <IntegrationsPreview integrations={settings.integrations} />
          }
        />
      </div>

      {/* Settings Overview */}
      <SettingsOverview
        settingsCompleteness={settings.settingsCompleteness}
        connectedIntegrations={settings.connectedIntegrations}
        notificationCategories={settings.enabledNotificationCategories}
        securityScore={settings.securityScore}
        lastSettingsUpdate={settings.lastSettingsUpdate}
      />
    </div>
  );
}
