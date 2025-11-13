"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/domains/shared/utils/cn";

type ToggleRowProps = PropsWithChildren<{
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (id: string) => void;
  className?: string;
}>;

export default function ToggleRow({ id, label, description, checked, onChange, className }: ToggleRowProps) {
  const labelId = `${id}-label`;
  const descId = description ? `${id}-desc` : undefined;
  return (
    <div className={cn("flex items-start justify-between gap-4 px-4 py-4", className)}>
      <div className="min-w-0 flex-1">
        <p id={labelId} className="text-sm font-semibold text-siso-text-primary">{label}</p>
        {description ? <p id={descId} className="text-xs text-siso-text-muted">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        onClick={() => onChange(id)}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition",
          checked ? "bg-siso-orange/80" : "bg-siso-border/60",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}
