import { SectionHeader } from "../components/SectionHeader";
import type { KnowledgeArticle } from "../data";

interface KnowledgeBaseSectionProps {
  articles: KnowledgeArticle[];
}

export function KnowledgeBaseSection({ articles }: KnowledgeBaseSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader label="Knowledge Base" description="Search playbooks and quick answers." />
      <div>
        <input
          type="search"
          placeholder="Search articles"
          className="w-full rounded-full border border-siso-border bg-transparent px-4 py-2 text-sm text-siso-text-primary"
        />
      </div>
      <div className="space-y-3">
        {articles.map((article) => (
          <article key={article.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <p className="text-xs text-siso-text-muted">{article.tag}</p>
            <h3 className="text-base font-semibold text-siso-text-primary">{article.title}</h3>
            <p className="text-xs text-siso-text-muted">
              Updated {article.updatedAt} • Owner: {article.owner}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
