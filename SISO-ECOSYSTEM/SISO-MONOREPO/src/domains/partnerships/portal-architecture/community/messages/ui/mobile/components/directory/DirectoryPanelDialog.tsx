import { MessageSquare, X } from "lucide-react";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import type { DirectoryPanel } from "../DirectoryOverlay";

interface PanelEntry {
  id: string;
  name: string;
  note?: string;
}

interface PanelData {
  title: string;
  description: string;
  entries: PanelEntry[];
  emptyLabel: string;
  searchPlaceholder?: string;
}

type DirectoryPanelDialogProps = {
  panel: DirectoryPanel;
  panelData: PanelData;
  panelSearch: string;
  onPanelSearchChange: (value: string) => void;
  onClose: () => void;
};

export function DirectoryPanelDialog({ panel, panelData, panelSearch, onPanelSearchChange, onClose }: DirectoryPanelDialogProps) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-6" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-3xl border border-siso-border bg-siso-bg-primary px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-black uppercase tracking-[0.08em] leading-tight text-siso-text-primary/90">
            {panelData.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-siso-text-muted underline-offset-4 hover:text-siso-orange hover:underline"
          >
            Close
          </button>
        </div>
        <p className="mb-4 text-sm text-siso-text-muted">{panelData.description}</p>
        <GlowDivider className="mb-4" animated={false} />

        {panelData.searchPlaceholder ? (
          <div className="mb-4">
            <label className="sr-only" htmlFor="panel-search">
              {panelData.searchPlaceholder}
            </label>
            <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/80 px-3 py-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-siso-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-2-2" strokeLinecap="round" />
              </svg>
              <input
                id="panel-search"
                value={panelSearch}
                onChange={(event) => onPanelSearchChange(event.target.value)}
                placeholder={panelData.searchPlaceholder}
                className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
              />
            </div>
          </div>
        ) : null}

        <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-2">
          {panelData.entries.filter((entry) => {
            if (!panelSearch.trim()) return true;
            return entry.name.toLowerCase().includes(panelSearch.toLowerCase());
          }).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-siso-border/80 bg-siso-bg-secondary/60 px-4 py-6 text-center text-sm text-siso-text-muted">
              {panelData.emptyLabel}
            </div>
          ) : (
            panelData.entries
              .filter((entry) => {
                if (!panelSearch.trim()) return true;
                return entry.name.toLowerCase().includes(panelSearch.toLowerCase());
              })
              .map((entry) => (
                <div key={entry.id} className="flex items-center gap-3 rounded-2xl border border-siso-border/80 bg-siso-bg-secondary px-4 py-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-siso-bg-tertiary text-sm font-semibold uppercase text-siso-text-primary">
                    {entry.name
                      .split(" ")
                      .map((segment) => segment.charAt(0))
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-siso-text-primary">{entry.name}</p>
                    {entry.note ? <p className="truncate text-xs text-siso-text-muted">{entry.note}</p> : null}
                  </div>
                  {panel !== "blocked" ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-siso-border/80 text-siso-text-primary hover:border-siso-orange hover:text-siso-orange"
                        aria-label="Message contact"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-siso-border/80 text-siso-text-muted hover:border-siso-red/60 hover:text-siso-red"
                        aria-label="Remove contact"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="rounded-full border border-siso-border/80 px-3 py-1 text-xs text-siso-text-muted hover:border-siso-red/70 hover:text-siso-red"
                    >
                      Unblock
                    </button>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
