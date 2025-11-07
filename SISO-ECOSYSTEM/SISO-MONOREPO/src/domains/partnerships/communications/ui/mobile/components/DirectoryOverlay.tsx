import { useEffect, useMemo, useState } from "react";
import { MessageCircle, MessageSquare, MoreVertical, Users, X } from "lucide-react";

import { cn } from "@/domains/shared/utils/cn";

type DirectoryPanel = "all" | "outgoing" | "blocked" | null;

export type ThreadOverview = {
  id: string;
  name: string;
  preview: string;
  unreadCount?: number;
  badge?: string;
};

type DirectoryItem = {
  id: string;
  name: string;
  note?: string;
};

type DirectoryOverlayProps = {
  isOpen: boolean;
  threads: ThreadOverview[];
  activeThreadId: string | null;
  onClose: () => void;
  onSelectThread: (threadId: string) => void;
  outgoingRequests: DirectoryItem[];
  blockedUsers: DirectoryItem[];
};

export function DirectoryOverlay({
  isOpen,
  threads,
  activeThreadId,
  onClose,
  onSelectThread,
  outgoingRequests,
  blockedUsers,
}: DirectoryOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<DirectoryPanel>(null);
  const [search, setSearch] = useState("");
  const [panelSearch, setPanelSearch] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
      setActivePanel(null);
      setSearch("");
      setPanelSearch("");
    }
  }, [isOpen]);

  const panelData = useMemo(() => {
    switch (activePanel) {
      case "outgoing":
        return {
          title: "Outgoing Requests",
          description: "Pending friendship or collaboration requests you have sent.",
          entries: outgoingRequests,
          emptyLabel: "No pending requests",
          searchPlaceholder: "Search outgoing requests",
        };
      case "blocked":
        return {
          title: "Blocked Contacts",
          description: "Users you have muted or blocked from your workspace.",
          entries: blockedUsers,
          emptyLabel: "You haven't blocked anyone yet",
          searchPlaceholder: "Search blocked users",
        };
      case "all":
        return {
          title: "All Contacts",
          description: "Full directory of recent conversations and connections.",
          entries: threads.map(({ id, name, preview }) => ({ id, name, note: preview })),
          emptyLabel: "No contacts available",
          searchPlaceholder: "Search contacts",
        };
      default:
        return null;
    }
  }, [activePanel, blockedUsers, outgoingRequests, threads]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[65] flex">
        <aside className="h-full w-[90%] max-w-md border-r border-siso-border bg-siso-bg-secondary px-5 py-6 shadow-[12px_0_40px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-siso-text-primary">
                <MessageCircle className="h-5 w-5 text-siso-orange" />
              <h2 className="text-base font-black uppercase tracking-[0.08em] leading-tight text-siso-text-primary/90">
                Messages & Friends
              </h2>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="rounded-full p-2 text-siso-text-muted transition hover:text-siso-orange"
                aria-label="Directory actions"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-siso-border bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                  {[
                    { label: "All Friends", panel: "all" as DirectoryPanel },
                    { label: "Outgoing", panel: "outgoing" as DirectoryPanel },
                    { label: "Blocked Users", panel: "blocked" as DirectoryPanel },
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-siso-text-primary transition hover:bg-siso-bg-hover"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActivePanel(option.panel);
                        setPanelSearch("");
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="sr-only" htmlFor="messages-search">
              Search conversations
            </label>
            <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/70 px-3 py-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-siso-text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-2-2" strokeLinecap="round" />
              </svg>
              <input
                id="messages-search"
                type="text"
                placeholder="Search friends & messages"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1">
            <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary px-4 py-3 text-left">
              <div className="mb-1 flex items-center gap-2 text-siso-text-primary">
                <Users className="h-5 w-5 text-siso-orange" />
                <p className="text-sm font-semibold">Saved Messages</p>
              </div>
              <p className="text-xs text-siso-text-muted">
                Your personal space to pin ideas, drafts, and proofs.
              </p>
            </div>

            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const matchesSearch =
                search.trim().length === 0 ||
                thread.name.toLowerCase().includes(search.toLowerCase()) ||
                thread.preview.toLowerCase().includes(search.toLowerCase());

              if (!matchesSearch) {
                return null;
              }

              return (
                <button
                  key={thread.id}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition",
                    isActive
                      ? "bg-siso-orange/10 text-siso-text-primary"
                      : "text-siso-text-secondary hover:bg-siso-bg-tertiary/70",
                  )}
                  onClick={() => onSelectThread(thread.id)}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-siso-orange/40 text-siso-orange" : "bg-siso-bg-tertiary text-siso-text-muted",
                    )}
                  >
                    {thread.name.charAt(0)}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-semibold">
                      {thread.name}
                      {thread.badge ? <span className="ml-1 text-xs text-siso-orange">{thread.badge}</span> : null}
                    </p>
                    <p className="truncate text-xs text-siso-text-muted">{thread.preview}</p>
                  </div>
                  {thread.unreadCount ? (
                    <span className="rounded-full bg-siso-red/20 px-2 py-1 text-xs text-siso-red">{thread.unreadCount}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>
        <button type="button" aria-label="Close overlay" className="flex-1 bg-black/55" onClick={onClose} />
      </div>

      {activePanel && panelData && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl border border-siso-border bg-siso-bg-primary px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-black uppercase tracking-[0.08em] leading-tight text-siso-text-primary/90">
                {panelData.title}
              </h3>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="text-sm text-siso-text-muted underline-offset-4 hover:text-siso-orange hover:underline"
              >
                Close
              </button>
            </div>
            <p className="mb-4 text-sm text-siso-text-muted">{panelData.description}</p>

            {panelData.searchPlaceholder ? (
              <div className="mb-4">
                <label className="sr-only" htmlFor="panel-search">
                  {panelData.searchPlaceholder}
                </label>
                <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/80 px-3 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-siso-text-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="11" cy="11" r="6" />
                    <path d="m20 20-2-2" strokeLinecap="round" />
                  </svg>
                  <input
                    id="panel-search"
                    value={panelSearch}
                    onChange={(event) => setPanelSearch(event.target.value)}
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
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 rounded-2xl border border-siso-border/80 bg-siso-bg-secondary px-4 py-3"
                    >
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
                      {activePanel !== "blocked" ? (
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
      )}
    </>
  );
}
