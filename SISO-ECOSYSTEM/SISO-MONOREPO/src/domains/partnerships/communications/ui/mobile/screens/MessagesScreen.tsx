"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { mockThreads } from "../fixtures/message-fixtures";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { DirectoryOverlay } from "../components/DirectoryOverlay";
import { ChatViewport } from "../components/ChatViewport";
import { ComposerBar } from "../components/ComposerBar";
import { cn } from "@/domains/shared/utils/cn";

type ConversationMessage = {
  id: string;
  authorName: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
};

const mockConversation: ConversationMessage[] = [
  {
    id: "msg-1",
    authorName: "SISO Agency",
    authorInitials: "SA",
    content: "Hey team! Dropping the latest campaign numbers — 18% uptick in lead conversions week-over-week.",
    timestamp: "Yesterday • 9:41 PM",
    direction: "incoming",
  },
  {
    id: "msg-2",
    authorName: "You",
    authorInitials: "YC",
    content: "Massive! Let’s queue the partner follow-up sequence and prep the case-study drip.",
    timestamp: "Yesterday • 9:42 PM",
    direction: "outgoing",
  },
  {
    id: "msg-3",
    authorName: "SISO Agency",
    authorInitials: "SA",
    content: "Already pushing the templates live—share any blockers and I’ll clear them.",
    timestamp: "Today • 7:12 AM",
    direction: "incoming",
  },
];

export function MessagesScreen() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [composerHeight, setComposerHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [isThreadInfoOpen, setIsThreadInfoOpen] = useState(false);
  const { setImmersiveMode, setActiveTab, isImmersiveMode } = useMobileNavigation();

  useEffect(() => {
    setActiveTab("messages", { immersive: true });
  }, [setActiveTab]);

  useEffect(() => {
    if (!activeThread && mockThreads.length > 0) {
      setActiveThread(mockThreads[0].id);
      setImmersiveMode(true);
      setActiveTab("messages", { immersive: true });
    }
  }, [activeThread, setActiveTab, setImmersiveMode]);

  const activeThreadData = useMemo(
    () => mockThreads.find((thread) => thread.id === activeThread),
    [activeThread],
  );

  const avatarLabel = useMemo(() => {
    if (!activeThreadData?.name) return "SA";
    return activeThreadData.name
      .split(" ")
      .map((segment) => segment.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [activeThreadData]);

  const outgoingRequests = useMemo(
    () => [
      { id: "req-1", name: "Nova Carter", note: "Brand assets approval pending" },
      { id: "req-2", name: "Leo Summers", note: "Invited to SISO Collective" },
    ],
    [],
  );

  const blockedUsers = useMemo(
    () =>
      [] as Array<{
        id: string;
        name: string;
        note?: string;
      }>,
    [],
  );

  const openDirectory = () => {
    setIsDirectoryOpen(true);
    setIsThreadInfoOpen(false);
    setImmersiveMode(false);
    setActiveTab("messages", { immersive: false });
  };

  const closeDirectory = () => {
    setIsDirectoryOpen(false);
    setImmersiveMode(true);
    setActiveTab("messages", { immersive: true });
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThread(threadId);
    setIsThreadInfoOpen(false);
    closeDirectory();
  };

  const threadInfoProfiles = useMemo(
    () => ({
      saved: {
        name: "Saved Messages",
        bio: "Your private space to stash links, scripts, and notes.",
        contactNumber: "—",
        website: "siso.agency",
      },
      captain: {
        name: "Rauzas | Captain",
        bio: "Partnership captain keeping weekly targets on track.",
        contactNumber: "+1 (555) 210-7788",
        website: "captains.siso.agency",
      },
      guide: {
        name: "HQ Guide",
        bio: "Automated HQ assistant for rituals and quick answers.",
        contactNumber: "+1 (555) 300-1122",
        website: "guide.siso.agency",
      },
    }),
    [],
  );

  const currentThreadInfo = activeThread ? threadInfoProfiles[activeThread] ?? null : null;

  useLayoutEffect(() => {
    const measure = () => {
      const navValue = getComputedStyle(document.documentElement).getPropertyValue("--mobile-nav-height");
      const parsed = parseFloat(navValue);
      setNavHeight(Number.isFinite(parsed) ? parsed : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      const navValue = getComputedStyle(document.documentElement).getPropertyValue("--mobile-nav-height");
      const parsed = parseFloat(navValue);
      setNavHeight(Number.isFinite(parsed) ? parsed : 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [isImmersiveMode, isDirectoryOpen]);

  return (
    <section className="relative flex flex-1 flex-col px-3 pt-1.5 pb-0">
      <ChatViewport
        isDirectoryOpen={isDirectoryOpen}
        onOpenDirectory={openDirectory}
        threadName={activeThreadData?.name ?? "SISO Agency"}
        threadStatus="Active now"
        avatarLabel={avatarLabel}
        contentOffset={composerHeight + navHeight + 6}
        onToggleThreadInfo={() => setIsThreadInfoOpen((prev) => !prev)}
        isThreadInfoOpen={isThreadInfoOpen}
        threadInfo={currentThreadInfo}
      >
        <div className="flex flex-col gap-3">
          {mockConversation.map((message) => {
            const isOutgoing = message.direction === "outgoing";
            return (
              <div key={message.id} className={cn("flex items-start gap-2", isOutgoing ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold uppercase",
                    isOutgoing ? "order-2" : "order-1",
                    isOutgoing
                      ? "border-siso-orange/40 bg-siso-orange/20 text-siso-text-primary"
                      : "border-siso-orange/20 bg-siso-orange/15 text-siso-orange",
                  )}
                >
                  {message.authorInitials}
                </div>
                <div
                  className={cn(
                    "flex max-w-[78%] flex-col gap-1",
                    isOutgoing ? "items-end order-1 text-right" : "items-start order-2 text-left",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-siso-text-muted">
                    <span className="font-semibold text-siso-text-primary">{message.authorName}</span>
                    <span>{message.timestamp}</span>
                  </div>
                  <div
                    className={cn(
                      "rounded-3xl px-4 py-1.5 text-sm",
                      isOutgoing
                        ? "rounded-br bg-siso-orange/25 text-siso-orange/90"
                        : "rounded-bl bg-white/5 text-siso-text-primary",
                    )}
                  >
                    {message.content}
                  </div>
                  <span className="text-[10px] text-siso-text-muted">{message.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ChatViewport>

      {!isDirectoryOpen && (
        <ComposerBar onHeightChange={setComposerHeight} bottomOffset={navHeight} />
      )}

      <DirectoryOverlay
        isOpen={isDirectoryOpen}
        onClose={closeDirectory}
        threads={mockThreads}
        activeThreadId={activeThread}
        onSelectThread={handleSelectThread}
        outgoingRequests={outgoingRequests}
        blockedUsers={blockedUsers}
      />
    </section>
  );
}
