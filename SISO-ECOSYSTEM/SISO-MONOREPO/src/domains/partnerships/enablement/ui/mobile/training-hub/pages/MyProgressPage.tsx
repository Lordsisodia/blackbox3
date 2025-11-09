import { MyProgressSection } from "../sections";
import { progressSummaries } from "../data";

export function MyProgressPage() {
  return (
    <div className="space-y-6 p-4">
      <MyProgressSection summaries={progressSummaries} />
    </div>
  );
}
