export interface TrackProgress {
  id: string;
  track: string;
  completion: number;
  lastActivity: string;
  renewalDate?: string;
  status: "On Track" | "Behind" | "Due Soon";
}

export const progressSummaries: TrackProgress[] = [
  {
    id: "progress-onboarding",
    track: "Onboarding Path",
    completion: 72,
    lastActivity: "Nov 8, 2025",
    status: "On Track",
  },
  {
    id: "progress-sales",
    track: "Sales Fundamentals",
    completion: 15,
    lastActivity: "Nov 6, 2025",
    status: "Behind",
    renewalDate: "Jan 20, 2026",
  },
  {
    id: "progress-ops",
    track: "Operations Readiness",
    completion: 0,
    lastActivity: "—",
    status: "Due Soon",
  },
];
