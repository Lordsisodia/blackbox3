import { type ReactNode } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/domains/shared/utils/cn";

type ChatViewportProps = {
  isDirectoryOpen: boolean;
  onOpenDirectory: () => void;
  threadName?: string;
  threadStatus?: string;
  avatarLabel?: string;
  children: ReactNode;
};

export function ChatViewport({
  isDirectoryOpen,
  onOpenDirectory,
  threadName = "SISO Agency",
  threadStatus = "Active now",
  avatarLabel = "SA",
  children,
}: ChatViewportProps) {
  return (
    <div
      aria-hidden={isDirectoryOpen}
      className={cn(
        "flex flex-1 flex-col transition-opacity duration-150",
        isDirectoryOpen ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <header className="sticky top-0 z-20 -mx-4 mb-1 flex items-center justify-between rounded-b-xl border-b border-siso-border/70 bg-siso-bg-tertiary/85 px-3 py-1.5 backdrop-blur">
        <button
          type="button"
          onClick={onOpenDirectory}
          className="inline-flex items-center text-siso-text-primary transition hover:text-siso-orange"
          aria-label="Open message directory"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-left">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-siso-orange/20 text-[10px] font-semibold uppercase text-siso-orange">
            {avatarLabel}
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-siso-text-primary">{threadName}</h1>
            <p className="text-[11px] text-siso-text-muted">{threadStatus}</p>
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

      <article className="flex flex-1 flex-col">
        <div className="flex-1 space-y-2.5 overflow-y-auto pr-0" style={{ paddingBottom: 16 }}>
          {children}
        </div>
      </article>
    </div>
  );
}
