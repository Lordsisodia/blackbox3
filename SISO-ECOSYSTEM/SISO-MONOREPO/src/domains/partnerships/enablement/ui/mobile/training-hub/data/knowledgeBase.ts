export interface KnowledgeArticle {
  id: string;
  title: string;
  tag: string;
  updatedAt: string;
  owner: string;
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "kb-referrals",
    title: "Logging Referrals in Under 2 Minutes",
    tag: "Referrals",
    updatedAt: "Nov 7, 2025",
    owner: "Support Guild",
  },
  {
    id: "kb-checklist",
    title: "Daily Checklist Template",
    tag: "Workflow",
    updatedAt: "Nov 3, 2025",
    owner: "Program Ops",
  },
  {
    id: "kb-cert",
    title: "Certification Renewal FAQ",
    tag: "Certifications",
    updatedAt: "Oct 28, 2025",
    owner: "Enablement",
  },
];
