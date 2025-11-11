import { SectionHeader } from "../components/SectionHeader";
import type { TrackProgress } from "../data";

interface MyProgressSectionProps {
  summaries: TrackProgress[];
}

export function MyProgressSection({ summaries }: MyProgressSectionProps) {
  return (
    <section className="space-y-4">
      <SectionHeader label="My Progress" description="Track progress by training area." />
      <div className="grid gap-3 sm:grid-cols-3">
        {summaries.map((sum) => (
          <article key={sum.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{sum.label}</h3>
            <div className="mt-2 h-2 w-full rounded-full bg-siso-bg-hover">
              <div className="h-2 rounded-full bg-siso-orange" style={{ width: `${sum.progress}%` }} />
            </div>
            <p className="mt-1 text-xs text-siso-text-muted">{sum.progress}% complete</p>
          </article>
        ))}
      </div>
    </section>
  );
}
