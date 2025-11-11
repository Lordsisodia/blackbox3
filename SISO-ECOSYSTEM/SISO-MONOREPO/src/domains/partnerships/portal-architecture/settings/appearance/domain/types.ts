export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  primaryColor: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
  highContrast: boolean;
  hapticFeedback: boolean;
}

export const THEME_OPTIONS = ["light", "dark", "system"] as const;
export const FONT_SIZE_OPTIONS = ["small", "medium", "large"] as const;
