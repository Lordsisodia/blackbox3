import { Cog, LogOut, Menu as MenuIcon } from "lucide-react";
import { getGroupedSettingsMenuItems } from "./settings-menu.config";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { SettingMenuItem } from "./SettingMenuItem";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

export function SettingsPanel() {
  const { openDrawer } = useMobileNavigation();
  const groups = getGroupedSettingsMenuItems();
  return (
    <section className="relative flex flex-1 flex-col gap-6 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10">
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Cog className="h-6 w-6 text-siso-orange drop-shadow-[0_0_12px_rgba(255,138,0,0.35)]" />
            <h2 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">Settings</h2>
          </div>
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-black/40 text-neutral-300 transition hover:text-white hover:bg-neutral-900 hover:border-neutral-700"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
        <GlowDivider />
        <p className="text-xs text-siso-text-muted">Workspace essentials in one place.</p>
      </header>

      <div className="flex flex-col gap-5 mt-1">
        {groups.map((group) => (
          <section key={group.key} className="space-y-3">
            <h3 className="px-2 pt-1 text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">
              {group.title}
            </h3>
            <div className="flex flex-col divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              {group.items.map((item) => (
                <SettingMenuItem
                  key={`${group.key}-${item.id}`}
                  label={item.label}
                  icon={item.icon}
                  href={item.path}
                  meta={item.meta}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-siso-red/60 bg-siso-bg-secondary px-4 py-3 text-center text-sm font-semibold text-siso-red transition hover:border-siso-red hover:bg-siso-red/5"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
      </div>
    </section>
  );
}
