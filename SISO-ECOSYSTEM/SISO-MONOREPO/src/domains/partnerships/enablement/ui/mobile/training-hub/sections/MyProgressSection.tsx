import { SectionHeader } from "../components/SectionHeader";
import type { TrackProgress } from "../data";

interface MyProgressSectionProps {
  summaries: TrackProgress[];
}

export function MyProgressSection({ summaries }: MyProgressSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader label="My Progress" description="Track-by-track snapshots." />
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {summaries.map((summary) => (
          <article
            key={summary.id}
            className="min-w-[220px] rounded-3xl border border-siso-border bg-siso-bg-secondary p-4"
          >
            <p className="text-xs text-siso-text-muted">{summary.track}</p>
            <p className="mt-1 text-2xl font-semibold text-siso-text-primary">{summary.completion}%</p>
            <p className="text-xs text-siso-text-muted">Last activity: {summary.lastActivity}</p>
            {summary.renewalDate ? (
              <p className="mt-3 text-xs text-siso-orange">Renewal by {summary.renewalDate}</p>
            ) : null}
            <span className="mt-3 inline-flex w-fit rounded-full bg-siso-bg-hover px-3 py-1 text-xs text-siso-text-muted">
              {summary.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
