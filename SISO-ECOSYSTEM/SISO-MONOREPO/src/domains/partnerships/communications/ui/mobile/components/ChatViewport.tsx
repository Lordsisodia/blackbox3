import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/domains/shared/utils/cn";

type ChatViewportProps = {
  isDirectoryOpen: boolean;
  onOpenDirectory: () => void;
  threadName?: string;
  threadStatus?: string;
  avatarLabel?: string;
  contentOffset?: number;
  onToggleThreadInfo?: () => void;
  isThreadInfoOpen?: boolean;
  threadInfo?: {
    name: string;
    bio: string;
    contactNumber: string;
    website: string;
  } | null;
  children: ReactNode;
};

export function ChatViewport({
  isDirectoryOpen,
  onOpenDirectory,
  threadName = "SISO Agency",
  threadStatus = "Active now",
  avatarLabel = "SA",
  contentOffset = 16,
  onToggleThreadInfo,
  isThreadInfoOpen,
  threadInfo = null,
  children,
}: ChatViewportProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const measure = () => setHeaderHeight(node.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={isDirectoryOpen}
      className={cn(
        "flex flex-1 flex-col transition-opacity duration-150",
        isDirectoryOpen ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <header
        ref={headerRef}
        className={cn(
          "fixed left-1/2 top-0 z-[84] mb-1 flex w-full max-w-md -translate-x-1/2 items-center gap-3 rounded-b-2xl border-b border-siso-border/70 bg-siso-bg-tertiary/90 px-3 py-1.5 backdrop-blur transition-opacity",
          isDirectoryOpen && "pointer-events-none",
        )}
      >
        <button
          type="button"
          onClick={onOpenDirectory}
          className="inline-flex items-center text-siso-text-primary transition hover:text-siso-orange"
          aria-label="Open message directory"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onToggleThreadInfo}
          aria-expanded={Boolean(isThreadInfoOpen)}
          className="flex flex-1 items-center gap-2 overflow-hidden rounded-full px-2 py-1 text-left transition hover:bg-white/5"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-orange/20 text-[10px] font-semibold uppercase text-siso-orange">
            {avatarLabel}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-siso-text-primary">{threadName}</span>
            <span className="text-[10px] uppercase tracking-wide text-siso-text-muted">{threadStatus}</span>
          </div>
        </button>
        <button
          type="button"
          className="ml-auto text-siso-text-muted transition hover:text-siso-orange"
          aria-label="Search conversations"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-2-2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div style={{ height: headerHeight }} aria-hidden />

      {threadInfo && (
        <div
          className={cn(
            "mx-auto w-full max-w-md rounded-2xl border border-siso-border/70 bg-siso-bg-tertiary/95 p-4 shadow-2xl transition-all",
            isThreadInfoOpen
              ? "mb-3 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siso-orange/20 text-base font-semibold uppercase text-siso-orange">
              {avatarLabel}
            </div>
            <div>
              <p className="text-sm font-semibold text-siso-text-primary">{threadInfo.name}</p>
              <p className="text-xs text-siso-text-muted">{threadInfo.bio}</p>
            </div>
          </div>
          <dl className="mt-3 space-y-2 text-xs text-siso-text-muted">
            <div className="flex items-center justify-between">
              <dt className="font-medium text-siso-text-primary">Contact</dt>
              <dd>{threadInfo.contactNumber}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-siso-text-primary">Website</dt>
              <dd className="text-siso-orange">{threadInfo.website}</dd>
            </div>
          </dl>
        </div>
      )}

      <article className="flex flex-1 flex-col">
        <div
          className="flex-1 space-y-2.5 overflow-y-auto pr-0"
          style={{ paddingBottom: contentOffset, paddingTop: 6 }}
        >
          {children}
        </div>
      </article>
    </div>
  );
}
