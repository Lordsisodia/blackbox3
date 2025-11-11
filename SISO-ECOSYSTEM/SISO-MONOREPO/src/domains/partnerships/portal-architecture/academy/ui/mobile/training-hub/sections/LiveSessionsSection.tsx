import { SectionHeader } from "../components/SectionHeader";
import type { LiveSession } from "../data";

interface LiveSessionsSectionProps {
  sessions: LiveSession[];
}

function buttonLabel(status: LiveSession["status"]) {
  if (status === "open") return "Join";
  if (status === "rsvp") return "RSVP";
  return "Watch replay";
}

export function LiveSessionsSection({ sessions }: LiveSessionsSectionProps) {
  return (
    <section className="space-y-4">
      <SectionHeader label="Live Sessions" description="Office hours and webinars." />
      <div className="grid gap-3 sm:grid-cols-2">
        {sessions.map((s) => (
          <article key={s.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{s.title}</h3>
            <p className="text-xs text-siso-text-muted">{new Date(s.date).toLocaleString()}</p>
            <div className="mt-3">
              <button type="button" className="rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted">
                {buttonLabel(s.status)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
