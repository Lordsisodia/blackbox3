import { Users } from "lucide-react";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import type { ThreadOverview } from "../DirectoryOverlay";
import { ThreadRow } from "./ThreadRow";

type ThreadSection = {
  label: string;
  entries: ThreadOverview[];
};

type DirectorySectionsProps = {
  sections: ThreadSection[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
};

export function DirectorySections({ sections, activeThreadId, onSelectThread }: DirectorySectionsProps) {
  return (
    <div className="space-y-3 overflow-y-auto pr-1">
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary px-4 py-3 text-left">
        <div className="mb-1 flex items-center gap-2 text-siso-text-primary">
          <Users className="h-5 w-5 text-siso-orange" />
          <p className="text-sm font-semibold">Saved Messages</p>
        </div>
        <p className="text-xs text-siso-text-muted">Your personal space to pin ideas, drafts, and proofs.</p>
      </div>

      {sections.length > 0 ? (
        sections.map(({ label, entries }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{label}</p>
              <GlowDivider className="flex-1" height={2} animated={false} />
            </div>
            <div className="space-y-1">
              {entries.map((thread) => (
                <ThreadRow
                  key={thread.id}
                  thread={thread}
                  isActive={thread.id === activeThreadId}
                  onSelect={() => onSelectThread(thread.id)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed border-siso-border/80 bg-siso-bg-secondary/60 px-4 py-5 text-center text-sm text-siso-text-muted">
          You’re all caught up.
          <button type="button" className="ml-1 text-siso-orange underline-offset-4 hover:underline">
            Discover new partners
          </button>
        </div>
      )}
    </div>
  );
}
