import { SectionHeader } from "../components/SectionHeader";
import type { CertificationBadge } from "../data";

interface CertificationsSectionProps {
  badges: CertificationBadge[];
}

export function CertificationsSection({ badges }: CertificationsSectionProps) {
  return (
    <section className="space-y-4">
      <SectionHeader label="Certifications" description="Milestones to unlock." />
      <div className="grid gap-3 sm:grid-cols-3">
        {badges.map((b) => (
          <article key={b.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{b.title}</h3>
            <p className="text-xs text-siso-text-muted">{b.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
