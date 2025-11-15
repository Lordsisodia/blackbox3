import type { Metadata } from "next";
import { HelpCenterScreen } from "@/domains/partnerships/community/ui/help";
import { getHelpCollections } from "@/domains/partnerships/community/help/data/help-center";

export const metadata: Metadata = {
  title: "Help Center • SISO Partner Community",
  description: "Search guides, browse collections, or reach Partner Success.",
};

export default function PartnersCommunityHelpPage() {
  const collections = getHelpCollections();
  return <HelpCenterScreen collections={collections} />;
}
