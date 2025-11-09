export type CertificationStatus = "earned" | "in-progress" | "locked";

export interface CertificationBadge {
  id: string;
  title: string;
  status: CertificationStatus;
  expiryDate?: string;
  unlockCriteria: string;
}

export const certificationBadges: CertificationBadge[] = [
  {
    id: "cert-sales",
    title: "Certified Sales Partner",
    status: "earned",
    expiryDate: "Aug 12, 2026",
    unlockCriteria: "Complete Sales Fundamentals path + score 80% on quiz",
  },
  {
    id: "cert-automation",
    title: "Automation Co-Sell",
    status: "in-progress",
    unlockCriteria: "Finish Automation Ops Sprint and submit 2 case studies",
  },
  {
    id: "cert-elite",
    title: "Elite Revenue Architect",
    status: "locked",
    unlockCriteria: "Maintain 3 closed deals/quarter + 95% CSAT",
  },
];
