import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleScreen } from "@/domains/partnerships/community/ui/help";
import {
  helpCollections,
  getHelpArticle,
} from "@/domains/partnerships/community/help/data/help-center";

export const metadata: Metadata = {
  title: "Help Article • SISO Partner Community",
};

export function generateStaticParams() {
  return helpCollections.flatMap((collection) =>
    collection.articles.map((article) => ({
      collection: collection.slug,
      article: article.slug,
    })),
  );
}

type PartnersCommunityHelpArticlePageProps = {
  params: { collection: string; article: string };
};

export default function PartnersCommunityHelpArticlePage({
  params,
}: PartnersCommunityHelpArticlePageProps) {
  const result = getHelpArticle(params.collection, params.article);
  if (!result || !result.collection || !result.article) {
    notFound();
  }

  return <HelpArticleScreen collection={result.collection} article={result.article} />;
}
