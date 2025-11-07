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
  onOpenSearch?: () => void;
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
  onOpenSearch,
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
          onClick={() => onToggleThreadInfo?.()}
          aria-expanded={Boolean(onToggleThreadInfo && isThreadInfoOpen)}
          className={cn(
            "flex flex-1 items-center gap-2 overflow-hidden rounded-full px-2 py-1 text-left transition",
            onToggleThreadInfo ? "hover:bg-white/5" : "cursor-default",
            isThreadInfoOpen && "bg-white/5",
          )}
          disabled={!onToggleThreadInfo}
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
          onClick={onOpenSearch}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-2-2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div style={{ height: headerHeight }} aria-hidden />

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
