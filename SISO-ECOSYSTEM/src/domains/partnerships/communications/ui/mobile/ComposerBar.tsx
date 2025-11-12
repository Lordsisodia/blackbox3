import { useEffect, useRef } from "react";

type ComposerBarProps = {
  onHeightChange?: (height: number) => void;
};

export function ComposerBar({ onHeightChange }: ComposerBarProps) {
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
      className="sticky bottom-0 -mx-4 rounded-t-2xl border-t border-siso-border/70 bg-siso-bg-tertiary/85 px-3.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-2 backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
          aria-label="Add attachment"
        >
          +
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-siso-border bg-siso-bg-secondary px-3 py-[0.45rem]">
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
  );
}
