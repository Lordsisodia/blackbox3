import type { LucideIcon } from "lucide-react";

export type SettingsRouteStatus = "live" | "planned" | "deprecated";

export interface SettingsRouteMeta {
  tier?: "starter" | "active" | "performer" | "elite";
  featureFlag?: string;
  group: "Basics" | "Account" | "Privacy" | "Integrations" | "Growth" | "Support";
  status?: SettingsRouteStatus;
}

export interface SettingsRouteDefinition extends SettingsRouteMeta {
  id: string;
  slug: string;
  path: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  component?: () => Promise<{ default: React.ComponentType }>; // lazy import later
}

export const settingsRoutes: SettingsRouteDefinition[] = [];
