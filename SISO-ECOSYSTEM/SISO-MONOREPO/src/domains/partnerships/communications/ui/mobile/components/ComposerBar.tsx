import { useEffect, useRef } from "react";
import { AnimatedGlowingSearchBar } from "@/components/ui/animated-glowing-search-bar";

type ComposerBarProps = {
  onHeightChange?: (height: number) => void;
  bottomOffset?: number;
};

export function ComposerBar({ onHeightChange, bottomOffset = 0 }: ComposerBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onHeightChange) return;
    const node = barRef.current;
    if (!node) return;

    const emit = () => onHeightChange(node.offsetHeight);
    emit();

    const resizeObserver = new ResizeObserver(emit);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [onHeightChange]);

  return (
    <footer
      ref={barRef}
      className="fixed inset-x-0 z-[75] border-t border-siso-border/70 bg-siso-bg-tertiary/85 backdrop-blur"
      style={{ bottom: bottomOffset }}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-3 px-3.5 pt-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+8px)]">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
          aria-label="Add attachment"
        >
          +
        </button>
        <div className="flex flex-1">
          <AnimatedGlowingSearchBar
            placeholder="Message SISO Agency"
            wrapperClassName="w-full"
            className="text-base"
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
  );
}
