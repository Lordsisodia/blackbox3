import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCollectionScreen } from "@/domains/partnerships/community/ui/help";
import {
  getHelpCollection,
  getHelpCollections,
} from "@/domains/partnerships/community/help/data/help-center";

export const metadata: Metadata = {
  title: "Help Collection • SISO Partner Community",
};

export function generateStaticParams() {
  return getHelpCollections().map((collection) => ({ collection: collection.slug }));
}

type PartnersCommunityHelpCollectionPageProps = {
  params: { collection: string };
};

export default function PartnersCommunityHelpCollectionPage({
  params,
}: PartnersCommunityHelpCollectionPageProps) {
  const collection = getHelpCollection(params.collection);
  if (!collection) {
    notFound();
  }

  return <HelpCollectionScreen collection={collection} />;
}
