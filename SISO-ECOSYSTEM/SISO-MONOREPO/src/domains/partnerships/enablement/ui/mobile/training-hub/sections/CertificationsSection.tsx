import { SectionHeader } from "../components/SectionHeader";
import type { CertificationBadge } from "../data";

interface CertificationsSectionProps {
  badges: CertificationBadge[];
}

export function CertificationsSection({ badges }: CertificationsSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader label="Certifications" description="Badges, unlocks, and renewals." />
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {badges.map((badge) => (
          <article
            key={badge.id}
            className="min-w-[200px] rounded-3xl border border-siso-border bg-siso-bg-secondary p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">{badge.status}</p>
            <h3 className="mt-1 text-base font-semibold text-siso-text-primary">{badge.title}</h3>
            {badge.expiryDate ? (
              <p className="text-xs text-siso-text-muted">Expires {badge.expiryDate}</p>
            ) : (
              <p className="text-xs text-siso-text-muted">No expiry yet</p>
            )}
            <p className="mt-3 text-xs text-siso-text-muted">{badge.unlockCriteria}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
