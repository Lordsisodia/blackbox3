"use client";

import { useState } from "react";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";

type PreferenceKey = "push" | "extraSounds" | "inboundChime" | "outboundChime";

const preferenceMap: Record<PreferenceKey, { label: string; helper: string }> = {
  push: {
    label: "Push notifications",
    helper: "Alerts when high-priority partner updates drop.",
  },
  extraSounds: {
    label: "Extra sound effects",
    helper: "Play the signature SISO ping for milestone events.",
  },
  inboundChime: {
    label: "Inbound message chime",
    helper: "Tone whenever a partner replies inside the hub.",
  },
  outboundChime: {
    label: "Outbound send sound",
    helper: "Audible confirmation after you dispatch a note.",
  },
};

export function AccountNotificationsScreen() {
  const [preferences, setPreferences] = useState<Record<PreferenceKey, boolean>>({
    push: true,
    extraSounds: false,
    inboundChime: true,
    outboundChime: false,
  });

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-siso-text-bold">Settings · Notifications</span>
        </div>
        <GlowDivider />
        <p className="text-xs text-siso-text-muted">Choose the sounds and signals that keep you in sync.</p>
      </header>

      <article className="rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4">
        <ul className="space-y-4">
          {(Object.keys(preferenceMap) as PreferenceKey[]).map((key) => {
            const { label, helper } = preferenceMap[key];
            const enabled = preferences[key];
            return (
              <li key={key} className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{label}</p>
                  <p className="text-xs text-siso-text-muted">{helper}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => togglePreference(key)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                    enabled ? "bg-siso-orange/80" : "bg-siso-border/60"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                      enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
