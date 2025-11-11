"use client";

import { useAppearanceSettings } from "../application/useAppearanceSettings";

export function AppearanceSettingsScreen() {
  const {
    settings,
    updateTheme,
    updateFontSize,
    toggleReducedMotion,
    toggleHighContrast,
    toggleHapticFeedback,
  } = useAppearanceSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Appearance & Accessibility</h1>
        <p className="text-muted-foreground">
          Customize how the app looks and feels
        </p>
      </div>

      {/* Theme Selection */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Theme</h2>
        {/* TODO: Add theme selector UI */}
        <div>Current: {settings.theme}</div>
      </section>

      {/* Font Size */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Font Size</h2>
        {/* TODO: Add font size selector UI */}
        <div>Current: {settings.fontSize}</div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Accessibility</h2>
        {/* TODO: Add toggle switches */}
        <div>Reduced Motion: {settings.reducedMotion ? "On" : "Off"}</div>
        <div>High Contrast: {settings.highContrast ? "On" : "Off"}</div>
        <div>Haptic Feedback: {settings.hapticFeedback ? "On" : "Off"}</div>
      </section>
    </div>
  );
}
