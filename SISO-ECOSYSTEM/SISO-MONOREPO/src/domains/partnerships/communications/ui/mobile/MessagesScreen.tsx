"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, MoreVertical } from "lucide-react";
import { mockThreads } from "./message-fixtures";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import type { MobileTabId } from "@/domains/partnerships/mobile/types/navigation";
import { cn } from "@/domains/shared/utils/cn";

export function MessagesScreen() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isDirectoryMenuOpen, setIsDirectoryMenuOpen] = useState(false);
  const [activeDirectoryPanel, setActiveDirectoryPanel] = useState<'all' | 'outgoing' | 'blocked' | null>(null);
  const [directorySearch, setDirectorySearch] = useState('');
  const { setImmersiveMode, setActiveTab } = useMobileNavigation();

  // Ensure the messages tab stays active and immersive when arriving here.
  useEffect(() => {
    setActiveTab('messages' as MobileTabId, { immersive: true });
  }, [setActiveTab]);

  // Ensure we always have a conversation selected for the chat view.
  useEffect(() => {
    if (!activeThread && mockThreads.length > 0) {
      setActiveThread(mockThreads[0].id);
      setImmersiveMode(true);
      setActiveTab('messages' as MobileTabId, { immersive: true });
    }
  }, [activeThread, setImmersiveMode, setActiveTab]);

  const activeThreadData = useMemo(
    () => mockThreads.find((thread) => thread.id === activeThread),
    [activeThread],
  );

  const outgoingRequests = useMemo(() => [
    { id: 'req-1', name: 'Nova Carter', note: 'Brand assets approval pending' },
    { id: 'req-2', name: 'Leo Summers', note: 'Invited to SISO Collective' },
  ], []);

  const blockedUsers = useMemo(() => [
    // start empty; hook ready for future data
  ] as Array<{ id: string; name: string; note?: string }>, []);


  const openDirectory = () => {
    setIsDirectoryOpen(true);
    setIsDirectoryMenuOpen(false);
    setActiveDirectoryPanel(null);
    setDirectorySearch('');
    setImmersiveMode(false);
    setActiveTab('messages' as MobileTabId, { immersive: false });
  };

  const closeDirectory = () => {
    setIsDirectoryMenuOpen(false);
    setActiveDirectoryPanel(null);
    setDirectorySearch('');
    setIsDirectoryOpen(false);
    setImmersiveMode(true);
    setActiveTab('messages' as MobileTabId, { immersive: true });
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThread(threadId);
    closeDirectory();
    setActiveTab('messages' as MobileTabId, { immersive: true });
  };

  return (
    <section className="relative flex flex-1 flex-col px-3 pt-1.5 pb-2.5">
      <div
        aria-hidden={isDirectoryOpen}
        className={cn(
          "flex flex-1 flex-col transition-opacity duration-150",
          isDirectoryOpen ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <header className="sticky top-0 z-20 -mx-4 mb-1 flex items-center justify-between border-b border-siso-border/70 bg-siso-bg-tertiary/85 px-3 py-1.5 backdrop-blur rounded-b-xl">
          <button
            type="button"
            onClick={openDirectory}
            className="inline-flex items-center text-siso-text-primary transition hover:text-siso-orange"
            aria-label="Open message directory"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-left">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-orange/20 text-[10px] font-semibold uppercase text-siso-orange">SA</div>
            <div className="leading-tight">
              <h1 className="text-sm font-semibold text-siso-text-primary">SISO Agency</h1>
              <p className="text-[11px] text-siso-text-muted">Active now</p>
            </div>
          </div>
          <button
            type="button"
            className="text-siso-text-muted transition hover:text-siso-orange"
            aria-label="Search conversations"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="6" />
              <path d="m20 20-2-2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <article className="flex flex-1 flex-col gap-4">
          <div className="space-y-1.25">
            <div className="flex justify-center">
              <div className="rounded-2xl border border-siso-border bg-siso-bg-secondary/80 px-3 py-1 text-[11px] text-siso-text-muted">Yesterday • 9:41 PM</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="inline-flex max-w-[80%] flex-col gap-2">
                <div className="rounded-3xl rounded-bl px-4 py-1.75 text-sm text-siso-text-primary" style={{ background: "rgba(255,255,255,0.05)" }}>
                  Hey team! Dropping the latest campaign numbers — 18% uptick in lead conversions week-over-week.
                </div>
              </div>
              <div className="ml-auto inline-flex max-w-[80%] flex-col items-end gap-2">
                <div className="rounded-3xl rounded-br bg-siso-orange/25 px-4 py-1.75 text-sm text-siso-orange/90">
                  Massive! Let’s queue the partner follow-up sequence and prep the case-study drip.
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

        <footer className="sticky bottom-0 -mx-4 mt-1 border-t border-siso-border/70 bg-siso-bg-tertiary/85 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+3px)] pt-0.75 backdrop-blur rounded-t-2xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
              aria-label="Add attachment"
            >
              +
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-full border border-siso-border bg-siso-bg-secondary px-3 py-[0.28rem]">
              <input
                type="text"
                placeholder="Message SISO Agency"
                className="flex-1 border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="text-siso-text-muted transition hover:text-siso-orange"
              aria-label="Insert emoji"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 10h.01M15 10h.01" strokeLinecap="round" />
                <path d="M8.5 14c.6 1.2 2.1 2 3.5 2s2.9-.8 3.5-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </footer>

      {isDirectoryOpen && (
        <div
          className="fixed inset-x-0 top-0 z-[75] flex"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}
        >
          <aside className="h-full w-[90%] max-w-md border-r border-siso-border bg-siso-bg-secondary px-5 py-6 shadow-[12px_0_40px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-siso-text-primary">
                <span role="img" aria-label="chat" className="text-lg">💬</span>
                <h2 className="text-xl font-semibold">Messages & Friends</h2>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDirectoryMenuOpen((prev) => !prev)}
                  className="rounded-full p-2 text-siso-text-muted transition hover:text-siso-orange"
                  aria-label="Directory actions"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {isDirectoryMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-siso-border bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-siso-text-primary transition hover:bg-siso-bg-hover"
                      onClick={() => setIsDirectoryMenuOpen(false)}
                    >
                      All Friends
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-siso-text-primary transition hover:bg-siso-bg-hover"
                      onClick={() => setIsDirectoryMenuOpen(false)}
                    >
                      Outgoing
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-siso-text-primary transition hover:bg-siso-bg-hover"
                      onClick={() => setIsDirectoryMenuOpen(false)}
                    >
                      Blocked Users
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="sr-only" htmlFor="messages-search">Search conversations</label>
              <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/70 px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-siso-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="6" />
                  <path d="m20 20-2-2" strokeLinecap="round" />
                </svg>
                <input
                  id="messages-search"
                  type="text"
                  placeholder="Search friends & messages"
                  className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1">
              <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary px-4 py-3 text-left">
                <div className="mb-1 flex items-center gap-2 text-siso-text-primary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-orange/20 text-siso-orange">📘</span>
                  <p className="text-sm font-semibold">Saved Messages</p>
                </div>
                <p className="text-xs text-siso-text-muted">Your personal space to pin ideas, drafts, and proofs.</p>
              </div>

              {mockThreads.map((thread) => {
                const isActive = thread.id === activeThread;
                return (
                  <button
                    key={thread.id}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition ${
                      isActive ? "bg-siso-orange/10 text-siso-text-primary" : "text-siso-text-secondary hover:bg-siso-bg-tertiary/70"
                    }`}
                    onClick={() => handleSelectThread(thread.id)}
                  >
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${isActive ? "bg-siso-orange/40 text-siso-orange" : "bg-siso-bg-tertiary text-siso-text-muted"}`}>
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
                      <span className="rounded-full bg-siso-red/20 px-2 py-1 text-xs text-siso-red">
                        {thread.unreadCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </aside>
          <button
            type="button"
            aria-label="Close overlay"
            className="flex-1 bg-black/55"
            onClick={closeDirectory}
          />
        </div>
      )}

      {activeDirectoryPanel && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-6" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-3xl border border-siso-border bg-siso-bg-primary px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-siso-text-primary">{activeDirectoryPanel === 'all' ? 'All Friends' : activeDirectoryPanel === 'outgoing' ? 'Outgoing Requests' : 'Blocked Users'}</h3>
              <button className="text-siso-text-muted transition hover:text-siso-orange" aria-label="Close panel" onClick={() => setActiveDirectoryPanel(null)}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="sr-only" htmlFor="directory-panel-search">Search
                </label>
              <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/80 px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-siso-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="6" />
                  <path d="m20 20-2-2" strokeLinecap="round" />
                </svg>
                <input
                  id="directory-panel-search"
                  value={directorySearch}
                  onChange={(event) => setDirectorySearch(event.target.value)}
                  placeholder={activeDirectoryPanel === 'all' ? 'Search friends' : activeDirectoryPanel === 'outgoing' ? 'Search outgoing requests' : 'Search blocked users'}
                  className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
                />
              </div>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
              {activeDirectoryPanel === 'all' && (() => {
                const filtered = mockThreads.filter((thread) => thread.name.toLowerCase().includes(directorySearch.toLowerCase()));
                return filtered.length ? filtered.map((thread) => (
                  <div key={thread.id} className="flex items-center gap-3 rounded-xl bg-siso-bg-secondary/80 px-3 py-2">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-muted">{thread.name.charAt(0)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-siso-text-primary">{thread.name}</p>
                      <p className="truncate text-xs text-siso-text-muted">{thread.preview}</p>
                    </div>
                    {thread.unreadCount ? (<span className="rounded-full bg-siso-red/20 px-2 py-1 text-xs text-siso-red">{thread.unreadCount}</span>) : null}
                  </div>
                )) : (
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-siso-border px-4 py-8 text-center text-siso-text-muted">
                    <span className="text-3xl">🧑‍🤝‍🧑</span>
                    <p className="text-sm">No friends found.</p>
                  </div>
                );
              })()}

              {activeDirectoryPanel === 'outgoing' && (() => {
                const filtered = outgoingRequests.filter((req) => req.name.toLowerCase().includes(directorySearch.toLowerCase()));
                return filtered.length ? filtered.map((req) => (
                  <div key={req.id} className="rounded-xl bg-siso-bg-secondary/80 px-3 py-2">
                    <p className="text-sm font-semibold text-siso-text-primary">{req.name}</p>
                    {req.note ? <p className="text-xs text-siso-text-muted">{req.note}</p> : null}
                  </div>
                )) : (
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-siso-border px-4 py-8 text-center text-siso-text-muted">
                    <span className="text-3xl">📭</span>
                    <p className="text-sm">No outgoing requests.</p>
                  </div>
                );
              })()}

              {activeDirectoryPanel === 'blocked' && (() => {
                const filtered = blockedUsers.filter((user) => user.name.toLowerCase().includes(directorySearch.toLowerCase()));
                return filtered.length ? filtered.map((user) => (
                  <div key={user.id} className="rounded-xl bg-siso-bg-secondary/80 px-3 py-2">
                    <p className="text-sm font-semibold text-siso-text-primary">{user.name}</p>
                    {user.note ? <p className="text-xs text-siso-text-muted">{user.note}</p> : null}
                  </div>
                )) : (
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-siso-border px-4 py-8 text-center text-siso-text-muted">
                    <span className="text-3xl">🚫</span>
                    <p className="text-sm">No blocked users.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
