"use client";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

type InfoButtonProps = {
  label: string;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export function InfoButton({ label, content, side = "top", className }: InfoButtonProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const positions: Record<string, string> = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <span className={"relative inline-flex " + (className ?? "")}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        type="button"
        aria-label={label}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-siso-text-muted transition hover:text-siso-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-siso-orange/50"
        onFocus={enter}
        onBlur={leave}
        onClick={() => setOpen((v) => !v)}
      >
        <Eye className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <div
          role="tooltip"
          className={"absolute z-50 max-w-[220px] rounded-md border border-white/10 bg-siso-bg-primary/95 px-3 py-2 text-[11px] text-siso-text-secondary shadow-[0_10px_20px_rgba(0,0,0,0.35)] " + positions[side]}
        >
          {content}
        </div>
      ) : null}
    </span>
  );
}

export default InfoButton;

