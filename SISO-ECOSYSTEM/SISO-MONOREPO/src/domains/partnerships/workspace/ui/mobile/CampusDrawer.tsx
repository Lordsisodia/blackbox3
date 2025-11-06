"use client";

import { cn } from "@/domains/shared/utils/cn";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { campusSections } from "./campus-sections";

export function CampusDrawer() {
  const { isDrawerOpen, closeDrawer } = useMobileNavigation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-siso-border bg-siso-bg-secondary p-4 shadow-siso transition-transform duration-200",
        isDrawerOpen ? "translate-x-0" : "-translate-x-full",
      )}
      role="dialog"
      aria-modal="true"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-siso-text-primary">Campus</h2>
        <button
          className="rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted"
          onClick={closeDrawer}
        >
          Close
        </button>
      </header>
      <div className="space-y-4 overflow-y-auto pr-2 text-sm">
        {campusSections.map((section) => (
          <section key={section.id}>
            <p className="mb-1 text-xs uppercase tracking-wide text-siso-text-muted">{section.label}</p>
            <ul className="space-y-1">
              {section.channels.map((channel) => (
                <li
                  key={channel.id}
                  className="rounded-lg px-2 py-1 text-siso-text-secondary hover:bg-siso-bg-hover"
                >
                  {channel.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
