import { SectionHeader } from "../components/SectionHeader";
import type { KnowledgeArticle } from "../data";

interface KnowledgeBaseSectionProps {
  articles: KnowledgeArticle[];
}

export function KnowledgeBaseSection({ articles }: KnowledgeBaseSectionProps) {
  return (
    <section className="space-y-4">
      <SectionHeader label="Knowledge Base" description="Short reads for quick wins." />
      <div className="grid gap-3 sm:grid-cols-3">
        {articles.map((a) => (
          <article key={a.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{a.title}</h3>
            <p className="text-xs text-siso-text-muted">{a.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
