import { LiveSessionsSection } from "../sections";
import { upcomingSessions } from "../data";

export function LiveSessionsPage() {
  return (
    <div className="space-y-6 p-4">
      <LiveSessionsSection sessions={upcomingSessions} />
    </div>
  );
}
