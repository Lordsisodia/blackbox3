import { KnowledgeBaseSection } from "../sections";
import { knowledgeArticles } from "../data";

export function KnowledgeBasePage() {
  return (
    <div className="space-y-6 p-4">
      <KnowledgeBaseSection articles={knowledgeArticles} />
    </div>
  );
}
