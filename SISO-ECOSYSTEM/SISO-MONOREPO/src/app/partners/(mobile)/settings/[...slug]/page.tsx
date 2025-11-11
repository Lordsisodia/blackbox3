import { notFound } from "next/navigation";
import { getLiveSettingsRoutes, getSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";

interface SettingsDynamicPageProps {
  params: {
    slug?: string[];
  };
}

export async function generateStaticParams() {
  return getLiveSettingsRoutes().map((route) => ({
    slug: route.slug.split("/"),
  }));
}

export default async function SettingsDynamicPage({ params }: SettingsDynamicPageProps) {
  const slugSegments = params.slug ?? [];
  const route = getSettingsRouteBySlug(slugSegments);

  if (!route || route.status !== "live" || !route.component) {
    notFound();
  }

  const mod = await route.component();
  const View = mod.default;

  if (!View) {
    notFound();
  }

  return <View />;
}
