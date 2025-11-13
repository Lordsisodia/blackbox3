"use client";

import { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export default function Switch({ checked = false, onChange, className = "" }: SwitchProps) {
  const [state, setState] = useState(checked);
  const toggle = () => {
    const next = !state;
    setState(next);
    onChange?.(next);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={state}
      onClick={toggle}
      className={
        className ||
        `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
          state ? "bg-siso-orange/80" : "bg-siso-border/60"
        }`
      }
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          state ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

