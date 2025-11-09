import { SectionHeader } from "../components/SectionHeader";
import type { LiveSession } from "../data";

interface LiveSessionsSectionProps {
  sessions: LiveSession[];
}

export function LiveSessionsSection({ sessions }: LiveSessionsSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader label="Upcoming Live Sessions" description="RSVP and sync to your calendar." />
      <div className="space-y-3">
        {sessions.map((session) => (
          <article key={session.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-siso-text-muted">{session.date}</p>
                <h3 className="text-base font-semibold text-siso-text-primary">{session.title}</h3>
                <p className="text-xs text-siso-text-muted">
                  {session.time} • {session.presenters} • {session.location}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-siso-border px-4 py-2 text-xs text-siso-text-muted"
              >
                {buttonLabel(session.status)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function buttonLabel(status: LiveSession["status"]) {
  switch (status) {
    case "open":
      return "RSVP";
    case "rsvp":
      return "Added";
    case "replay":
    default:
      return "Watch replay";
  }
}
