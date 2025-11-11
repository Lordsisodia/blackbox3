import { useState } from "react";
import type { AppearanceSettings } from "../domain/types";

export function useAppearanceSettings() {
  const [settings, setSettings] = useState<AppearanceSettings>({
    theme: "system",
    primaryColor: "#3b82f6",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
    hapticFeedback: true,
  });

  const updateTheme = (theme: AppearanceSettings["theme"]) => {
    setSettings((prev) => ({ ...prev, theme }));
    // TODO: Call API to save
  };

  const updateFontSize = (fontSize: AppearanceSettings["fontSize"]) => {
    setSettings((prev) => ({ ...prev, fontSize }));
    // TODO: Call API to save
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
    // TODO: Call API to save
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
    // TODO: Call API to save
  };

  const toggleHapticFeedback = () => {
    setSettings((prev) => ({ ...prev, hapticFeedback: !prev.hapticFeedback }));
    // TODO: Call API to save
  };

  return {
    settings,
    updateTheme,
    updateFontSize,
    toggleReducedMotion,
    toggleHighContrast,
    toggleHapticFeedback,
  };
}
